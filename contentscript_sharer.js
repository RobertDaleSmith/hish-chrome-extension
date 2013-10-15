chrome.runtime.sendMessage({reqMessage: ""}, function(response) {
	var prevHighlightedText = response.resMessage;
	if(prevHighlightedText != ""){
		document.getElementsByTagName("textarea")[0].focus();		
		setTimeout(function(){ 
			document.getElementsByTagName("textarea")[0].value = prevHighlightedText; 
			document.getElementsByTagName("textarea")[0].select();
		},10);	
	}
});