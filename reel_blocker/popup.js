const toggleBtn = document.getElementById('toggleBtn');

// Read the current state from storage when the UI opens
chrome.storage.local.get(['blockerEnabled'], (result) => {
    let isEnabled = result.blockerEnabled !== false; // Default is true
    updateButtonVisuals(isEnabled);
});

// Listen for the user clicking the button
toggleBtn.addEventListener('click', () => {
    chrome.storage.local.get(['blockerEnabled'], (result) => {
        let isEnabled = result.blockerEnabled !== false;
        let newState = !isEnabled; // Flip the switch
        
        // Save the new state
        chrome.storage.local.set({ blockerEnabled: newState }, () => {
            updateButtonVisuals(newState);
            // Force Instagram to reload so the script turns on/off
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                chrome.tabs.reload(tabs[0].id);
            });
        });
    });
});

// Update the button colors and text
function updateButtonVisuals(isEnabled) {
    if (isEnabled) {
        toggleBtn.textContent = "Disable Blocker";
        toggleBtn.className = "";
    } else {
        toggleBtn.textContent = "Enable Blocker";
        toggleBtn.className = "active";
    }
}