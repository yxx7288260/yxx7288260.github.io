// ==UserScript==
// @name         Open eBay URLs
// @namespace    https://example.com
// @version      1
// @description  Open eBay URLs in separate tabs with progress indication
// @match        file:///path/to/index.html
// ==/UserScript==

const startBtn = document.getElementById("start-btn");
startBtn.addEventListener("click", () => {
    const urlsTextarea = document.getElementById("urls");
    const urls = urlsTextarea.value.trim().split(/\s+/);
    if (!urls.length) return;
    startBtn.disabled = true;
    const interval = 5500; // in milliseconds
    const total = urls.length;
    let count = 0;

    for (const url of urls) {
        setTimeout(() => {
            window.open(url, "_blank");
            count++;
            const percentage = Math.floor((count / total) * 100);
            document.title = `(${percentage}%) Open eBay URLs`;
            if (count === total) {
                startBtn.disabled = false;
            }
        }, interval * count);
    }
});