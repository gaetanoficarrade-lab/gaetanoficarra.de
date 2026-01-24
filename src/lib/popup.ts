/**
 * Opens a URL in a centered popup window
 */
export const openPopup = (url: string, name = "popup", width = 600, height = 700) => {
  const left = (window.innerWidth - width) / 2 + window.screenX;
  const top = (window.innerHeight - height) / 2 + window.screenY;
  
  window.open(
    url,
    name,
    `width=${width},height=${height},left=${left},top=${top},scrollbars=yes,resizable=yes`
  );
};

export const BOOKING_URLS = {
  erstgespraech: "https://lp.gaetanoficarra.de/highlevel-erstgespraech",
  supportCall: "https://lp.gaetanoficarra.de/support_call",
} as const;
