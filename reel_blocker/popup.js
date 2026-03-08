const toggleBtn = document.getElementById('toggleBtn');

// 1. UNIVERSAL API BRIDGE
// This ensures the code works on Chrome, Edge, Brave, and Firefox/Safari
const api = typeof browser !== 'undefined' ? browser : chrome;

// 2. READ INITIAL STATE
// We use the 'api' variable here to be cross-platform
api.storage.local.get(['blockerEnabled'], (result) => {
    // Default is true if it's the first time running
    let isEnabled = result.blockerEnabled !== false; 
    updateButtonVisuals(isEnabled);
});

// 3. TOGGLE LOGIC
toggleBtn.addEventListener('click', () => {
    api.storage.local.get(['blockerEnabled'], (result) => {
        let isEnabled = result.blockerEnabled !== false;
        let newState = !isEnabled;
        
        // Save the new state using the universal 'api'
        api.storage.local.set({ blockerEnabled: newState }, () => {
            updateButtonVisuals(newState);
            
            // 4. SMART RELOAD
            // This refreshes the current Instagram tab to apply/remove the blocker
            api.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                if (tabs[0]) {
                    api.tabs.reload(tabs[0].id);
                }
            });
        });
    });
});

// 5. UI UPDATES
function updateButtonVisuals(isEnabled) {
    if (isEnabled) {
        toggleBtn.textContent = "Disable Blocker";
        toggleBtn.style.backgroundColor = "#d9534f"; // Red for "it's on"
    } else {
        toggleBtn.textContent = "Enable Blocker";
        toggleBtn.style.backgroundColor = "#5cb85c"; // Green for "it's off"
    }
}