if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/AICoding/p2p4/service-worker.js', { scope: '/AICoding/p2p4/' })
      .then(function(registration) {
          console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch(function(error) {
          console.log('Service Worker registration failed:', error);
      });
}
