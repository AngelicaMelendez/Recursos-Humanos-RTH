export const TOKEN_KEY = "rh_hidalgo_token";
export const USER_KEY = "rh_hidalgo_user";

const LEGACY_TOKEN_KEYS = ["token"];
const LEGACY_USER_KEYS = ["user"];

function parseStoredUser(rawUser) {
  if (!rawUser) {
    return null;
  }

  try {
    return JSON.parse(rawUser);
  } catch {
    return null;
  }
}

function removeKeyFromStorages(key) {
  localStorage.removeItem(key);
  sessionStorage.removeItem(key);
}

export function clearStoredAuth() {
  [TOKEN_KEY, USER_KEY, ...LEGACY_TOKEN_KEYS, ...LEGACY_USER_KEYS].forEach(removeKeyFromStorages);
}

export function readStoredAuth() {
  return {
    token: localStorage.getItem(TOKEN_KEY) || "",
    user: parseStoredUser(localStorage.getItem(USER_KEY))
  };
}

export function writeStoredAuth({ token, user }) {
  clearStoredAuth();

  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  }

  if (user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }
}
