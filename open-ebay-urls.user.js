// ==UserScript==
// @name         Open URLs
// @namespace    https://www.example.com
// @version      1.0
// @description  Open multiple URLs in new tabs with progress display
// @match        file:///*/*open-urls*
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  // Get the start button and the URLs textarea
  const startButton = document.getElementById("start-button");
  const urlsTextarea = document.getElementById("urls");

  // Add a click event listener to the start button
  startButton.addEventListener("click", () => {
    // Get the URLs from the textarea
    const urls = urlsTextarea.value.split("\n").filter(url => url.trim() !== "");

    // Initialize the progress to 0%
    let progress = 0;
    updateProgress(progress);

    // Loop through the URLs and open them one by one
    for (let i = 0; i < urls.length; i++) {
      setTimeout(() => {
        // Open the URL in a new tab
        const tab = window.open(urls[i], "_blank");

        // Check if the tab is focused every 100ms
        const interval = setInterval(() => {
          if (tab && tab.document && tab.document.readyState === "complete") {
            clearInterval(interval);

            // Update the progress
            progress += 100 / urls.length;
            updateProgress(progress);
          }
        }, 100);
      }, i * 5500); // Open each URL every 5.5 seconds
    }
  });

  // Helper function to update the progress
  function updateProgress(progress) {
    const progressSpan = document.getElementById("progress");
    progressSpan.textContent = `${Math.round(progress)}%`;
    document.title = `Opening URLs (${Math.round(progress)}%)`;
  }
})();