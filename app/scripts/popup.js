'use strict';

// This is the script that is called when a new shortened url is created.
// It stores the shortened url of the user.
var currentTab;

var saveData = function() {
    var value = document.getElementById("inputval").value;
     
    document.getElementById("confirmation").innerHTML = "Your Redirect was created! <br />" +
        "<b>" + value + "</b>" + " --> " + currentTab;
    console.log(value + " --> " + currentTab);
    localStorage[value] = currentTab; 
}

chrome.tabs.getSelected(null, function(tab) {
    currentTab = tab.url;
});

var openSettings = function() {
	chrome.tabs.create({
    	url: 'settings.html'
  	});
}

document.querySelector('#settings').addEventListener('click', openSettings);
document.querySelector('#submit').addEventListener('click', saveData);