import React from 'react';
import { X, Printer, ShoppingBag, CheckCircle, ShieldCheck } from 'lucide-react';
import { OrderDetails } from '../types';

interface PrintReceiptModalProps {
  order: OrderDetails;
  isOpen: boolean;
  onClose: () => void;
}

export const PrintReceiptModal: React.FC<PrintReceiptModalProps> = ({
  order,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const subtotal = order.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * order.taxRate;
  const total = subtotal + order.deliveryFee + order.bagFee + tax;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        {/* Top Modal Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-slate-100 border-b border-slate-200 print:hidden">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Supermarket EA • Digital Register Receipt
          </span>
          <div className="flex items-center gap-2">
            <button
              id="modal-print-execute-btn"
              onClick={handlePrint}
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>
            <button
              id="close-receipt-modal-btn"
              onClick={onClose}
              type="button"
              className="p-1 text-slate-400 hover:text-slate-700 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Authentic Thermal Receipt Body */}
        <div id="printable-receipt-content" className="p-6 font-mono text-xs text-slate-800 bg-white">
          {/* Store Logo & Header */}
          <div className="text-center pb-4 border-b border-dashed border-slate-300">
            <div className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-700 text-white mb-1">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <h2 className="font-black text-sm tracking-tight text-slate-900 font-sans">
              SUPERMARKET EA
            </h2>
            <p className="text-[11px] text-slate-500 font-sans">Fresh Everyday • Local & Express</p>
            <p className="text-[10px] text-slate-400 mt-1">1400 Grand Blvd, Springfield, OR</p>
            <p className="text-[10px] text-slate-400">Store Hub #042 • Register 12 (E-Commerce)</p>
          </div>

          {/* Transaction Metadata */}
          <div className="py-3 border-b border-dashed border-slate-300 space-y-1 text-[11px]">
            <div className="flex justify-between">
              <span>ORDER:</span>
              <span className="font-bold">{order.orderNumber}</span>
            </div>
            <div className="flex justify-between">
              <span>DATE/TIME:</span>
              <span>{order.createdAt}</span>
            </div>
            <div className="flex justify-between">
              <span>CUSTOMER:</span>
              <span>{order.customerName}</span>
            </div>
            <div className="flex justify-between">
              <span>FULFILLMENT:</span>
              <span className="uppercase">{order.fulfillmentType}</span>
            </div>
          </div>

          {/* Itemized List */}
          <div className="py-3 border-b border-dashed border-slate-300 space-y-2">
            <div className="flex justify-between font-bold text-[10px] text-slate-400 uppercase">
              <span>Item Description</span>
              <span>Total</span>
            </div>

            {order.items.map((item) => (
              <div key={item.id} className="text-[11px]">
                <div className="flex justify-between">
                  <span className="truncate pr-2 font-medium">{item.name}</span>
                  <span className="shrink-0">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
                <div className="text-[10px] text-slate-400">
                  {item.quantity} @ ${item.price.toFixed(2)} / {item.unit}
                </div>
              </div>
            ))}
          </div>

          {/* Financials */}
          <div className="py-3 border-b border-dashed border-slate-300 space-y-1.5 text-[11px]">
            <div className="flex justify-between">
              <span>SUBTOTAL:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-emerald-700">
              <span>EA MEMBER SAVINGS:</span>
              <span>-${order.savings.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>DELIVERY CHARGE:</span>
              <span>{order.deliveryFee === 0 ? '$0.00 (FREE)' : `$${order.deliveryFee.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between">
              <span>ECO TOTES FEE:</span>
              <span>${order.bagFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>SALES TAX (5%):</span>
              <span>${tax.toFixed(2)}</span>
            </div>

            <div className="pt-2 border-t border-slate-300 flex justify-between font-black text-sm">
              <span>TOTAL PAID:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          {/* Payment & Loyalty Footnote */}
          <div className="py-3 space-y-1 text-[10px] text-slate-500 border-b border-dashed border-slate-300">
            <div className="flex justify-between">
              <span>PAYMENT:</span>
              <span>{order.payment.cardBrand} *{order.payment.last4}</span>
            </div>
            <div className="flex justify-between">
              <span>AUTH CODE:</span>
              <span>{order.payment.transactionId}</span>
            </div>
            <div className="flex justify-between text-emerald-800 font-semibold">
              <span>EA CLUB POINTS EARNED:</span>
              <span>+{order.loyalty.pointsEarned} PTS</span>
            </div>
          </div>

          {/* Barcode Mock & Thank You Note */}
          <div className="text-center pt-4">
            <div className="font-mono text-[9px] tracking-widest text-slate-400 mb-1">
              ||| | |||| || ||||| |||| | ||| |||| || ||||
            </div>
            <div className="font-mono text-[9px] text-slate-400">
              *{order.orderNumber}-EA-VERIFIED*
            </div>
            <p className="font-sans text-xs font-semibold text-slate-800 mt-2">
              Thank you for shopping at Supermarket EA!
            </p>
            <p className="font-sans text-[10px] text-slate-400">
              Freshness guaranteed. Keep this receipt for 30 days.
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-between items-center print:hidden">
          <span className="text-xs text-slate-500 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            Verified EA Purchase
          </span>
          <button
            id="modal-done-btn"
            onClick={onClose}
            type="button"
            className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl text-xs font-semibold transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
