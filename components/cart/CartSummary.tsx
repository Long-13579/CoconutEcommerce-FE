import React from 'react';
import Button from '../uiComponents/Button';

interface Props {
  cartItems: Array<{ price: number; quantity: number }>;
  token?: string;
}

import { getPaymentLink } from "@/service/PaymentService";

const CartSummary = ({ cartItems, token }: Props) => {
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal;
  const handleCheckout = async () => {
    if (!token) return;
    const res = await getPaymentLink(token);
    if (res && res.payUrl) {
      window.location.href = res.payUrl;
    }
  };
  return (
    <div className="w-[400px] max-lg:w-full border border-gray-200 rounded-lg shadow-md bg-white px-8 py-6">
      <h2 className="font-semibold text-2xl text-gray-800 mb-6">Order Summary</h2>
      <div className="w-full flex items-center justify-between py-2">
        <p className="text-gray-600 font-medium">Subtotal</p>
        <p className="text-gray-800 font-semibold">${subtotal.toFixed(2)}</p>
      </div>
      {/* Discount removed as requested */}
      <hr className="my-4 border-gray-300" />
      <div className="w-full flex items-center justify-between py-2">
        <p className="text-lg font-semibold text-gray-800">Total</p>
        <p className="text-lg font-bold text-black">${total.toFixed(2)}</p>
      </div>
      <Button className='checkout-btn' onClick={handleCheckout}>
        Proceed to Checkout
      </Button>
    </div>
  );
};

export default CartSummary;