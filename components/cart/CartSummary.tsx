import React from 'react';
import Button from '../uiComponents/Button';

interface Props {
  cartItems: Array<{ price: number; quantity: number }>;
}

const CartSummary = ({ cartItems }: Props) => {
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = subtotal * 0.05; // 5% discount
  const total = subtotal - discount;
  return (
    <div className="w-[400px] max-lg:w-full border border-gray-200 rounded-lg shadow-md bg-white px-8 py-6">
      <h2 className="font-semibold text-2xl text-gray-800 mb-6">Order Summary</h2>
      <div className="w-full flex items-center justify-between py-2">
        <p className="text-gray-600 font-medium">Subtotal</p>
        <p className="text-gray-800 font-semibold">${subtotal.toFixed(2)}</p>
      </div>
      <div className="w-full flex items-center justify-between py-2">
        <p className="text-gray-500 font-medium">Discount</p>
        <p className="text-green-700 font-semibold">-${discount.toFixed(2)}</p>
      </div>
      <hr className="my-4 border-gray-300" />
      <div className="w-full flex items-center justify-between py-2">
        <p className="text-lg font-semibold text-gray-800">Total</p>
        <p className="text-lg font-bold text-black">${total.toFixed(2)}</p>
      </div>
      <Button className='checkout-btn'>
        Proceed to Checkout
      </Button>
    </div>
  );
};

export default CartSummary;