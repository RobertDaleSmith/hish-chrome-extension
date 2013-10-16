chrome.runtime.sendMessage({reqMessage: ""}, function(response) {
	var prevHighlightedText = response.resMessage;
	if(prevHighlightedText != ""){
		document.getElementsByTagName("textarea")[0].focus();		
		setTimeout(function(){ 
			document.getElementsByTagName("textarea")[0].value = '"' + prevHighlightedText + isLastCharPunct(prevHighlightedText) +'"'; 
			document.getElementsByTagName("textarea")[0].select();
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