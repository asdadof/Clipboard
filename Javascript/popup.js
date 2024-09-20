document.addEventListener('DOMContentLoaded', () => {
    const clipboardList = document.getElementById('clipboards');

    // Function to update clipboard items
    function updateClipboardItems() {
        // Clear the current list
        clipboardList.innerHTML = '';

        // Get clipboard items from the background script
        chrome.runtime.sendMessage({action: "getClipboardItems"}, (response) => {
            response.items.forEach((item) => {
                const li = document.createElement('li');
                li.textContent = item;
                clipboardList.appendChild(li);
            });
        });
    }

    // Initial update
    updateClipboardItems();

    // Update clipboard items every 5 seconds (adjust as needed)
    setInterval(updateClipboardItems, 5000);
});
