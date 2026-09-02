import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Check, 
  Copy, 
  MapPin, 
  Clock, 
  Truck, 
  Store, 
  Sparkles, 
  Share2,
  Calendar
} from 'lucide-react';
import { OrderDetails } from '../types';

interface OrderHeaderProps {
  order: OrderDetails;
  onFulfillmentChange: (type: 'delivery' | 'pickup') => void;
}

export const OrderHeader: React.FC<OrderHeaderProps> = ({
  order,
  onFulfillmentChange,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyOrderNumber = () => {
    navigator.clipboard.writeText(order.orderNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-2xl border border-emerald-100 shadow-sm overflow-hidden mb-6">
      {/* Top Banner Accent */}
      <div className="bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-700 px-6 py-8 text-white relative">
        <div className="absolute right-0 top-0 bottom-0 w-96 opacity-10 pointer-events-none flex items-center justify-end pr-8">
          <Sparkles className="w-64 h-64" />
        </div>

        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-3 mb-4">
            <motion.div
              initial={{ scale: 0.6, rotate: -15, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{ type: 'spring', damping: 12, stiffness: 150 }}
              className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center ring-4 ring-white/30 text-white shadow-inner"
            >
              <Check className="w-7 h-7 stroke-[2.5]" />
            </motion.div>
            <div>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-800/60 text-emerald-100 border border-emerald-400/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-ping"></span>
                Payment Confirmed & Verified
              </span>
              <p className="text-xs text-emerald-100/90 mt-0.5">
                Receipt sent to <span className="font-semibold underline decoration-emerald-300">{order.customerEmail}</span>
              </p>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-2">
            Thank you for your order, {order.customerName.split(' ')[0]}!
          </h1>
          <p className="text-emerald-50 text-sm sm:text-base leading-relaxed max-w-2xl font-light">
            Your fresh grocery basket from <strong className="font-semibold text-white">Supermarket EA</strong> is confirmed. Our dedicated team is currently hand-picking your items with strict quality & temperature checks.
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3 pt-2">
            {/* Order Number pill */}
            <div className="inline-flex items-center bg-white/15 backdrop-blur-md border border-white/25 rounded-xl px-3 py-1.5 text-xs text-white">
              <span className="text-emerald-200 mr-1.5">Order Ref:</span>
              <span className="font-mono font-bold tracking-wider mr-2">{order.orderNumber}</span>
              <button
                id="copy-order-ref-btn"
                onClick={handleCopyOrderNumber}
                type="button"
                className="text-white/80 hover:text-white p-1 hover:bg-white/20 rounded transition"
                title="Copy reference code"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>

            <div className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-md border border-white/25 rounded-xl px-3 py-1.5 text-xs text-white">
              <Calendar className="w-3.5 h-3.5 text-emerald-200" />
              <span>{order.createdAt}</span>
            </div>

            <div className="inline-flex items-center gap-1.5 bg-emerald-900/40 border border-emerald-400/30 rounded-xl px-3 py-1.5 text-xs text-emerald-100 font-medium">
              <Clock className="w-3.5 h-3.5 text-emerald-300" />
              <span>Est. Delivery: {order.estimatedDeliveryWindow}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Fulfillment Details Strip */}
      <div className="p-4 sm:p-6 bg-slate-50/70 border-t border-slate-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Toggle Fulfillment Mode */}
          <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-slate-200 shadow-2xs self-start">
            <button
              id="fulfillment-delivery-btn"
              onClick={() => onFulfillmentChange('delivery')}
              type="button"
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                order.fulfillmentType === 'delivery'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Truck className="w-3.5 h-3.5" />
              <span>Doorstep Delivery</span>
            </button>
            <button
              id="fulfillment-pickup-btn"
              onClick={() => onFulfillmentChange('pickup')}
              type="button"
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                order.fulfillmentType === 'pickup'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Store className="w-3.5 h-3.5" />
              <span>EA Drive-Up Pickup</span>
            </button>
          </div>

          {/* Address / Store details according to mode */}
          <div className="flex-1 md:text-right">
            {order.fulfillmentType === 'delivery' ? (
              <div className="flex items-start md:justify-end gap-2 text-xs text-slate-600">
                <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-800">Delivering to: </span>
                  {order.deliveryAddress.street}, {order.deliveryAddress.city} {order.deliveryAddress.postalCode}
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Note: "{order.deliveryAddress.instructions}"
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-start md:justify-end gap-2 text-xs text-slate-600">
                <Store className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-800">{order.pickupStore.name} </span>
                  ({order.pickupStore.pickupLane})
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {order.pickupStore.address} • {order.pickupStore.operatingHours}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
