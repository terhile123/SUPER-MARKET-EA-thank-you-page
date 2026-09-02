import React, { useState } from 'react';
import {
  FolderOpen,
  Settings2,
  CheckCircle2,
  Copy,
  Check,
  TrendingUp,
  Terminal,
  ExternalLink,
  HelpCircle,
  Play
} from 'lucide-react';

interface ForexSetupTimelineProps {
  onTriggerToast: (msg: string) => void;
  onOpenHelp: () => void;
}

export const ForexSetupTimeline: React.FC<ForexSetupTimelineProps> = ({
  onTriggerToast,
  onOpenHelp,
}) => {
  const [copiedPath, setCopiedPath] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [activeStep, setActiveStep] = useState<number>(2);

  const mt4FolderPath = '%APPDATA%\\MetaQuotes\\Terminal\\<INSTANCE_ID>\\MQL4\\Experts';
  const webRequestUrl = 'https://api.algofx.io/verify/v2';

  const handleCopy = (text: string, type: 'path' | 'url') => {
    navigator.clipboard.writeText(text);
    if (type === 'path') {
      setCopiedPath(true);
      onTriggerToast('MetaTrader Experts folder path copied!');
      setTimeout(() => setCopiedPath(false), 2500);
    } else {
      setCopiedUrl(true);
      onTriggerToast('WebRequest authentication URL copied!');
      setTimeout(() => setCopiedUrl(false), 2500);
    }
  };

  return (
    <div className="bg-[#101724] border border-[#1E2D44] rounded-3xl p-6 sm:p-8 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#1E2D44]">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-1">
            <Terminal className="w-4 h-4" />
            <span>4-Step Deployment Protocol</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white font-sans">
            How to Install & Activate Your EA
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Follow these standard steps to attach the EA onto your MetaTrader 4 or MetaTrader 5 terminal.
          </p>
        </div>

        <button
          type="button"
          onClick={onOpenHelp}
          className="self-start sm:self-center px-4 py-2 bg-[#172233] hover:bg-[#1E2D42] text-slate-300 hover:text-white border border-[#273B56] rounded-xl text-xs font-mono transition flex items-center gap-1.5"
        >
          <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
          <span>Need Remote Setup Help?</span>
        </button>
      </div>

      {/* 4 Steps Grid */}
      <div className="mt-8 space-y-6">
        {/* Step 1: License Generation */}
        <div className="flex gap-4 items-start">
          <div className="w-9 h-9 rounded-full bg-emerald-950/80 border border-emerald-500/60 text-emerald-400 flex items-center justify-center shrink-0 font-mono font-bold text-sm shadow-sm">
            ✓
          </div>
          <div className="flex-1 pb-6 border-b border-[#1C2A3F]">
            <div className="flex items-center gap-2">
              <h4 className="font-bold text-sm text-white font-sans">
                Step 1: Check Email for Bot Access & Files
              </h4>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 font-semibold">
                Completed
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Open the automated bot access email sent to your inbox. It contains direct download mirrors for your <code>.ex4</code> / <code>.ex5</code> bot executables, master license key, and cloud VPS credentials.
            </p>
          </div>
        </div>

        {/* Step 2: MetaTrader Experts Folder */}
        <div className="flex gap-4 items-start">
          <div className="w-9 h-9 rounded-full bg-cyan-950/80 border border-cyan-400 text-cyan-400 flex items-center justify-center shrink-0 font-mono font-bold text-sm shadow-md shadow-cyan-500/20">
            2
          </div>
          <div className="flex-1 pb-6 border-b border-[#1C2A3F]">
            <h4 className="font-bold text-sm text-white font-sans">
              Step 2: Copy .ex4 / .ex5 into MetaTrader Data Folder
            </h4>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              In MetaTrader, click <strong>File → Open Data Folder</strong>. Navigate into <strong>MQL4 → Experts</strong> (or MQL5 → Experts), and paste your downloaded EA file there.
            </p>

            <div className="mt-3 bg-[#0B111D] p-3 rounded-xl border border-[#1E2D44] flex items-center justify-between gap-3 text-xs font-mono">
              <span className="text-slate-300 truncate">{mt4FolderPath}</span>
              <button
                type="button"
                onClick={() => handleCopy(mt4FolderPath, 'path')}
                className="px-2.5 py-1 bg-[#172336] hover:bg-cyan-500 hover:text-slate-950 text-cyan-400 rounded-lg text-[11px] font-semibold transition shrink-0 flex items-center gap-1"
              >
                {copiedPath ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedPath ? 'Copied' : 'Copy Path'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Step 3: Allow Automated Trading & WebRequest */}
        <div className="flex gap-4 items-start">
          <div className="w-9 h-9 rounded-full bg-[#182335] border border-[#2B3E5B] text-slate-300 flex items-center justify-center shrink-0 font-mono font-bold text-sm">
            3
          </div>
          <div className="flex-1 pb-6 border-b border-[#1C2A3F]">
            <h4 className="font-bold text-sm text-white font-sans">
              Step 3: Enable Automated Trading & WebRequest in MetaTrader Options
            </h4>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              In MetaTrader, go to <strong>Tools → Options → Expert Advisors</strong>. Check the boxes for <strong>"Allow Automated Trading"</strong> and <strong>"Allow WebRequest for listed URL"</strong>.
            </p>

            <div className="mt-3 bg-[#0B111D] p-3 rounded-xl border border-[#1E2D44] flex items-center justify-between gap-3 text-xs font-mono">
              <div>
                <span className="text-[10px] text-slate-500 block uppercase">Auth WebRequest URL:</span>
                <span className="text-cyan-400 font-bold">{webRequestUrl}</span>
              </div>
              <button
                type="button"
                onClick={() => handleCopy(webRequestUrl, 'url')}
                className="px-2.5 py-1 bg-[#172336] hover:bg-cyan-500 hover:text-slate-950 text-cyan-400 rounded-lg text-[11px] font-semibold transition shrink-0 flex items-center gap-1"
              >
                {copiedUrl ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedUrl ? 'Copied' : 'Copy URL'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Step 4: Attach to Chart & Start */}
        <div className="flex gap-4 items-start">
          <div className="w-9 h-9 rounded-full bg-[#182335] border border-[#2B3E5B] text-slate-300 flex items-center justify-center shrink-0 font-mono font-bold text-sm">
            4
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-sm text-white font-sans">
              Step 4: Attach to Chart, Load .set Preset & Engage Algo
            </h4>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Open a <strong>15-Minute (M15) XAUUSD (Gold)</strong> chart. From the Navigator window, drag the EA onto the chart. In the Inputs tab, click <strong>Load</strong> to select your downloaded `.set` preset, and paste your License Key. Ensure the AutoTrading button at the top of MetaTrader is <strong>Green</strong>.
            </p>

            <div className="mt-4 p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-800/40 flex items-center gap-3 text-xs text-emerald-300">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>The EA smiley face icon will appear in the top-right corner of the chart, confirming algorithmic execution is active!</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
