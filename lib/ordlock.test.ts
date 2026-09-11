import { expect, test } from "bun:test";
import { listingBuy, listingCancel, listingCreate } from "./ordlock";

test("OPL-4693: listing create off, buy/cancel on", () => {
  expect(listingCreate).toBe(false);
  expect(listingBuy).toBe(true);
  expect(listingCancel).toBe(true);
});
