export const CLAIM_PORTAL_URL = "https://reunify.ufaa.go.ke";
export const HOLDERS_PORTAL_URL = "https://holders.ufaa.go.ke";
export const CAREERS_SITE_URL = "https://careers.ufaa.go.ke";
export const WHATSAPP_URL = "https://wa.me/254140100100?text=Hi";

export function normalizeClaimPortalUrl(value?: string | null) {
  if (!value) return CLAIM_PORTAL_URL;
  return value.replace(/^https?:\/\/reunify\.ufaa\.go\.ke(?=\/|$)/i, CLAIM_PORTAL_URL);
}

export function normalizeHoldersPortalUrl(value?: string | null) {
  if (!value || value === "/holders/login") return HOLDERS_PORTAL_URL;
  return value.replace(/^https?:\/\/holders\.ufaa\.go\.ke(?:\/.*)?$/i, HOLDERS_PORTAL_URL);
}
