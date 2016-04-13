/* global window, console, document, chrome */

// Functions shared between pages.
'use strict';

var scoped = function() {

  var MSG_SAVE_FAIL = 'Your direct was not saved: ';
  var MSG_SAVE_SUCCESS = 'Your redirect was created!<br>';
  var MSG_BAD_KEY = 'Redirects must be alphanumeric.';

  // The public object we are going to expose on window.
  var pub = {};

  /**
   * Returns true if str is a valid key, else returns false.
   */
  pub.isValidKey = function isValidKey(str){
    if (!str) {
      // null, '', and undefined checking. Must be truthy.
      return false;
    }
    var alphanumericRegex = /^[a-zA-Z0-9]+$/;
    return alphanumericRegex.test(str);
  };

  pub.alertIsInvalidKey = function alertIsInvalidKey() {
    pub.setMessage(MSG_BAD_KEY);
  };

  /**
   * Sets msg to be displayed to the user. If msg is not truthy, does nothing.
   * This uses .innerHTML, permitting styling, but also requiring the caller to
   * escape the message as necessary.
   *
   * This function expects confirmation to occur in an element with the id
   * '_confirmation'. The underscore is important as it is illegal in keys,
   * ensuring that keys are safe to use as id values in HTML elements.
   */
  pub.setMessage = function setMessage(msg) {
    var confirmationElId = '_confirmation';
    if (!msg) {
      console.log('untruthy str passed to setMessage: ' + msg);
      return;
    }
    document.getElementById('_confirmation').innerHTML = msg;
  };

  /**
   * Save the redirect. It is the caller's responsibility to ensure that the
   * key is valid and safe for storage.
   *
   * success is an optional callback called on success
   */
  pub.saveRedirect = function(key, value, success) {
    var keyValue = {};
    keyValue[key] = value;
    chrome.storage.sync.set(keyValue, function() {
      if (chrome.runtime.lastError) {
        // Something went wrong saving.
        pub.setMessage(MSG_SAVE_FAIL + chrome.runtime.lastError);
      } else {
        pub.setMessage(MSG_SAVE_SUCCESS + key + ' --> ' + value);
        if (success) {
          // invoke if present
          success();
        }
      }
    });
  };

  return pub;
};

window.commonFunctions = scoped();
