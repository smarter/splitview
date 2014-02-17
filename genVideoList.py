#!/usr/bin/python
import os
import glob
import json

def codecName(path):
    _, ext = os.path.splitext(path)
    if ext == '.mp4':
        return "H.264"
    else:
        return "VP9"

def sampleName(path):
    return os.path.basename(path.split("-")[0])

def bitrate(path):
    return path.split("-")[1].rstrip("kbps") + " kbps"

videoList = [
    {
        'path': path,
        'sample': sampleName(path),
        'codec': codecName(path),
        'bitrate': bitrate(path)
    }
    for path in sorted(glob.glob("./samples/*"))
]

print json.dumps(videoList, indent=4)

