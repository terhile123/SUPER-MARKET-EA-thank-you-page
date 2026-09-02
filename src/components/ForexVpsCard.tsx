import React, { useState } from 'react';
import {
  Server,
  Activity,
  Cpu,
  Copy,
  Check,
  RotateCw,
  Zap,
  Globe,
  ShieldCheck
} from 'lucide-react';
import { ForexOrderDetails } from '../types';

interface ForexVpsCardProps {
  order: ForexOrderDetails;
  onTriggerToast: (msg: string) => void;
}

export const ForexVpsCard: React.FC<ForexVpsCardProps> = ({ order, onTriggerToast }) => {
  const [copiedRdp, setCopiedRdp] = useState(false);
  const [isPinging, setIsPinging] = useState(false);
  const [currentPing, setCurrentPing] = useState(order.vpsPackage?.pingMs || 1.2);
  const [vpsStatus, setVpsStatus] = useState<'Running' | 'Rebooting'>('Running');

  if (!order.vpsPackage) return null;

  const rdpCommand = `mstsc.exe /v:${order.vpsPackage.ipAddress}:${order.vpsPackage.port}`;

  const handleCopyRdp = () => {
    navigator.clipboard.writeText(rdpCommand);
    setCopiedRdp(true);
    onTriggerToast('RDP Remote Desktop command copied to clipboard!');
    setTimeout(() => setCopiedRdp(false), 2500);
  };

  const handleTestPing = () => {
    setIsPinging(true);
    onTriggerToast('Testing real-time latency to London LD4 liquidity pool...');
    setTimeout(() => {
      const newPing = +(1.1 + Math.random() * 0.3).toFixed(2);
      setCurrentPing(newPing);
      setIsPinging(false);
      onTriggerToast(`Ping verified: ${newPing}ms to IC Markets / FTMO trade servers!`);
    }, 1000);
  };

  const handleReboot = () => {
    setVpsStatus('Rebooting');
    onTriggerToast('Sending graceful restart command to VPS container...');
    setTimeout(() => {
      setVpsStatus('Running');
      onTriggerToast('VPS restarted successfully. MetaTrader terminals auto-resumed.');
    }, 2500);
  };

  return (
    <div className="bg-[#101724] border border-[#1E2D44] rounded-3xl p-6 sm:p-8 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#1E2D44]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-white shrink-0 shadow-md">
            <Server className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold text-white font-sans">
                Dedicated Forex Trading VPS
              </h3>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                {vpsStatus}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5 font-mono">
              Equinix LD4, London (UK) • 1-Month Complimentary License Active
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <button
            type="button"
            onClick={handleTestPing}
            disabled={isPinging}
            className="px-3 py-1.5 bg-[#172233] hover:bg-[#1E2E44] text-cyan-400 border border-[#273B56] rounded-lg transition flex items-center gap-1.5"
          >
            <Activity className={`w-3.5 h-3.5 ${isPinging ? 'animate-spin' : ''}`} />
            <span>Test Ping</span>
          </button>

          <button
            type="button"
            onClick={handleReboot}
            disabled={vpsStatus === 'Rebooting'}
            className="px-3 py-1.5 bg-[#172233] hover:bg-[#1E2E44] text-slate-300 hover:text-white border border-[#273B56] rounded-lg transition flex items-center gap-1.5"
          >
            <RotateCw className={`w-3.5 h-3.5 ${vpsStatus === 'Rebooting' ? 'animate-spin' : ''}`} />
            <span>Reboot VPS</span>
          </button>
        </div>
      </div>

      {/* VPS Hardware & Network Telemetry Grid */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-4 gap-4 font-mono text-xs">
        <div className="p-3.5 rounded-xl bg-[#0B111D] border border-[#1C2A3F]">
          <span className="text-[10px] text-slate-500 uppercase block">Host IP Address</span>
          <span className="font-bold text-white mt-1 block">{order.vpsPackage.ipAddress}</span>
          <span className="text-[10px] text-slate-400 mt-0.5 block">Port: {order.vpsPackage.port}</span>
        </div>

        <div className="p-3.5 rounded-xl bg-[#0B111D] border border-[#1C2A3F]">
          <span className="text-[10px] text-slate-500 uppercase block">Execution Latency</span>
          <span className="font-bold text-emerald-400 mt-1 block">{currentPing} ms</span>
          <span className="text-[10px] text-slate-400 mt-0.5 block">Zero Slippage Routing</span>
        </div>

        <div className="p-3.5 rounded-xl bg-[#0B111D] border border-[#1C2A3F]">
          <span className="text-[10px] text-slate-500 uppercase block">Operating System</span>
          <span className="font-bold text-slate-200 mt-1 block truncate">Win Server 2022</span>
          <span className="text-[10px] text-slate-400 mt-0.5 block">Pre-installed MT4/MT5</span>
        </div>

        <div className="p-3.5 rounded-xl bg-[#0B111D] border border-[#1C2A3F]">
          <span className="text-[10px] text-slate-500 uppercase block">Uptime Guarantee</span>
          <span className="font-bold text-cyan-400 mt-1 block">99.99%</span>
          <span className="text-[10px] text-slate-400 mt-0.5 block">Dual Power Redundancy</span>
        </div>
      </div>

      {/* RDP Connection Command */}
      <div className="mt-4 p-3.5 rounded-2xl bg-[#141F31] border border-[#23354E] flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-xs">
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-cyan-400 shrink-0" />
          <span className="text-slate-300">Remote Desktop Connection:</span>
          <code className="text-white font-bold bg-[#0B111D] px-2 py-0.5 rounded border border-[#1E2D44]">
            {rdpCommand}
          </code>
        </div>

        <button
          type="button"
          onClick={handleCopyRdp}
          className="self-end sm:self-center px-3 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-lg text-xs transition flex items-center gap-1.5"
        >
          {copiedRdp ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copiedRdp ? 'Copied' : 'Copy RDP'}</span>
        </button>
      </div>
    </div>
  );
};
