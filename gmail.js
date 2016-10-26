//register tab id
chrome.runtime.sendMessage({msg: "registerTabId", from: "gmail"});

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
    var results = document.evaluate( '//*[@id="gb_71"]', document,  null, XPathResult.ANY_TYPE, null );
    
    //not logged in -> do nothing
    if (!results) return;
    
    //click on logout button
    var logoutBtn = results.iterateNext();
    if (logoutBtn) logoutBtn.click();
}
