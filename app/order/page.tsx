"use client";
import React, { useEffect, useState } from "react";
import { getOrders } from "@/service/PaymentService";

const OrderPage = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    async function fetchOrders() {
      if (typeof token === "string" && token) {
        const res = await getOrders(token);
        setOrders(Array.isArray(res) ? res : res?.orders || []);
      }
      setLoading(false);
    }
    fetchOrders();
  }, [token]);

  return (
    <div className="main-max-width padding-x mx-auto py-9">
      <h1 className="font-semibold text-2xl text-gray-800 mb-6">Your Orders</h1>
      {loading ? (
        <div className="text-center text-gray-500 py-10">Loading...</div>
      ) : orders.length === 0 ? (
        <div className="text-center text-gray-500 py-10">No orders found.</div>
      ) : (
        <div className="space-y-6">
          {orders.map((order, idx) => (
            <div key={order.id || idx} className="border rounded-lg p-6 bg-white shadow-sm">
              <div className="font-semibold text-lg mb-2">Order #{order.id}</div>
              <div className="text-gray-700 mb-1">Status: {order.status || "N/A"}</div>
              <div className="text-gray-700 mb-1">Total: ${order.total || order.amount || 0}</div>
              <div className="text-gray-700 mb-1">Created: {order.created_at || order.date || "N/A"}</div>
              {/* Add more order details as needed */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderPage;
