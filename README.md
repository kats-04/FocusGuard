# FocusGuard: Granular Access Control for Instagram
A Manifest V3 browser extension designed to enforce local focus policies by surgically removing Reels from the Instagram DOM.

## 🚀 Engineering Highlights
* **Policy Enforcement:** Uses a `MutationObserver` to handle dynamic React re-renders in Single Page Applications (SPA).
* **State Management:** Implements `chrome.storage` API to persist user preferences across browser sessions.
* **Security First:** Operates entirely client-side with no external data exfiltration, adhering to the Principle of Least Privilege.

## 🛠️ Installation (Developer Mode)
1. Clone this repository.
2. Navigate to `chrome://extensions/`.
3. Enable **Developer Mode**.
4. Click **Load Unpacked** and select this folder.
