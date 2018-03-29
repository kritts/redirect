/* global chrome, console */
'use strict';

// This event is fired each time the user updates the text in the omnibox,
// as long as the extension's keyword mode is still active.
chrome.omnibox.onInputChanged.addListener(function(text, suggest) {
  chrome.storage.sync.get(text, function(items) {
    var value = items[text];
    if (value) {
      // We found something.
      chrome.omnibox.setDefaultSuggestion(
        {'description' : 'Redirecting you to: ' + value}
      );
    } else {
      // Nothing was found.
      chrome.omnibox.setDefaultSuggestion(
        {'description' : 'No redirect found.'}
      );
    }
  });
});

// This event is fired when the user accepts the input in the omnibox.
// It opens the redirect that the user-given key maps to. 
chrome.omnibox.onInputEntered.addListener(function(text) {
  chrome.storage.sync.get(text, function(items) {
    var urlVal = items[text];
    console.log('url: ' + urlVal);
    if(urlVal) { 
      chrome.tabs.update({url: urlVal});   
    }
  });
});
