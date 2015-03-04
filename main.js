var url = 'oceans-clip.mp4';

var video = document.getElementById('oceans-clip');
var progressBar = document.getElementById('bar');
var button = document.getElementById('load');

var xhr = new XMLHttpRequest();

xhr.open('GET', url, true);
xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
xhr.responseType = 'arraybuffer';

xhr.onload = function (oEvent) {
    console.debug('onload', event);
    var blob = new Blob([oEvent.target.response], {
        type: 'video/mp4'
    });
    video.tpye = 'video/mp4';
    video.src = URL.createObjectURL(blob);
    video.play();
};

xhr.onprogress = function (oEvent) {
    if (oEvent.lengthComputable) {
        var percentComplete = (oEvent.loaded / oEvent.total) * 100;
        var completion = Math.round(percentComplete);
        progressBar.setAttribute('valuenow', completion);
        progressBar.style.width = completion + '%';
        progressBar.innerHTML = completion + '%';
    }
}

function loadVideo(event) {
    xhr.send();
    button.style.display = 'none';
}

button.addEventListener('click', loadVideo);