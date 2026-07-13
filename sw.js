// Minimal Web Push service worker — no framework, no third-party SDK.
self.addEventListener("push", (event) => {
  let data = { title: "Confluo", body: "You have a new update." };
  try {
    data = event.data.json();
  } catch {
    // non-JSON payload — fall back to defaults above
  }
  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: "/icon-192.png",
      badge: "/icon-192.png",
    })
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(clients.openWindow("/notifications"));
});
