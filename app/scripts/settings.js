/* global document, chrome, window, console */
'use strict';

var commonFunctions = window.commonFunctions;

var nonusableKeys = new Set(["clear", "getItem", "key", "length", 
                            "removeItem", "setItem"]);

// This script contains logic for the settings page. It allows users to 
// create new directs and delete ones. 

var addRemoveListeners = function addRemoveListeners() {
  var removers = document.getElementsByClassName('removeElement');
  for (var i = 0; i < removers.length; i++) {
    var element = removers[i];
    element.addEventListener('click', function(item) {
      removeRedirect(this);
    });
  }
};

var populateRedirects = function populateRedirects() {
  // First remove all existing rows. Important for updating after manually
  // creating a redirect while on the settings page.
  var table = document.getElementById('mainTables');
  while (table.firstChild) {
    table.removeChild(table.firstChild);
  }

  // Pass in null to get all the items saved in sync storage. The callback
  // function is invoked with an object full of key->redirect mappings.
  chrome.storage.sync.get(null, function(items) {
    for (var key in items) {

      // quick fix
      if (nonusableKeys.has(key)) {
        continue;
      }
      // check hasOwnProperty to make sure it's a key and doesn't come from the
      // prototype
      if (items.hasOwnProperty(key) && !commonFunctions.isPrivateKey(key)) {
        // Creates an empty table row and adds it to the first position of the
        // table
        var row = table.insertRow(-1);

        // Insert three new cells into the new table row
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);

        // Populates the new cells with text and a delete button
        cell1.innerHTML = key;
        cell2.innerHTML = items[key];
        cell3.innerHTML = '<button id="' + key +
          '" class="removeElement btn btn-outline-danger btn-sm" >Remove</button>';
      }
    }

    addRemoveListeners();
  });
};

// Displays saved redirects in a table.
window.onload = function() {
  populateRedirects();
};

// Removes the key, redirect, and row in the table and refreshes the page so that
// the table of redirects is updated.
var removeRedirect = function removeRedirect(button) {  
  var key = button.id;
  console.log('Deleting ' + button.id); 
  chrome.storage.sync.remove(button.id);
  populateRedirects();
};

document.querySelector('#new').addEventListener('click', commonFunctions.createRedirectSettings);
document.querySelector('#overwrite').addEventListener('click',  commonFunctions.saveDataGuarantee);
document.querySelector('#cancel').addEventListener('click', commonFunctions.cancel);
