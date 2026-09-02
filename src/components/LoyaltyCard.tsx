import React from 'react';
import { Award, Gift, Sparkles, ChevronRight, Check } from 'lucide-react';
import { OrderDetails } from '../types';

interface LoyaltyCardProps {
  loyalty: OrderDetails['loyalty'];
}

export const LoyaltyCard: React.FC<LoyaltyCardProps> = ({ loyalty }) => {
  const pointsRemaining = Math.max(loyalty.nextTierTarget - loyalty.totalBalance, 0);
  const progressPercent = Math.min(
    Math.round((loyalty.totalBalance / loyalty.nextTierTarget) * 100),
    100
  );

  return (
    <div className="bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 text-white rounded-2xl p-5 sm:p-6 shadow-md border border-emerald-800/40 relative overflow-hidden mb-6">
      {/* Background visual motif */}
      <div className="absolute right-0 bottom-0 translate-x-8 translate-y-8 opacity-10 pointer-events-none">
        <Award className="w-48 h-48 text-emerald-300" />
      </div>

      <div className="relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-emerald-800/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-bold shadow-sm ring-2 ring-amber-300/30">
              <Award className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-white">Supermarket EA Rewards</h3>
                <span className="text-[11px] font-semibold text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded-full border border-amber-500/40">
                  {loyalty.tierName}
                </span>
              </div>
              <p className="text-xs text-emerald-200/80 mt-0.5">
                Earned <strong className="text-amber-300 font-bold">+{loyalty.pointsEarned} EA Points</strong> on this grocery order!
              </p>
            </div>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-xs text-emerald-300">Total Available Balance</span>
            <div className="font-mono text-xl sm:text-2xl font-black text-white">
              {loyalty.totalBalance.toLocaleString()} <span className="text-xs font-normal text-emerald-300">pts</span>
            </div>
            <span className="text-[11px] text-emerald-300/80 font-medium">≈ ${(loyalty.totalBalance / 100).toFixed(2)} in checkout credits</span>
          </div>
        </div>

        {/* Progress to Next $10 Voucher */}
        <div className="mt-4 pt-1">
          <div className="flex justify-between text-xs mb-1.5">
            <span className="text-emerald-100 flex items-center gap-1.5">
              <Gift className="w-3.5 h-3.5 text-amber-400" />
              <span>Next Reward: <strong>$10.00 Off Coupon</strong></span>
            </span>
            <span className="text-amber-300 font-semibold font-mono">
              {pointsRemaining > 0 ? `${pointsRemaining} pts to unlock` : 'Ready to redeem!'}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-emerald-950/80 rounded-full h-2.5 overflow-hidden p-0.5 border border-emerald-700/50">
            <div
              className="bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 h-full rounded-full transition-all duration-700 shadow-sm"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div className="flex justify-between text-[11px] text-emerald-300/60 mt-1">
            <span>Current: {loyalty.totalBalance} pts</span>
            <span>Milestone: {loyalty.nextTierTarget} pts</span>
          </div>
        </div>

        {/* Exclusive Benefits Pills */}
        <div className="mt-4 pt-3 border-t border-emerald-800/40 flex flex-wrap gap-2 text-xs text-emerald-200">
          <div className="inline-flex items-center gap-1 bg-emerald-900/50 px-2.5 py-1 rounded-lg border border-emerald-700/40">
            <Check className="w-3 h-3 text-emerald-400" />
            <span>Free Delivery over $35</span>
          </div>
          <div className="inline-flex items-center gap-1 bg-emerald-900/50 px-2.5 py-1 rounded-lg border border-emerald-700/40">
            <Check className="w-3 h-3 text-emerald-400" />
            <span>2x Points on Fresh Produce</span>
          </div>
          <div className="inline-flex items-center gap-1 bg-emerald-900/50 px-2.5 py-1 rounded-lg border border-emerald-700/40">
            <Check className="w-3 h-3 text-emerald-400" />
            <span>100% Produce Freshness Guarantee</span>
          </div>
        </div>
      </div>
    </div>
  );
};
