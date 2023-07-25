const urls = document.getElementById("urls");
const startBtn = document.getElementById("start-btn");

function openUrls() {
  const urlList = urls.value.trim().split("\n");
  let progress = 0;
  for (let i = 0; i < urlList.length; i++) {
    const url = urlList[i];
    const progressString = `?打开进度=${progress}%`;
    const progressUrl = i === 0 ? `${url}?进度=0%` : `${url}${progressString}`;
    window.open(progressUrl);
    progress += Math.round(100 / urlList.length);
    if (i < urlList.length - 1) {
      setTimeout(() => {
        window.focus();
      }, 5500);
    }
  }
}

startBtn.addEventListener("click", openUrls);