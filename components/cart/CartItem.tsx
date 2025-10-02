import React from 'react';
import Image from "next/image";
import { Minus, Plus, X } from 'lucide-react';
import Button from '../uiComponents/Button';

interface CartItemProps {
  id: number;
  name: string;
  image?: string;
  price: number;
  originalPrice?: number;
  discount_percent?: number;
  quantity: number;
  onUpdateQuantity: (item_id: number, quantity: number) => void;
  onDeleteItem: (item_id: number) => void;
}

const CartItem = ({ id, name, image, price, originalPrice, discount_percent, quantity, onUpdateQuantity, onDeleteItem }: CartItemProps) => {
  const hasDiscount = discount_percent && discount_percent > 0 && originalPrice && originalPrice > price;
  return (
    <div className="flex items-center justify-between gap-6 border-b border-gray-200 py-4 mb-6 w-full flex-wrap bg-white px-4 rounded-lg shadow-sm">
      {/* Product Image */}
      <div className="relative overflow-hidden w-[70px] h-[70px] rounded-lg border border-gray-200 flex items-center justify-center">
        <Image
          src={image || "/coconut_product.jpg"}
          alt={name}
          className="object-cover"
          fill
        />
      </div>

      {/* Product Details - Name and Price */}
      <div className="flex-1 min-w-[120px]">
        <p className="font-semibold text-gray-800">{name}</p>
        {hasDiscount ? (
          <div className="flex items-center gap-2 mt-1">
            <span className="text-gray-400 text-sm line-through">${originalPrice?.toFixed(2)}</span>
            <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded">-{discount_percent}%</span>
            <span className="text-blue-600 font-bold text-base">${price.toFixed(2)}</span>
          </div>
        ) : (
          <p className="text-gray-600 text-sm mt-1">${price.toFixed(2)}</p>
        )}
      </div>

      {/* Quantity Selector */}
      <div className="flex items-center justify-center gap-2 bg-gray-100 px-2 py-1 rounded-md">
        <button
          className="p-2 rounded-md bg-white border hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => onUpdateQuantity(id, quantity - 1)}
          disabled={quantity <= 1}
        >
          <Minus className="w-5 h-5 text-gray-700" />
        </button>
        <div className="w-[50px] h-[40px] flex items-center justify-center font-medium bg-white border border-gray-300 rounded-md shadow-sm">
          {quantity}
        </div>
        <button
          className="p-2 rounded-md bg-white border hover:bg-gray-200 transition"
          onClick={() => onUpdateQuantity(id, quantity + 1)}
        >
          <Plus className="w-5 h-5 text-gray-700" />
        </button>
      </div>

      {/* Subtotal Price */}
      <p className="text-lg font-semibold text-gray-800">${(price * quantity).toFixed(2)}</p>

      {/* Remove Item Button */}
      <button
        className="p-2 rounded-md bg-red-50 hover:bg-red-100 transition text-red-500 border border-red-300"
        onClick={() => onDeleteItem(id)}
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
}

export default CartItem;