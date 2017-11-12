let src

browser.runtime.onMessage.addListener(request => {
  video = [...document.querySelectorAll("video")]
  src = video.map(e => e.src)
  video.forEach(vid => {
  	vid.pause()
  })

  setTimeout(() => {
  	video = [...document.querySelectorAll("video")]
		video.forEach(vid => {
	  	vid.pause()
	  })
  }, 1000)
	return Promise.resolve(src);
});