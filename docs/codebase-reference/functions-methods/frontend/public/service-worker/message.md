# Service worker message event

- **ID:** `frontend:public/service-worker.js:message`
- **Source:** `frontend/public/service-worker.js`, `message` listener.
- **Identity:** Service-worker message callback.
- **Inputs:** `ExtendableMessageEvent`; checks `event.data.type`.
- **Purpose (simple Hinglish):** Page se explicit update approval milne par waiting service worker ko activate karta hai.
- **Execution:** If message type equals `SKIP_WAITING`, calls `self.skipWaiting()`; otherwise does nothing.
- **Output:** No direct value.
- **Dependencies/caller:** Called by the browser on client messaging; `PwaExperience` sends the recognized message after user taps Update.
- **Side effects:** Can trigger worker activation and subsequent client `controllerchange` reload.
- **Failure/security:** Only recognizes a fixed string operation; no data payload is processed.
- **Maintenance/tests:** Keep message string synchronized with PWA UI; update prompt path was statically inspected, no automated worker unit test exists.
