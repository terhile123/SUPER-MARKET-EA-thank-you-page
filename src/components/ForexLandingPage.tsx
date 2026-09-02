import React, { useState } from 'react';
import {
  TrendingUp,
  ShieldCheck,
  Cpu,
  Zap,
  BarChart3,
  CheckCircle,
  ArrowRight,
  Sliders,
  Clock,
  Layers,
  Award,
  Sparkles,
  Download,
  AlertTriangle
} from 'lucide-react';
import { availableForexEAs, liveForexTickers } from '../data/forexData';
import { ForexEAProduct } from '../types';

interface ForexLandingPageProps {
  onSelectEA: (ea: ForexEAProduct) => void;
  onGoToOrder: () => void;
}

export const ForexLandingPage: React.FC<ForexLandingPageProps> = ({ onSelectEA, onGoToOrder }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [riskSimulation, setRiskSimulation] = useState<number>(1.0); // 1% risk per trade

  const categories = ['All', 'Scalping', 'Trend Following', 'Prop Firm', 'Grid / Multi-Pair'];

  const filteredEAs =
    selectedCategory === 'All'
      ? availableForexEAs
      : availableForexEAs.filter((ea) => ea.category === selectedCategory);

  // Projected compound calculation on $10,000 account over 6 months at chosen risk level
  const baseReturnRate = 0.12 * (riskSimulation / 1.0);
  const projected6Mo = 10000 * Math.pow(1 + baseReturnRate, 6);

  return (
    <div className="space-y-12 pb-16">
      {/* Live Market Rates Ribbon */}
      <div className="bg-[#121A27] border border-[#1E2C42] rounded-2xl p-3 sm:p-4 overflow-x-auto no-scrollbar">
        <div className="flex items-center justify-between min-w-[650px] gap-6 px-2 text-xs">
          <div className="flex items-center gap-2 text-slate-400 font-mono text-[11px] uppercase tracking-wider shrink-0">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Live FX Liquidity Feeds:</span>
          </div>

          <div className="flex items-center gap-8 font-mono">
            {liveForexTickers.map((ticker) => (
              <div key={ticker.pair} className="flex items-center gap-2">
                <span className="font-bold text-slate-200">{ticker.pair}</span>
                <span className="text-slate-300">{ticker.price}</span>
                <span
                  className={`text-[11px] px-1.5 py-0.5 rounded font-semibold ${
                    ticker.up ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800/40' : 'bg-rose-950/80 text-rose-400 border border-rose-800/40'
                  }`}
                >
                  {ticker.change}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#131C2D] via-[#0E1522] to-[#0A0E17] border border-[#202E45] p-6 sm:p-12 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/70 text-cyan-400 text-xs font-mono mb-6">
            <Cpu className="w-3.5 h-3.5" />
            <span>MQL4 & MQL5 Automated Trading Engines</span>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
            <span>Prop-Firm Certified</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight font-sans">
            Institutional-Grade Forex Automation & Expert Advisors
          </h1>

          <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed font-normal max-w-2xl">
            Eliminate psychological fatigue and emotion. Deploy mathematically tested, zero-martingale 
            trading robots directly into your MetaTrader 4 & MetaTrader 5 terminals. Pre-calibrated for raw-spread brokers and prop-firm challenge evaluations.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#ea-catalog"
              className="px-6 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold rounded-xl text-xs sm:text-sm font-mono tracking-wide shadow-lg shadow-cyan-500/20 transition-all flex items-center gap-2"
            >
              <span>Explore Forex EAs Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <button
              onClick={onGoToOrder}
              type="button"
              className="px-6 py-3.5 bg-[#162132] hover:bg-[#1E2D44] text-white border border-[#2B3E5C] font-semibold rounded-xl text-xs sm:text-sm transition-all flex items-center gap-2"
            >
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>View Purchased License & Download Hub</span>
            </button>
          </div>

          {/* Quick Stats Grid */}
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-[#1F2E47]">
            <div className="bg-[#111927]/80 p-3.5 rounded-xl border border-[#1E2B40]">
              <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block">
                Avg. Win Rate
              </span>
              <span className="text-xl sm:text-2xl font-black font-mono text-emerald-400">
                78.4%
              </span>
              <span className="text-[10px] text-slate-400 block mt-0.5">1,840+ Verified Trades</span>
            </div>

            <div className="bg-[#111927]/80 p-3.5 rounded-xl border border-[#1E2B40]">
              <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block">
                Profit Factor
              </span>
              <span className="text-xl sm:text-2xl font-black font-mono text-cyan-400">
                2.38
              </span>
              <span className="text-[10px] text-slate-400 block mt-0.5">Gross Win / Gross Loss</span>
            </div>

            <div className="bg-[#111927]/80 p-3.5 rounded-xl border border-[#1E2B40]">
              <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block">
                Max Historic DD
              </span>
              <span className="text-xl sm:text-2xl font-black font-mono text-white">
                4.8%
              </span>
              <span className="text-[10px] text-emerald-400 font-medium block mt-0.5">Prop-Firm Safe</span>
            </div>

            <div className="bg-[#111927]/80 p-3.5 rounded-xl border border-[#1E2B40]">
              <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block">
                Execution Latency
              </span>
              <span className="text-xl sm:text-2xl font-black font-mono text-indigo-400">
                1.2ms
              </span>
              <span className="text-[10px] text-slate-400 block mt-0.5">Equinix LD4 London VPS</span>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Risk & Capital Growth Simulator */}
      <section className="bg-[#101724] border border-[#1E2D44] rounded-3xl p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#1E2D44]">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-1">
              <BarChart3 className="w-4 h-4" />
              <span>Algorithmic Backtest & Forward Projections</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Institutional Capital Simulation ($10,000 Starting Equity)
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Simulate 6-month projected compound growth curve based on selected risk per trade.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-[#172233] p-2 rounded-xl border border-[#273954]">
            <span className="text-xs font-mono text-slate-300">Risk Profile:</span>
            {[0.5, 1.0, 2.0].map((risk) => (
              <button
                key={risk}
                type="button"
                onClick={() => setRiskSimulation(risk)}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                  riskSimulation === risk
                    ? 'bg-cyan-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {risk === 0.5 ? '0.5% (Prop Firm)' : risk === 1.0 ? '1.0% (Standard)' : '2.0% (Aggressive)'}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 rounded-2xl bg-[#141E2F] border border-[#22334D]">
            <span className="text-xs font-mono text-slate-400 block">Starting Capital</span>
            <span className="text-2xl font-bold font-mono text-white mt-1 block">$10,000.00</span>
            <span className="text-[11px] text-slate-400 mt-1 block">Account Size Base</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#141E2F] border border-[#22334D]">
            <span className="text-xs font-mono text-slate-400 block">Projected 6-Month Equity</span>
            <span className="text-2xl font-bold font-mono text-emerald-400 mt-1 block">
              ${projected6Mo.toLocaleString('en-US', { maximumFractionDigits: 2 })}
            </span>
            <span className="text-[11px] text-emerald-400/90 font-mono mt-1 block">
              +{(projected6Mo - 10000).toLocaleString('en-US', { maximumFractionDigits: 2 })} (+{((projected6Mo / 10000 - 1) * 100).toFixed(1)}%)
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-[#141E2F] border border-[#22334D]">
            <span className="text-xs font-mono text-slate-400 block">Max Historical Drawdown Guard</span>
            <span className="text-2xl font-bold font-mono text-cyan-400 mt-1 block">
              {(4.8 * (riskSimulation / 1.0)).toFixed(1)}%
            </span>
            <span className="text-[11px] text-slate-400 mt-1 block">Hard Stop Loss On Every Trade</span>
          </div>
        </div>
      </section>

      {/* Forex EAs Catalog Section */}
      <section id="ea-catalog" className="scroll-mt-24 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-1">
              <Zap className="w-4 h-4" />
              <span>Available Algorithmic Bots</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Forex Expert Advisors (MT4 & MT5)
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                    : 'bg-[#152030] text-slate-300 hover:text-white border border-[#253650]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* EAs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredEAs.map((ea) => (
            <div
              key={ea.id}
              className={`rounded-2xl border p-6 flex flex-col justify-between transition-all ${
                ea.isFeatured
                  ? 'bg-gradient-to-br from-[#131D2E] via-[#0F1725] to-[#0B101A] border-cyan-500/50 shadow-xl shadow-cyan-950/40 ring-1 ring-cyan-400/20'
                  : 'bg-[#111927] border-[#1F2E45] hover:border-slate-500'
              }`}
            >
              <div>
                {/* Header row */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-400 border border-cyan-800/60">
                        {ea.category}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400 bg-slate-800/60 px-2 py-0.5 rounded">
                        MT4 & MT5
                      </span>
                      {ea.isFeatured && (
                        <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-700/50 flex items-center gap-1">
                          <Award className="w-3 h-3" /> Best Seller
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-white mt-2 font-sans">
                      {ea.name}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">{ea.tagline}</p>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="text-2xl font-bold font-mono text-white">${ea.price}</div>
                    {ea.originalPrice && (
                      <div className="text-xs text-slate-500 line-through font-mono">
                        ${ea.originalPrice}
                      </div>
                    )}
                    <span className="text-[10px] font-mono text-emerald-400 block font-semibold">
                      Lifetime License
                    </span>
                  </div>
                </div>

                {/* Key Metrics Bar */}
                <div className="mt-5 grid grid-cols-3 gap-2.5 p-3 rounded-xl bg-[#0B111D] border border-[#19263B] text-center font-mono text-xs">
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase">Win Rate</span>
                    <span className="font-bold text-emerald-400 text-sm">{ea.winRate}%</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase">Profit Factor</span>
                    <span className="font-bold text-cyan-400 text-sm">{ea.profitFactor}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase">Max DD</span>
                    <span className="font-bold text-slate-200 text-sm">{ea.maxDrawdown}%</span>
                  </div>
                </div>

                {/* Details & Pairs */}
                <div className="mt-4 space-y-2 text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>Currency Pairs:</span>
                    <span className="text-slate-200 font-mono font-medium">
                      {ea.currencyPairs.join(', ')}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Optimal Timeframe:</span>
                    <span className="text-slate-200 font-mono font-medium">{ea.timeframe}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Target Return:</span>
                    <span className="text-emerald-400 font-mono font-medium">
                      {ea.avgMonthlyReturn}
                    </span>
                  </div>
                </div>

                {/* Bullet Features */}
                <div className="mt-4 pt-4 border-t border-[#1C2A3F] space-y-1.5">
                  {ea.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-6 pt-4 border-t border-[#1C2A3F] flex items-center justify-between gap-3">
                <span className="text-[11px] font-mono text-slate-400">
                  Instant .ex4/.ex5 & .set files
                </span>
                <button
                  type="button"
                  onClick={() => onSelectEA(ea)}
                  className="px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl text-xs font-mono tracking-wider shadow-md shadow-cyan-500/20 transition flex items-center gap-1.5"
                >
                  <span>Deploy This EA</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Prop-Firm Compliance Matrix */}
      <section className="bg-[#0F1623] border border-[#1E2D44] rounded-3xl p-6 sm:p-8">
        <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-1">
          <ShieldCheck className="w-4 h-4" />
          <span>Funding Rules Verification</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-white">
          Prop Firm Compatibility Guarantee
        </h2>
        <p className="text-xs text-slate-400 mt-1 max-w-2xl">
          Passed on FTMO, FundedNext, The Funded Trader, and Alpha Capital. Fully adheres to strict prop guidelines:
        </p>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-left text-xs font-mono border-collapse">
            <thead>
              <tr className="border-b border-[#1E2D44] text-slate-400 uppercase text-[10px]">
                <th className="py-3 px-4">Evaluation Rule</th>
                <th className="py-3 px-4">Prop Firm Threshold</th>
                <th className="py-3 px-4">AlgoFX Safeguard Mechanism</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1C293E] text-slate-300">
              <tr>
                <td className="py-3 px-4 font-bold text-white">Daily Drawdown Cap</td>
                <td className="py-3 px-4 text-rose-400">Max 5.0% Loss in 24h</td>
                <td className="py-3 px-4 text-cyan-400">Hard lock at 3.8% max daily equity drop</td>
                <td className="py-3 px-4 text-emerald-400 font-bold">✓ 100% Passed</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-white">Overall Max Drawdown</td>
                <td className="py-3 px-4 text-rose-400">Max 10.0% Trailing Loss</td>
                <td className="py-3 px-4 text-cyan-400">Fixed hard stop loss per order (max 4.8% historic)</td>
                <td className="py-3 px-4 text-emerald-400 font-bold">✓ 100% Passed</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-white">High Impact News Events</td>
                <td className="py-3 px-4 text-amber-400">2 min before/after restrictions</td>
                <td className="py-3 px-4 text-cyan-400">Integrated News Guardian automatically pauses 15 min prior</td>
                <td className="py-3 px-4 text-emerald-400 font-bold">✓ 100% Passed</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-white">Grid / Martingale Detection</td>
                <td className="py-3 px-4 text-rose-400">Strictly banned on evaluations</td>
                <td className="py-3 px-4 text-cyan-400">Zero lot multiplication or unhedged doubling</td>
                <td className="py-3 px-4 text-emerald-400 font-bold">✓ 100% Passed</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
