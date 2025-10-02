"use client";
import React, { useEffect, useState } from "react";
import CartSummary from "@/components/cart/CartSummary";
import CartItem from "@/components/cart/CartItem";

const CartPage = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    async function fetchCart() {
      if (typeof token === "string" && token) {
        const CartService = await import("@/service/CartService");
        const cart = await CartService.getCart(token);
        // Chuẩn hóa dữ liệu từ response
        const items = Array.isArray(cart?.cartitems)
          ? cart.cartitems.map((item: any) => {
              let imageUrl = item.product?.photo || "";
              if (imageUrl && !imageUrl.startsWith("http")) {
                imageUrl = `http://localhost:8000${imageUrl}`;
              }
              const price = parseFloat(item.product?.price);
              const discount_percent = item.product?.discount_percent || 0;
              const discountedPrice = discount_percent > 0 ? price * (1 - discount_percent / 100) : price;
              return {
                id: item.id,
                name: item.product?.name,
                image: imageUrl,
                price: discountedPrice,
                originalPrice: price,
                discount_percent,
                quantity: item.quantity,
              };
            })
          : [];
        setCartItems(items);
      }
      setLoading(false);
    }
    fetchCart();
  }, [token]);

  const handleUpdateQuantity = async (item_id: number, quantity: number) => {
    const CartService = await import("@/service/CartService");
    await CartService.updateCartItemQuantity(item_id, quantity);
    // Refresh cart
      // Refresh cart automatically after update
      if (typeof token === "string" && token) {
        const cart = await CartService.getCart(token);
        const items = Array.isArray(cart?.cartitems)
          ? cart.cartitems.map((item: any) => {
              let imageUrl = item.product?.photo || "";
              if (imageUrl && !imageUrl.startsWith("http")) {
                imageUrl = `http://localhost:8000${imageUrl}`;
              }
              const price = parseFloat(item.product?.price);
              const discount_percent = item.product?.discount_percent || 0;
              const discountedPrice = discount_percent > 0 ? price * (1 - discount_percent / 100) : price;
              return {
                id: item.id,
                name: item.product?.name,
                image: imageUrl,
                price: discountedPrice,
                originalPrice: price,
                discount_percent,
                quantity: item.quantity,
              };
            })
          : [];
        setCartItems(items);
      }
    window.dispatchEvent(new Event("user-login"));
  };

  const handleDeleteItem = async (item_id: number) => {
    const CartService = await import("@/service/CartService");
    await CartService.deleteCartItem(item_id);
    // Refresh cart
      // Refresh cart automatically after delete
      if (typeof token === "string" && token) {
        const cart = await CartService.getCart(token);
        const items = Array.isArray(cart?.cartitems)
          ? cart.cartitems.map((item: any) => {
              let imageUrl = item.product?.photo || "";
              if (imageUrl && !imageUrl.startsWith("http")) {
                imageUrl = `http://localhost:8000${imageUrl}`;
              }
              const price = parseFloat(item.product?.price);
              const discount_percent = item.product?.discount_percent || 0;
              const discountedPrice = discount_percent > 0 ? price * (1 - discount_percent / 100) : price;
              return {
                id: item.id,
                name: item.product?.name,
                image: imageUrl,
                price: discountedPrice,
                originalPrice: price,
                discount_percent,
                quantity: item.quantity,
              };
            })
          : [];
        setCartItems(items);
      }
    window.dispatchEvent(new Event("user-login"));
  };

  return (
    <div className="main-max-width padding-x mx-auto py-9">
      <h1 className="font-semibold text-2xl text-gray-800 mb-6">Cart</h1>
      <div className="flex flex-wrap gap-6 lg:gap-8 justify-between w-full">
        {/* Cartitem */}
        <div className="w-[600px] max-lg:w-full border border-gray-200 shadow-sm rounded-lg bg-white overflow-hidden flex-1">
          <div className="max-h-[400px] overflow-y-auto px-6 py-4">
            {loading ? (
              <p className="text-center text-gray-500 py-10">Loading...</p>
            ) : cartItems.length > 0 ? (
              cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  image={item.image}
                  price={item.price}
                  originalPrice={item.originalPrice}
                  discount_percent={item.discount_percent}
                  quantity={item.quantity}
                  onUpdateQuantity={handleUpdateQuantity}
                  onDeleteItem={handleDeleteItem}
                />
              ))
            ) : (
              <p className="text-center text-gray-500 py-10">Your cart is empty.</p>
            )}
          </div>
        </div>
        {/* Cartitem */}
  <CartSummary cartItems={cartItems} token={token || undefined} />
      </div>
    </div>
  );
};

export default CartPage;