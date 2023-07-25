const urlsTextarea = document.getElementById("urls");
const startBtn = document.getElementById("start-btn");
const progressDiv = document.getElementById("progress");

startBtn.addEventListener("click", async () => {
    const urls = urlsTextarea.value.trim().split(/\s+/);
    if (!urls.length) return;
    startBtn.disabled = true;
    progressDiv.textContent = "0%";

    const interval = 5500; // in milliseconds
    const total = urls.length;
    let count = 0;

    for (const url of urls) {
        await new Promise(resolve => setTimeout(resolve, interval));
        const tab = window.open(url, "_blank");
        const checkTab = setInterval(() => {
            if (tab.closed) {
                clearInterval(checkTab);
                count++;
                const percentage = Math.floor((count / total) * 100);
                progressDiv.textContent = `${percentage}%`;
                if (count === total) {
                    startBtn.disabled = false;
                }
            }
        }, 1000);
    }
});