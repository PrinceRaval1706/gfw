export function openDirections(lat: number, lng: number) {
  window.open(
    `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`,
    "_blank"
  );
}

export function callNumber(phone: string) {
  window.location.href = `tel:${phone}`;
}

export function openWhatsApp(phoneE164: string, text: string) {
  window.open(
    `https://wa.me/${phoneE164}?text=${encodeURIComponent(text)}`,
    "_blank"
  );
}