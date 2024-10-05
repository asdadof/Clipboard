document.addEventListener('copy', (event) => {
    const selectedText = document.getSelection().toString().trim();
    event.clipboardData.setData('text/plain', selectedText);
    event.preventDefault();
    if (!selectedText) {
        return;
    }
    if (chrome.runtime && chrome.runtime.sendMessage) {
        chrome.runtime.sendMessage({ action: "addClipboardItem", clipboardItems: selectedText }, (response) => {
            if (chrome.runtime.lastError) {
                console.error("Error sending message:", chrome.runtime.lastError.message);
            }
        });
    } else {
        console.error("chrome.runtime or chrome.runtime.sendMessage is not available");
    }
});

document.addEventListener('contextmenu', (event) => {
    const target = event.target;
    console.log(event.target);
    if (target.tagName === 'A' && event.button === 2) {
        const linkUrl = target.href;
        if (chrome.runtime && chrome.runtime.sendMessage) {
            chrome.runtime.sendMessage({ action: "addClipboardItem", clipboardItems: linkUrl }, (response) => {
                if (chrome.runtime.lastError) {
                    console.error("Error sending message:", chrome.runtime.lastError.message);
                }
            });
        } else {
            console.error("chrome.runtime or chrome.runtime.sendMessage is not available");
        }
    }
});