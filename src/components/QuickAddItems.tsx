import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Check, Clock, Sparkles, Tag, ShoppingCart } from 'lucide-react';
import { GroceryItem } from '../types';

interface QuickAddItemsProps {
  recommendations: GroceryItem[];
  onAddItem: (item: GroceryItem) => void;
  addedItemIds: string[];
}

export const QuickAddItems: React.FC<QuickAddItemsProps> = ({
  recommendations,
  onAddItem,
  addedItemIds,
}) => {
  // Countdown timer for adding items without extra delivery fee
  const [timeLeft, setTimeLeft] = useState(525); // 8 minutes 45 seconds in seconds

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => Math.max(prev - 1, 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  return (
    <div className="bg-gradient-to-br from-amber-50/70 via-white to-emerald-50/50 rounded-2xl border border-amber-200/80 shadow-xs p-5 sm:p-6 mb-6">
      {/* Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-amber-100">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-300 text-amber-800 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5 text-amber-700" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-base sm:text-lg text-slate-900">
                Forgot an essential grocery item?
              </h2>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-amber-900 bg-amber-100/90 px-2 py-0.5 rounded-full border border-amber-300/60">
                Zero Extra Fee
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-0.5">
              Add items before packaging is sealed. They will be placed directly in your EA shopping tote.
            </p>
          </div>
        </div>

        {/* Timer Pill */}
        <div className="flex items-center gap-2 bg-white px-3.5 py-1.5 rounded-xl border border-amber-300 shadow-2xs self-start sm:self-center">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
          <span className="text-xs text-slate-500 font-medium">Window Closes In:</span>
          <span className="font-mono font-bold text-sm text-amber-900">{formattedTime}</span>
        </div>
      </div>

      {/* Grid of Items */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {recommendations.map((item) => {
          const isAdded = addedItemIds.includes(item.id);

          return (
            <div
              key={item.id}
              className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                isAdded
                  ? 'bg-emerald-50/70 border-emerald-300 ring-1 ring-emerald-400/30'
                  : 'bg-white border-slate-200/90 hover:border-emerald-300 hover:shadow-xs'
              }`}
            >
              <div className="flex-1 pr-2 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                    {item.category}
                  </span>
                  {item.originalPrice && (
                    <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-emerald-700 bg-emerald-100/80 px-1.5 py-0.5 rounded">
                      <Tag className="w-2.5 h-2.5" />
                      Save ${(item.originalPrice - item.price).toFixed(2)}
                    </span>
                  )}
                </div>
                <h4 className="font-medium text-xs text-slate-900 truncate mt-1" title={item.name}>
                  {item.name}
                </h4>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="font-bold text-sm text-slate-900">${item.price.toFixed(2)}</span>
                  {item.originalPrice && (
                    <span className="text-xs text-slate-400 line-through">
                      ${item.originalPrice.toFixed(2)}
                    </span>
                  )}
                  <span className="text-[11px] text-slate-500">/ {item.unit}</span>
                </div>
              </div>

              <button
                id={`add-forgotten-item-${item.id}`}
                onClick={() => onAddItem(item)}
                type="button"
                disabled={isAdded}
                className={`shrink-0 flex items-center justify-center h-8 px-3 rounded-lg text-xs font-semibold transition-all ${
                  isAdded
                    ? 'bg-emerald-600 text-white cursor-default'
                    : 'bg-emerald-50 hover:bg-emerald-600 text-emerald-800 hover:text-white border border-emerald-200 hover:border-emerald-600 shadow-2xs'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-3.5 h-3.5 mr-1" />
                    <span>Added</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-3.5 h-3.5 mr-1" />
                    <span>Add</span>
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
