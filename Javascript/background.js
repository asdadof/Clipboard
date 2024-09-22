chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action == "addToClipboard") {
        chrome.storage.local.get(['clipboardItems'], (result) => {
            let clipboardItems = result.clipboardItems || [];
            if (!clipboardItems.includes(request.text)) {
                clipboardItems.push(request.text);
                chrome.storage.local.set({ clipboardItems: clipboardItems }, () => {
                    sendResponse({ success: true });
                    chrome.runtime.sendMessage({action: "updateClipboardItems"});
                });
            } else {
                sendResponse({ success: false, message: "Item already in clipboard" });
            }
        });
        return true;
    } else if (request.action == "getClipboardItems") {
        chrome.storage.local.get(['clipboardItems'], (result) => {
            sendResponse({ items: result.clipboardItems || [] });
        });
        return true; 
    } else if (request.action == 'resetClipboardHistory') {
        chrome.storage.local.set({ clipboardItems: [] }, () => {
            sendResponse({ success: true });
            chrome.runtime.sendMessage({action: "updateClipboardItems"});
        });
        return true;
    }
});