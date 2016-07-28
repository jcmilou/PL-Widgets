(function() {

// Localize jQuery variable
var jQuery;

/******** Load jQuery if not present *********/
if (window.jQuery === undefined || window.jQuery.fn.jquery !== '2.1.3') {
    var script_tag = document.createElement('script');
    script_tag.setAttribute("type","text/javascript");
    script_tag.setAttribute("src",
        "http://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js");
    if (script_tag.readyState) {
      script_tag.onreadystatechange = function () { // For old versions of IE
          if (this.readyState == 'complete' || this.readyState == 'loaded') {
              scriptLoadHandler();
          }
      };
    } else {
      script_tag.onload = scriptLoadHandler;
    }
    // Try to find the head, otherwise default to the documentElement
    (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(script_tag);
} else {
    // The jQuery version on the window is the one we want to use
    jQuery = window.jQuery;
    main();
}

/******** Called once jQuery has loaded ******/
function scriptLoadHandler() {
    // Restore $ and window.jQuery to their previous values and store the
    // new jQuery in our local jQuery variable
    jQuery = window.jQuery.noConflict(true);
    // Call our main functionvar script_tag = document.createElement('script');
    main(); 
}

/******** Main function ********/
function main() { 
    jQuery(document).ready(function($) { 
        /******* Load CSS and scripts *******/
		var s = document.createElement("script");
		s.type = "text/javascript";
		s.src = "json2.js";
		$("head").append(s);
		var s = document.createElement("script");
		s.type = "text/javascript";
		s.src = "l10n.js";
		$("head").append(s);
		var s = document.createElement("script");
		s.type = "text/javascript";
		s.src = "localizations.js";
		$("head").append(s);
        var css_link = $("<link>", { 
            rel: "stylesheet", 
            type: "text/css", 
            href: "style.css" 
        });
		var css_link2 = $("<link>", { 
            rel: "stylesheet",  
            href: "https://fonts.googleapis.com/icon?family=Material+Icons" 
        });
        css_link.appendTo('head');
		css_link2.appendTo('head');
		
  WebFontConfig = {
    google: { families: [ 'Open+Sans::latin' ] }
  };
  (function() {
    var wf = document.createElement('script');
    wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
  })();

	 $(document).ready(function() {	
	 //Get JSON data
               $.getJSON("data.json", function(wd) {
				   //Add content to the file
				  $("#widget-container").html("<div class='top-art'>" + wd.widgetART.mainimg + "</div><div class='content'><div class='content-img'>" + wd.widgetART.smallimg + "</div><div class='content-info'><div class='name'>" + wd.widgetART.name + "</div><div id='info'>"+ wd.widgetART.info +"</div></div></div><div class='buttons-count'><div class='view'><i class='material-icons'>visibility</i>" + wd.widgetART.views + "</div><div id='comments' class='run'><i class='material-icons'>chat_bubble</i>" + wd.widgetART.comments.length + "</div><div id='likes' class='like'>" + "<i class='material-icons'>favorite</i>" + wd.widgetART.likes + "</div></div><div class='commentswindow hide' style='display: none;'></div>");
				//Check for the tag and creates the comments only once
				if ( $( "#comments" ).hasClass( "run" ) ) 
						{
							for(var i = 0; i < wd.widgetART.comments.length; i++) 
						  	{
							  var comm = wd.widgetART.comments[i];
							  $(".commentswindow").append("<div class='single-comment'><div class='comment-name'>" + comm.name +"</div><div class='comment-text'>" + comm.comment + "</div></div>");
						  	}
							$("#comments").removeClass("run");
						}
				// Add click event for showing or hidding comments
				document.getElementById("comments").addEventListener("click", commentclick);
				function commentclick() {
						if ($(".commentswindow").hasClass( "hide" )){
							$(".commentswindow").show("slow");
							$(".commentswindow").removeClass("hide");
						}
						 else { 
								$(".commentswindow").hide("slow");
								$(".commentswindow").addClass("hide");
						}
					}				  
				 	//Add +1 to the "liked" count and disable further clicks
				  	document.getElementById("likes").addEventListener("click", likeclick);
				  	function likeclick() {
						wd.widgetART.likes ++;
						$("#likes").html("<i class='material-icons'>favorite</i>" + wd.widgetART.likes);
						document.getElementById("likes").removeEventListener("click", likeclick);
						$("#likes").addClass("liked");
					}
					//Start Localization
					if (location.hash) {
						String.locale = location.hash.substr(1);	
					}
					var localize = function (string, fallback) {
						var localized = string.toLocaleString();
						if (localized !== string) {
							return localized;
						} else {
							return fallback;
						}
					};
					var info = document.getElementById("info").firstChild;
					info.nodeValue = localize("%info", info.nodeValue);
					document.documentElement.dir = localize("%locale.dir", document.documentElement.dir);
					document.documentElement.lang = String.locale || document.documentElement.lang;
               });
            });
    });
}
})();