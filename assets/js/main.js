// Register Service Worker (GitHub Pages: préciser le scope)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    const base = '/LGBL-VRTUAL-CENTER-EXPERIENCE'; // ⚠️ adapte si tu changes
    navigator.serviceWorker.register(`${base}/sw.js`, { scope: `${base}/` })
      .then(reg => {
        // Optionnel: mise à jour immédiate quand un nouveau SW est prêt
        if (reg.waiting) reg.waiting.postMessage('SKIP_WAITING');
        reg.addEventListener('updatefound', () => {
          const nw = reg.installing;
          nw && nw.addEventListener('statechange', () => {
            if (nw.state === 'installed' && navigator.serviceWorker.controller) {
              console.log('[SW] Nouvelle version disponible');
            }
          });
        });
      })
      .catch(err => console.error('[SW] register error', err));
  });
}
