/* global document, console, chrome, setTimeout, window */
'use strict';

// This script is called when the user creates a new redirect.
// It maps the user-given key to a redirect. 
var currentTab;

var commonFunctions = window.commonFunctions;


// Called when a user wants to save a key as a redirect to the currently open tab.
// If the key is not undefined or empty, it is saved.
var saveData = function saveData() {
    var given_key = document.getElementById("inputval").value;
    if (!commonFunctions.isValidKey(given_key)) {
      commonFunctions.alertIsInvalidKey();
      return;
    }
    commonFunctions.saveRedirect(given_key, currentTab);
};

// Updates the variable that keeps track of the current tab.
chrome.tabs.getSelected(null, function(tab) {
    currentTab = tab.url;
});

// Opens the settings page.
var openSettings = function() {
  chrome.tabs.create({
    url: 'settings.html'
  });
};

document.querySelector('#submit').addEventListener('click', saveData);
document.querySelector('#settings').addEventListener('click', openSettings);

// Focus on the text box for immediate typing. We have to set a timeout because
// without one the focus change doesn't take. It seems like this is because the
// popup isn't completely rendered when we're trying to act on it. This 100ms
// timeout feels instantaneous to the user but lets the page render first.
setTimeout(function foo() {
  document.getElementById('inputval').focus();
}, 100);
