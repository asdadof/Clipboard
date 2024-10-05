chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (chrome.runtime.lastError) {
        console.error("Extension context invalidated:", chrome.runtime.lastError.message);
        return;
    }
    switch (request.action) {
        case "addClipboardItem":
            handleAddToClipboard(request, sendResponse);
            break;
        case "getClipboardItems":
            handleGetClipboardItems(sendResponse);
            break;
        case "resetClipboardHistory":
            handleResetClipboardHistory(sendResponse);
            break;
    }

    return true;
});

function handleAddToClipboard(request, sendResponse) {
    chrome.storage.local.get(['clipboardItems']).then(result => {
        let clipboardItems = result.clipboardItems || [];
        if (!clipboardItems.includes(request.clipboardItems)) {
            clipboardItems.push(request.clipboardItems);
            return chrome.storage.local.set({ clipboardItems: clipboardItems });
        } else {
            throw new Error("Item already in clipboard");
        }
    }).then(() => {
        sendResponse({ success: true });
        return chrome.runtime.sendMessage({action: "updateClipboardItems"});
    }).then(response => {
        console.log("Message sent successfully:", response);
    }).catch(error => {
        sendResponse({ success: false, message: error.message });
    });
}

function handleGetClipboardItems(sendResponse) {
    chrome.storage.local.get(['clipboardItems']).then(result => {
        sendResponse({ items: result.clipboardItems || [] });
    }).catch(error => {
        console.error("Error getting clipboard items:", error);
        sendResponse({ items: [] });
    });
}

function handleResetClipboardHistory(sendResponse) {
    chrome.storage.local.set({ clipboardItems: [] }).then(() => {
        sendResponse({ success: true });
        return chrome.runtime.sendMessage({action: "updateClipboardItems"});
    }).then(response => {
        console.log("Message sent successfully:", response);
    }).catch(error => {
        console.error("Error resetting clipboard history:", error);
        sendResponse({ success: false, message: error.message });
    });
}