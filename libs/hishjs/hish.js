+function ($) { "use strict";

  var Hish = function (element, options) {
    this.init(element, options)
  }

  Hish.prototype.init = function (element, options) {
    this.$element = $(element)

    this.loadStyles();
    this.loadWidgets();
    this.loadPopover();
    this.bindEvents();
  }

  Hish.prototype.bindEvents = function() {
    var _this = this;
    
    // checks for highlighted text
    _this.$element.mouseup(function(e) {
      _this.checkTextSelection(_this);
      e.stopPropagation();
    });

    // hides the popover if user clicks on unregistered elements
    $(document).mouseup(function(e) {
      _this.hide();
    });

    $('#hish-share-facebook').click(function(e) {
      var facebook_dialog_url = "https://www.facebook.com/sharer/sharer.php?u=" + document.URL;
      var facebook_popup = window.open(facebook_dialog_url,'facebook-share','height=600,width=500');
      if (window.focus) {facebook_popup.focus()}
      _this.hide();
      
      //Saves the selected text to the background page so the Facebook sharer can request it when it opens.
      chrome.runtime.sendMessage({reqMessage: window.getSelection().toString()}, function(response){ });      
    });

    $('#hish-share-twitter').click(function(e) {
      var twitter_intent_url = "https://twitter.com/intent/tweet?text=" + _this.getText() + "&url=" + document.URL;
      var twitter_popup = window.open(twitter_intent_url,'twitter-share','height=600,width=500');
      if (window.focus) {twitter_popup.focus()}
      _this.hide();
    });

    // prevent text from automatically unhighlighting upon sharing
    $('#hish-share-facebook').mousedown(function(e){
      e.preventDefault();
    })
    $('#hish-share-twitter').mousedown(function(e){
      e.preventDefault();
    })
  }

  Hish.prototype.getText = function() {
    var highlighted = window.getSelection().toString();
    var text = highlighted.length > 115 ? '' + window.getSelection().toString().substring(0, 112) + '...' : highlighted;
    text = '"' + text + '"';
    return text;
  }

  Hish.prototype.loadPopover = function() {
    if (!document.getElementById('hish-share-wrapper')) {
      $("<div id='hish-share-wrapper'>" +
          "<div id='hish-share-popover-inner'>" + 
            "<div id='hish-share-facebook'><i class='icon-facebook-hish icon-light-hish' style='color:#fff;line-height:22px;width:22px;height:22px;'></i></div>" +
            "<div id='hish-share-twitter'><i class='icon-twitter-hish icon-light-hish' style='color:#fff;line-height:22px;width:22px;height:22px;'></i></div>" + 
          "</div>" +
          // "<div id='hish-share-arrow-wrapper'>" +
          //   "<span id='hish-share-arrow'></span>" +
          // "</div>" +
        "</div>"
      ).appendTo('body');
    }
  }

  Hish.prototype.loadStyles = function() {
    // font awesome css
    var head  = document.getElementsByTagName('head')[0];
    // if (!document.getElementById('font_awesome')) {
    //   var font_awesome  = document.createElement('link');
    //   font_awesome.id   = 'font_awesome';
    //   font_awesome.rel  = 'stylesheet';
    //   font_awesome.type = 'text/css';
    //   font_awesome.href = 'http://netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.css';
    //   font_awesome.media = 'all';
    //   head.appendChild(font_awesome);
    // }
    //Manually added in Chrome manifest.json file.

    // medium share css
    if (!document.getElementById('medium_share_css_hish')) {
      var style = document.createElement('style');
      style.id = "medium_share_css_hish";
      style.textContent = "#hish-share-wrapper {\
        display: none;\
        z-index: 500;\
        position: absolute;\
        -webkit-animation-delay: 0s;\
        -webkit-animation-direction: normal;\
        -webkit-animation-duration: 0.18s;\
        -webkit-animation-fill-mode: forwards;\
        -webkit-animation-iteration-count: 1;\
        -webkit-animation-name: pop-upwards;\
        -webkit-animation-timing-function: linear;\
        -webkit-transition-delay: 0s, 0s;\
        -webkit-transition-duration: 0.075s, 0.075s;\
        -webkit-transition-property: top, left;\
        -webkit-transition-timing-function: ease-out, ease-out;\
        transition-delay: 0s, 0s;\
        transition-duration: 0.075s, 0.075s;\
        transition-property: top, left;\
        transition-timing-function: ease-out, ease-out;\
      }\
      #hish-share-wrapper:after {\
        content: '';\
        display: block;\
        position: absolute;\
        bottom: -5px;\
        left: 50%;\
        margin-left: -6px;\
        width: 12px;\
        height: 12px;\
        -webkit-transform: rotate(45deg);\
        -moz-transform: rotate(45deg);\
        -o-transform: rotate(45deg);\
        transform: rotate(45deg);\
        background: #262625;\
        box-shadow: 0 0 2px #262625;\
      }\
      #hish-share-popover-inner {\
        height: 42px !important;\
        width: 82px !important;\
        background-repeat: repeat-x !important;\
        background-image: -webkit-gradient(linear,0 0,0 100%,from(rgba(49,49,47,0.97)),to(#262625)) !important;\
        background-image: -moz-linear-gradient(top,rgba(49,49,47,0.97),#262625) !important;\
        background-image: -webkit-linear-gradient(top,rgba(49,49,47,0.97),#262625) !important;\
        background-image: -o-linear-gradient(top,rgba(49,49,47,0.97),#262625) !important;\
        background-image: linear-gradient(rgba(49, 49, 47, 0.972549), rgb(38, 38, 37)) !important;\
        -webkit-box-shadow: rgba(0, 0, 0, 0.701961) 0px 1px 3px -1px, rgba(255, 255, 255, 0.0666667) 0px 0px 1px 0px inset, rgba(255, 255, 255, 0.14902) 0px 0px 2px 0px inset !important;\
        box-shadow: rgba(0, 0, 0, 0.701961) 0px 1px 3px -1px, rgba(255, 255, 255, 0.0666667) 0px 0px 1px 0px inset, rgba(255, 255, 255, 0.14902) 0px 0px 2px 0px inset !important;\
        border-top-color: rgb(38, 38, 37) !important;\
        border-bottom-color: rgb(18, 18, 17) !important;\
        border-left-color: rgb(28, 28, 27) !important;\
        border-right-color: rgb(28, 28, 27) !important;\
        border: 0px solid !important;\
        border-style:solid !important;\
        border-width:0px !important;\
        border-radius: 5px !important;\
      }\
      #hish-share-facebook, #hish-share-twitter {\
        position:relative !important;\
        float:left !important;\
        height: 30px !important;\
        width: 40px !important;\
        display: inline-block !important;\
        padding-top: 10px !important;\
        cursor: pointer !important;\
        font-size: 22px !important;\
        text-align:left !important;\
        line-height:22px !important;\
      }\
      #hish-share-facebook i {\
        padding-left: 17px; !important\
        vertical-align:top; !important\
      }\
      #hish-share-twitter i {\
        padding-left: 5px; !important\
        vertical-align:top; !important\
      }\
      #hish-share-arrow-wrapper {\
        display: block;\
        position: absolute;\
        bottom: -11px;\
        left: 50%;\
        clip: rect(12px 24px 24px 0);\
        margin-left: -12px;\
        color: rgb(51, 51, 50);\
      }\
      #hish-share-arrow {\
        display: block;\
        width: 20px !important;\
        height: 20px !important;\
        -webkit-transform: rotate(45deg) scale(0.5);\
        -moz-transform: rotate(45deg) scale(0.5);\
        -o-transform: rotate(45deg) scale(0.5);\
        transform: rotate(45deg) scale(0.5);\
        background-color: #454543;\
        border: 2px solid #121211;\
        border-style:solid;\
      }\
      ";
      document.body.appendChild(style);
    }
  }

  Hish.prototype.loadWidgets = function() {
    var twitter_widget = "http://platform.twitter.com/widgets.js";
    if (!$("script[src='" + twitter_widget + "']").length) {
      $("<script type='text/javascript' src='" + twitter_widget + "'></script>").appendTo('body');
    }
  }

  Hish.prototype.show = function(x, y) {
    x = x - 40;
    y = y - 20 - 40;
    $("#hish-share-wrapper").css({ top: y+'px', left: x+'px' });
    $("#hish-share-wrapper").fadeIn(100);
  }

  Hish.prototype.hide = function() {
    $("#hish-share-wrapper").fadeOut(100);
  }

  Hish.prototype.checkTextSelection = function(popover) {
    var selected_text = "";
    if (typeof window.getSelection != "undefined") {
      selected_text = window.getSelection().toString();
    } else if (typeof document.selection != "undefined" && document.selection.type == "Text") {
      selected_text = document.selection.createRange().text;
    }

    if (selected_text && selected_text.length > 0) {
      // find the bounding box of the highlighted text
      var rect = window.getSelection().getRangeAt(0).getBoundingClientRect();
      var y = rect.bottom - rect.height + document.body.scrollTop + 6;
      var x = rect.left + rect.width / 2 + document.body.scrollLeft;
      popover.show(x, y);
    } else {
      popover.hide();
    }
  }

  var old = $.fn.hish
  $.fn.hish = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('hish')
      var options = typeof option == 'object' && option

      if (!data) $this.data('hish', (data = new Hish(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }
  $.fn.hish.Constructor = Hish

}(window.jQuery);