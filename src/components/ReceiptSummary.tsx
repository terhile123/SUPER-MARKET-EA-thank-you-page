import React, { useState } from 'react';
import { 
  Receipt, 
  CreditCard, 
  Tag, 
  FileText, 
  Printer, 
  CheckCircle2, 
  ShieldCheck, 
  ChevronDown, 
  ChevronUp,
  ShoppingBag,
  ExternalLink
} from 'lucide-react';
import { OrderDetails, GroceryItem } from '../types';

interface ReceiptSummaryProps {
  order: OrderDetails;
  onPrint: () => void;
}

export const ReceiptSummary: React.FC<ReceiptSummaryProps> = ({
  order,
  onPrint,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [emailResent, setEmailResent] = useState<boolean>(false);

  // Calculate totals
  const subtotal = order.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * order.taxRate;
  const total = subtotal + order.deliveryFee + order.bagFee + tax;

  const categories = ['All', 'Produce', 'Dairy & Eggs', 'Bakery & Pantry', 'Beverages & Snacks', 'Household'];

  const filteredItems = selectedCategory === 'All'
    ? order.items
    : order.items.filter((item) => item.category === selectedCategory);

  const handleResendEmail = () => {
    setEmailResent(true);
    setTimeout(() => setEmailResent(false), 3000);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden mb-6">
      {/* Receipt Header */}
      <div className="p-5 sm:p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Receipt className="w-5 h-5 text-emerald-700" />
            <h2 className="font-bold text-lg text-slate-900">Itemized Grocery Receipt</h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            {order.items.length} items purchased from Supermarket EA
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            id="print-itemized-receipt-btn"
            onClick={onPrint}
            type="button"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition shadow-2xs"
          >
            <Printer className="w-3.5 h-3.5 text-slate-500" />
            <span>Print Receipt</span>
          </button>

          <button
            id="resend-receipt-email-btn"
            onClick={handleResendEmail}
            type="button"
            disabled={emailResent}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl transition shadow-2xs"
          >
            {emailResent ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Emailed to Inbox!</span>
              </>
            ) : (
              <>
                <FileText className="w-3.5 h-3.5 text-emerald-700" />
                <span>Resend PDF Email</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Category Pills Filter */}
      <div className="px-5 sm:px-6 py-3 bg-slate-50/70 border-b border-slate-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        <span className="text-xs text-slate-500 font-medium mr-2 shrink-0">Filter:</span>
        {categories.map((cat) => {
          const count = cat === 'All' ? order.items.length : order.items.filter(i => i.category === cat).length;
          if (cat !== 'All' && count === 0) return null;

          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              type="button"
              className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-emerald-700 text-white shadow-2xs'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:border-slate-300'
              }`}
            >
              {cat} ({count})
            </button>
          );
        })}
      </div>

      {/* Items Table / List */}
      <div className="divide-y divide-slate-100">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="p-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/50 transition-colors"
          >
            <div className="flex items-start gap-3 flex-1 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-semibold text-sm text-slate-900 leading-tight">
                    {item.name}
                  </h3>
                  {item.isQuickAdd && (
                    <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-1.5 py-0.2 rounded border border-amber-200">
                      Added Just Now
                    </span>
                  )}
                  {item.originalPrice && (
                    <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                      Save ${( (item.originalPrice - item.price) * item.quantity ).toFixed(2)}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                  <span>Qty: <strong className="font-semibold text-slate-700">{item.quantity}</strong> ({item.unit})</span>
                  <span>•</span>
                  <span>${item.price.toFixed(2)} / unit</span>
                  {item.notes && (
                    <>
                      <span className="hidden md:inline">•</span>
                      <span className="text-slate-400 italic hidden md:inline truncate">{item.notes}</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Price Column */}
            <div className="text-right shrink-0 sm:pl-4 self-end sm:self-center">
              <span className="font-bold text-sm text-slate-900">
                ${(item.price * item.quantity).toFixed(2)}
              </span>
              {item.originalPrice && (
                <p className="text-[11px] text-slate-400 line-through">
                  ${(item.originalPrice * item.quantity).toFixed(2)}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Summary Breakdown Calculation */}
      <div className="p-5 sm:p-6 bg-slate-50/80 border-t border-slate-200/80">
        <div className="max-w-sm ml-auto space-y-2.5">
          <div className="flex justify-between text-xs text-slate-600">
            <span>Groceries Subtotal</span>
            <span className="font-medium text-slate-800">${subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-xs text-emerald-700 font-medium">
            <span className="flex items-center gap-1">
              <Tag className="w-3 h-3" />
              EA Member Club Discounts
            </span>
            <span>-${order.savings.toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-xs text-slate-600">
            <span className="flex items-center gap-1">
              Delivery Fee
              <span className="text-[10px] text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded font-semibold">Free Member Perk</span>
            </span>
            <span className="font-medium text-slate-800">
              {order.deliveryFee === 0 ? '$0.00' : `$${order.deliveryFee.toFixed(2)}`}
            </span>
          </div>

          <div className="flex justify-between text-xs text-slate-600">
            <span>Eco Reusable Totes / Bag Fee</span>
            <span className="font-medium text-slate-800">${order.bagFee.toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-xs text-slate-600">
            <span>Estimated Sales Tax (5%)</span>
            <span className="font-medium text-slate-800">${tax.toFixed(2)}</span>
          </div>

          <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline">
            <div>
              <span className="font-bold text-sm text-slate-900">Total Paid</span>
              <p className="text-[11px] text-slate-400">Includes all applicable fees & taxes</p>
            </div>
            <span className="font-extrabold text-xl text-emerald-800 font-mono">
              ${total.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Payment Method Badge */}
        <div className="mt-5 pt-4 border-t border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-slate-600" />
            <span>
              Paid with <strong className="text-slate-800">{order.payment.cardBrand}</strong> ending in <strong className="text-slate-800">{order.payment.last4}</strong>
            </span>
            <span className="text-slate-300">|</span>
            <span className="font-mono text-[11px] text-slate-400">{order.payment.transactionId}</span>
          </div>

          <div className="flex items-center gap-1.5 text-emerald-700 font-medium">
            <ShieldCheck className="w-4 h-4" />
            <span>256-bit Encrypted Transaction</span>
          </div>
        </div>
      </div>
    </div>
  );
};
