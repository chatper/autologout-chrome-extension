var fb, gmail, shouldAlert, tabs = [];

chrome.storage.sync.get(['gmail', 'fb', 'timeout', 'alert'], function(response) {
    chrome.idle.setDetectionInterval(+response.timeout);
    fb = response.fb;
    gmail = response.gmail;
    shouldAlert = response.alert;
});

//settings changed
chrome.storage.onChanged.addListener(function () {
    chrome.storage.sync.get(['gmail', 'fb', 'timeout'], function(response) {
        chrome.idle.setDetectionInterval(+response.timeout);
        fb = response.fb;
        gmail = response.gmail;
        
        for (var i in tabs) {
            chrome.tabs.reload(tabs[i]);
        }
    });
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.msg == "registerTabId") {
        if (request.from == "fb" && !fb ||
            request.from == "gmail" && !gmail) return;
        
        //register tab only once
        var exists = false;
        for (var i in tabs) {
            if (sender.tab.id == tabs[i]) {
                exists = true;
                break;
            }
        }
        if (!exists) {
            tabs.push(sender.tab.id);
            console.log(tabs);
        }
    }
});

chrome.idle.onStateChanged.addListener(function(state) {
    if(state == "idle") {
        for (var i in tabs) {
            chrome.tabs.sendMessage(tabs[i], {msg: "logout", alert: shouldAlert});
        }
        tabs = [];
    }
});

chrome.browserAction.onClicked.addListener(function () {
    chrome.runtime.openOptionsPage();
});
