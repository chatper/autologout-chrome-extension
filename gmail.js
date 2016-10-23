//register tab id
chrome.runtime.sendMessage({msg: "registerTabId", from: "gmail"});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.msg == "logout") {
        logout(request.alert);
    }
});

function logout(shouldAlert) {
    //get the logout menu element
    var results = document.evaluate( '//*[@id="gb_71"]', document,  null, XPathResult.ANY_TYPE, null );
    
    //not logged in -> do nothing
    if (!results) return;
    
    //click on logout button
    var timeout = setTimeout(function() {
        var logoutBtn = results.iterateNext();
        if (logoutBtn) logoutBtn.click();
    }, 2000);
    if (shouldAlert) {
        alert('Click to cancel autologoff');
        clearTimeout( timeout );
    }
}
