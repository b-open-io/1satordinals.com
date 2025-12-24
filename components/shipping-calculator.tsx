"use client";

import { Loader2, Truck } from "lucide-react";
import { useState } from "react";
import { useCalculateShipping } from "@/lib/hooks";
import { formatPrice } from "@/lib/products";
import { useCartStore } from "@/lib/store";

const COUNTRIES = [
  { code: "US", name: "United States", hasStates: true },
  { code: "CA", name: "Canada", hasStates: true },
  { code: "GB", name: "United Kingdom", hasStates: false },
  { code: "AU", name: "Australia", hasStates: true },
  { code: "DE", name: "Germany", hasStates: false },
  { code: "FR", name: "France", hasStates: false },
];

const US_STATES = [
  { code: "AL", name: "Alabama" },
  { code: "AK", name: "Alaska" },
  { code: "AZ", name: "Arizona" },
  { code: "AR", name: "Arkansas" },
  { code: "CA", name: "California" },
  { code: "CO", name: "Colorado" },
  { code: "CT", name: "Connecticut" },
  { code: "DE", name: "Delaware" },
  { code: "FL", name: "Florida" },
  { code: "GA", name: "Georgia" },
  { code: "HI", name: "Hawaii" },
  { code: "ID", name: "Idaho" },
  { code: "IL", name: "Illinois" },
  { code: "IN", name: "Indiana" },
  { code: "IA", name: "Iowa" },
  { code: "KS", name: "Kansas" },
  { code: "KY", name: "Kentucky" },
  { code: "LA", name: "Louisiana" },
  { code: "ME", name: "Maine" },
  { code: "MD", name: "Maryland" },
  { code: "MA", name: "Massachusetts" },
  { code: "MI", name: "Michigan" },
  { code: "MN", name: "Minnesota" },
  { code: "MS", name: "Mississippi" },
  { code: "MO", name: "Missouri" },
  { code: "MT", name: "Montana" },
  { code: "NE", name: "Nebraska" },
  { code: "NV", name: "Nevada" },
  { code: "NH", name: "New Hampshire" },
  { code: "NJ", name: "New Jersey" },
  { code: "NM", name: "New Mexico" },
  { code: "NY", name: "New York" },
  { code: "NC", name: "North Carolina" },
  { code: "ND", name: "North Dakota" },
  { code: "OH", name: "Ohio" },
  { code: "OK", name: "Oklahoma" },
  { code: "OR", name: "Oregon" },
  { code: "PA", name: "Pennsylvania" },
  { code: "RI", name: "Rhode Island" },
  { code: "SC", name: "South Carolina" },
  { code: "SD", name: "South Dakota" },
  { code: "TN", name: "Tennessee" },
  { code: "TX", name: "Texas" },
  { code: "UT", name: "Utah" },
  { code: "VT", name: "Vermont" },
  { code: "VA", name: "Virginia" },
  { code: "WA", name: "Washington" },
  { code: "WV", name: "West Virginia" },
  { code: "WI", name: "Wisconsin" },
  { code: "WY", name: "Wyoming" },
];

export function ShippingCalculator() {
  const { items, shipping, setShipping, setShippingAddress, shippingAddress } =
    useCartStore();

  const [countryCode, setCountryCode] = useState(
    shippingAddress?.countryCode || "US",
  );
  const [stateCode, setStateCode] = useState(shippingAddress?.stateCode || "");
  const [zip, setZip] = useState(shippingAddress?.zip || "");
  const [city, _setCity] = useState(shippingAddress?.city || "");

  const calculateShippingMutation = useCalculateShipping();

  const selectedCountry = COUNTRIES.find((c) => c.code === countryCode);

  const handleCalculateRates = () => {
    if (!countryCode) return;
    if (selectedCountry?.hasStates && !stateCode) {
      return;
    }

    calculateShippingMutation.mutate(
      {
        address: {
          countryCode,
          stateCode: stateCode || undefined,
          city: city || undefined,
          zip: zip || undefined,
        },
        items: items.map((item) => ({
          variantId: item.variantId,
          quantity: item.quantity,
        })),
      },
      {
        onSuccess: (data) => {
          setShippingAddress({ countryCode, stateCode, city, zip });
          // Auto-select first option if none selected
          if (data.shippingOptions.length > 0 && !shipping) {
            setShipping(data.shippingOptions[0]);
          }
        },
      },
    );
  };

  const shippingOptions = calculateShippingMutation.data?.shippingOptions || [];
  const error = calculateShippingMutation.error?.message;
  const isLoading = calculateShippingMutation.isPending;

  return (
    <div className="space-y-4 p-4 border-2 border-foreground rounded-xl bg-card">
      <div className="flex items-center gap-2">
        <Truck className="h-5 w-5" strokeWidth={2.5} />
        <h3 className="font-bold text-lg">Shipping</h3>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {/* Country */}
        <div className="col-span-2">
          <label className="block text-sm font-bold mb-1">Country</label>
          <select
            value={countryCode}
            onChange={(e) => {
              setCountryCode(e.target.value);
              setStateCode("");
              calculateShippingMutation.reset();
              setShipping(null);
            }}
            className="w-full px-3 py-2 border-2 border-foreground rounded-lg bg-input font-medium"
          >
            {COUNTRIES.map((country) => (
              <option key={country.code} value={country.code}>
                {country.name}
              </option>
            ))}
          </select>
        </div>

        {/* State (for US, CA, AU) */}
        {selectedCountry?.hasStates && (
          <div className="col-span-2 sm:col-span-1">
            <label className="block text-sm font-bold mb-1">State</label>
            <select
              value={stateCode}
              onChange={(e) => {
                setStateCode(e.target.value);
                calculateShippingMutation.reset();
                setShipping(null);
              }}
              className="w-full px-3 py-2 border-2 border-foreground rounded-lg bg-input font-medium"
            >
              <option value="">Select state...</option>
              {countryCode === "US" &&
                US_STATES.map((state) => (
                  <option key={state.code} value={state.code}>
                    {state.name}
                  </option>
                ))}
            </select>
          </div>
        )}

        {/* ZIP */}
        <div
          className={
            selectedCountry?.hasStates
              ? "col-span-2 sm:col-span-1"
              : "col-span-2"
          }
        >
          <label className="block text-sm font-bold mb-1">
            ZIP / Postal Code
          </label>
          <input
            type="text"
            value={zip}
            onChange={async (e) => {
              const newZip = e.target.value;
              setZip(newZip);
              calculateShippingMutation.reset();
              setShipping(null);

              // Auto-detect state from ZIP code for US
              if (
                countryCode === "US" &&
                newZip.length === 5 &&
                !stateCode
              ) {
                try {
                  const response = await fetch(
                    `https://zip.getziptastic.com/v2/US/${newZip}`,
                  );
                  if (response.ok) {
                    const data = await response.json();
                    if (data.state_short) {
                      setStateCode(data.state_short);
                    }
                  }
                } catch (err) {
                  // Silently fail - user can still select state manually
                  console.error("ZIP lookup failed:", err);
                }
              }
            }}
            placeholder="12345"
            className="w-full px-3 py-2 border-2 border-foreground rounded-lg bg-input font-medium"
          />
        </div>
      </div>

      {/* Calculate button */}
      <button
        onClick={handleCalculateRates}
        disabled={isLoading || items.length === 0}
        className="w-full py-2 px-4 border-2 border-foreground rounded-lg font-bold bg-secondary text-secondary-foreground hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Calculating...
          </>
        ) : (
          "Calculate Shipping"
        )}
      </button>

      {/* Error */}
      {error && <p className="text-destructive text-sm font-medium">{error}</p>}

      {/* Shipping options */}
      {shippingOptions.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-bold">Select shipping method:</p>
          {shippingOptions.map((option) => (
            <label
              key={option.id}
              className={`flex items-center justify-between p-3 border-2 rounded-lg cursor-pointer transition-all ${
                shipping?.id === option.id
                  ? "border-primary bg-primary/10"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="shipping"
                  checked={shipping?.id === option.id}
                  onChange={() => setShipping(option)}
                  className="h-4 w-4"
                />
                <div>
                  <p className="font-bold">{option.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {option.minDays === option.maxDays
                      ? `${option.minDays} days`
                      : `${option.minDays}-${option.maxDays} days`}
                  </p>
                </div>
              </div>
              <span className="font-bold">{formatPrice(option.rate)}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
