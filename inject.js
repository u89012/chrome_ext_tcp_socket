var sid = -1; //socket handle

function ab2str(buf) { //arraybuffer to string
	return String.fromCharCode.apply(null, new Uint8Array(buf));
}

function str2ab(str) { //string to arraybuffer
   var buf = new ArrayBuffer(str.length*2); // 2 bytes for each char
   var bufView = new Uint16Array(buf);
   for (var i=0, strLen=str.length; i<strLen; i++) {
   	bufView[i] = str.charCodeAt(i);
   }
   return buf;
}

chrome.app.runtime.onLaunched.addListener(function(){ //main
	console.log("connecting...");

	chrome.sockets.tcp.create({}, function(createInfo){
		sid = createInfo.socketId;
		console.log("socket created (%d)", sid);		

		chrome.sockets.tcp.onReceiveError.addListener(function(info){
			console.log("could not receive on socket (%d), error code (%d)", info.socketId, info.resultCode);
		});

		chrome.sockets.tcp.onReceive.addListener(function(info){
			console.log("received data -- %s", ab2str(info.data));
			  // Center window on screen.
			  // var screenWidth = screen.availWidth;
			  // var screenHeight = screen.availHeight;
			  // var width = 500;
			  // var height = 300;

			  // chrome.app.window.create('index.html', {
			  //   id: "helloWorldID",
			  //   bounds: {
			  //     width: width,
			  //     height: height,
			  //     left: Math.round((screenWidth-width)/2),
			  //     top: Math.round((screenHeight-height)/2)
			  //   }
			  // });
		});
		
		chrome.sockets.tcp.connect(sid, "127.0.0.1", 3000, function(result){		
			if(result<0){
				console.log("could not connect socket (%d), error code (%d)", sid, result)
			}else{
				console.log("socket connected (%d)", sid);		
			}
		});
	});
});


chrome.runtime.onSuspend.addListener(function(){ //exit
	console.log("disconnecting...");
	chrome.sockets.tcp.disconnect(sid);
});

