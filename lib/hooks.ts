// TanStack Query hooks for frontend data fetching

import { useMutation } from "@tanstack/react-query";
import {
  type CalculateShippingRequest,
  type CalculateShippingResponse,
  type ConfirmOrderRequest,
  type ConfirmOrderResponse,
  type CreateCheckoutRequest,
  type CreateCheckoutResponse,
  calculateShipping,
  confirmOrder,
  createCheckout,
} from "./api";

// ============ Shipping ============

export function useCalculateShipping() {
  return useMutation<
    CalculateShippingResponse,
    Error,
    CalculateShippingRequest
  >({
    mutationFn: calculateShipping,
  });
}

// ============ Checkout ============

export function useConfirmOrder() {
  return useMutation<ConfirmOrderResponse, Error, ConfirmOrderRequest>({
    mutationFn: confirmOrder,
  });
}

export function useCreateCheckout() {
  return useMutation<CreateCheckoutResponse, Error, CreateCheckoutRequest>({
    mutationFn: createCheckout,
  });
}
