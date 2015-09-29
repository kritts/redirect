
var createRedirect = function() {
  var value = document.getElementById("newInput").value;
  var url = document.getElementById("url").value;

  if (url.substring(0, 7) == "http://") {
    url = "http://".concat(url);  // TODO
  }
    
  if(value != undefined &&  value != "" &&  value != " ") {
    document.getElementById("confirmationVal").innerHTML = "Your Redirect was created! <br />" +
      "<b>" + value + "</b>" + " --> " + url;
    console.log(value + " --> " + url);
    localStorage[value] = url; 
  } 
}

window.onload = function() {
  for (var key in localStorage) {
    console.log(key + ":\t" + localStorage[key]);
  }
};
 
  

var button = document.getElementById("new").onclick = createRedirect;

