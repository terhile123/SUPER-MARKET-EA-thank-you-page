import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, ShieldCheck, Download, Terminal, Globe, ArrowRight } from 'lucide-react';
import { ForexNavbar } from './components/ForexNavbar';
import { ForexLandingPage } from './components/ForexLandingPage';
import { ForexThankYouHeader } from './components/ForexThankYouHeader';
import { ForexEmailAccessCard } from './components/ForexEmailAccessCard';
import { ForexLicenseVault } from './components/ForexLicenseVault';
import { ForexSetupTimeline } from './components/ForexSetupTimeline';
import { ForexVpsCard } from './components/ForexVpsCard';
import { ForexAddons } from './components/ForexAddons';
import { ForexReceiptModal } from './components/ForexReceiptModal';
import { ForexSupportModal } from './components/ForexSupportModal';
import { initialForexOrder, forexAddons } from './data/forexData';
import { ForexOrderDetails, ForexEAProduct, BoundAccount, ForexAddon } from './types';

export function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'thankyou'>('thankyou');
  const [order, setOrder] = useState<ForexOrderDetails>(initialForexOrder);
  const [addedAddonIds, setAddedAddonIds] = useState<string[]>([]);
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [copiedLicense, setCopiedLicense] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3500);
  };

  const handleCopyLicense = () => {
    navigator.clipboard.writeText(order.licenseKey);
    setCopiedLicense(true);
    showToast('Cryptographic License Key copied to clipboard!');
    setTimeout(() => setCopiedLicense(false), 2500);
  };

  const handleSelectEA = (ea: ForexEAProduct) => {
    setOrder((prev) => ({
      ...prev,
      product: ea,
      financials: {
        ...prev.financials,
        totalPaid: ea.price,
        subtotal: ea.originalPrice || ea.price * 1.3,
        discountAmount: (ea.originalPrice || ea.price * 1.3) - ea.price,
      }
    }));
    setCurrentView('thankyou');
    showToast(`Active License created for ${ea.name}!`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBindAccount = (account: BoundAccount) => {
    setOrder((prev) => ({
      ...prev,
      boundAccounts: [...prev.boundAccounts, account],
    }));
  };

  const handleUnbindAccount = (accountNumber: string) => {
    setOrder((prev) => ({
      ...prev,
      boundAccounts: prev.boundAccounts.filter((a) => a.accountNumber !== accountNumber),
    }));
    showToast(`Account #${accountNumber} unbound from license.`);
  };

  const handleToggleAddon = (addon: ForexAddon) => {
    if (addedAddonIds.includes(addon.id)) {
      setAddedAddonIds((prev) => prev.filter((id) => id !== addon.id));
      showToast(`Removed ${addon.title} from active desk.`);
    } else {
      setAddedAddonIds((prev) => [...prev, addon.id]);
      showToast(`Activated ${addon.title}! Added to license invoice.`);
    }
  };

  const handleUpdateEmail = (newEmail: string) => {
    setOrder((prev) => ({
      ...prev,
      customerEmail: newEmail,
    }));
  };

  const handleScrollToDownloads = () => {
    const el = document.getElementById('license-downloads-vault');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const activeAddonsList = forexAddons.filter((a) => addedAddonIds.includes(a.id));

  return (
    <div className="min-h-screen bg-[#0A0E17] text-slate-100 font-sans flex flex-col selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Navbar */}
      <ForexNavbar
        currentView={currentView}
        onSelectView={setCurrentView}
        orderNumber={order.orderNumber}
        onOpenReceipt={() => setIsReceiptOpen(true)}
        onOpenHelp={() => setIsHelpOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {currentView === 'landing' ? (
          <ForexLandingPage
            onSelectEA={handleSelectEA}
            onGoToOrder={() => setCurrentView('thankyou')}
          />
        ) : (
          <div className="space-y-8">
            {/* Thank You Greeting & Active Order Header */}
            <ForexThankYouHeader
              order={order}
              onCopyLicense={handleCopyLicense}
              copiedLicense={copiedLicense}
              onScrollToDownloads={handleScrollToDownloads}
            />

            {/* Check Email For Bot Access Card */}
            <ForexEmailAccessCard
              order={order}
              onUpdateEmail={handleUpdateEmail}
              onTriggerToast={showToast}
            />

            {/* License Vault & Account Binding & Downloads */}
            <ForexLicenseVault
              order={order}
              onBindAccount={handleBindAccount}
              onUnbindAccount={handleUnbindAccount}
              onTriggerToast={showToast}
            />

            {/* 4-Step Deployment Timeline */}
            <ForexSetupTimeline
              onTriggerToast={showToast}
              onOpenHelp={() => setIsHelpOpen(true)}
            />

            {/* Low-Latency VPS Card */}
            <ForexVpsCard
              order={order}
              onTriggerToast={showToast}
            />

            {/* Quantitative Add-ons */}
            <ForexAddons
              addons={forexAddons}
              addedAddonIds={addedAddonIds}
              onToggleAddon={handleToggleAddon}
            />

            {/* Bottom Explore Other EAs Banner */}
            <div className="p-6 rounded-3xl bg-gradient-to-r from-[#121C2D] to-[#0E1624] border border-[#21324B] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="font-bold text-base text-white">
                  Want to explore other quantitative algorithmic strategies?
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Browse our multi-pair trend followers and automated prop-firm pass evaluation EAs.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setCurrentView('landing');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-5 py-2.5 bg-[#172336] hover:bg-[#203049] text-cyan-400 border border-[#273B57] rounded-xl text-xs font-mono font-bold transition flex items-center gap-2 shrink-0"
              >
                <span>View All Forex EAs</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-[#070A10] border-t border-[#182335] py-10 px-6 text-xs text-slate-400 mt-auto font-mono">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded bg-cyan-500 text-slate-950 flex items-center justify-center font-bold text-xs">
              FX
            </div>
            <span className="font-bold text-white">ALGOFX QUANT LABS</span>
            <span className="text-slate-600">•</span>
            <span>Algorithmic Trading & EA Automation Systems</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-400">
            <span>MetaTrader 4 & 5 Compatible</span>
            <span>•</span>
            <span>Zero-Martingale Architecture</span>
            <span>•</span>
            <span>London Equinix LD4 Co-located</span>
          </div>
        </div>
      </footer>

      {/* Receipt / Invoice Modal */}
      {isReceiptOpen && (
        <ForexReceiptModal
          order={order}
          activeAddons={activeAddonsList}
          onClose={() => setIsReceiptOpen(false)}
        />
      )}

      {/* Support & FAQ Modal */}
      {isHelpOpen && (
        <ForexSupportModal
          orderNumber={order.orderNumber}
          onClose={() => setIsHelpOpen(false)}
          onTriggerToast={showToast}
        />
      )}

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="fixed bottom-6 right-6 z-50 max-w-sm bg-[#111A29] text-white px-5 py-3.5 border border-cyan-500/50 rounded-2xl shadow-2xl flex items-center gap-3 text-xs font-mono"
          >
            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
            <span className="text-slate-200">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
export default App;
