var recentSelectedText = "";
function onRequest(request, sender, sendResponse) {
  if(request.reqMessage != "") recentSelectedText = request.reqMessage;
  sendResponse({resMessage:recentSelectedText});
  if(request.reqMessage == "") recentSelectedText = "";
};
chrome.runtime.onMessage.addListener(onRequest);