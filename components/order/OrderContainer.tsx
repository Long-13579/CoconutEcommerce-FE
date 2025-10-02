"use client";

import React, { useEffect, useState } from 'react';
import IndividualOrder from './IndividualOrder';
import { getOrders } from '@/service/OrderService';
import { checkUserExists } from '@/service/UserService';

const OrderContainer = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchOrders() {
      let token = null;
      if (typeof window !== 'undefined') {
        token = localStorage.getItem('token');
      }
      if (token) {
        // Optionally check if user exists
        // const exists = await checkUserExists(email);
        // if (!exists?.exists) return;
        const res = await getOrders(token);
        setOrders(Array.isArray(res) ? res : res?.orders || []);
      }
      setLoading(false);
    }
    fetchOrders();
  }, []);

  if (loading) return <div className="text-center text-gray-500 py-10">Loading...</div>;
  if (!orders.length) return <div className="text-center text-gray-500 py-10">No orders found.</div>;

  return (
    <div className="w-full max-h-[600px] overflow-y-auto px-6 space-y-6 rounded-md">
      {orders.map((order, idx) => (
        <IndividualOrder key={order.id || idx} order={order} />
      ))}
    </div>
  );
};

export default OrderContainer;