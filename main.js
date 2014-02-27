"use strict";

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
var leftImgDiv = document.getElementById("leftImgDiv");
var leftVidDiv = document.getElementById("leftVidDiv");
var localFile = document.getElementById("localFile");
var playButton = document.getElementById("playButton");
var rateForm = document.getElementById("rateForm");
var rateInput = document.getElementById("rateInput");
var rightImgDiv = document.getElementById("rightImgDiv");
var rightVidDiv = document.getElementById("rightVidDiv");
var seekSlider = document.getElementById("seekSlider");
var selectA = document.getElementById("selectA");
var selectB = document.getElementById("selectB");
var splitSlider = document.getElementById("splitSlider");
var videoUrl = document.getElementById("videoUrl");
var viewLink = document.getElementById("viewLink");

// Create the medias
var leftImg = new Image();
leftImg.id = "leftImg";
var rightImg = new Image();
rightImg.id = "rightImg";

var leftVid = document.createElement("video");
leftVid.id = "leftVid";
leftVid.dataset.mediagroup = "splitvideos";
var rightVid = document.createElement("video");
rightVid.id = "rightVid";
rightVid.dataset.mediagroup = "splitvideos";

var vp8Fallback = document.createElement("source");
vp8Fallback.src = "./samples/black.webm";
var h264Fallback = document.createElement("source");
h264Fallback.src = "./samples/black.mp4";

$(leftVid).append($([vp8Fallback, h264Fallback]).clone());
$(rightVid).append($([vp8Fallback, h264Fallback]).clone());

mediaGroupSetup([leftVid, rightVid]);

var controller = leftVid.controllerShim;

var mediaURLArray = new Array();

var playIcon = '<span class="glyphicon glyphicon-play"></span>';
var pauseIcon = '<span class="glyphicon glyphicon-pause"></span>';

function loadMedia(name, thisParam, thisImg, thisVid, otherVid) {
    var ext = name.split('.').pop();

    uri.setSearch(thisParam, name);

    if (ext == "gif" || ext == "jpg" || ext == "jpeg" || ext == "png") {
        var oldName = thisImg.src;
        thisImg.src = mediaURLArray[name] || name;
        thisImg.style.display = "";
        thisVid.style.display = "none";
        if (oldName == name && thisImg == leftImg) {
            // The load event won't be fired so we need to call the callback ourselves
            onLeftImgLoaded();
        }
    } else {
        thisVid.src = mediaURLArray[name] || name;
        thisVid.style.display = "";
        thisImg.style.display = "none";
    }
}

function loadLeftMedia(name) {
    loadMedia(name, "left", leftImg, leftVid, rightVid);
}
function loadRightMedia(name, reload) {
    loadMedia(name, "right", rightImg, rightVid, leftVid);
}

$(selectA).change(function() {
    loadLeftMedia($(this).val());
    leftVid.load();
    rightVid.load();
});

$(selectB).change(function() {
    loadRightMedia($(this).val());
    leftVid.load();
    rightVid.load();
});

function onLeftLoaded(width, height) {
    splitSlider.style.top = height / 2 + "px";

    // There doesn't seem to be a less ugly way to change the style of these
    // pseudo-elements.
    inlineStyle.innerHTML =
        "#splitSlider::-webkit-slider-thumb { height:" + height + "px; }\n" +
        "#splitSlider::-moz-range-thumb { height:" + height + "px; }\n" +
        "#splitSlider::-moz-range-track { height:" + height + "px; }";

    splitSlider.max = width;
    splitSlider.style.width = splitSlider.max + "px";
    splitSlider.value = splitSlider.max / 2;
    splitSlider.oninput = function() {
        leftVidDiv.style.width = this.value + "px";
        leftImgDiv.style.width = this.value + "px";
    };
    splitSlider.oninput();

    rightVid.style.width = width + "px";
    rightVid.style.height = height + "px";
    rightImg.style.width = width + "px";
    rightImg.style.height = height + "px";

    document.getElementById("playButton").innerHTML = playIcon;

    controller.muted = true;

    seekSlider.value = 0;
}

function onLeftImgLoaded() {
    if (leftImg.style.display != 'none') {
        onLeftLoaded(leftImg.naturalWidth, leftImg.naturalHeight);
    }
}

function onLeftVidLoaded() {
    if (leftVid.style.display != 'none') {
        onLeftLoaded(leftVid.videoWidth, leftVid.videoHeight);
    }
}

$(leftImg).on("load", function() {
    onLeftImgLoaded();
});

$(leftVid).on("loadeddata", function() {
    onLeftVidLoaded();
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
    return controller.playbackState == "playing";
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

$.fn.optGroups = function(labelText) {
    var groups = this.children("optgroup[label='" + labelText + "']");
    if (groups.length === 0) {
        this.append($("<optgroup/>", {label: labelText}));
        groups = this.children("optgroup[label='" + labelText + "']");
    }
    return groups;
};

function addUrl(url) {
    var existingUrl =
        $(".mediaSelector option").filter(function() {
            return this.value === url;
        }).length !== 0;
    if (!existingUrl) {
        var urlGroups = $(".mediaSelector").optGroups("URLs");
        urlGroups.append($("<option/>", {text: url}));
    }
}

$(addUrlForm).submit(function() {
    addUrl(videoUrl.value);
    videoUrl.value = "";

    // Don't actually submit the form, we just want to validate it
    return false;
});

$(localFile).change(function(event) {
    var files = event.target.files;
    for (var i = 0, f; f = files[i]; i++) {
        if (!f.type.match('video.*') && !f.type.match('image.*')) {
            console.warn("Ignoring local file " + f.name + " with unsupported type " + f.type);
            continue;
        }
        var localGroups = $(".mediaSelector").optGroups("Local files");
        localGroups.append($("<option/>", {text: f.name}));
        mediaURLArray[f.name] = window.URL.createObjectURL(f);
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
Mousetrap.bind("1", function() {
    $('#viewNav a[data-css="./splitview.css"]').tab('show');
});
Mousetrap.bind("2", function() {
    $('#viewNav a[data-css="./vertview.css"]').tab('show');
});
Mousetrap.bind("3", function() {
    $('#viewNav a[data-css="./horizview.css"]').tab('show');
});
Mousetrap.bind("4", function() {
    $('#viewNav a[data-css="./leftview.css"]').tab('show');
});
Mousetrap.bind("5", function() {
    $('#viewNav a[data-css="./rightview.css"]').tab('show');
});

// Bootstrap tabs control
$('a[data-toggle="tab"]').on('show.bs.tab', function (e) {
    viewLink.href = e.target.dataset.css;
});

var defaultParams = {
    "left": videoList[12],
    "right": videoList[13]
};
var uri = new URI(location.href);
var params = uri.search(true);


if (params.time) {
    var leftLoaded = false;
    var rightLoaded = false;

    // We need to wait until both videos are loaded before we can change
    // the controller currentTime
    $(leftVid).one("loadeddata", function() {
        if (rightLoaded) {
            controller.currentTime = params.time;
        }
        leftLoaded = true;
    });
    $(rightVid).one("loadeddata", function() {
        if (leftLoaded) {
            controller.currentTime = params.time;
        }
        rightLoaded = true;
    });
}

// Trying to load an unplayable video in a video tag will make it impossible
// to subsequently load any other video in that tag, so we need to be careful
function canPlay(media) {
    if (media.codec == "H.264") {
        return canPlayH264;
    }
    if (media.codec == "VP9") {
        return canPlayVP9;
    }
    return true;
}

$.each(videoList, function(i, v) {
    if (canPlay(v)) {
        var groups = $(".mediaSelector").optGroups(v.sample);
        groups.append($("<option/>", {text: v.path}));
    }
});
// Load the medias
if (params.left) {
    addUrl(params.left);
    loadLeftMedia(params.left);
} else if (canPlay(defaultParams.left)) {
    loadLeftMedia(defaultParams.left.path);
} else {
    leftImg.style.display = "none";
}
if (params.right) {
    addUrl(params.right);
    loadRightMedia(params.right);
} else if (canPlay(defaultParams.right)) {
    loadRightMedia(defaultParams.right.path);
} else {
    rightImg.style.display = "none";
}

$(leftVidDiv).append(leftVid);
$(rightVidDiv).append(rightVid);

if (leftImg.src === "") {
    leftImg.src = "./samples/black.png";
}
if (rightImg.src === "") {
    rightImg.src = "./samples/black.png";
}
$(leftImgDiv).append(leftImg);
$(rightImgDiv).append(rightImg);

$(selectA).val(uri.search(true).left);
$(selectB).val(uri.search(true).right);
