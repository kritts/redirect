
var createRedirect = function() {
  var value = document.getElementById("newInput").value;
  var url = document.getElementById("url").value;
  console.log("clicked");
  if (url.substring(0, 7) == "http://") {
    url = "http://".concat(url);  // TODO
  }
    
  if(value != undefined &&  value != "" &&  value != " ") {
    document.getElementById("confirmationVal").innerHTML = "Your Redirect was created! <br />" +
      "<b>" + value + "</b>" + " --> " + url; 
    localStorage[value] = url; 
  } 
}
  
window.onload = function() {
  var table = document.getElementById("mainTables");

  for (var key in localStorage) {
    // Create an empty <tr> element and add it to the 1st position of the table:
    var row = table.insertRow(-1);

    // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    // Add some text to the new cells:
    cell1.innerHTML = key;
    cell2.innerHTML = localStorage[key]; 
    cell3.innerHTML = "<button id='" + key + "' class='removeElement'>Remove</button>" 

  }

  var items = document.getElementsByClassName("removeElement");
  for (var i = 0; i < items.length; i++) {
    items[i].onclick = function() {removeRedirect(this);}
  } 
}

 
var removeRedirect = function(button) {  
    var key = button.id;
    console.log(button.id); 
    localStorage.removeItem(key);
    chrome.tabs.reload();
}

var button = document.getElementById("new").onclick = createRedirect;
var remove = document.getElementsByClassName("removeElement").onclick = function () {gallerymake();};

