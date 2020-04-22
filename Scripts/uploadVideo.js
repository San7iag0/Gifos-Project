var recorder;
const image = document.querySelector('#videoimg');

// functions to change stiles 
//boton comenzar 
function comenzarGifo(){
	document.querySelector('.crearGifos').style.display = 'none';
	document.querySelector('.misGifos').style.display = 'none';
	document.querySelector('.misGifosBox').style.display = 'none';
	document.querySelector('.btnStop').style.display = 'none';
	document.querySelector('.recording').style.display = 'none';
    document.querySelector('.videoParent').style.display = 'grid';
    
    visualizar()
}

function capturar(){
	document.querySelector('.btnStop').style.display = 'grid';
	document.querySelector('#btnStart').style.display = 'none';
	document.querySelector('.camera').style.display = 'none';
	document.querySelector('.recording').style.display = 'grid';

	document.querySelector('.titleV').innerHTML = 'Capturando Tu Guifo';
}

// buttons 
document.getElementById('comenzarGifo').onclick = function (){

	comenzarGifo(); // cambio de estilos DOM 
	
}
//btn capturar 
document.getElementById('btnStart').onclick = function (){
	capturar();
	recordingGif();
}
//btn listo
document.querySelector('.btnStop').onclick = function (){
    //document.querySelector('#btnStart').style.display = 'grid';
	stopRecording();
}

function captureCamera(callback) {
    navigator.mediaDevices.getUserMedia({ video: true }).then(function(camera) {
        callback(camera);
    }).catch(function(error) {
        alert('Unable to capture your camera. Please check console logs.');
        console.error(error);
    });
}

var recorder; 
function recordingGif() {
    this.disabled = true;
    captureCamera(cameraCallback);
}

let cameraCallback = function(camera) {
    recorder = RecordRTC(camera, {
        type: 'gif',
        frameRate: 1,
        quality: 10,
        width: 360,
        hidden: 240,
        
        onGifPreview: function(gifURL) {
            image.src = gifURL;
        }
    });

    recorder.startRecording(); 
          
    recorder.camera = camera;
    
    document.getElementById('btnStart').display = "none";
}

function stopRecordingCallback() {
    // the giff URL
    let giffURL = URL.createObjectURL(recorder.getBlob());
    // sets the giff url to the video preview
    image.src = giffURL;

    //local storage
    // gets the list of giffs from localstorege
    let giffURLs = localStorage.getItem("keyGiffURL");
    // adds the giff URL into the localstorage list
    localStorage.setItem("keyGiffURL", `${giffURLs},${giffURL}`);

    recorder.camera.stop();
    recorder.destroy();
    recorder = null;
}

function stopRecording() {
    this.disabled = true;
    recorder.stopRecording(stopRecordingCallback);	
    //document.querySelector('#btnStart').style.display = 'grid';
};

/////////////
function visualizar(){
	navigator.mediaDevices.getUserMedia({
		audio:false,
		video:true
	}).then(function(stream){
		image.srcObject = stream;
		image.play()
	}).catch(console.error);
}
	
