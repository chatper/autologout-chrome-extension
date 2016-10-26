// Saves options to chrome.storage.sync.
function save_options() {
  var fb = document.getElementById('fb').checked;
  var gmail = document.getElementById('gmail').checked;
  var timeout = document.getElementById('timeout').value;
  var units = document.getElementById('units').value;
  var alrt = document.getElementById('alert').checked;
  if (units == 'min') timeout *= 60;
  if (units == 'sec' && timeout < 20) timeout = 20;
  
  chrome.storage.sync.set({
    fb: fb,
    gmail: gmail,
    timeout: timeout,
    alert: alrt
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 2000);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  chrome.storage.sync.get({
    fb: true,
    gmail: true,
    timeout: 600,
    alert: true
  }, function(items) {
    document.getElementById('fb').checked = items.fb;
    document.getElementById('gmail').checked = items.gmail;
    document.getElementById('timeout').value = items.timeout;
    document.getElementById('units').value = 'sec';
    document.getElementById('alert').checked = items.alert;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
