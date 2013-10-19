var siteBlackList = JSON.parse("[]");
if(localStorage.getItem("site_black_list")) {
  siteBlackList = JSON.parse( localStorage.getItem("site_black_list") );
  for(var i = 0; i < siteBlackList.length; i++) console.log(siteBlackList[i].url);
}

chrome.runtime.sendMessage({reqMessage: "", blackListUrl: document.URL}, function(response) {
	var isBlackListed = response.resMessage;
	if(!isBlackListed) injectHish();
});

function injectHish(){
	var bodyTagId = "";
	bodyTagId = document.body.id;
	if(bodyTagId == ""){
		bodyTagId = "body_container";
		document.body.id = bodyTagId;
	}
	$( "#"+bodyTagId ).hish();
}