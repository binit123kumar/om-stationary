import { useEffect, useRef, useState } from 'react';

function isIosSafari() {
  const userAgent = navigator.userAgent || '';
  const isAppleMobile = /iPhone|iPad|iPod/.test(userAgent)
    || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  return isAppleMobile && /Safari/.test(userAgent) && !/CriOS|FxiOS|EdgiOS/.test(userAgent);
}

export function PwaExperience() {
  const [installPrompt, setInstallPrompt] = useState(null);
  const [installInstructions, setInstallInstructions] = useState(false);
  const [updateReady, setUpdateReady] = useState(false);
  const [registration, setRegistration] = useState(null);
  const [dismissed, setDismissed] = useState(false);
  const installButtonRef = useRef(null);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (!installInstructions) return undefined;
    closeButtonRef.current?.focus();
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setInstallInstructions(false);
      if (event.key === 'Tab') {
        event.preventDefault();
        closeButtonRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      installButtonRef.current?.focus();
    };
  }, [installInstructions]);

  useEffect(() => {
    const standalone = window.matchMedia('(display-mode: standalone)').matches
      || navigator.standalone === true;
    if (standalone) return undefined;

    const onBeforeInstall = (event) => {
      event.preventDefault();
      setInstallPrompt(event);
    };
    const onInstalled = () => {
      setInstallPrompt(null);
      setInstallInstructions(false);
      setDismissed(true);
    };
    const onControllerChange = () => window.location.reload();

    window.addEventListener('beforeinstallprompt', onBeforeInstall);
    window.addEventListener('appinstalled', onInstalled);
    navigator.serviceWorker?.addEventListener('controllerchange', onControllerChange);
    let active = true;
    navigator.serviceWorker?.getRegistration().then((currentRegistration) => {
      if (!active || !currentRegistration) return;
      setRegistration(currentRegistration);
      if (currentRegistration.waiting) setUpdateReady(true);
      currentRegistration.addEventListener('updatefound', () => {
        const installing = currentRegistration.installing;
        installing?.addEventListener('statechange', () => {
          if (installing.state === 'installed' && navigator.serviceWorker.controller) {
            setUpdateReady(true);
          }
        });
      });
    });

    return () => {
      active = false;
      window.removeEventListener('beforeinstallprompt', onBeforeInstall);
      window.removeEventListener('appinstalled', onInstalled);
      navigator.serviceWorker?.removeEventListener('controllerchange', onControllerChange);
    };
  }, []);

  const install = async () => {
    if (!installPrompt) {
      setInstallInstructions(true);
      return;
    }
    await installPrompt.prompt();
    await installPrompt.userChoice;
    setInstallPrompt(null);
  };

  if (dismissed) return null;

  return (
    <aside className="pwa-experience" aria-live="polite">
      {updateReady && (
        <div className="pwa-notice">
          <span>A new version of OM Stationary is ready.</span>
          <button
            type="button"
            onClick={() => registration?.waiting?.postMessage({ type: 'SKIP_WAITING' })}
          >
            Update
          </button>
          <button type="button" className="pwa-dismiss" onClick={() => setUpdateReady(false)} aria-label="Dismiss update notice">
            Not now
          </button>
        </div>
      )}
      {(installPrompt || isIosSafari()) && (
        <div className="pwa-notice">
          <span>Add OM Stationary to your home screen for a quicker launch.</span>
          <button type="button" ref={installButtonRef} onClick={install}>Install</button>
          <button type="button" className="pwa-dismiss" onClick={() => setDismissed(true)} aria-label="Dismiss install prompt">
            Not now
          </button>
        </div>
      )}
      {installInstructions && (
        <div className="pwa-instructions-backdrop" role="presentation" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setInstallInstructions(false);
        }}>
          <section className="pwa-instructions" role="dialog" aria-modal="true" aria-labelledby="pwa-instructions-title">
            <button type="button" ref={closeButtonRef} className="pwa-close" onClick={() => setInstallInstructions(false)} aria-label="Close installation instructions">×</button>
            <h2 id="pwa-instructions-title">Install OM Stationary</h2>
            {isIosSafari()
              ? <p>In Safari, tap <strong>Share</strong>, then choose <strong>Add to Home Screen</strong>.</p>
              : <p>Open your browser menu and choose <strong>Install app</strong> or <strong>Add to Home screen</strong>, if offered.</p>}
            <p>Installation availability depends on your browser and connection. Shopping and account actions still need an internet connection.</p>
          </section>
        </div>
      )}
    </aside>
  );
}
