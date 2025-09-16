import OrderContainer from "@/components/order/OrderContainer";

export default function OrdersPage() {
  return (
    <main className="px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Your Orders</h1>
      <OrderContainer />
    </main>
  );
}
