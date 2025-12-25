-- Orders Management Schema for PostgreSQL
-- Tracks orders from Stripe checkout through Printful fulfillment

-- Orders table
CREATE TABLE IF NOT EXISTS "orders" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- User identification (from Sigma auth)
  "user_pubkey" TEXT NOT NULL,
  "user_email" TEXT NOT NULL,

  -- Stripe integration
  "stripe_payment_intent_id" TEXT UNIQUE,
  "stripe_checkout_session_id" TEXT UNIQUE NOT NULL,
  "stripe_test_mode" BOOLEAN NOT NULL DEFAULT FALSE,

  -- Printful integration
  "printful_order_id" TEXT UNIQUE,
  "printful_external_id" TEXT,

  -- Order status
  -- Possible values: payment_pending, paid, printful_draft, printful_pending,
  -- in_production, shipped, delivered, failed, canceled
  "status" TEXT NOT NULL DEFAULT 'payment_pending',

  -- Order data (stored as JSON for flexibility)
  "items" JSONB NOT NULL,
  "shipping_address" JSONB NOT NULL,
  "shipping_method" TEXT,

  -- Pricing (stored in cents)
  "subtotal" INTEGER NOT NULL,
  "shipping_cost" INTEGER NOT NULL,
  "tax" INTEGER DEFAULT 0,
  "total" INTEGER NOT NULL,
  "currency" TEXT NOT NULL DEFAULT 'usd',

  -- Shipping tracking
  "tracking_number" TEXT,
  "tracking_url" TEXT,
  "carrier" TEXT,

  -- Error handling
  "error_message" TEXT,
  "printful_error" TEXT,

  -- Timestamps
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "paid_at" TIMESTAMPTZ,
  "shipped_at" TIMESTAMPTZ,
  "delivered_at" TIMESTAMPTZ
);

-- Order events audit trail
CREATE TABLE IF NOT EXISTS "order_events" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "order_id" UUID NOT NULL REFERENCES "orders"("id") ON DELETE CASCADE,

  -- Event metadata
  "event_type" TEXT NOT NULL,
  "source" TEXT NOT NULL, -- 'stripe' or 'printful' or 'system'
  "status" TEXT, -- New status after this event

  -- Full webhook payload for debugging
  "payload" JSONB,

  -- Timestamp
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS "idx_orders_user_pubkey" ON "orders"("user_pubkey");
CREATE INDEX IF NOT EXISTS "idx_orders_user_email" ON "orders"("user_email");
CREATE INDEX IF NOT EXISTS "idx_orders_stripe_payment_intent" ON "orders"("stripe_payment_intent_id");
CREATE INDEX IF NOT EXISTS "idx_orders_printful_order_id" ON "orders"("printful_order_id");
CREATE INDEX IF NOT EXISTS "idx_orders_status" ON "orders"("status");
CREATE INDEX IF NOT EXISTS "idx_orders_created_at" ON "orders"("created_at" DESC);
CREATE INDEX IF NOT EXISTS "idx_order_events_order_id" ON "order_events"("order_id");
CREATE INDEX IF NOT EXISTS "idx_order_events_created_at" ON "order_events"("created_at" DESC);

-- Update updated_at timestamp automatically
CREATE OR REPLACE FUNCTION update_orders_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER orders_updated_at
  BEFORE UPDATE ON "orders"
  FOR EACH ROW
  EXECUTE FUNCTION update_orders_updated_at();
