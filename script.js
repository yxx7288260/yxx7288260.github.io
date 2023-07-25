const urlsTextarea = document.querySelector('#urls');
const startBtn = document.querySelector('#start-btn');
const progressDiv = document.querySelector('#progress');

startBtn.addEventListener('click', () => {
  // 获取文本输入框中的所有URL，并以换行符分割
  const urls = urlsTextarea.value.split('\n');
  const totalUrls = urls.length;
  let currentUrlIndex = 0;

  // 定义函数，用于打开URL并更新进度
  const openUrl = (url, progress) => {
    // 计算进度百分比
    const progressStr = `${Math.round((progress / totalUrls) * 100)}%`;
    // 打开URL
    const urlWithProgress = progress === 0 ? `${url}?进度=${progressStr}` : `${url}?打开进度=${progressStr}`;
    window.open(urlWithProgress, '_blank');
    // 更新进度条
    progressDiv.textContent = `Opening ${currentUrlIndex + 1} of ${totalUrls} (${progressStr})`;
  };

  // 定义函数，用于递归地打开URL
  const openNextUrl = () => {
    if (currentUrlIndex >= totalUrls) {
      // 所有URL都已经打开
      progressDiv.textContent = `All URLs opened!`;
      return;
    }
    const url = urls[currentUrlIndex];
    openUrl(url, currentUrlIndex);
    currentUrlIndex++;
    // 5.5秒后打开下一个URL
    setTimeout(openNextUrl, 5500);
  };

  // 开始递归地打开以下是生成violentmonkey代码的JavaScript代码。你可以在本地HTML文件中添加一个按钮，点击该按钮后运行以下代码，生成violentmonkey代码。

```js
// 获取多行文本输入框中的所有URL，并以换行符分割
const urls = document.querySelector('#urls').value.split('\n');

// 生成violentmonkey代码
const script = `
// ==UserScript==
// @name         Open URLs with Progress
// @namespace    http://tampermonkey.net/
// @version      1
// @description  Open multiple URLs with progress in a new tab every 5.5 seconds
// @match        *://*/*
// ==/UserScript==

const urls = ${JSON.stringify(urls)};
const totalUrls = urls.length;
let currentUrlIndex = 0;

// 定义函数，用于打开URL并更新进度
const openUrl = (url, progress) => {
  // 计算进度百分比
  const progressStr = \`\${Math.round((progress / totalUrls) * 100)}%\`;
  // 打开URL
  const urlWithProgress = progress === 0 ? \`\${url}?进度=\${progressStr}\` : \`\${url}?打开进度=\${progressStr}\`;
  window.open(urlWithProgress, '_blank');
};

// 定义函数，用于递归地打开URL
const openNextUrl = () => {
  if (currentUrlIndex >= totalUrls) {
    // 所有URL都已经打开
    return;
  }
  const url = urls[currentUrlIndex];
  openUrl(url, currentUrlIndex);
  currentUrlIndex++;
  // 5.5秒后打开下一个URL
  setTimeout(openNextUrl, 5500);
};
openNextUrl();
`;

// 生成violentmonkey代码的链接
const encodedScript = encodeURIComponent(script);
const vmLink = `javascript:(function(){var%20s=document.createElement('script');s.setAttribute('src','https://cdn.jsdelivr.net/npm/sweetalert2@11.1.0/dist/sweetalert2.all.min.js');s.onload=function(){Swal.fire({title:'Violentmonkey Code',text:'Copy and paste the code below into a new script in Violentmonkey',icon:'info',showCancelButton:true,confirmButtonText:'Copy',showLoaderOnConfirm:true,preConfirm:function(){return new%20Promise(function(resolve,reject){var%20code=document.querySelector('textarea#vm-script').value;if(code===''){reject('No%20code%20found!');}else{resolve(code);}});},}).then(function(result){if(result.isConfirmed){var%20temp=document.createElement('textarea');temp.value=result.value.trim();document.body.appendChild(temp);temp.select();document.execCommand('copy');document.body.removeChild(temp);Swal.fire({title:'Code Copied!',text:'You can now paste the code into a new script in Violentmonkey',icon:'success'});}});};document.body.appendChild(s);var%20vmScript=document.createElement('textarea');vmScript.setAttribute('id','vm-script');vmScript.setAttribute('rows','10');vmScript.style.width='100%';vmScript.value=decodeURIComponent('${encodedScript}');document.body.appendChild(vmScript);})();`;

// 在新窗口中显示violentmonkey代码的链接
window.open(vmLink, '_blank');
