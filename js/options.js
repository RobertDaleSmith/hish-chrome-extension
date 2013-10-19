//Init blacklist local var and pull from localstorage if found.
var siteBlackList = JSON.parse("[]");
if(localStorage.getItem("site_black_list")) {
  siteBlackList = JSON.parse( localStorage.getItem("site_black_list") );
  for(var i = 0; i < siteBlackList.length; i++) addBlackSiteItemEl(siteBlackList[i].url);
} else {
  loadDefaultBlackList();
}

var addSiteDialogActive = false;
$("#add_blacklist_site, #cancel_blacklist_site").click(toggleAddSiteDialog);

function toggleAddSiteDialog() {
  if(!addSiteDialogActive){
    $("#add_blacklist_site").css("display","none");
    $("#cancel_blacklist_site").css("display","block");
    $("#blacklist_table_body").prepend( getAddSiteDialogEl("") );
    $("#save_blacklist_site").click(saveButtonClick);
    $("#new_black_list_input").keydown(function(e){  if(e.keyCode == 13) { saveButtonClick(); } else if(e.keyCode == 27) { toggleAddSiteDialog(); }  });
    $("#new_black_list_input").focus();
    addSiteDialogActive = true;
  } else {
    closeAddBlackListSiteDialog();
    $("#add_blacklist_site").focus();
  }
}

function saveButtonClick() {
  var siteUrl = stripHTML(document.getElementById("new_black_list_input").value);  
  if(isUrlValid(siteUrl)){
    closeAddBlackListSiteDialog();
    if(!alreadyInBlackList(siteUrl)){
      addBlackListedSite(siteUrl);
    }
    $("#add_blacklist_site").focus();
  } else {
    if(!siteUrl.lastIndexOf("http://", 0) == 0 && !siteUrl.lastIndexOf("https://", 0) == 0 && !siteUrl.lastIndexOf("ftp://", 0) == 0)
      if(isUrlValid("http://" + siteUrl)) document.getElementById("new_black_list_input").value = "http://" + siteUrl;
    //Flash border red on input to indicate input error.
    $("#new_black_list_input").css("border-color","rgb(255, 0, 0)");
    setTimeout(function(){ $("#new_black_list_input").css("border-color","rgb(223, 223, 223)");
    setTimeout(function(){ $("#new_black_list_input").css("border-color","rgb(255, 0, 0)");
    setTimeout(function(){ $("#new_black_list_input").css("border-color","rgb(223, 223, 223)");
    setTimeout(function(){ $("#new_black_list_input").css("border-color","rgb(255, 0, 0)");
    setTimeout(function(){ $("#new_black_list_input").css("border-color","rgb(223, 223, 223)");
    },250); },250); },250); },250); },250);
  }
}

function alreadyInBlackList(url){
  for(var i=0 ; i < siteBlackList.length ; i++){
      //UPDATE IF ELEMENT FOUND WITH MATCHING URL
      if(siteBlackList[i].url == url) return true;
  }
  return false;
}

function loadDefaultBlackList(){
  addBlackListedSite("http://hishjs.pancakeapps.com/");
  addBlackListedSite("https://medium.com/");
}

function addBlackListedSite(url){
  addBlackSiteItemEl(url);
  saveBlackListedSite(url);
}

function saveBlackListedSite(url){  
  var jsonObjectString = '{ "url" : "' + url + '" }';
  var jsonObject = JSON.parse(jsonObjectString);
  siteBlackList.push(jsonObject);  
  siteBlackList.sort(function (a, b) {
      if (a.url < b.url)      { return -1; }
      else if (a.url > b.url) { return 1;  }
      return 0;
  });
  localStorage.setItem("site_black_list", JSON.stringify(siteBlackList));
}

function deleteButtonClick(id){
  var url = $('.black_listed_url', "#"+id).text();
  for(var i=0 ; i < siteBlackList.length ; i++){        
      if(siteBlackList[i].url == url){
          siteBlackList.splice(i, 1);
          localStorage.setItem("site_black_list", JSON.stringify(siteBlackList));
          break;
      }
  }
  $("#"+id).remove();
}

function addBlackSiteItemEl(url){
  var uniqueElId = randomString();
  var addSiteDialogHtml = "" + 
   "<td class='black_listed_url'>" + url + "</td>\
    <td class='delete_button_holder'>\
      <button type='button' class='btn btn-danger' id='del_" + uniqueElId + "'>delete</button>\
    </td>";
  var dialogEl = document.createElement("tr");
  dialogEl.id = uniqueElId;
  dialogEl.src = url;
  dialogEl.innerHTML = addSiteDialogHtml;
  $("#blacklist_table_body").append( dialogEl );
  $("#del_"+uniqueElId).click(function(){deleteButtonClick(uniqueElId)});
}

function getAddSiteDialogEl(url){
  var addSiteDialogHtml = "" + 
   "<td>\
      <div class='input-prepend'  style='margin:0px;width:95%;'>\
        <span class='add-on'><i class='icon-globe'></i></span>\
        <input class='span2' id='new_black_list_input' type='text'style='height:30px;width:100%;' placeholder='http://' value='" + url + "'>\
      </div>\
    </td>\
    <td class='delete_button_holder'>\
      <button type='button' class='btn btn-primary' id='save_blacklist_site'>save</button>\
    </td>";
  var dialogEl = document.createElement("tr");
  dialogEl.id = "add_blacklist_site_dialog";                   
  dialogEl.innerHTML = addSiteDialogHtml;
  return dialogEl;                     
}

function closeAddBlackListSiteDialog() {
  $("#add_blacklist_site").css("display","block");
  $("#cancel_blacklist_site").css("display","none");
  $("#add_blacklist_site_dialog").remove();
  addSiteDialogActive = false;
}

function randomString() {
  var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
  var string_length = 8;
  var randomstring = '';
  for (var i=0; i<string_length; i++) {
    var rnum = Math.floor(Math.random() * chars.length);
    randomstring += chars.substring(rnum,rnum+1);
  }
  return randomstring;
}

function stripHTML(html)
{
   var tmp = document.createElement("DIV");
   tmp.innerHTML = html;
   return tmp.textContent || tmp.innerText || "";
}

function isUrlValid(url){
  var urlIsValid = false;
  var urlregex = new RegExp("^(http|https|ftp)\://([a-zA-Z0-9\.\-]+(\:[a-zA-Z0-9\.&amp;%\$\-]+)*@)*((25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])|([a-zA-Z0-9\-]+\.)*[a-zA-Z0-9\-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(\:[0-9]+)*(/($|[a-zA-Z0-9\.\,\?\'\\\+&amp;%\$#\=~_\-]+))*$");
  urlIsValid = urlregex.test(url); //Regex url check.
  //if( !(url.indexOf('.') != -1) ) urlIsValid = false; //If no periods found, then not a url.
  return urlIsValid;
}