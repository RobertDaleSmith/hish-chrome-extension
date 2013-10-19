chrome.runtime.sendMessage({reqMessage: ""}, function(response) {
	var prevHighlightedText = response.resMessage;
	if(prevHighlightedText != ""){
		document.getElementsByTagName("textarea")[0].focus();		
		setTimeout(function(){ 
			var stringToPost = '"' + prevHighlightedText + isLastCharPunct(prevHighlightedText) +'"';
			document.getElementsByTagName("textarea")[0].value = stringToPost; 
			document.getElementsByTagName("textarea")[0].select();
			$(".mentionsHidden").attr("value", stringToPost);
		},10);	
	}
});

function isLastCharPunct(slectedText){
	var hasPunctAtEnd = false;
	if( slectedText[slectedText.length-1] == '.' || slectedText[slectedText.length-1] == '?' ||
		slectedText[slectedText.length-1] == ',' || slectedText[slectedText.length-1] == '!' || 
		slectedText[slectedText.length-1] == '…' || slectedText[slectedText.length-1] == ')' || 
		slectedText[slectedText.length-1] == '"' || slectedText[slectedText.length-1] == '*') hasPunctAtEnd = true;
	if(hasPunctAtEnd) return "";
	else return "…"
}