var videoElement = document.createElement('video');

if (!(videoElement.canPlayType('video/mp4; codecs="avc1.42001E, mp4a.40.2"'))) {
    $("#warnH264").show();
}

if (!(videoElement.canPlayType('video/webm; codecs="vp9"'))) {
    $("#warnVP9").show();
}
