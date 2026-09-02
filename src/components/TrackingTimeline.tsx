import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ClipboardCheck, 
  ShoppingBag, 
  ShieldCheck, 
  Truck, 
  CheckCircle2, 
  ChevronRight, 
  MessageSquare, 
  Star, 
  Thermometer, 
  Sparkles,
  Send,
  Play
} from 'lucide-react';
import { OrderStatus, OrderDetails } from '../types';

interface TrackingTimelineProps {
  order: OrderDetails;
  onStatusChange: (status: OrderStatus) => void;
}

const statusSteps: { key: OrderStatus; title: string; subtitle: string; icon: React.ComponentType<{ className?: string }> }[] = [
  {
    key: 'received',
    title: 'Order Confirmed',
    subtitle: 'Assigned to EA Central Hub',
    icon: ClipboardCheck,
  },
  {
    key: 'picking',
    title: 'Hand-Picking Groceries',
    subtitle: 'Selecting fresh produce & bakery',
    icon: ShoppingBag,
  },
  {
    key: 'quality_check',
    title: 'Cold-Chain & Audit',
    subtitle: 'Insulated bags & temp control',
    icon: ShieldCheck,
  },
  {
    key: 'out_for_delivery',
    title: 'Out for Delivery',
    subtitle: 'Dispatched in chilled van',
    icon: Truck,
  },
  {
    key: 'delivered',
    title: 'Delivered Fresh',
    subtitle: 'Enjoy your groceries!',
    icon: CheckCircle2,
  },
];

export const TrackingTimeline: React.FC<TrackingTimelineProps> = ({
  order,
  onStatusChange,
}) => {
  const [shopperNote, setShopperNote] = useState('');
  const [noteSent, setNoteSent] = useState(false);
  const [showNoteInput, setShowNoteInput] = useState(false);

  const currentIdx = statusSteps.findIndex((s) => s.key === order.status);

  const handleAdvance = () => {
    const nextIdx = (currentIdx + 1) % statusSteps.length;
    onStatusChange(statusSteps[nextIdx].key);
  };

  const handleSendShopperNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!shopperNote.trim()) return;
    setNoteSent(true);
    setTimeout(() => {
      setShowNoteInput(false);
      setNoteSent(false);
      setShopperNote('');
    }, 2500);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 sm:p-6 mb-6">
      {/* Header with Title & Simulation Control */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-bold text-lg text-slate-900">Live Order Status</h2>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mr-1.5 animate-pulse"></span>
              Live Supermarket Tracking
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time updates as our EA associates prepare and dispatch your items
          </p>
        </div>

        <button
          id="simulate-status-step-btn"
          onClick={handleAdvance}
          type="button"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl transition shadow-2xs self-start"
          title="Click to preview next stage in fulfillment"
        >
          <Play className="w-3.5 h-3.5 fill-emerald-700" />
          <span>Simulate Next Stage</span>
        </button>
      </div>

      {/* Interactive Step Timeline */}
      <div className="py-6">
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-2">
          {statusSteps.map((step, idx) => {
            const isCompleted = idx < currentIdx;
            const isCurrent = idx === currentIdx;
            const StepIcon = step.icon;

            return (
              <div
                key={step.key}
                onClick={() => onStatusChange(step.key)}
                className={`cursor-pointer group flex flex-col p-3 rounded-xl border transition-all ${
                  isCurrent
                    ? 'bg-emerald-50/80 border-emerald-500 ring-2 ring-emerald-500/20 shadow-xs'
                    : isCompleted
                    ? 'bg-slate-50/70 border-emerald-200 text-slate-700'
                    : 'bg-white border-slate-200/80 text-slate-400 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                      isCurrent
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : isCompleted
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200'
                    }`}
                  >
                    <StepIcon className="w-4 h-4" />
                  </div>
                  {isCompleted && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  )}
                  {isCurrent && (
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                      Active
                    </span>
                  )}
                </div>

                <h3 className={`font-semibold text-xs leading-snug ${isCurrent ? 'text-emerald-950 font-bold' : isCompleted ? 'text-slate-800' : 'text-slate-500'}`}>
                  {step.title}
                </h3>
                <p className="text-[11px] text-slate-400 mt-1 leading-tight hidden sm:block">
                  {step.subtitle}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Shopper & Temperature Quality Card */}
      <div className="bg-gradient-to-br from-slate-50 to-emerald-50/30 rounded-xl p-4 border border-emerald-100/70 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={order.shopper.avatarUrl}
              alt={order.shopper.name}
              className="w-12 h-12 rounded-full object-cover ring-2 ring-emerald-500/30 shadow-xs"
              referrerPolicy="no-referrer"
            />
            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"></span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-slate-900">{order.shopper.name}</span>
              <span className="inline-flex items-center text-[11px] font-semibold text-amber-800 bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200">
                <Star className="w-3 h-3 text-amber-500 fill-amber-500 mr-0.5" />
                {order.shopper.rating}
              </span>
            </div>
            <p className="text-xs text-slate-500">
              {order.shopper.role} • {order.shopper.completedOrders} orders delivered
            </p>
            <p className="text-xs text-emerald-800 font-medium mt-1 flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-emerald-600 shrink-0" />
              <span>{order.shopper.currentTask}</span>
            </p>
          </div>
        </div>

        {/* Cold-Chain Quality Badge & Note trigger */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-700 shadow-2xs">
            <Thermometer className="w-3.5 h-3.5 text-blue-500" />
            <span>Cold-Chain Monitored (&lt; 4°C)</span>
          </div>

          <button
            id="open-shopper-note-btn"
            onClick={() => setShowNoteInput(!showNoteInput)}
            type="button"
            className="inline-flex items-center gap-1.5 bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-emerald-300 text-xs font-medium transition shadow-2xs"
          >
            <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
            <span>Note for Shopper</span>
          </button>
        </div>
      </div>

      {/* Shopper Note Input Drawer */}
      {showNoteInput && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-3 pt-3 border-t border-slate-100"
        >
          {noteSent ? (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Note dispatched to {order.shopper.name.split(' ')[0]}'s supermarket picking scanner!</span>
            </div>
          ) : (
            <form onSubmit={handleSendShopperNote} className="flex gap-2">
              <input
                id="shopper-instruction-input"
                type="text"
                placeholder="e.g. Please pick yellow bananas with green tips, or check eggs..."
                value={shopperNote}
                onChange={(e) => setShopperNote(e.target.value)}
                className="flex-1 text-xs px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
              />
              <button
                id="send-shopper-note-submit"
                type="submit"
                className="inline-flex items-center gap-1 px-3 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send</span>
              </button>
            </form>
          )}
        </motion.div>
      )}
    </div>
  );
};
