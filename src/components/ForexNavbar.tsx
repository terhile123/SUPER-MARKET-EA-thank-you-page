import React from 'react';
import { Terminal, ShieldCheck, HelpCircle, FileText, Globe, CheckCircle2, TrendingUp } from 'lucide-react';

interface ForexNavbarProps {
  currentView: 'landing' | 'thankyou';
  onSelectView: (view: 'landing' | 'thankyou') => void;
  orderNumber: string;
  onOpenReceipt: () => void;
  onOpenHelp: () => void;
}

export const ForexNavbar: React.FC<ForexNavbarProps> = ({
  currentView,
  onSelectView,
  orderNumber,
  onOpenReceipt,
  onOpenHelp,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#0F141C]/95 backdrop-blur-md border-b border-[#1E293B] text-white">
      {/* Top Session & Market Telemetry Bar */}
      <div className="bg-[#0A0E17] border-b border-[#1E293B]/60 px-4 sm:px-8 py-1.5 text-[11px] flex flex-wrap items-center justify-between gap-2 text-slate-400">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-mono text-emerald-400 font-semibold tracking-wider">FOREX MARKET OPEN</span>
          </div>
          <span className="text-slate-600">•</span>
          <span className="font-mono text-slate-300">London / New York Overlap Session</span>
          <span className="hidden md:inline text-slate-600">•</span>
          <span className="hidden md:inline font-mono text-slate-400">Server Time: 16:18:04 GMT</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-slate-300 font-mono text-[10px]">
            <span className="text-slate-500">PING:</span>
            <span className="text-emerald-400 font-bold">1.2ms (Equinix LD4)</span>
          </div>
          <div className="hidden sm:flex items-center gap-1 text-slate-400 text-[10px]">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span>MQL5 & Prop-Firm Verified</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
        {/* Brand & Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => onSelectView('landing')}>
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/20 border border-cyan-400/30">
            <Terminal className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-base tracking-wider text-white">
                ALGO<span className="text-cyan-400">FX</span>
              </span>
              <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-cyan-950/80 text-cyan-400 border border-cyan-800/60 font-semibold">
                EA Automation
              </span>
            </div>
            <p className="text-[10px] text-slate-400 tracking-tight">
              Institutional Algorithmic Trading Systems (MT4 / MT5)
            </p>
          </div>
        </div>

        {/* View Switcher (Landing vs Thank You / License Hub) */}
        <nav className="flex items-center bg-[#161F30] p-1 rounded-xl border border-[#25334D]">
          <button
            id="nav-landing-view-btn"
            type="button"
            onClick={() => onSelectView('landing')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              currentView === 'landing'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/25'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Forex EAs Showcase</span>
          </button>

          <button
            id="nav-thankyou-view-btn"
            type="button"
            onClick={() => onSelectView('thankyou')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              currentView === 'thankyou'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/25'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Active License Hub ({orderNumber})</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse ml-0.5"></span>
          </button>
        </nav>

        {/* Quick Utility Actions */}
        <div className="flex items-center gap-2.5">
          <button
            id="nav-open-invoice-btn"
            type="button"
            onClick={onOpenReceipt}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#161F30] hover:bg-[#1E2B42] text-slate-200 border border-[#2A3B58] rounded-lg text-xs font-mono transition"
          >
            <FileText className="w-3.5 h-3.5 text-cyan-400" />
            <span>License Invoice</span>
          </button>

          <button
            id="nav-open-support-btn"
            type="button"
            onClick={onOpenHelp}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-lg text-xs font-medium shadow-sm transition"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Quant Support</span>
          </button>
        </div>
      </div>
    </header>
  );
};
