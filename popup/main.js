var port = browser.runtime.connectNative("mpv");

port.onMessage.addListener((response) => {
  console.log("Received: " + response);
});


let app = new Moon({
	el: "#app",
	data: {
		list: ["No video files found"]
	},
	hooks: {
		mounted(){
			let recv = (data) => {
				this.set("list", data)
			}
			// port.postMessage("ping");


			browser.tabs.query({active:true,currentWindow:true},function(tabs){
				for (let tab of tabs) {

					browser.tabs.sendMessage(tab.id, {}).then(recv, err => console.log(err));
				}
			});
		}
	},
	methods:{
		click(item, index){
			

			let clip = document.getElementById('clip')
			browser.runtime.sendNativeMessage("mpv", item).then(e => console.log("res: ", e),e => console.log("err: ", e))
			clip.value = item
			clip.select()
			document.execCommand("Copy");
		}
	}
});

