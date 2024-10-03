document.addEventListener('copy', (e) => {
    const selectedText = window.getSelection().toString().trim();
    const copiedData = { text: selectedText };

    e.preventDefault();

    if (selectedText) {

        e.clipboardData.setData('text/plain', selectedText);


        try {
            const url = new URL(selectedText); 
            e.clipboardData.setData('text/uri-list', url.href); 
        } catch (error) {
        }

        copiedData.text = selectedText;
    }


    chrome.runtime.sendMessage({ action: "addToClipboard", text: selectedText });
});
