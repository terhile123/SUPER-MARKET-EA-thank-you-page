import React from 'react';
import { ShoppingBag, Printer, HelpCircle, PhoneCall, CheckCircle2 } from 'lucide-react';

interface NavbarProps {
  orderNumber: string;
  customerName: string;
  onPrint: () => void;
  onOpenHelp: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  orderNumber,
  customerName,
  onPrint,
  onOpenHelp,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Store Info */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white shadow-sm ring-2 ring-emerald-500/20">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-xl tracking-tight text-slate-900 font-sans">
                  SUPERMARKET <span className="text-emerald-700 font-black">EA</span>
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                  Fresh & Express
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                Central Market Hub • Aisles Packed with Freshness
              </p>
            </div>
          </div>

          {/* Quick Order Reference and Action Buttons */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="hidden md:flex items-center text-xs bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg border border-slate-200">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mr-1.5" />
              <span>Order #{orderNumber}</span>
              <span className="mx-2 text-slate-300">|</span>
              <span className="text-slate-500">{customerName}</span>
            </div>

            <button
              id="print-receipt-nav-btn"
              onClick={onPrint}
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700 hover:text-emerald-800 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-200 transition-colors"
              title="Print Order Receipt"
            >
              <Printer className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden sm:inline">Receipt</span>
            </button>

            <button
              id="help-support-nav-btn"
              onClick={onOpenHelp}
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>EA Care</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
