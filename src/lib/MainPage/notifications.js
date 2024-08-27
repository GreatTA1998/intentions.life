
export const handleNotificationPermission = () => {
    console.log("Requesting permission...");
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        console.log("Notification permission granted.");
      } else {
        console.error("permision rejected");
      }
    });
  };

  export const handleSW = () => {
    console.log('we are in handleSW');
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/firebase-messaging-sw.js", { type: 'module' })
        
        .then((registration) => {
          console.log(
            "Service Worker registered with scope:",
            registration.scope
          );
        })
        .catch((error) => {
          console.error("Service Worker registration failed:", error);
        });
    } else {
      console.error("Service Worker not supported in this browser.");
    }
  };
  