import React from 'react';
import { CheckCircle2, ShieldCheck, Copy, Check, Download, Zap, Key, Server, Mail } from 'lucide-react';
import { ForexOrderDetails } from '../types';

interface ForexThankYouHeaderProps {
  order: ForexOrderDetails;
  onCopyLicense: () => void;
  copiedLicense: boolean;
  onScrollToDownloads: () => void;
}

export const ForexThankYouHeader: React.FC<ForexThankYouHeaderProps> = ({
  order,
  onCopyLicense,
  copiedLicense,
  onScrollToDownloads,
}) => {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#101B2E] via-[#0E1523] to-[#0A0E17] border border-[#23354E] p-6 sm:p-10 shadow-2xl mb-8">
      {/* Background glow effects */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10">
        {/* Top Status Badge & Order Number */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#1E2D44]">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-600 flex items-center justify-center text-slate-950 font-bold shadow-lg shadow-emerald-500/20 ring-2 ring-emerald-400/40 shrink-0">
              <CheckCircle2 className="w-7 h-7 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 font-bold">
                  Order Confirmed & License Issued
                </span>
                <span className="text-xs font-mono text-slate-400">
                  {order.createdAt}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1 font-sans">
                Thank You for Your Order!
              </h1>
            </div>
          </div>

          {/* Order Ref & Dispatch Status */}
          <div className="text-left sm:text-right font-mono">
            <span className="text-[10px] uppercase text-slate-400 tracking-wider block">
              Order Reference ID
            </span>
            <span className="text-lg font-bold text-cyan-400">{order.orderNumber}</span>
            <span className="text-[11px] text-emerald-400 block font-semibold">
              Instant Cloud Activation: Active
            </span>
          </div>
        </div>

        {/* Product & License Summary Banner */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          <div className="lg:col-span-2 space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-400 border border-cyan-800/60 font-semibold">
                {order.product.code}
              </span>
              <span className="text-xs font-mono text-slate-400">
                Platforms: MT4 & MT5
              </span>
              <span className="text-xs font-mono text-slate-400">•</span>
              <span className="text-xs font-mono text-emerald-400 font-semibold">
                {order.licenseType}
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-white font-sans">
              {order.product.name}
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
              Your algorithmic trading bot files and pre-calibrated risk presets have been compiled for your license. You can now download the `.ex4` / `.ex5` packages and bind your live MT4/MT5 account numbers below.
            </p>

            {/* Check Email For Bot Access Callout */}
            <div className="mt-3 p-3 rounded-xl bg-cyan-950/70 border border-cyan-500/40 flex items-start gap-2.5 max-w-xl">
              <Mail className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5 animate-pulse" />
              <div className="text-xs font-mono">
                <span className="font-bold text-white block">
                  Check Email for Bot Access:
                </span>
                <span className="text-slate-300">
                  Bot files, VPS access credentials, and master license keys have been dispatched to{' '}
                  <strong className="text-cyan-300">{order.customerEmail}</strong>. (Check Inbox / Spam).
                </span>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-4 text-xs font-mono text-slate-300">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>2 Live Accounts + 5 Demo Accounts Allowed</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Server className="w-4 h-4 text-emerald-400" />
                <span>1-Month Equinix LD4 VPS Pre-Provisioned</span>
              </div>
            </div>
          </div>

          {/* Quick License Key Card */}
          <div className="bg-[#131D2E] p-5 rounded-2xl border border-[#253752] shadow-inner space-y-3 font-mono">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5 text-cyan-400 font-semibold">
                <Key className="w-3.5 h-3.5" />
                <span>Cryptographic License Key</span>
              </span>
              <span className="text-[10px] uppercase text-emerald-400 font-bold bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-800/50">
                ACTIVE
              </span>
            </div>

            <div className="bg-[#0B111D] p-3 rounded-xl border border-[#1E2E45] flex items-center justify-between gap-2">
              <span className="text-xs sm:text-sm font-bold text-white tracking-wider truncate">
                {order.licenseKey}
              </span>
              <button
                type="button"
                onClick={onCopyLicense}
                title="Copy License Key"
                className="p-1.5 hover:bg-slate-800 text-slate-300 hover:text-cyan-400 rounded-lg transition shrink-0"
              >
                {copiedLicense ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            <button
              type="button"
              onClick={onScrollToDownloads}
              className="w-full py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold rounded-xl text-xs font-mono tracking-wider transition shadow-md flex items-center justify-center gap-2"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Files & Presets</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
