// // Saves options to localStorage.
// function save_options() {
//   var select = document.getElementById("color");
//   var color = select.children[select.selectedIndex].value;
//   localStorage["black_list"] = color;

//   // Update status to let user know options were saved.
//   var status = document.getElementById("status");
//   status.innerHTML = "Options Saved.";
//   setTimeout(function() {
//     status.innerHTML = "";
//   }, 750);
// }

// // Restores select box state to saved value from localStorage.
// function restore_options() {
//   var favorite = localStorage["black_list"];
//   if (!favorite) {
//     return;
//   }
//   var select = document.getElementById("color");
//   for (var i = 0; i < select.children.length; i++) {
//     var child = select.children[i];
//     if (child.value == favorite) {
//       child.selected = "true";
//       break;
//     }
//   }
// }
// document.addEventListener('DOMContentLoaded', restore_options);
// document.querySelector('#save').addEventListener('click', save_options);




var addSiteDialogActive = false;
$("#add_blacklist_site, #cancel_blacklist_site").click(function() {

  if(!addSiteDialogActive){
    $("#add_blacklist_site").css("display","none");
    $("#cancel_blacklist_site").css("display","block");

    $("#blacklist_table_body").prepend( getAddSiteDialogEl("") );

    addSiteDialogActive = true;
  } else {
    $("#add_blacklist_site").css("display","block");
    $("#cancel_blacklist_site").css("display","none");

    $("#add_blacklist_site_dialog").remove();

    addSiteDialogActive = false;
  }


});


function getAddSiteDialogEl(url){

  var addSiteDialogHtml =  "<td>\
                              <div class='input-prepend'  style='margin:0px;width:95%;'>\
                                <span class='add-on'><i class='icon-globe'></i></span>\
                                <input class='span2' id='inputIcon' type='text'style='height:30px;width:100%;' placeholder='http://' value='" + url + "'>\
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