"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { finishCheckout } from "@/service/PaymentService";

const PaymentResults = () => {
  const searchParams = useSearchParams();
  const resultCode = searchParams.get("resultCode");
  const amount = searchParams.get("amount");
  const transId = searchParams.get("transId");
  const [status, setStatus] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function handleFinish() {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      if (resultCode && amount && transId) {
        await finishCheckout(Number(resultCode), Number(amount), String(transId), token || undefined);
      }
      setStatus(resultCode === "0" ? "success" : "fail");
      setLoading(false);
    }
    handleFinish();
    // eslint-disable-next-line
  }, [resultCode, amount, transId]);

  if (loading) return <div className="py-20 text-center">Processing payment...</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      {status === "success" ? (
        <>
          <div className="text-green-600 text-3xl font-bold mb-4">Payment Successful!</div>
          <div className="text-lg text-gray-700 mb-2">Thank you for your purchase.</div>
        </>
      ) : (
        <>
          <div className="text-red-600 text-3xl font-bold mb-4">Payment Failed!</div>
          <div className="text-lg text-gray-700 mb-2">Your payment could not be processed.</div>
        </>
      )}
    </div>
  );
};

export default PaymentResults;
