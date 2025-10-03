import React from 'react';
import MiniProductCard from './MiniProductCard';

interface IndividualOrderProps {
  order: any;
}


function formatDate(dateString: string) {
  if (!dateString) return 'N/A';
  const d = new Date(dateString);
  if (isNaN(d.getTime())) return dateString;
  const day = d.getDate().toString().padStart(2, '0');
  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  const year = d.getFullYear();
  return `${day}-${month}-${year}`;
}

const IndividualOrder = ({ order }: IndividualOrderProps) => {
  const orderDate = order.created_at || order.date || '';
  return (
    <div className="w-full border border-gray-200 bg-white px-4 py-4 rounded-lg shadow-sm">
      {/* Order Header */}
      <div className="w-full bg-gray-50 px-4 py-3 rounded-md flex items-center justify-between shadow-sm border border-gray-200">
        <p className="text-sm sm:text-base font-medium text-gray-800 max-sm:hidden">
          ORDER ID:{' '}
          <span className="text-green-600 font-semibold">
            {order.checkout_id || order.id || 'N/A'}
          </span>
        </p>
        <small className="text-gray-500 text-xs sm:text-sm">{formatDate(orderDate)}</small>
      </div>

      {/* Order Items */}
      <div className="w-full py-4 flex items-center gap-4 custom-overflow">
        {Array.isArray(order.items) && order.items.length > 0 ? (
          order.items.map((item: any, idx: number) => (
            <MiniProductCard key={item.id || idx} item={item} />
          ))
        ) : (
          <span className="text-gray-400">No products</span>
        )}
      </div>

      {/* Order Total */}
      <div className="w-full flex justify-end mt-2">
        <span className="text-lg font-bold text-blue-700">
          Order Total: $
          {Array.isArray(order.items)
            ? order.items.reduce((sum: number, item: any) => sum + (Number(item.price || 0) * (item.quantity || 1)), 0).toFixed(2)
            : '0.00'}
        </span>
      </div>
    </div>
  );
};

export default IndividualOrder;