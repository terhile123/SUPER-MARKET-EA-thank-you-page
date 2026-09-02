import React, { useState } from 'react';
import { Mail, MailCheck, ExternalLink, RefreshCw, AlertCircle, Check, ArrowRight, ShieldCheck, Inbox } from 'lucide-react';
import { ForexOrderDetails } from '../types';

interface ForexEmailAccessCardProps {
  order: ForexOrderDetails;
  onUpdateEmail: (newEmail: string) => void;
  onTriggerToast: (msg: string) => void;
}

export const ForexEmailAccessCard: React.FC<ForexEmailAccessCardProps> = ({
  order,
  onUpdateEmail,
  onTriggerToast,
}) => {
  const [isResending, setIsResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [emailInput, setEmailInput] = useState(order.customerEmail);

  const handleResend = () => {
    setIsResending(true);
    setResendSuccess(false);

    setTimeout(() => {
      setIsResending(false);
      setResendSuccess(true);
      onTriggerToast(`Bot access package re-dispatched to ${order.customerEmail}!`);
      setTimeout(() => setResendSuccess(false), 4000);
    }, 1200);
  };

  const handleSaveEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim() || !emailInput.includes('@')) {
      onTriggerToast('Please enter a valid email address.');
      return;
    }
    onUpdateEmail(emailInput.trim());
    setIsEditingEmail(false);
    onTriggerToast(`Delivery email updated to ${emailInput.trim()}! Access link re-sent.`);
  };

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#101D33] via-[#0E1726] to-[#0A0F1A] border-2 border-cyan-500/40 p-6 sm:p-8 shadow-2xl shadow-cyan-950/40">
      {/* Background ambient gradient */}
      <div className="absolute top-0 right-1/4 w-96 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-[#1E2E48]">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="relative w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-400/50 flex items-center justify-center text-cyan-400 shrink-0 shadow-lg shadow-cyan-500/10">
              <MailCheck className="w-6 h-6 text-cyan-400" />
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-[#0E1726] animate-pulse" />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/90 px-2.5 py-0.5 rounded border border-cyan-800/60">
                  Action Required
                </span>
                <span className="text-xs font-mono text-emerald-400 flex items-center gap-1 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Bot Access Email Dispatched
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white font-sans mt-1">
                Check Your Email for Bot Access & Files
              </h3>
            </div>
          </div>

          {/* Quick Resend / Status Button */}
          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              type="button"
              onClick={handleResend}
              disabled={isResending}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition flex items-center gap-2 ${
                resendSuccess
                  ? 'bg-emerald-500 text-slate-950'
                  : 'bg-[#18263D] hover:bg-[#223554] text-cyan-300 border border-cyan-500/30'
              }`}
            >
              {resendSuccess ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Email Re-sent!</span>
                </>
              ) : isResending ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-cyan-400" />
                  <span>Transmitting...</span>
                </>
              ) : (
                <>
                  <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Resend Access Email</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="mt-5 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left 2 Cols: Email Recipient & Deliverables */}
          <div className="lg:col-span-2 space-y-4">
            {/* Recipient Address Card */}
            <div className="p-4 rounded-2xl bg-[#0C1322] border border-[#1C2C46] flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-xs">
              <div className="flex items-center gap-2.5">
                <Inbox className="w-4 h-4 text-cyan-400 shrink-0" />
                <span className="text-slate-400">Delivered to:</span>
                {isEditingEmail ? (
                  <form onSubmit={handleSaveEmail} className="flex items-center gap-2">
                    <input
                      type="email"
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      className="bg-[#142033] border border-cyan-500/60 rounded px-2.5 py-1 text-white text-xs font-mono focus:outline-none focus:ring-1 focus:ring-cyan-400"
                      autoFocus
                    />
                    <button
                      type="submit"
                      className="px-2.5 py-1 bg-cyan-500 text-slate-950 rounded text-[11px] font-bold"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditingEmail(false)}
                      className="px-2 py-1 text-slate-400 hover:text-white text-[11px]"
                    >
                      Cancel
                    </button>
                  </form>
                ) : (
                  <span className="font-bold text-white text-sm tracking-wide">{order.customerEmail}</span>
                )}
              </div>

              {!isEditingEmail && (
                <button
                  type="button"
                  onClick={() => setIsEditingEmail(true)}
                  className="text-[11px] text-cyan-400 hover:text-cyan-300 underline underline-offset-2 self-start sm:self-auto"
                >
                  Change delivery email
                </button>
              )}
            </div>

            {/* What to look for in your inbox */}
            <div className="p-4 rounded-2xl bg-[#0D1524] border border-[#1F304B] space-y-3 font-mono text-xs">
              <div className="text-slate-400 text-[11px] uppercase tracking-wider font-semibold flex items-center justify-between">
                <span>Email Contents Summary:</span>
                <span className="text-emerald-400 lowercase font-normal">sent automatically • instant delivery</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="flex items-start gap-2.5 text-slate-200">
                  <span className="w-5 h-5 rounded-lg bg-cyan-950 text-cyan-400 flex items-center justify-center font-bold text-[11px] shrink-0 border border-cyan-800/60">
                    1
                  </span>
                  <div>
                    <span className="font-bold text-white block">Bot Binaries (.ex4 / .ex5)</span>
                    <span className="text-[11px] text-slate-400 leading-tight block mt-0.5">
                      Direct download links for MetaTrader 4 & MetaTrader 5 compiled bots.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 text-slate-200">
                  <span className="w-5 h-5 rounded-lg bg-cyan-950 text-cyan-400 flex items-center justify-center font-bold text-[11px] shrink-0 border border-cyan-800/60">
                    2
                  </span>
                  <div>
                    <span className="font-bold text-white block">Master License Activation Key</span>
                    <span className="text-[11px] text-slate-400 leading-tight block mt-0.5">
                      Your unique token ({order.licenseKey}) to unlock terminal execution.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 text-slate-200">
                  <span className="w-5 h-5 rounded-lg bg-cyan-950 text-cyan-400 flex items-center justify-center font-bold text-[11px] shrink-0 border border-cyan-800/60">
                    3
                  </span>
                  <div>
                    <span className="font-bold text-white block">Equinix LD4 VPS Credentials</span>
                    <span className="text-[11px] text-slate-400 leading-tight block mt-0.5">
                      IP host, username, and RDP credentials for your 24/7 cloud server.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 text-slate-200">
                  <span className="w-5 h-5 rounded-lg bg-cyan-950 text-cyan-400 flex items-center justify-center font-bold text-[11px] shrink-0 border border-cyan-800/60">
                    4
                  </span>
                  <div>
                    <span className="font-bold text-white block">VIP Trader Discord & Telegram</span>
                    <span className="text-[11px] text-slate-400 leading-tight block mt-0.5">
                      Private invite token to our quant trading desks and daily set file updates.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Col: Webmail Quick Links & Spam Folder Notice */}
          <div className="bg-[#0A101C] p-4 sm:p-5 rounded-2xl border border-[#1E2E48] flex flex-col justify-between space-y-4">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold block mb-2">
                Open Webmail Provider:
              </span>

              <div className="grid grid-cols-2 gap-2 font-mono text-xs">
                <a
                  href="https://mail.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-[#121D2E] hover:bg-[#1A2A42] text-slate-200 hover:text-white rounded-xl border border-[#23354E] flex items-center justify-center gap-1.5 transition text-center font-medium"
                >
                  <span>Gmail</span>
                  <ExternalLink className="w-3 h-3 text-cyan-400" />
                </a>

                <a
                  href="https://outlook.live.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-[#121D2E] hover:bg-[#1A2A42] text-slate-200 hover:text-white rounded-xl border border-[#23354E] flex items-center justify-center gap-1.5 transition text-center font-medium"
                >
                  <span>Outlook</span>
                  <ExternalLink className="w-3 h-3 text-cyan-400" />
                </a>
              </div>
            </div>

            {/* Email Finder Tip */}
            <div className="p-3.5 rounded-xl bg-[#121824] border border-[#213149] text-xs text-slate-300 space-y-1.5 font-mono">
              <div className="flex items-center gap-1.5 text-amber-400 font-semibold text-[11px]">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>Don't see the email yet?</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Check your <strong>Spam</strong>, <strong>Junk</strong>, or <strong>Promotions</strong> folder. Mark email from <span className="text-cyan-300">license-vault@algofx.io</span> as &ldquo;Safe Sender&rdquo; to receive automatic bot updates.
              </p>
            </div>

            <div className="text-[10px] font-mono text-slate-500 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Cryptographically signed dispatch • 256-bit SSL</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
