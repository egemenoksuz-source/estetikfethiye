// Count contact clicks without sending message text, phone number or treatment name.
document.addEventListener("click", function (event) {
  var link = event.target.closest && event.target.closest("a[href]");
  if (!link || typeof window.gtag !== "function") return;
  var href = link.getAttribute("href");
  var method = href.indexOf("https://wa.me/") === 0 ? "whatsapp" : href.indexOf("tel:") === 0 ? "phone" : null;
  if (method) window.gtag("event", "contact_click", {contact_method: method, transport_type: "beacon"});
});
