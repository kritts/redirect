'use strict';

// This event is fired each time the user updates the text in the omnibox,
// as long as the extension's keyword mode is still active.
chrome.omnibox.onInputChanged.addListener(
  function(text, suggest) {
    var url = localStorage[text];
    if(url == undefined) {
        chrome.omnibox.setDefaultSuggestion({"description" : "No redirect found."});
    } else {
        chrome.omnibox.setDefaultSuggestion({"description" : "Redirecting you to: " + localStorage[text]});
    }
  }
);

// This event is fired with the user accepts the input in the omnibox.
chrome.omnibox.onInputEntered.addListener(
  function(text) {
    var urlval = localStorage[text];
    console.log(urlval);
    if(urlval != undefined) { 
        chrome.tabs.update({ url: urlval});   
    }
  }
);
