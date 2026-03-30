let scriptPromise = null;

export const loadGoogleIdentityScript = () => {
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('Google Sign-In is only available in the browser.'));
  }

  if (window.google?.accounts?.id) {
    return Promise.resolve();
  }

  if (scriptPromise) {
    return scriptPromise;
  }

  scriptPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector('script[data-google-identity="true"]');
    if (existing) {
      existing.addEventListener('load', () => resolve(), { once: true });
      existing.addEventListener('error', () => reject(new Error('Failed to load Google Sign-In script.')), { once: true });
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.dataset.googleIdentity = 'true';
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Google Sign-In script.'));
    document.head.appendChild(script);
  });

  return scriptPromise;
};

export const requestGoogleIdToken = async (clientId) => {
  const normalizedClientId = String(clientId || '').trim().replace(/^"|"$/g, '');
  if (!normalizedClientId) {
    throw new Error('Google Sign-In is not configured. Missing VITE_GOOGLE_CLIENT_ID.');
  }

  await loadGoogleIdentityScript();

  return new Promise((resolve, reject) => {
    let settled = false;
    const timeoutId = setTimeout(() => {
      if (!settled) {
        settled = true;
        reject(new Error('Google sign-in was cancelled or timed out. Please try again.'));
      }
    }, 60000);

    window.google.accounts.id.initialize({
      client_id: normalizedClientId,
      callback: (response) => {
        if (settled) return;
        settled = true;
        clearTimeout(timeoutId);
        if (response?.credential) {
          resolve(response.credential);
          return;
        }
        reject(new Error('Google did not return a valid ID token.'));
      },
      auto_select: false,
      cancel_on_tap_outside: true
    });

    window.google.accounts.id.prompt();
  });
};
