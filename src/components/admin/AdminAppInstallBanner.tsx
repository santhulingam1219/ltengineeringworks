"use client";

import { useState, useEffect } from "react";
import { DeviceMobile, X, DownloadSimple, CheckCircle } from "@phosphor-icons/react";

export function AdminAppInstallBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Check if running in standalone mode (already installed as PWA)
    if (window.matchMedia("(display-mode: standalone)").matches || (window.navigator as any).standalone) {
      setIsInstalled(true);
    }

    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      alert("To install on mobile:\n\n• Android (Chrome): Tap Menu (⋮) → 'Install app' or 'Add to Home screen'\n• iPhone (Safari): Tap Share (⎋) → 'Add to Home Screen'");
      return;
    }

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setIsInstalled(true);
    }
    setDeferredPrompt(null);
  };

  if (isInstalled || dismissed) return null;

  return (
    <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-amber-500/40 p-4 sm:p-5 rounded-sm shadow-lg text-white space-y-3 relative overflow-hidden">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-sm bg-amber-500 text-slate-950 flex items-center justify-center flex-shrink-0 shadow-md">
            <DeviceMobile className="w-5 h-5" weight="bold" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-xs sm:text-sm font-heading font-bold uppercase tracking-tight text-white">
                Install LT Admin Mobile App
              </h4>
              <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-xs">
                PWA
              </span>
            </div>
            <p className="text-[11px] text-slate-300 font-sans mt-0.5 leading-snug">
              Install directly to your mobile home screen for a full-screen app experience without browser address bars.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setDismissed(true)}
          className="p-1 text-slate-400 hover:text-white rounded-xs"
          aria-label="Dismiss app install banner"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-3 pt-1 border-t border-slate-800/80">
        <button
          type="button"
          onClick={handleInstallClick}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-heading font-bold uppercase tracking-wider rounded-xs transition-all shadow-sm active:scale-95 cursor-pointer"
        >
          <DownloadSimple className="w-4 h-4" weight="bold" />
          <span>Add to Home Screen / Install</span>
        </button>
        <span className="text-[11px] font-mono text-slate-400">
          Instant offline cache & notification ready
        </span>
      </div>
    </div>
  );
}
