document.addEventListener('copy', (e) => {
    const selectedText = window.getSelection().toString().trim();
    const copiedData = { text: selectedText };
    
    e.preventDefault();

    if (selectedText) {
        e.clipboardData.setData('text/plain', selectedText);
        copiedData.text = selectedText;
    }
    chrome.runtime.sendMessage({action: "addToClipboard", text: selectedText});
});
