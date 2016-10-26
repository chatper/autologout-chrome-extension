document.getElementById("code").addEventListener("click", function() {
    chrome.tabs.create({url:"https://github.com/chatper/autologout-chrome-extension"});
});

document.getElementById("settings").addEventListener("click", function() {
    chrome.runtime.openOptionsPage();
});
