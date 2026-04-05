let scriptPromise = null;
let initializedClientId = null;
let pendingCredentialResolver = null;
let pendingCredentialRejecter = null;
let inFlightTokenPromise = null;

const parseAllowedOrigins = (allowedOriginsCsv) => {
  return String(allowedOriginsCsv || '')
    .split(',')
    .map((origin) => origin.trim().toLowerCase())
    .filter(Boolean);
};

const formatPromptReason = (reason) => {
  if (!reason) return '';
  return String(reason).replace(/_/g, ' ');
};

const toGoogleConfigError = (clientId, reason) => {
  const origin = typeof window !== 'undefined' ? window.location.origin : 'this origin';
  const reasonText = formatPromptReason(reason);
  const base = `Google Sign-In is blocked for ${origin}. Add this URL to Authorized JavaScript origins for OAuth client ${clientId} in Google Cloud Console.`;
  return reasonText ? `${base} (Google reason: ${reasonText})` : base;
};

export const getGoogleSignInPreflightWarning = ({ clientId, allowedOriginsCsv }) => {
  const normalizedClientId = String(clientId || '').trim().replace(/^"|"$/g, '');
  if (!normalizedClientId) {
    return 'Google Sign-In is disabled: missing VITE_GOOGLE_CLIENT_ID.';
  }

  if (typeof window === 'undefined') {
    return '';
  }

  const currentOrigin = window.location.origin.toLowerCase();
  const allowedOrigins = parseAllowedOrigins(allowedOriginsCsv);

  if (allowedOrigins.length > 0 && !allowedOrigins.includes(currentOrigin)) {
    return `Google Sign-In may fail here: ${currentOrigin} is not listed in VITE_GOOGLE_ALLOWED_ORIGINS.`;
  }

  return '';
};

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

  if (typeof window !== 'undefined') {
    const currentOrigin = window.location.origin.toLowerCase();
    const allowedOrigins = parseAllowedOrigins(import.meta.env.VITE_GOOGLE_ALLOWED_ORIGINS);
    if (allowedOrigins.length > 0 && !allowedOrigins.includes(currentOrigin)) {
      throw new Error(`Google Sign-In is blocked for ${currentOrigin}. Add this origin to VITE_GOOGLE_ALLOWED_ORIGINS and Google Cloud OAuth Authorized JavaScript origins.`);
    }
  }

  await loadGoogleIdentityScript();

  if (inFlightTokenPromise) {
    return inFlightTokenPromise;
  }

  inFlightTokenPromise = new Promise((resolve, reject) => {
    let settled = false;
    const timeoutId = setTimeout(() => {
      if (!settled) {
        settled = true;
        pendingCredentialResolver = null;
        pendingCredentialRejecter = null;
        inFlightTokenPromise = null;
        reject(new Error('Google sign-in was cancelled or timed out. Please try again.'));
      }
    }, 60000);

    if (initializedClientId !== normalizedClientId) {
      window.google.accounts.id.initialize({
        client_id: normalizedClientId,
        callback: (response) => {
          if (pendingCredentialResolver) {
            pendingCredentialResolver(response);
          }
        },
        auto_select: false,
        cancel_on_tap_outside: true,
        use_fedcm_for_prompt: true
      });
      initializedClientId = normalizedClientId;
    }

    pendingCredentialResolver = (response) => {
      if (settled) return;
      settled = true;
      clearTimeout(timeoutId);
      pendingCredentialResolver = null;
      pendingCredentialRejecter = null;
      inFlightTokenPromise = null;

      if (response?.credential) {
        resolve(response.credential);
        return;
      }

      reject(new Error('Google did not return a valid ID token.'));
    };

    pendingCredentialRejecter = (err) => {
      if (settled) return;
      settled = true;
      clearTimeout(timeoutId);
      pendingCredentialResolver = null;
      pendingCredentialRejecter = null;
      inFlightTokenPromise = null;
      reject(err);
    };

    try {
      // Prompt without status callbacks to avoid deprecated prompt-status warnings.
      window.google.accounts.id.prompt();
    } catch (err) {
      if (pendingCredentialRejecter) {
        pendingCredentialRejecter(err instanceof Error ? err : new Error('Google sign-in prompt failed to open.'));
      } else {
        reject(err instanceof Error ? err : new Error('Google sign-in prompt failed to open.'));
      }
    }
  });

  return inFlightTokenPromise;
};
