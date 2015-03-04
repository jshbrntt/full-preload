function getSupportedVideoFormats() {

    // Test from Modernizr.
    var elem = document.createElement('video');
    var bool = false;

    // IE9 Running on Windows Server SKU can cause an exception to be thrown, bug #224
    try {
        if (bool = !!elem.canPlayType) {
            bool = new Boolean(bool);
            bool.ogg = elem.canPlayType('video/ogg; codecs="theora"').replace(/^no$/, '');

            // Without QuickTime, this value will be `undefined`. github.com/Modernizr/Modernizr/issues/546
            bool.h264 = elem.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/, '');

            bool.webm = elem.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/, '');

            bool.vp9 = elem.canPlayType('video/webm; codecs="vp9"').replace(/^no$/, '');

            bool.hls = elem.canPlayType('application/x-mpegURL; codecs="avc1.42E01E"').replace(/^no$/, '');
        }
    } catch (e) {}

    return bool;

}

function getVideoFormat(mime) {
    var bool = getSupportedVideoFormats();
    // Prioritization of video format fallback.
    if (bool.h264 !== '') {
        return mime ? 'video/mp4' : 'mp4';
    }
    if (bool.webm !== '') {
        return mime ? 'video/webm' : 'webm';
    }
    if (bool.ogg !== '') {
        return mime ? 'video/ogg' : 'ogv';
    }
}

function onProgress(event) {
    if (event.lengthComputable) {
        var percentComplete = (event.loaded / event.total) * 100;
        var completion = Math.round(percentComplete);
        progress.setAttribute('valuenow', completion);
        progress.style.width = completion + '%';
        progress.innerHTML = completion + '%';
    }
}

function onLoad(event) {
    var type = getVideoFormat(true);
    var blob = new Blob([event.target.response], {
        type: type
    });
    video.type = type;
    video.src = URL.createObjectURL(blob);
    video.play();
}

function GET(url) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
    xhr.responseType = 'arraybuffer';
    xhr.onload = onLoad;
    xhr.onprogress = onProgress;
    xhr.send();
}

function loadVideo(event) {
    GET(url);
}

// Video sample from videojs, without extension.
var url = 'videos/oceans-clip.' + getVideoFormat();
var video = document.getElementById('video');
var progress = document.getElementById('progress');
var button = document.getElementById('button');

button.addEventListener('click', loadVideo);