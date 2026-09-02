import React, { useState } from 'react';
import { X, HelpCircle, Phone, Mail, MessageSquare, ShieldCheck, ChevronRight, Check } from 'lucide-react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderNumber: string;
}

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose, orderNumber }) => {
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);
  const [ticketSent, setTicketSent] = useState(false);
  const [ticketMessage, setTicketMessage] = useState('');

  if (!isOpen) return null;

  const faqs = [
    {
      q: 'How do item substitutions work at Supermarket EA?',
      a: 'Your personal shopper will only choose high-grade organic or equivalent brand items if an item is unavailable. You will receive an SMS preview before payment adjustment.',
    },
    {
      q: 'What is the EA 100% Freshness Guarantee?',
      a: 'If any vegetable, fruit, meat, or dairy product arrives below your expectation, click "Request Item Refund" in your receipt within 24 hours for an instant store credit.',
    },
    {
      q: 'Can I change my delivery address or instructions?',
      a: 'Yes, you can edit the drop-off notes directly on this page while the order status is in "Hand-Picking" or "Cold-Chain" stage.',
    },
    {
      q: 'How does curbside pickup work if I switch to Click & Collect?',
      a: 'Pull into Express Bay 3 at EA Central Hub. Open your confirmation barcode or give the attendant your order ref (#EA-78429) and we load directly into your trunk.',
    },
  ];

  const handleSendTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketMessage.trim()) return;
    setTicketSent(true);
    setTimeout(() => {
      setTicketSent(false);
      setTicketMessage('');
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-emerald-800 text-white">
          <div className="flex items-center gap-2.5">
            <HelpCircle className="w-5 h-5 text-emerald-300" />
            <div>
              <h3 className="font-bold text-base">Supermarket EA Customer Care</h3>
              <p className="text-xs text-emerald-200">Assistance for Order #{orderNumber}</p>
            </div>
          </div>
          <button
            id="close-help-modal-btn"
            onClick={onClose}
            type="button"
            className="p-1 text-emerald-200 hover:text-white rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Quick Contact Options */}
          <div className="grid grid-cols-2 gap-3">
            <a
              href="tel:+15550192834"
              className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/50 transition text-xs font-semibold text-slate-700"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <p className="text-slate-900">Direct Hub Line</p>
                <p className="text-[11px] text-slate-400 font-normal">(555) 019-2834</p>
              </div>
            </a>

            <div className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/50 transition text-xs font-semibold text-slate-700">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <p className="text-slate-900">Email Support</p>
                <p className="text-[11px] text-slate-400 font-normal">care@supermarketea.com</p>
              </div>
            </div>
          </div>

          {/* FAQs */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500 mb-2">
              Frequently Asked Questions
            </h4>
            <div className="space-y-2">
              {faqs.map((faq, i) => (
                <div key={i} className="border border-slate-200 rounded-xl overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setSelectedFaq(selectedFaq === i ? null : i)}
                    className="w-full text-left px-3.5 py-2.5 flex items-center justify-between text-xs font-medium text-slate-800 hover:bg-slate-50"
                  >
                    <span>{faq.q}</span>
                    <ChevronRight
                      className={`w-3.5 h-3.5 text-slate-400 transition-transform ${
                        selectedFaq === i ? 'rotate-90' : ''
                      }`}
                    />
                  </button>
                  {selectedFaq === i && (
                    <div className="px-3.5 pb-3 text-xs text-slate-600 bg-slate-50/70 border-t border-slate-100 leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Quick Message to Store Supervisor */}
          <div className="pt-2 border-t border-slate-100">
            <h4 className="font-bold text-xs text-slate-800 mb-1.5 flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
              <span>Send Rapid Message to Hub Supervisor</span>
            </h4>
            {ticketSent ? (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Message received! Hub Supervisor has been notified.</span>
              </div>
            ) : (
              <form onSubmit={handleSendTicket} className="space-y-2">
                <textarea
                  id="help-ticket-textarea"
                  rows={2}
                  value={ticketMessage}
                  onChange={(e) => setTicketMessage(e.target.value)}
                  placeholder="Need something adjusted or have a question about this order?"
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <div className="flex justify-end">
                  <button
                    id="submit-help-ticket-btn"
                    type="submit"
                    className="px-4 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold shadow-xs"
                  >
                    Submit Request
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
