import React, { useState } from 'react';
import { 
  Bell, 
  MapPin, 
  ShieldCheck, 
  Star, 
  Sparkles, 
  Check, 
  Phone, 
  HeartHandshake, 
  ArrowRight,
  RotateCcw,
  ShoppingBag
} from 'lucide-react';
import { OrderDetails } from '../types';

interface OrderActionsProps {
  order: OrderDetails;
  onUpdateInstructions: (instructions: string) => void;
  onContinueShopping: () => void;
}

export const OrderActions: React.FC<OrderActionsProps> = ({
  order,
  onUpdateInstructions,
  onContinueShopping,
}) => {
  const [smsEnabled, setSmsEnabled] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState(order.customerPhone);
  const [phoneSaved, setPhoneSaved] = useState(false);

  const [instructions, setInstructions] = useState(order.deliveryAddress.instructions);
  const [isEditingInstructions, setIsEditingInstructions] = useState(false);
  const [instructionsSaved, setInstructionsSaved] = useState(false);

  const [rating, setRating] = useState<number>(5);
  const [rated, setRated] = useState<boolean>(false);
  const [feedbackTags, setFeedbackTags] = useState<string[]>([]);

  const availableTags = [
    'Super fast',
    'Great produce selection',
    'Clear receipt',
    'Accurate notes',
    'Easy checkout',
  ];

  const handleToggleTag = (tag: string) => {
    if (feedbackTags.includes(tag)) {
      setFeedbackTags(feedbackTags.filter((t) => t !== tag));
    } else {
      setFeedbackTags([...feedbackTags, tag]);
    }
  };

  const handleSaveInstructions = () => {
    onUpdateInstructions(instructions);
    setIsEditingInstructions(false);
    setInstructionsSaved(true);
    setTimeout(() => setInstructionsSaved(false), 2500);
  };

  const handleSavePhone = (e: React.FormEvent) => {
    e.preventDefault();
    setPhoneSaved(true);
    setTimeout(() => setPhoneSaved(false), 2500);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      {/* Notifications & Drop-off instructions */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 sm:p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Bell className="w-5 h-5 text-emerald-700" />
            <h3 className="font-bold text-base text-slate-900">Delivery Updates & Alerts</h3>
          </div>

          <div className="mt-4 space-y-4">
            {/* SMS Toggle */}
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-slate-800">SMS Driver Progress</span>
                <p className="text-[11px] text-slate-500">
                  Receive live SMS text when driver leaves Supermarket EA
                </p>
              </div>
              <button
                id="toggle-sms-notifications-btn"
                type="button"
                onClick={() => setSmsEnabled(!smsEnabled)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                  smsEnabled ? 'bg-emerald-600' : 'bg-slate-200'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                    smsEnabled ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {smsEnabled && (
              <form onSubmit={handleSavePhone} className="flex gap-2">
                <div className="relative flex-1">
                  <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    id="phone-number-sms-input"
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full text-xs pl-8 pr-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="Enter mobile phone number"
                  />
                </div>
                <button
                  id="save-sms-phone-btn"
                  type="submit"
                  className="px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-emerald-800 bg-slate-100 hover:bg-emerald-50 border border-slate-200 rounded-xl transition"
                >
                  {phoneSaved ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : 'Save'}
                </button>
              </form>
            )}

            {/* Drop-off Instructions Card */}
            <div className="pt-2">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-semibold text-slate-800 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                  Drop-off Instructions
                </span>
                {!isEditingInstructions && (
                  <button
                    id="edit-instructions-btn"
                    onClick={() => setIsEditingInstructions(true)}
                    type="button"
                    className="text-xs text-emerald-700 hover:text-emerald-800 font-semibold"
                  >
                    Edit
                  </button>
                )}
              </div>

              {isEditingInstructions ? (
                <div className="space-y-2">
                  <textarea
                    id="delivery-instruction-textarea"
                    rows={2}
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="e.g. Leave by front door, do not ring bell..."
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      id="cancel-instruction-edit-btn"
                      onClick={() => setIsEditingInstructions(false)}
                      type="button"
                      className="px-2.5 py-1 text-xs text-slate-600 hover:bg-slate-100 rounded-lg"
                    >
                      Cancel
                    </button>
                    <button
                      id="save-instruction-btn"
                      onClick={handleSaveInstructions}
                      type="button"
                      className="px-3 py-1 text-xs font-semibold bg-emerald-700 text-white rounded-lg hover:bg-emerald-800"
                    >
                      Save Notes
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl text-xs text-slate-600 flex items-start justify-between">
                  <p className="italic">"{instructions}"</p>
                  {instructionsSaved && (
                    <span className="text-emerald-700 text-[11px] font-bold ml-2 shrink-0 flex items-center gap-1">
                      <Check className="w-3 h-3" /> Updated
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 100% Freshness Guarantee */}
        <div className="mt-5 p-3.5 bg-emerald-50/70 border border-emerald-200/70 rounded-xl flex items-center gap-3">
          <ShieldCheck className="w-6 h-6 text-emerald-700 shrink-0" />
          <div className="text-xs">
            <span className="font-bold text-emerald-950">EA 100% Freshness Promise</span>
            <p className="text-emerald-800/80 text-[11px] mt-0.5">
              Not 100% thrilled with any produce or grocery item? Report in 24 hours for instant refund or replacement.
            </p>
          </div>
        </div>
      </div>

      {/* Experience Feedback & Next Actions */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 sm:p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <h3 className="font-bold text-base text-slate-900">How was your checkout?</h3>
          </div>

          <div className="mt-4">
            <p className="text-xs text-slate-500 mb-2">
              Help us tailor your Supermarket EA experience
            </p>

            {/* Star Rating */}
            <div className="flex items-center gap-1.5 mb-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  id={`rating-star-${star}`}
                  type="button"
                  onClick={() => {
                    setRating(star);
                    setRated(true);
                  }}
                  className="p-1 hover:scale-110 transition-transform"
                >
                  <Star
                    className={`w-6 h-6 transition-colors ${
                      star <= rating
                        ? 'text-amber-400 fill-amber-400'
                        : 'text-slate-300'
                    }`}
                  />
                </button>
              ))}
              <span className="text-xs font-semibold text-slate-700 ml-2">
                {rating === 5 ? 'Exceptional!' : rating === 4 ? 'Very Good' : 'Good'}
              </span>
            </div>

            {/* Feedback Tags */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {availableTags.map((tag) => {
                const selected = feedbackTags.includes(tag);
                return (
                  <button
                    key={tag}
                    id={`feedback-tag-${tag.toLowerCase().replace(/\s+/g, '-')}`}
                    onClick={() => handleToggleTag(tag)}
                    type="button"
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                      selected
                        ? 'bg-emerald-700 text-white shadow-2xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>

            {rated && (
              <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Thank you! Your feedback helps us improve Supermarket EA.</span>
              </div>
            )}
          </div>
        </div>

        {/* Primary Action Buttons */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-2.5">
          <button
            id="continue-shopping-btn"
            onClick={onContinueShopping}
            type="button"
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-xs transition"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Browse More Aisles</span>
          </button>

          <button
            id="reorder-basket-btn"
            onClick={() => alert('All items from order EA-78429 have been copied to your upcoming shopping list!')}
            type="button"
            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Save as Weekly Routine</span>
          </button>
        </div>
      </div>
    </div>
  );
};
