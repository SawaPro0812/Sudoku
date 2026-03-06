const LAST_CHECK_KEY = 'sudoku-last-update-check';

function getToday(): string {
  return new Date().toISOString().slice(0, 10); // "YYYY-MM-DD"
}

function shouldCheck(): boolean {
  try {
    const last = localStorage.getItem(LAST_CHECK_KEY);
    return last !== getToday();
  } catch {
    return false;
  }
}

function markChecked(): void {
  try {
    localStorage.setItem(LAST_CHECK_KEY, getToday());
  } catch {
    // ignore
  }
}

export function checkForUpdate(): void {
  if (!shouldCheck()) return;

  // Fetch the deployed index.html to extract the current version from asset hashes
  // If SW detects new content, it will auto-update via workbox (registerType: 'autoUpdate')
  // We just need to trigger a network request so the SW can compare precache manifests
  fetch('/manifest.webmanifest', { cache: 'no-store' })
    .then(() => {
      markChecked();
      // If service worker found an update, it will install and activate automatically
      // via vite-plugin-pwa's autoUpdate. On next navigation the new version loads.
      if (navigator.serviceWorker?.controller) {
        navigator.serviceWorker.controller.postMessage({ type: 'CHECK_UPDATE' });
      }
    })
    .catch(() => {
      // Offline or network error - skip, will retry next day
    });
}
