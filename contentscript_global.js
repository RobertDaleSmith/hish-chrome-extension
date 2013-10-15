var bodyTagId = "";
bodyTagId = document.body.id;
if(bodyTagId == ""){
	bodyTagId = "body_container";
	document.body.id = bodyTagId;
}
$( "#"+bodyTagId ).hish();