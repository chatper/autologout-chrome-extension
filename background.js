var fb, gmail, shouldAlert, tabs = [];

chrome.storage.sync.get(['gmail', 'fb', 'timeout', 'alert'], function(response) {
    chrome.idle.setDetectionInterval(0+parseInt(response.timeout));
    fb = response.fb;
    gmail = response.gmail;
    shouldAlert = response.alert;
});

//reload open tabs with fb and gmail
chrome.tabs.query({'url': ['https://www.facebook.com/*', 'https://mail.google.com/*']}, function(tabs_){
    for (var i in tabs_) {
        chrome.tabs.reload(tabs_[i].id);
    }
});

//settings changed
chrome.storage.onChanged.addListener(function () {
    chrome.storage.sync.get(['gmail', 'fb', 'timeout'], function(response) {
        chrome.idle.setDetectionInterval(0+parseInt(response.timeout));
        fb = response.fb;
        gmail = response.gmail;
        if (confirm('Settings changed! Reload open tabs with Facebook or Gmail?')) {
            //reload open tabs with fb and gmail
            chrome.tabs.query({'url': ['https://www.facebook.com/*', 'https://mail.google.com/*']}, function(tabs_){
                for (var i in tabs_) {
                    chrome.tabs.reload(tabs_[i].id);
                }
            });
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
