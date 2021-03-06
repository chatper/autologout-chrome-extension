//register tab id
chrome.runtime.sendMessage({msg: "registerTabId", from: "fb"});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.msg == "logout") {
        if (request.alert == true) {
            if (confirm('Do you want to stay logged in?')) {
                //logout cancelled -> re-register tab id
                chrome.runtime.sendMessage({msg: "registerTabId", from: "fb"});
                return;
            }
        }
        logout();
    }
});

function logout() {
    //get the logout menu element
    var results = document.evaluate( '//a[@id="pageLoginAnchor"]', document,  null, XPathResult.ANY_TYPE, null );
    
    //not logged in -> do nothing
    if (!results) return;
    
    //logged in -> click on logout menu
    var logoutMenu = results.iterateNext();
    if (logoutMenu) logoutMenu.click();
        
    //click on logout button
    setTimeout(function() {
        results = document.evaluate( '//*[@id="show_me_how_logout_1"]/ancestor::a', document, null, XPathResult.ANY_TYPE, null );
        var logoutBtn = results.iterateNext();
        if (logoutBtn) logoutBtn.click();
    }, 1000);
}
