/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { OrderHeader } from './components/OrderHeader';
import { TrackingTimeline } from './components/TrackingTimeline';
import { QuickAddItems } from './components/QuickAddItems';
import { ReceiptSummary } from './components/ReceiptSummary';
import { LoyaltyCard } from './components/LoyaltyCard';
import { OrderActions } from './components/OrderActions';
import { PrintReceiptModal } from './components/PrintReceiptModal';
import { HelpModal } from './components/HelpModal';
import { initialOrderData, quickAddRecommendations } from './data/initialOrder';
import { OrderDetails, GroceryItem, OrderStatus } from './types';
import { CheckCircle2, ShoppingBag, Heart, ShieldCheck, PhoneCall } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [order, setOrder] = useState<OrderDetails>(initialOrderData);
  const [addedItemIds, setAddedItemIds] = useState<string[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState<boolean>(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState<boolean>(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3500);
  };

  const handleAddItem = (item: GroceryItem) => {
    if (addedItemIds.includes(item.id)) return;

    const extraPoints = Math.round(item.price * 10);
    setOrder((prev) => ({
      ...prev,
      items: [item, ...prev.items],
      loyalty: {
        ...prev.loyalty,
        pointsEarned: prev.loyalty.pointsEarned + extraPoints,
        totalBalance: prev.loyalty.totalBalance + extraPoints,
      },
    }));
    setAddedItemIds((prev) => [...prev, item.id]);
    showToast(`Added "${item.name}" to your EA order basket! (+$${item.price.toFixed(2)})`);
  };

  const handleStatusChange = (newStatus: OrderStatus) => {
    setOrder((prev) => ({ ...prev, status: newStatus }));
    const statusLabels: Record<OrderStatus, string> = {
      received: 'Order Confirmed at Central Hub',
      picking: 'Shopper Grace is hand-selecting your groceries',
      quality_check: 'Cold-Chain & Insulated packing check underway',
      out_for_delivery: 'Out for Delivery in refrigerated van!',
      delivered: 'Delivered Fresh! Enjoy your groceries',
    };
    showToast(`Status updated: ${statusLabels[newStatus]}`);
  };

  const handleFulfillmentChange = (type: 'delivery' | 'pickup') => {
    setOrder((prev) => ({ ...prev, fulfillmentType: type }));
    showToast(
      type === 'delivery'
        ? 'Switched to Doorstep Delivery (Today, 5:15 PM – 5:45 PM)'
        : 'Switched to EA Drive-Up Express Pickup at Bay 3'
    );
  };

  const handleUpdateInstructions = (instructions: string) => {
    setOrder((prev) => ({
      ...prev,
      deliveryAddress: {
        ...prev.deliveryAddress,
        instructions,
      },
    }));
    showToast('Drop-off delivery notes saved successfully!');
  };

  const handleContinueShopping = () => {
    showToast('Redirecting to Supermarket EA Aisles & Fresh Deals...');
  };

  return (
    <div className="min-h-screen bg-slate-100/60 font-sans text-slate-800 flex flex-col selection:bg-emerald-100 selection:text-emerald-900">
      {/* Navigation Header */}
      <Navbar
        orderNumber={order.orderNumber}
        customerName={order.customerName}
        onPrint={() => setIsPrintModalOpen(true)}
        onOpenHelp={() => setIsHelpModalOpen(true)}
      />

      {/* Main Thank You Page Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Order Confirmation Greeting Banner */}
        <OrderHeader
          order={order}
          onFulfillmentChange={handleFulfillmentChange}
        />

        {/* Live Tracking & Shopper Status */}
        <TrackingTimeline
          order={order}
          onStatusChange={handleStatusChange}
        />

        {/* Quick Add Forgotten Groceries Window */}
        <QuickAddItems
          recommendations={quickAddRecommendations}
          onAddItem={handleAddItem}
          addedItemIds={addedItemIds}
        />

        {/* Itemized Digital Receipt Breakdown */}
        <ReceiptSummary
          order={order}
          onPrint={() => setIsPrintModalOpen(true)}
        />

        {/* EA Club Rewards & Points Card */}
        <LoyaltyCard loyalty={order.loyalty} />

        {/* Alerts, Drop-off notes, 5-Star Feedback, and Guarantee */}
        <OrderActions
          order={order}
          onUpdateInstructions={handleUpdateInstructions}
          onContinueShopping={handleContinueShopping}
        />
      </main>

      {/* Supermarket EA Footer */}
      <footer className="bg-white border-t border-slate-200/80 py-8 px-4 text-xs text-slate-500 mt-auto">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-emerald-700 text-white flex items-center justify-center">
              <ShoppingBag className="w-3.5 h-3.5" />
            </div>
            <span className="font-bold text-slate-800">Supermarket EA</span>
            <span>•</span>
            <span>Customer Care: 1-800-555-0199</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span>Freshness Guaranteed</span>
            <span>•</span>
            <span>Cold-Chain Monitored</span>
            <span>•</span>
            <span>100% Recyclable Packaging</span>
          </div>
        </div>
      </footer>

      {/* Toast Notification Banner */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            className="fixed bottom-5 right-5 z-50 max-w-sm bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-xl border border-slate-700 flex items-center gap-3 text-xs"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="font-medium">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Printable Thermal Receipt Modal */}
      <PrintReceiptModal
        order={order}
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
      />

      {/* Customer Care / Support Modal */}
      <HelpModal
        isOpen={isHelpModalOpen}
        onClose={() => setIsHelpModalOpen(false)}
        orderNumber={order.orderNumber}
      />
    </div>
  );
}
