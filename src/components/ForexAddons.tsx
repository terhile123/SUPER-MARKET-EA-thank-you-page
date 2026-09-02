import React from 'react';
import { Plus, Check, Zap, Shield, Server, Users, Award } from 'lucide-react';
import { ForexAddon } from '../types';

interface ForexAddonsProps {
  addons: ForexAddon[];
  addedAddonIds: string[];
  onToggleAddon: (addon: ForexAddon) => void;
}

export const ForexAddons: React.FC<ForexAddonsProps> = ({
  addons,
  addedAddonIds,
  onToggleAddon,
}) => {
  return (
    <div className="bg-[#101724] border border-[#1E2D44] rounded-3xl p-6 sm:p-8 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#1E2D44]">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-1">
            <Zap className="w-4 h-4" />
            <span>Recommended Trader Add-ons</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white font-sans">
            Enhance Your Algorithmic Trading Desk
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Add complimentary protective utilities and community access to your active license with 1-click.
          </p>
        </div>

        <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-800/60 font-semibold self-start sm:self-center">
          Instant Auto-Activation
        </span>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {addons.map((addon) => {
          const isAdded = addedAddonIds.includes(addon.id);

          return (
            <div
              key={addon.id}
              className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                isAdded
                  ? 'bg-[#152336] border-cyan-500/80 ring-1 ring-cyan-400/30'
                  : 'bg-[#121B2A] border-[#1F2F48] hover:border-slate-500'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold tracking-wider px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-800/60">
                      {addon.category}
                    </span>
                    <h4 className="font-bold text-sm text-white mt-2 font-sans">
                      {addon.title}
                    </h4>
                  </div>

                  <div className="text-right shrink-0 font-mono">
                    <span className="text-lg font-bold text-white">${addon.price}</span>
                    {addon.originalPrice && (
                      <span className="text-xs text-slate-500 line-through block">
                        ${addon.originalPrice}
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  {addon.description}
                </p>

                <div className="mt-3 p-2.5 rounded-xl bg-[#0B111D] border border-[#1B293E] text-[11px] font-mono text-emerald-400 flex items-center gap-1.5">
                  <span className="font-bold text-slate-400">Benefit:</span>
                  <span>{addon.benefit}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-[#1D2B41] flex items-center justify-between gap-3">
                <span className="text-[10px] font-mono text-slate-400">
                  {addon.compatibleWith}
                </span>

                <button
                  type="button"
                  onClick={() => onToggleAddon(addon)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition flex items-center gap-1.5 ${
                    isAdded
                      ? 'bg-emerald-500 text-slate-950'
                      : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-md shadow-cyan-500/20'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Added to License</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add to License (${addon.price})</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
