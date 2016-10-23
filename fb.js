//register tab id
chrome.runtime.sendMessage({msg: "registerTabId", from: "fb"});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.msg == "logout") {
        logout(request.alert);
    }
});

function logout(shouldAlert) {
    //get the logout menu element
    var results = document.evaluate( '//a[@id="pageLoginAnchor"]', document,  null, XPathResult.ANY_TYPE, null );
    
    //not logged in -> do nothing
    if (!results) return;
    
    //logged in -> click on logout menu
    var logoutMenu = results.iterateNext();
    if (logoutMenu) logoutMenu.click();
        
    //click on logout button
    var timeout = setTimeout(function() {
        results = document.evaluate( '//ul[contains(@class, "_54nf")]/li[12]/a', document, null, XPathResult.ANY_TYPE, null );
        var logoutBtn = results.iterateNext();
        if (logoutBtn) logoutBtn.click();
    }, 2000);
    if (shouldAlert) {
        alert('Click to cancel autologoff');
        clearTimeout( timeout );
    }
}
