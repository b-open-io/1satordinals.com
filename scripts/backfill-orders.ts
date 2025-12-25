/**
 * Backfill Script - Import existing Stripe orders into orders database
 *
 * This script fetches completed Stripe checkout sessions and creates
 * corresponding order records in the database.
 *
 * Usage: bun run scripts/backfill-orders.ts
 */

import Stripe from "stripe";
import { ensureOrdersInitialized, sql } from "@/lib/db/client";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-02-24.acacia",
});

interface CheckoutSession extends Stripe.Checkout.Session {
  customer_details: {
    email: string;
    name: string;
    address: {
      line1: string;
      line2?: string;
      city: string;
      state?: string;
      postal_code: string;
      country: string;
    };
  };
  shipping_details?: {
    name: string;
    address: {
      line1: string;
      line2?: string;
      city: string;
      state?: string;
      postal_code: string;
      country: string;
    };
  };
}

async function backfillOrders() {
  console.log("🔄 Starting order backfill...\n");

  // Ensure database is initialized
  await ensureOrdersInitialized();

  try {
    // Fetch all completed checkout sessions
    console.log("📥 Fetching Stripe checkout sessions...");
    const sessions = await stripe.checkout.sessions.list({
      limit: 100,
      status: "complete",
    });

    console.log(`✅ Found ${sessions.data.length} completed sessions\n`);

    let imported = 0;
    let skipped = 0;
    let errors = 0;

    for (const session of sessions.data as CheckoutSession[]) {
      try {
        // Check if order already exists
        const existing = await sql`
          SELECT id FROM orders
          WHERE stripe_checkout_session_id = ${session.id}
        `;

        if (existing.length > 0) {
          console.log(`⏭️  Skipping ${session.id} - already exists`);
          skipped++;
          continue;
        }

        // Fetch line items
        const lineItems = await stripe.checkout.sessions.listLineItems(
          session.id,
          { limit: 100 }
        );

        // Get customer details
        const email = session.customer_details?.email || session.customer_email || "";
        const shippingAddress = session.shipping_details?.address || session.customer_details?.address;

        if (!shippingAddress) {
          console.log(`⚠️  Skipping ${session.id} - no shipping address`);
          skipped++;
          continue;
        }

        // Calculate totals
        const subtotal = session.amount_subtotal || 0;
        const shipping = session.total_details?.amount_shipping || 0;
        const tax = session.total_details?.amount_tax || 0;
        const total = session.amount_total || 0;

        // Prepare shipping address
        const shippingAddressData = {
          name: session.shipping_details?.name || session.customer_details?.name || "",
          address1: shippingAddress.line1,
          address2: shippingAddress.line2 || "",
          city: shippingAddress.city || "",
          state_code: shippingAddress.state || "",
          country_code: shippingAddress.country || "US",
          zip: shippingAddress.postal_code || "",
        };

        // Prepare items (we don't have sync_variant_id, so use placeholder)
        const items = lineItems.data.map((item) => ({
          sync_variant_id: 0, // Placeholder - would need to map from product ID
          quantity: item.quantity || 1,
          name: item.description || "Unknown",
          price: item.amount_total || 0,
        }));

        // Insert order
        await sql`
          INSERT INTO orders (
            user_pubkey,
            user_email,
            stripe_payment_intent_id,
            stripe_checkout_session_id,
            stripe_test_mode,
            status,
            items,
            shipping_address,
            shipping_method,
            subtotal,
            shipping_cost,
            tax,
            total,
            currency,
            created_at,
            paid_at
          ) VALUES (
            '',
            ${email},
            ${session.payment_intent as string || null},
            ${session.id},
            ${!session.livemode},
            'payment_completed',
            ${JSON.stringify(items)},
            ${JSON.stringify(shippingAddressData)},
            'STANDARD',
            ${subtotal},
            ${shipping},
            ${tax},
            ${total},
            ${(session.currency || "usd").toUpperCase()},
            NOW(),
            NOW()
          )
        `;

        console.log(`✅ Imported order ${session.id} (${email})`);
        imported++;

      } catch (error) {
        console.error(`❌ Error importing ${session.id}:`, error);
        errors++;
      }
    }

    console.log("\n📊 Backfill Summary:");
    console.log(`   ✅ Imported: ${imported}`);
    console.log(`   ⏭️  Skipped: ${skipped}`);
    console.log(`   ❌ Errors: ${errors}`);
    console.log(`   📦 Total: ${sessions.data.length}`);

    console.log("\n✨ Backfill complete!");
    console.log("\n⚠️  NOTE: Imported orders have status 'payment_completed'");
    console.log("   They were not sent to Printful automatically.");
    console.log("   You may need to manually create Printful orders for these.");

  } catch (error) {
    console.error("❌ Fatal error during backfill:", error);
    process.exit(1);
  }
}

// Run the backfill
backfillOrders()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Unhandled error:", error);
    process.exit(1);
  });
