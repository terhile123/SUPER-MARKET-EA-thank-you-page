import React from 'react';
import { X, Printer, ShieldCheck, Download, Terminal, CheckCircle2 } from 'lucide-react';
import { ForexOrderDetails, ForexAddon } from '../types';

interface ForexReceiptModalProps {
  order: ForexOrderDetails;
  activeAddons: ForexAddon[];
  onClose: () => void;
}

export const ForexReceiptModal: React.FC<ForexReceiptModalProps> = ({
  order,
  activeAddons,
  onClose,
}) => {
  const handlePrint = () => {
    window.print();
  };

  const addonsTotal = activeAddons.reduce((sum, a) => sum + a.price, 0);
  const totalSettled = order.financials.totalPaid + addonsTotal;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative w-full max-w-lg bg-[#0F1624] border border-[#23354E] rounded-3xl shadow-2xl overflow-hidden my-8 text-white">
        {/* Top Modal Controls */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#141E30] border-b border-[#23354E] print:hidden">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
              AlgoFX • Commercial License Invoice
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-lg text-xs font-mono font-bold transition shadow-sm"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Invoice</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-1 text-slate-400 hover:text-white rounded-lg transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Official Printable Invoice Body */}
        <div id="printable-receipt-content" className="p-6 sm:p-8 font-mono text-xs text-slate-200 bg-[#0A0F19]">
          {/* Header */}
          <div className="text-center pb-5 border-b border-dashed border-[#23354E]">
            <h2 className="text-xl font-black tracking-wider text-white">
              ALGOFX AUTOMATION LTD
            </h2>
            <p className="text-[10px] text-cyan-400 uppercase tracking-widest mt-0.5">
              Quantitative Algorithmic Software & Trade Automation
            </p>
            <p className="text-[10px] text-slate-400 mt-1">
              71-75 Shelton Street, Covent Garden, London, WC2H 9JQ, UK
            </p>
            <p className="text-[10px] text-slate-500">VAT Registration: GB 928 4910 24 • MQL5 Certified Provider</p>
          </div>

          {/* Metadata */}
          <div className="py-4 border-b border-dashed border-[#23354E] space-y-1 text-[11px]">
            <div className="flex justify-between">
              <span className="text-slate-400">INVOICE NUMBER:</span>
              <span className="font-bold text-cyan-400">{order.orderNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">ISSUANCE DATE:</span>
              <span>{order.createdAt}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">LICENSE HOLDER:</span>
              <span className="font-bold text-white">{order.customerName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">EMAIL ADDRESS:</span>
              <span>{order.customerEmail}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">LICENSE CHECKSUM:</span>
              <span className="text-slate-300 truncate">{order.licenseKey}</span>
            </div>
          </div>

          {/* Itemized Deliverables */}
          <div className="py-4 border-b border-dashed border-[#23354E] space-y-2.5">
            <div className="flex justify-between text-[10px] text-slate-500 uppercase tracking-wider font-bold">
              <span>Item Description</span>
              <span>Total</span>
            </div>

            <div className="text-[11px]">
              <div className="flex justify-between">
                <span className="font-bold text-white">{order.product.name}</span>
                <span className="font-bold">${order.product.price.toFixed(2)}</span>
              </div>
              <div className="text-[10px] text-slate-400">
                Lifetime Commercial License (MT4 + MT5 Platforms, 2 Live / 5 Demo Accounts)
              </div>
            </div>

            <div className="text-[11px]">
              <div className="flex justify-between">
                <span className="text-slate-300">Equinix LD4 London Dedicated VPS (1 Month)</span>
                <span className="text-emerald-400 font-bold">$0.00 (Promo)</span>
              </div>
              <div className="text-[10px] text-slate-400">
                Host IP: {order.vpsPackage?.ipAddress} • 1.2ms latency route
              </div>
            </div>

            {activeAddons.map((addon) => (
              <div key={addon.id} className="text-[11px] pt-1">
                <div className="flex justify-between">
                  <span className="text-cyan-400 font-medium">{addon.title}</span>
                  <span className="font-bold">${addon.price.toFixed(2)}</span>
                </div>
                <div className="text-[10px] text-slate-400">{addon.category} Add-on</div>
              </div>
            ))}
          </div>

          {/* Financial Breakdown */}
          <div className="py-4 border-b border-dashed border-[#23354E] space-y-1.5 text-[11px]">
            <div className="flex justify-between text-slate-300">
              <span>ORIGINAL CATALOG LIST:</span>
              <span>${(order.financials.subtotal + addonsTotal).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-emerald-400">
              <span>QUANT DISPATCH SAVINGS:</span>
              <span>-${order.financials.discountAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>VAT / EXPORT TAX (0%):</span>
              <span>$0.00</span>
            </div>

            <div className="pt-2 border-t border-[#23354E] flex justify-between font-bold text-sm text-white">
              <span>TOTAL SETTLED:</span>
              <span className="text-cyan-400">${totalSettled.toFixed(2)} USD</span>
            </div>
          </div>

          {/* Payment Details */}
          <div className="py-4 border-b border-dashed border-[#23354E] space-y-1 text-[10px] text-slate-400">
            <div className="flex justify-between">
              <span>SETTLEMENT METHOD:</span>
              <span className="text-slate-200">{order.payment.cardBrand} *{order.payment.last4}</span>
            </div>
            <div className="flex justify-between">
              <span>PAYMENT PROCESSOR REF:</span>
              <span className="text-slate-200">{order.payment.transactionId}</span>
            </div>
            <div className="flex justify-between">
              <span>STATUS:</span>
              <span className="text-emerald-400 font-bold">PAID & SETTLED IN FULL</span>
            </div>
          </div>

          {/* License Terms & Verification */}
          <div className="text-center pt-5 text-[10px] text-slate-500 space-y-1">
            <p className="font-semibold text-slate-300">
              Commercial License Terms: 30-Day Money-Back Risk Assurance Guaranteed.
            </p>
            <p>
              Automated trading involves capital risk. Ensure adherence to recommended lot sizes.
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-[#141E30] border-t border-[#23354E] flex items-center justify-between print:hidden">
          <span className="text-xs text-emerald-400 font-mono flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4" />
            <span>Cryptographically Verified Purchase</span>
          </span>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-[#1B283E] hover:bg-slate-700 text-white font-mono text-xs rounded-xl transition"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
};
