document.addEventListener('DOMContentLoaded', () => {
    const resetButton = document.getElementById("resetClipboardHistory");
    resetButton.addEventListener('click', () => {
        chrome.runtime.sendMessage({action: "resetClipboardHistory"});
    });
    const clipboardList = document.getElementById('clipboards');

    function updateClipboardItems() {
        clipboardList.innerHTML = '';
    
        chrome.runtime.sendMessage({action: "getClipboardItems"}, (response) => {
            response.items.slice(-10).reverse().forEach((item) => {
                const li = document.createElement('li');
                
                const button = document.createElement('button');
                button.textContent = item;
                button.classList.add('clipboard-item');
                button.addEventListener('click', (event) => {
                    navigator.clipboard.writeText(item);
                    animateSelection(event.target);
                });
                li.appendChild(button);
    
                clipboardList.appendChild(li);
            });
        });
    }

    function animateSelection(element) {
        element.classList.add('selected');
        setTimeout(() => {
            element.classList.remove('selected');
        }, 1000);
    }

    updateClipboardItems();

    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.action === "updateClipboardItems") {
            updateClipboardItems();
        }
    });
});