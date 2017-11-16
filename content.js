// top = window
let iframe = []

if(window != top){

		let video = [...document.querySelectorAll("video")]
	  top.postMessage(video.map(e => e.src), '*');

		console.log(video)

	  // addEventListener('message', function(event) {
	  // 	parent.postMessage(video.map(e => e.src), '*');
	  // });



		// setTimeout(() => {
		// 	let video = [...document.querySelectorAll("video")]
		// 	video.forEach(vid => {
		// 		vid.pause()
		// 	})

		// }, 1000);
	
}else{

	addEventListener('message', function(request) {
		if(request.data.length != 0){
			for (var i = request.data.length - 1; i >= 0; i--) {
				iframe.push(request.data[i])
			}
		}
		console.log(iframe)
  });

	browser.runtime.onMessage.addListener(request => {
		let video = [...document.querySelectorAll("video")]


		let data = 
		{
			"this": [window.location.href],
			"main": video.map(e => e.src),
			"iframe": iframe
		}

		video.forEach(vid => {
			vid.pause()
		})


		setTimeout(() => {
			video.forEach(vid => {
				vid.pause()
			})

		}, 1000)
		return Promise.resolve(data);
	});

}