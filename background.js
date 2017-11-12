var port = browser.runtime.connectNative("mpv");

function openPage() {
	console.log("open")
	port.postMessage("ping");
}

port.onMessage.addListener((response) => {
  console.log("Received: " + response);
});

browser.browserAction.onClicked.addListener(openPage);