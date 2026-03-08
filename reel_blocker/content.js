const api = typeof browser !== 'undefined' ? browser : chrome;

api.storage.local.get(['blockerEnabled'], (result) => {
    if (result.blockerEnabled !== false) {
        // Instant CSS Shield
        const style = document.createElement('style');
        style.id = 'focusguard-shield';
        style.innerHTML = 'a[href*="/reels/"], [aria-label="Reels"] { display: none !important; }';
        (document.head || document.documentElement).appendChild(style);

        // DOM Removal Logic
        const enforceFocusPolicy = () => {
            document.querySelectorAll('a[href*="/reels/"]').forEach(el => el.remove());
        };

        enforceFocusPolicy();

        // Continuous Monitoring
        const observer = new MutationObserver(() => enforceFocusPolicy());
        observer.observe(document.body, { childList: true, subtree: true });
    }
});