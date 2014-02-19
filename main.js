"use strict";

mediaGroupInit();

var videoList = [
    {
        "sample": "big_buck_bunny_1000frames_720p24.y4m",
        "path": "./samples/big_buck_bunny_1000frames_720p24.y4m-112kbps-libvpx-vp9-74074c9.webm",
        "codec": "VP9",
        "bitrate": "112 kbps"
    },
    {
        "sample": "big_buck_bunny_1000frames_720p24.y4m",
        "path": "./samples/big_buck_bunny_1000frames_720p24.y4m-112kbps-x264-956c8d8.mp4",
        "codec": "H.264",
        "bitrate": "112 kbps"
    },
    {
        "sample": "big_buck_bunny_1000frames_720p24.y4m",
        "path": "./samples/big_buck_bunny_1000frames_720p24.y4m-179kbps-libvpx-vp9-74074c9.webm",
        "codec": "VP9",
        "bitrate": "179 kbps"
    },
    {
        "sample": "big_buck_bunny_1000frames_720p24.y4m",
        "path": "./samples/big_buck_bunny_1000frames_720p24.y4m-179kbps-x264-956c8d8.mp4",
        "codec": "H.264",
        "bitrate": "179 kbps"
    },
    {
        "sample": "big_buck_bunny_1000frames_720p24.y4m",
        "path": "./samples/big_buck_bunny_1000frames_720p24.y4m-290kbps-libvpx-vp9-74074c9.webm",
        "codec": "VP9",
        "bitrate": "290 kbps"
    },
    {
        "sample": "big_buck_bunny_1000frames_720p24.y4m",
        "path": "./samples/big_buck_bunny_1000frames_720p24.y4m-290kbps-x264-956c8d8.mp4",
        "codec": "H.264",
        "bitrate": "290 kbps"
    },
    {
        "sample": "big_buck_bunny_1000frames_720p24.y4m",
        "path": "./samples/big_buck_bunny_1000frames_720p24.y4m-399kbps-libvpx-vp9-74074c9.webm",
        "codec": "VP9",
        "bitrate": "399 kbps"
    },
    {
        "sample": "big_buck_bunny_1000frames_720p24.y4m",
        "path": "./samples/big_buck_bunny_1000frames_720p24.y4m-399kbps-x264-956c8d8.mp4",
        "codec": "H.264",
        "bitrate": "399 kbps"
    },
    {
        "sample": "sintel_trailer_2k_480p24.y4m",
        "path": "./samples/sintel_trailer_2k_480p24.y4m-122kbps-libvpx-vp9-74074c9.webm",
        "codec": "VP9",
        "bitrate": "122 kbps"
    },
    {
        "sample": "sintel_trailer_2k_480p24.y4m",
        "path": "./samples/sintel_trailer_2k_480p24.y4m-122kbps-x264-956c8d8.mp4",
        "codec": "H.264",
        "bitrate": "122 kbps"
    },
    {
        "sample": "sintel_trailer_2k_480p24.y4m",
        "path": "./samples/sintel_trailer_2k_480p24.y4m-217kbps-libvpx-vp9-74074c9.webm",
        "codec": "VP9",
        "bitrate": "217 kbps"
    },
    {
        "sample": "sintel_trailer_2k_480p24.y4m",
        "path": "./samples/sintel_trailer_2k_480p24.y4m-217kbps-x264-956c8d8.mp4",
        "codec": "H.264",
        "bitrate": "217 kbps"
    },
    {
        "sample": "sintel_trailer_2k_480p24.y4m",
        "path": "./samples/sintel_trailer_2k_480p24.y4m-67kbps-libvpx-vp9-74074c9.webm",
        "codec": "VP9",
        "bitrate": "67 kbps"
    },
    {
        "sample": "sintel_trailer_2k_480p24.y4m",
        "path": "./samples/sintel_trailer_2k_480p24.y4m-67kbps-x264-956c8d8.mp4",
        "codec": "H.264",
        "bitrate": "67 kbps"
    }
];

var TIME_STEP = 1.0 / 24.0;

var addUrlForm = document.getElementById("addUrlForm");
var backwardButton = document.getElementById("backwardButton");
var forwardButton = document.getElementById("forwardButton");
var getLinkButton = document.getElementById("getLinkButton");
var getLinkUrl = document.getElementById("getLinkUrl");
var inlineStyle = document.getElementById("inlineStyle");
var left = document.getElementById("left");
var leftVid = document.getElementById("leftVid");
var localFile = document.getElementById("localFile");
var playButton = document.getElementById("playButton");
var rateForm = document.getElementById("rateForm");
var rateInput = document.getElementById("rateInput");
var rightVid = document.getElementById("rightVid");
var seekSlider = document.getElementById("seekSlider");
var selectA = document.getElementById("selectA");
var selectB = document.getElementById("selectB");
var splitSlider = document.getElementById("splitSlider");
var videoUrl = document.getElementById("videoUrl");
var viewLink = document.getElementById("viewLink");

var controller = leftVid.controllerShim;

var videoArray = new Array();

var playIcon = '<span class="glyphicon glyphicon-play"></span>';
var pauseIcon = '<span class="glyphicon glyphicon-pause"></span>';

var defaultParams = {
    "leftVid": "./samples/sintel_trailer_2k_480p24.y4m-67kbps-libvpx-vp9-74074c9.webm",
    "rightVid": "./samples/sintel_trailer_2k_480p24.y4m-67kbps-x264-956c8d8.mp4"
};
var uri = new URI(location.href);
var params = uri.search(true);
if (params.leftVid) {
    leftVid.src = params.leftVid;
} else {
    uri.setSearch("leftVid", defaultParams.leftVid);
}
if (params.rightVid) {
    rightVid.src = params.rightVid;
} else {
    uri.setSearch("rightVid", defaultParams.rightVid);
}

if (params.time) {
    $(leftVid).on("loadeddata", function() {
        controller.currentTime = params.time;
    });
}

// Bootstrap tabs control
$('a[data-toggle="tab"]').on('show.bs.tab', function (e) {
    viewLink.href = e.target.dataset.css;
});

$.fn.optGroups = function(labelText) {
    var groups = this.children("optgroup[label='" + labelText + "']");
    if (groups.length === 0) {
        this.append($("<optgroup/>", {label: labelText}));
        groups = this.children("optgroup[label='" + labelText + "']");
    }
    return groups;
};

$.each(videoList, function(i, v) {
    if ((v.codec == "H.264" && canPlayH264) ||
        (v.codec == "VP9" && canPlayVP9)) {
        var groups = $(".videoSelector").optGroups(v.sample);
        groups.append($("<option/>", {text: v.path}));
        videoArray[v.path] = v.path;
    }
});

$(selectA).val(uri.search(true).leftVid);
$(selectB).val(uri.search(true).rightVid);

$(selectA).change(function() {
    var vidName = $(this).val();
    uri.setSearch("leftVid", vidName);

    try {
        controller.currentTime = 0;
    } catch (e) {
        console.log(e.message);
    }
    leftVid.src = videoArray[vidName];
    leftVid.load();
    rightVid.load();
});
$(selectB).change(function() {
    var vidName = $(this).val();
    uri.setSearch("rightVid", vidName);

    try {
        controller.currentTime = 0;
    } catch (e) {
        console.log(e.message);
    }
    rightVid.src = videoArray[vidName];
    leftVid.load();
    rightVid.load();
});

function onLeftVidLoadedData() {
    splitSlider.style.top = leftVid.videoHeight / 2 + "px";

    // There doesn't seem to be a less ugly way to change the style of these
    // pseudo-elements.
    inlineStyle.innerHTML =
        "#splitSlider::-webkit-slider-thumb { height:" + leftVid.videoHeight + "px; }\n" +
        "#splitSlider::-moz-range-thumb { height:" + leftVid.videoHeight + "px; }\n" +
        "#splitSlider::-moz-range-track { height:" + leftVid.videoHeight + "px; }";

    splitSlider.max = leftVid.videoWidth;
    splitSlider.style.width = splitSlider.max + "px";
    splitSlider.value = splitSlider.max / 2;
    splitSlider.oninput = function() {
        left.style.width = this.value + "px";
    };
    splitSlider.oninput();

    rightVid.style.width = leftVid.videoWidth + "px";
    rightVid.style.height = leftVid.videoHeight + "px";
    document.getElementById("playButton").innerHTML = playIcon;

    controller.muted = true;

    seekSlider.value = 0;
}

// If the loadeddata event already fired, call the callback manually
if (leftVidLoadedDataFired) {
    onLeftVidLoadedData();
}

$(leftVid).on("loadeddata", function() {
    onLeftVidLoadedData();
}).on("ended", function() {
    // Loop the videos
    controller.currentTime = 0;
    controller.unpause();
}).on("timeupdate", function() {
    seekSlider.value = controller.currentTime / controller.duration;
});

$(seekSlider).on("input", function() {
    controller.currentTime = this.value * controller.duration;
}).on("mousedown", function() {
    controller.pause();
}).on("mouseup", function() {
    // If we were playing before seeking, start playing again
    if (playButton.innerHTML.trim() == pauseIcon) {
        controller.play();
    }
});

function controllerPlaying() {
    return !(controller.played.length === 0 || controller.paused);
}

$(playButton).click(function() {
    if (controllerPlaying()) {
        controller.pause();
        this.innerHTML = playIcon;
    } else {
        controller.play();
        this.innerHTML = pauseIcon;
    }
});

$(backwardButton).click(function() {
    if (controllerPlaying()) {
        controller.pause();
    }
    controller.currentTime -= TIME_STEP;
});

$(forwardButton).click(function() {
    if (controllerPlaying()) {
        controller.pause();
    }
    controller.currentTime += TIME_STEP;
});

$(rateForm).submit(function() {
    // Don't actually submit the form, we just want to validate it
    return false;
});
$(rateInput).on("input", function() {
    if (!this.checkValidity()) {
        return;
    }
    controller.playbackRate = controller.defaultPlaybackRate = this.value;
});

$(getLinkButton).click(function() {
    uri.setSearch("time", controller.currentTime);
    getLinkUrl.value = uri.href();
    getLinkUrl.select();
});

$(addUrlForm).submit(function() {
    var urlGroups = $(".videoSelector").optGroups("URLs");
    urlGroups.append($("<option/>", {text: videoUrl.value}));
    videoArray[videoUrl.value] = videoUrl.value;
    videoUrl.value = "";

    // Don't actually submit the form, we just want to validate it
    return false;
});

$(localFile).change(function(event) {
    var files = event.target.files;
    for (var i = 0, f; f = files[i]; i++) {
        if (!f.type.match('video.*')) {
            continue;
        }
        var localGroups = $(".videoSelector").optGroups("Local files");
        localGroups.append($("<option/>", {text: f.name}));
        videoArray[f.name] = window.URL.createObjectURL(f);
    }
});

// Keyboard shortcuts

Mousetrap.stopCallback = function(e, element, combo) {
    // Ignore the shortcuts for these elements only
    return element.tagName == "SELECT" || element.tagName == "TEXTAREA" ||
        (element.tagName == "INPUT" &&
         (element.type == "number" || element.type == "text" || element.type == "url"));
};

Mousetrap.bind("space", function() {
    $(playButton).click();
    return false; // prevent default behavior
});
Mousetrap.bind("h", function() {
    $(backwardButton).click();
});
Mousetrap.bind("l", function() {
    $(forwardButton).click();
});
