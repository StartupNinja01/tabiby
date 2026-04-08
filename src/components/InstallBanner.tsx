/**
 * InstallBanner — "Add to Home Screen" prompt for mobile users.
 *
 * Listens for the browser's `beforeinstallprompt` event (Chrome/Android).
 * On iOS Safari it shows a manual instruction instead (since iOS doesn't fire
 * the event). Dismisses permanently to localStorage so it never nags twice.
 */

import { useState, useEffect } from 'react';
import { X, Smartphone } from 'lucide-react';

const DISMISSED_KEY = 'tabiby_install_dismissed';

// Extend Window to include the non-standard BeforeInstallPromptEvent
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

function isIos() {
  return /iphone|ipad|ipod/i.test(navigator.userAgent);
}

function isInStandaloneMode() {
  return (
    ('standalone' in window.navigator && (window.navigator as { standalone?: boolean }).standalone === true) ||
    window.matchMedia('(display-mode: standalone)').matches
  );
}

export default function InstallBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showIos, setShowIos] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Don't show if already installed or already dismissed
    if (isInStandaloneMode()) return;
    if (localStorage.getItem(DISMISSED_KEY)) return;

    if (isIos()) {
      // Show iOS manual instruction after a short delay
      const t = setTimeout(() => setShowIos(true), 3000);
      return () => clearTimeout(t);
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setVisible(true);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const dismiss = () => {
    localStorage.setItem(DISMISSED_KEY, '1');
    setVisible(false);
    setShowIos(false);
    setDeferredPrompt(null);
  };

  const install = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') dismiss();
    setDeferredPrompt(null);
    setVisible(false);
  };

  // Chrome/Android prompt
  if (visible && deferredPrompt) {
    return (
      <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-80 z-50 bg-white border border-teal-200 rounded-2xl shadow-xl p-4 flex items-start gap-3 animate-in slide-in-from-bottom-4 duration-300">
        <div className="w-10 h-10 bg-teal-600 rounded-xl flex items-center justify-center flex-shrink-0">
          <Smartphone className="h-5 w-5 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-slate-900 text-sm">Add Tabiby to your home screen</p>
          <p className="text-slate-500 text-xs mt-0.5">Book doctors in one tap — no app store needed.</p>
          <div className="flex gap-2 mt-3">
            <button
              onClick={install}
              className="flex-1 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold py-2 rounded-lg transition-colors"
            >
              Install
            </button>
            <button
              onClick={dismiss}
              className="flex-1 border border-slate-200 text-slate-500 hover:text-slate-700 text-xs font-semibold py-2 rounded-lg transition-colors"
            >
              Not now
            </button>
          </div>
        </div>
        <button onClick={dismiss} className="text-slate-400 hover:text-slate-600 flex-shrink-0 mt-0.5">
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  // iOS Safari manual instruction
  if (showIos) {
    return (
      <div className="fixed bottom-4 left-4 right-4 z-50 bg-white border border-teal-200 rounded-2xl shadow-xl p-4 flex items-start gap-3">
        <div className="w-10 h-10 bg-teal-600 rounded-xl flex items-center justify-center flex-shrink-0">
          <Smartphone className="h-5 w-5 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-slate-900 text-sm">Add Tabiby to your Home Screen</p>
          <p className="text-slate-500 text-xs mt-1 leading-relaxed">
            Tap the <strong>Share</strong> button <span className="text-base">⬆️</span> in Safari, then choose <strong>"Add to Home Screen"</strong>.
          </p>
        </div>
        <button onClick={dismiss} className="text-slate-400 hover:text-slate-600 flex-shrink-0 mt-0.5">
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return null;
}
