(function($) {
	
var ws;	// WebSocket instance and close in this module
var status;

$.fn.handleMessage = function () {
	
	 var content = this;

     ws.onmessage = function (evt) 
     { 
   		var json = JSON.parse(evt.data);
   		   		
   		content.fadeOut("slow");
   		if (json.type === 'photo') {
   			content.html('<img src="' + json.data.url + '" />');
   		}     
   		content.fadeIn("slow");   	
   	 }; 	
   	 
	 ws.connect();	
};	
	
	
$.fn.createWebSocket = function () {

  var content = this;
  status = content;
  	
  if ("WebSocket" in window)
  {
     // Let us open a web socket
	 ws = new WebSocket("ws://go8panel.com:8080/", "echo-protocol");
	 
     ws.onopen = function(evt)
     {
       content.html("<p>Server Ready</p>");
     };
     
     ws.onclose = function(evt)
     {
        content.html("<p>Server Not Found</p>");
     };    
     
	 ws.onerror = function(evt)
	 {		
		content.html("<p>Server Error</p>");
	 };      
  }
  else
  {
     // The browser doesn't support WebSocket
		ws = new WebSocketImpl("ws://go8panel.com:8080/", "echo-protocol");

		ws.onopen = function(evt)
		{
			content.html("<p>Server Ready 2</p>");
		};

		ws.onclose = function(evt)
		{
			content.html("<p>Server Not Found</p>");
		};    

		ws.onerror = function(evt)
		{
			content.html("<p>Server Error</p>");
		};   
  }

};

}) ($);
