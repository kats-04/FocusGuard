// Check the saved policy before executing the payload
chrome.storage.local.get(['blockerEnabled'], (result) => {
    if (result.blockerEnabled !== false) {
        
        // 1. Inject CSS dynamically to hide it instantly
        const style = document.createElement('style');
        style.innerHTML = 'a[href*="/reels/"] { display: none !important; }';
        document.head.appendChild(style);

        // 2. The DOM manipulation logic
        const enforceFocusPolicy = () => {
            document.querySelectorAll('a[href*="/reels/"]').forEach(el => el.remove());
        };

        enforceFocusPolicy();

        // 3. Monitor for changes
        const observer = new MutationObserver(() => enforceFocusPolicy());
        observer.observe(document.body, { childList: true, subtree: true });
    }
});