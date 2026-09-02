import React, { useState } from 'react';
import { X, HelpCircle, MessageSquare, ChevronRight, Check, Send, Terminal, Phone, Mail } from 'lucide-react';
import { forexFaqs } from '../data/forexData';

interface ForexSupportModalProps {
  orderNumber: string;
  onClose: () => void;
  onTriggerToast: (msg: string) => void;
}

export const ForexSupportModal: React.FC<ForexSupportModalProps> = ({
  orderNumber,
  onClose,
  onTriggerToast,
}) => {
  const [selectedFaq, setSelectedFaq] = useState<number | null>(0);
  const [ticketMessage, setTicketMessage] = useState('');
  const [ticketSent, setTicketSent] = useState(false);

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketMessage.trim()) return;

    setTicketSent(true);
    onTriggerToast('Support inquiry dispatched to AlgoFX MQL engineering team!');
    setTimeout(() => {
      setTicketMessage('');
      setTicketSent(false);
    }, 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative w-full max-w-lg bg-[#0F1624] border border-[#23354E] rounded-3xl shadow-2xl overflow-hidden my-8 text-white">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 bg-[#141E30] border-b border-[#23354E]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-800/60 text-cyan-400 flex items-center justify-center">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white font-sans">
                Quant Engineering Support Desk
              </h3>
              <p className="text-xs text-slate-400 font-mono">Order Support • #{orderNumber}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {/* Quick Direct Desk Contact */}
          <div className="grid grid-cols-2 gap-3 text-xs font-mono">
            <div className="p-3.5 rounded-xl bg-[#131D2E] border border-[#22334D]">
              <span className="text-[10px] uppercase text-cyan-400 font-semibold block">
                Telegram Trader VIP Desk
              </span>
              <span className="font-bold text-white mt-1 block">@AlgoFX_Support_Bot</span>
              <span className="text-[10px] text-emerald-400 mt-0.5 block">Online • 5 min avg reply</span>
            </div>

            <div className="p-3.5 rounded-xl bg-[#131D2E] border border-[#22334D]">
              <span className="text-[10px] uppercase text-cyan-400 font-semibold block">
                MQL5 Engineering Email
              </span>
              <span className="font-bold text-white mt-1 block truncate">quant@algofx.io</span>
              <span className="text-[10px] text-slate-400 mt-0.5 block">24/5 Market Hours</span>
            </div>
          </div>

          {/* Frequently Asked Questions */}
          <div>
            <h4 className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-3 font-semibold">
              Frequently Addressed Setup Questions:
            </h4>

            <div className="space-y-2">
              {forexFaqs.map((faq, i) => (
                <div key={i} className="border border-[#1E2D44] bg-[#121A28] rounded-xl overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setSelectedFaq(selectedFaq === i ? null : i)}
                    className="w-full text-left px-4 py-3 flex items-center justify-between text-xs font-medium text-slate-200 hover:bg-[#162234]"
                  >
                    <span>{faq.q}</span>
                    <ChevronRight
                      className={`w-3.5 h-3.5 text-slate-400 transition-transform ${
                        selectedFaq === i ? 'rotate-90 text-cyan-400' : ''
                      }`}
                    />
                  </button>

                  {selectedFaq === i && (
                    <div className="px-4 pb-3.5 text-xs text-slate-300 border-t border-[#1B293E] bg-[#0E1521] leading-relaxed pt-2">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Rapid Engineer Message Form */}
          <div className="pt-4 border-t border-[#1E2D44]">
            <h4 className="text-xs font-mono uppercase tracking-wider text-white mb-2 flex items-center gap-1.5 font-semibold">
              <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
              <span>Direct Inquiry to MQL Algorithmic Engineers:</span>
            </h4>

            {ticketSent ? (
              <div className="p-3 bg-emerald-950/80 border border-emerald-800/80 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Ticket registered! An engineer will inspect your account within 10 minutes.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmitTicket} className="space-y-2.5">
                <textarea
                  rows={2}
                  value={ticketMessage}
                  onChange={(e) => setTicketMessage(e.target.value)}
                  placeholder="Need assistance with broker spread, VPS connection, or AnyDesk remote setup?"
                  className="w-full text-xs font-mono p-3 rounded-xl bg-[#0B111D] border border-[#1E2D44] text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                />

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl text-xs font-mono transition shadow-md flex items-center gap-1.5"
                  >
                    <Send className="w-3 h-3" />
                    <span>Transmit Ticket</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
