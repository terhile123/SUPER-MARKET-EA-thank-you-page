import React, { useState } from 'react';
import {
  Key,
  Copy,
  Check,
  Download,
  Plus,
  Trash2,
  FileCode,
  FileText,
  Sliders,
  ShieldCheck,
  CheckCircle,
  ExternalLink,
  Cpu
} from 'lucide-react';
import { ForexOrderDetails, BoundAccount, ForexEAPreset } from '../types';

interface ForexLicenseVaultProps {
  order: ForexOrderDetails;
  onBindAccount: (account: BoundAccount) => void;
  onUnbindAccount: (accountNumber: string) => void;
  onTriggerToast: (msg: string) => void;
}

export const ForexLicenseVault: React.FC<ForexLicenseVaultProps> = ({
  order,
  onBindAccount,
  onUnbindAccount,
  onTriggerToast,
}) => {
  const [copiedKey, setCopiedKey] = useState(false);
  const [newAccountNumber, setNewAccountNumber] = useState('');
  const [newBroker, setNewBroker] = useState('IC Markets (SC) - Live 02');
  const [newServerType, setNewServerType] = useState<'Live' | 'Demo'>('Live');
  const [downloadingZip, setDownloadingZip] = useState(false);
  const [downloadedItem, setDownloadedItem] = useState<string | null>(null);

  const handleCopyLicense = () => {
    navigator.clipboard.writeText(order.licenseKey);
    setCopiedKey(true);
    onTriggerToast('Cryptographic License Key copied to clipboard!');
    setTimeout(() => setCopiedKey(false), 2500);
  };

  const handleBindSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAccountNumber.trim()) return;

    if (order.boundAccounts.length >= order.maxLiveAccounts && newServerType === 'Live') {
      onTriggerToast(`Maximum live accounts reached (${order.maxLiveAccounts}). Upgrade or unbind an existing account.`);
      return;
    }

    const bound: BoundAccount = {
      accountNumber: newAccountNumber.trim(),
      broker: newBroker,
      serverType: newServerType,
      boundAt: 'Just now',
      status: 'Active',
    };

    onBindAccount(bound);
    setNewAccountNumber('');
    onTriggerToast(`MT4/MT5 Account #${bound.accountNumber} successfully bound to license!`);
  };

  const handleSimulateDownload = (filename: string) => {
    setDownloadedItem(filename);
    onTriggerToast(`Downloading ${filename}...`);
    // Create a mock text file download to demonstrate genuine browser file downloading
    const element = document.createElement('a');
    const file = new Blob([`// AlgoFX Forex EA Compiled Executable / Configuration File\n// File: ${filename}\n// Order: ${order.orderNumber}\n// License: ${order.licenseKey}\n// User: ${order.customerName}\n// Compiled: 2026-09-02\n`], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    setTimeout(() => setDownloadedItem(null), 3000);
  };

  const handleDownloadAllZip = () => {
    setDownloadingZip(true);
    onTriggerToast('Packaging all .ex4, .ex5, and .set files into ZIP...');
    setTimeout(() => {
      const element = document.createElement('a');
      const file = new Blob([`// Complete AlgoFX Trader Package Bundle\n// Contains .ex4, .ex5, 3x .set presets, and PDF manual\n`], { type: 'application/zip' });
      element.href = URL.createObjectURL(file);
      element.download = `AlgoFX_${order.product.code}_Package_${order.orderNumber}.zip`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      setDownloadingZip(false);
      onTriggerToast('Downloaded AlgoFX Complete Trader Package ZIP successfully!');
    }, 1200);
  };

  return (
    <div id="license-downloads-vault" className="space-y-8 scroll-mt-24">
      {/* 1. License & Account Binding Management */}
      <div className="bg-[#101724] border border-[#1E2D44] rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#1E2D44]">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-1">
              <Key className="w-4 h-4" />
              <span>License Key & Broker Binding</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white font-sans">
              Authorized Trading Accounts
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Your license authenticates trading signals on up to {order.maxLiveAccounts} Live MT4/MT5 accounts simultaneously.
            </p>
          </div>

          <div className="bg-[#152030] px-4 py-2.5 rounded-xl border border-[#253650] flex items-center gap-3 self-start sm:self-center font-mono text-xs">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase">Live Allocation</span>
              <span className="text-white font-bold">
                {order.boundAccounts.filter(a => a.serverType === 'Live').length} / {order.maxLiveAccounts} Active
              </span>
            </div>
            <div className="w-px h-6 bg-[#253650]"></div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase">Demo Allocation</span>
              <span className="text-emerald-400 font-bold">5 Slots Free</span>
            </div>
          </div>
        </div>

        {/* Bound Accounts List */}
        <div className="mt-6 space-y-3">
          <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
            Currently Bound MetaTrader Accounts:
          </span>

          {order.boundAccounts.map((acc) => (
            <div
              key={acc.accountNumber}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-[#141F30] border border-[#23354E] font-mono text-xs"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-cyan-950/80 border border-cyan-800/60 text-cyan-400 flex items-center justify-center font-bold">
                  MT
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-white">
                      Account #{acc.accountNumber}
                    </span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded font-semibold ${
                        acc.serverType === 'Live'
                          ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800/60'
                          : 'bg-blue-950/80 text-blue-400 border border-blue-800/60'
                      }`}
                    >
                      {acc.serverType} Server
                    </span>
                    <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" /> {acc.status}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400">{acc.broker} • Bound {acc.boundAt}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onUnbindAccount(acc.accountNumber)}
                className="self-end sm:self-center px-3 py-1.5 text-[11px] text-rose-400 hover:text-white hover:bg-rose-950/60 border border-rose-900/40 rounded-lg transition flex items-center gap-1"
              >
                <Trash2 className="w-3 h-3" />
                <span>Unbind Slot</span>
              </button>
            </div>
          ))}
        </div>

        {/* Add Account Binding Form */}
        {order.boundAccounts.length < order.maxLiveAccounts && (
          <form onSubmit={handleBindSubmit} className="mt-6 pt-6 border-t border-[#1E2D44] space-y-3">
            <span className="text-[11px] font-mono text-slate-300 uppercase tracking-wider block font-semibold">
              + Bind Another MT4 / MT5 Account Number:
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <input
                  type="text"
                  value={newAccountNumber}
                  onChange={(e) => setNewAccountNumber(e.target.value)}
                  placeholder="Enter MT4/MT5 Login (e.g. 8492020)"
                  className="w-full text-xs font-mono px-3.5 py-2.5 rounded-xl bg-[#0B111D] border border-[#23354E] text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <select
                  value={newBroker}
                  onChange={(e) => setNewBroker(e.target.value)}
                  className="w-full text-xs font-mono px-3.5 py-2.5 rounded-xl bg-[#0B111D] border border-[#23354E] text-white focus:outline-none focus:border-cyan-400"
                >
                  <option value="IC Markets (SC) - Live 02">IC Markets (Raw Spread)</option>
                  <option value="Pepperstone - Edge Live">Pepperstone (Razor ECN)</option>
                  <option value="FTMO Server - Challenge Phase">FTMO Evaluation Server</option>
                  <option value="FundedNext - Main MT5">FundedNext Server</option>
                  <option value="Vantage FX - Raw Live">Vantage FX Raw ECN</option>
                  <option value="Custom ECN Broker">Other Verified Broker</option>
                </select>
              </div>

              <div className="flex gap-2">
                <select
                  value={newServerType}
                  onChange={(e) => setNewServerType(e.target.value as 'Live' | 'Demo')}
                  className="w-28 text-xs font-mono px-2.5 py-2.5 rounded-xl bg-[#0B111D] border border-[#23354E] text-white focus:outline-none focus:border-cyan-400"
                >
                  <option value="Live">Live Real</option>
                  <option value="Demo">Demo</option>
                </select>

                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl text-xs font-mono tracking-wider transition shadow-md flex items-center justify-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Bind Account</span>
                </button>
              </div>
            </div>
          </form>
        )}
      </div>

      {/* 2. Direct EA Executables & Preset Files Downloads */}
      <div className="bg-[#101724] border border-[#1E2D44] rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#1E2D44]">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-1">
              <Download className="w-4 h-4" />
              <span>Direct Executables & Set Files</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white font-sans">
              Download Robot Files & Presets
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Ready-to-use compiled files. Drag and drop into your MetaTrader Experts directory.
            </p>
          </div>

          <button
            type="button"
            onClick={handleDownloadAllZip}
            disabled={downloadingZip}
            className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold rounded-xl text-xs font-mono tracking-wider transition shadow-lg shadow-emerald-500/20 flex items-center gap-2 shrink-0 self-start sm:self-center"
          >
            <Download className="w-4 h-4" />
            <span>{downloadingZip ? 'Packaging Bundle...' : 'Download Complete Package (.ZIP)'}</span>
          </button>
        </div>

        {/* Executables Cards */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* MT4 File */}
          <div className="p-4 rounded-2xl bg-[#141E2F] border border-[#23354E] flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-950/80 border border-blue-800/60 text-blue-400 flex items-center justify-center shrink-0">
                <FileCode className="w-5 h-5" />
              </div>
              <div>
                <span className="font-mono font-bold text-sm text-white block">
                  Apex_Gold_Scalper_v4.2.ex4
                </span>
                <span className="text-[11px] text-slate-400 font-mono">
                  MetaTrader 4 Binary • 1.4 MB
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleSimulateDownload('Apex_Gold_Scalper_v4.2.ex4')}
              className="px-3 py-1.5 bg-[#1B293E] hover:bg-cyan-500 hover:text-slate-950 text-cyan-400 rounded-lg text-xs font-mono font-semibold transition flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download</span>
            </button>
          </div>

          {/* MT5 File */}
          <div className="p-4 rounded-2xl bg-[#141E2F] border border-[#23354E] flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-800/60 text-cyan-400 flex items-center justify-center shrink-0">
                <FileCode className="w-5 h-5" />
              </div>
              <div>
                <span className="font-mono font-bold text-sm text-white block">
                  Apex_Gold_Scalper_v4.2.ex5
                </span>
                <span className="text-[11px] text-slate-400 font-mono">
                  MetaTrader 5 Binary • 1.8 MB
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleSimulateDownload('Apex_Gold_Scalper_v4.2.ex5')}
              className="px-3 py-1.5 bg-[#1B293E] hover:bg-cyan-500 hover:text-slate-950 text-cyan-400 rounded-lg text-xs font-mono font-semibold transition flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download</span>
            </button>
          </div>
        </div>

        {/* Pre-Configured Set Files (.set) */}
        <div className="mt-6 pt-6 border-t border-[#1E2D44]">
          <span className="text-[11px] font-mono text-slate-300 uppercase tracking-wider block font-semibold mb-3">
            Pre-Calibrated Risk Presets (.set files):
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {order.presets.map((preset) => (
              <div
                key={preset.id}
                className="p-3.5 rounded-xl bg-[#0B111D] border border-[#1F2E45] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-1 text-[10px] font-mono text-slate-400">
                    <span className="text-cyan-400 font-semibold">{preset.targetRiskPerTrade}</span>
                    <span>{preset.recommendedDeposit}</span>
                  </div>
                  <h4 className="font-mono font-bold text-xs text-white mt-1.5 truncate">
                    {preset.filename}
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-1 leading-relaxed line-clamp-2">
                    {preset.description}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleSimulateDownload(preset.filename)}
                  className="mt-3 w-full py-1.5 bg-[#162234] hover:bg-[#1E304A] text-slate-300 hover:text-white border border-[#273B57] rounded-lg text-[11px] font-mono transition flex items-center justify-center gap-1.5"
                >
                  <Sliders className="w-3 h-3 text-cyan-400" />
                  <span>Download .set</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Documentation & Manual PDF */}
        <div className="mt-6 pt-4 border-t border-[#1E2D44] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-emerald-400" />
            <span>Complete Setup Guide: <strong>Apex_EA_Installation_Manual_2026.pdf</strong> (18 pages)</span>
          </div>

          <button
            type="button"
            onClick={() => handleSimulateDownload('Apex_EA_Installation_Manual_2026.pdf')}
            className="text-cyan-400 hover:underline flex items-center gap-1"
          >
            <span>Download PDF Guide</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
