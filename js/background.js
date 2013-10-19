var recentSelectedText = "";
function onRequest(request, sender, sendResponse) {
	if(request.blackListUrl){
		var urlToCheck = request.blackListUrl;


		sendResponse({resMessage: isSiteBlackListed(urlToCheck) });
	} else {
		if(request.reqMessage != "") recentSelectedText = request.reqMessage;
		sendResponse({resMessage:recentSelectedText});
		if(request.reqMessage == "") recentSelectedText = "";	
	}

	
};
chrome.runtime.onMessage.addListener(onRequest);

function isSiteBlackListed(url) {
	var siteIsBlackListed = false;
	var siteBlackList = JSON.parse("[]");
	if(localStorage.getItem("site_black_list")) {
	  siteBlackList = JSON.parse( localStorage.getItem("site_black_list") );
	  for(var i=0 ; i < siteBlackList.length ; i++) {
	  	var blackListedDomain = siteBlackList[i].url.replaceAll("http://","").replaceAll("https://","").replaceAll("ftp://","");
	  	if(url.indexOf(blackListedDomain) != -1) siteIsBlackListed = true;
	  }
	}
	return siteIsBlackListed;
}

String.prototype.replaceAll = function( token, newToken, ignoreCase ) {
    var _token, str = this + "", i = -1;
    if ( typeof token === "string" ) {
        if ( ignoreCase ) {
            _token = token.toLowerCase();
            while( ( i = str.toLowerCase().indexOf( token, i >= 0 ? i + newToken.length : 0 ) ) !== -1 ) 
            	{ str = str.substring( 0, i ) + newToken + str.substring( i + token.length ); }
        } else return this.split( token ).join( newToken );
    }
    return str;
};