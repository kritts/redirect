
var createRedirect = function() {
    var value = document.getElementById("newInput").value;
    var url = document.getElementById("url").value;
     
    document.getElementById("confirmationVal").innerHTML = "Your Redirect was created! <br />" +
        "<b>" + value + "</b>" + " --> " + url;
    console.log(value + " --> " + url);
    localStorage[value] = url; 
}


var newUrl = function() { 
    var val = document.getElementById("newInput").value;
    var url = document.getElementById("url").value;
    if(val != undefined && val != "" && url != undefined && url != "") { 
        localStorage[value] = url;
    }
}

{
 // not sure if this is the best way to get data
    var i = 0,
            oJson = {},
                sKey;
    for (; sKey = window.localStorage.key(i); i++) {
            oJson[sKey] = window.localStorage.getItem(sKey);
    }



}




var button = document.getElementById("new").onclick = createRedirect;

