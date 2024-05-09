// This Open-sourced player by AlphaBrate is under the APEL License.
// As this project is done by individual from AlphaBrate, the terms, naming may not be professional.
// © AlphaBrate 2022 - 2024
// File: player.js
// Get search query from url

const paths = {
    img: '/player/assets/defaults/art/',
    sounds: '/player/assets/defaults/music/'
};

var search = window.location.search;
var searchParams = new URLSearchParams(search);
var search_json = searchParams.get('s');

if (search_json) {
    search = JSON.parse(decodeURI(search_json));
    for (var key in search) {
        searchParams.set(key, search[key]);
    }
    // remove s from search
    searchParams.delete('s');
    window.history.pushState({}, '', location.pathname + '?' + searchParams.toString());
}

var songName = searchParams.get('song') || 'Unknown';
var albumName = searchParams.get('album') || songName;
var albumYear = searchParams.get('year') || '';
var artistName = searchParams.get('artist') || '';

var song_direct_url = searchParams.get('song_direct_url') || void 0;
var album_art_direct_url = searchParams.get('album_art_direct_url') || void 0;
var detail_direct_url = searchParams.get('detail_direct_url') || void 0;

var fromUrl = song_direct_url != '' && album_art_direct_url != '' && detail_direct_url != '';

const albumArtElement = document.getElementById('albumArt');
const audio = document.getElementById('audio');

var img_ext = '.png';
var albumArt = album_art_direct_url || paths.img + albumName + img_ext; // Change this to the path of the album art

if (albumName != '') {
    albumArtElement.src = albumArt;
    document.body.style.backgroundImage = `url(${encodeURI(albumArt)})`;
}

// Change audio source
var ado_ext = '.mp3';
audio.src = song_direct_url || paths.sounds + songName + ado_ext; // Change this to the path of the audio file

// Change song title
var songTitle = document.getElementById('title');
songTitle.innerHTML = songName;
// Change artist
var artist = document.getElementById('artist');
artist.innerHTML = artistName;
// Change album
var album = document.getElementById('album');
album.innerHTML = albumName;
// Change year
var year = document.getElementById('year');
year.innerHTML = albumYear;

var alert_boxes = [];

const AlertL = (html) => {
    var a = document.createElement('div');
    a.innerHTML = html;
    a.className = 'large-alert';
    document.body.appendChild(a);
    alert_boxes.push(a);
}

const $ = (s, a) => {
    if (a) return document.querySelectorAll(s);
    return document.querySelector(s);
};

var AlertTimeout;

const Alert = (m = '', t = 'error', T = 3000, S) => {
    if (AlertTimeout) clearTimeout(AlertTimeout);

    if (S) {
        $('.alert-text').style.userSelect = 'text';
        $('.alert-text').style.pointerEvents = 'auto';
    } else {
        $('.alert-text').style.userSelect = 'none';
        $('.alert-text').style.pointerEvents = 'none';
    }
    let type_list = {
        error: {
            i: 'close',
            c: 'color-red'
        },
        success: {
            i: 'check',
            c: 'bg-green'
        },
    };

    let icon;

    if (type_list[t]) icon = type_list[t].i || 'close';
    else icon = t;


    $('.alert-icon').innerHTML = `<icon data-icon="${icon}" class="alert-icon stroke ${type_list[t] ? type_list[t].c : ''}"></icon>`;
    $('.alert-text').innerHTML = m;

    icons();

    $('.alert').classList.add('show');

    AlertTimeout = setTimeout(() => {
        $('.alert').classList.remove('show');
    }, T);
};

oneLinkHref = () => {
    // make all searches to JSON
    var search = new URLSearchParams(window.location.search);
    var search_json = {};
    search.forEach((v, k) => {
        search_json[k] = v;
    });
    return location.origin + location.pathname + '?s=' + encodeURI(JSON.stringify(search_json));
};

const app = {
    share: () => {
        AlertL(`
<h1>Share This Song</h1>
<button class="alphabrate-styled-button" onclick="app.copyLink()">
    <img src="assets/icons/contextMenu/link.svg">
    <span>Copy Link</span>
</button>
<div class="separator"></div>
<div class="flex">
    <a href="https://facebook.com/sharer/sharer.php?u=${oneLinkHref()}" target="_blank" class="small">
        <img src="assets/icons/logos/facebook.svg">
    </a>
    <a href="https://twitter.com/intent/tweet?url=${oneLinkHref()}&text=Listen to ${songName} by ${artistName}." target="_blank" class="small">
        <img src="assets/icons/logos/x.com.svg">
    </a>
    <a href="https://wa.me/?text=Listen to ${songName} by ${artistName}. ${oneLinkHref()}" target="_blank" class="small">
        <img src="assets/icons/logos/whatsapp.svg">
    </a>
</div>
<font style="color: gray;">or</font>
<button class="alphabrate-styled-button" onclick="app.shareApp()">
    <img src="assets/icons/contextMenu/ar.svg">
    <span>Share form your Device</span>
</button>
`);
    },
    shareApp: () => {
        // Device Share
        if (navigator.share) {
            navigator.share({
                title: songName,
                text: `Listen to ${songName} by ${artistName}.`,
                url: location.href
            }).then(() => {
                // 
            }).catch((error) => {
                Alert('Failed to share.', 'error', 2000);
            });
        } else {
            Alert('Your device does not support sharing.', 'error', 2000);
        }
    },
    copyLink: () => {

        try {
            navigator.clipboard.writeText(oneLinkHref());
            Alert('Copied to clipboard.', 'success', 2000)
        } catch {
            Alert('Failed to copy link.', 'error', 2000);
        }
    },
    settings: () => {
        AlertL(`
<div class"left-aligned">
    <h1>Settings</h1>
    <div class="flex left-aligned gap sameWidth">
        <font>Enable Auto Play</font>
        <span class="switch settings" onclick="app.toggle.autoplay();" id="s.autoplay"></span>
    </div>
    <div class="flex left-aligned gap sameWidth">
        <font>Default Context Menu</font>
        <span class="switch settings" onclick="app.toggle.dev();" id="s.dev"></span>
    </div>

    <div class="separator"></div>

    <div class="flex left-aligned gap sameWidth">
        <font>Hide on Lock Screen</font>
        <span class="switch settings" onclick="app.toggle.hideOnLock();" id="s.lock"></span>
    </div>
    <div class="flex left-aligned gap sameWidth">
        <font>Loop This Song</font>
        <span class="switch settings" onclick="app.toggle.loop();" id="s.loop"></span>
    </div>
    <div class="flex left-aligned gap sameWidth">
        <font>Show Duration</font>
        <span class="switch settings" onclick="app.toggle.duration();" id="s.duration"></span>
    </div>
        
    </div>
</div>
        `);

        document.querySelectorAll('.switch').forEach((s) => {
            s.addEventListener('click', () => {
                s.classList.toggle('checked');
            });
        });

        // get all items from local storage, check if there is a switch with the same s.id, if there is, add class checked
        var settings = ['autoplay', 'dev', 'lock', 'loop', 'duration'];
        settings.forEach((s) => {
            if (localStorage.getItem(s) == 'true') {
                var switch_ = document.getElementById('s.' + s);
                switch_.classList.add('checked');
            }
        });
    },
    toggle: {
        autoplay: () => {
            let autoPlay = localStorage.getItem('autoplay');
            if (autoPlay == 'true') {
                localStorage.setItem('autoplay', 'false');
            } else {
                localStorage.setItem('autoplay', 'true');
            }
        },
        dev: () => {
            let dev = localStorage.getItem('dev');
            if (dev == 'true') {
                localStorage.setItem('dev', 'false');
            } else {
                localStorage.setItem('dev', 'true');
            }
        },
        hideOnLock: () => {
            let lock = localStorage.getItem('lock');
            if (lock == 'true') {
                localStorage.setItem('lock', 'false');
                mediaSession();
            } else {
                localStorage.setItem('lock', 'true');
                // Remove media session
                navigator.mediaSession.metadata = null;
            }
        },
        loop: () => {
            let loop = localStorage.getItem('loop');
            if (loop == 'true') {
                localStorage.setItem('loop', 'false');
            } else {
                localStorage.setItem('loop', 'true');
            }
        },
        duration: () => {
            let duration = localStorage.getItem('duration');
            if (duration == 'true') {
                localStorage.setItem('duration', 'false');
                document.getElementById('duration').style.opacity = '0';
            } else {
                localStorage.setItem('duration', 'true');
                document.getElementById('duration').style.opacity = '1';
            }
        }
    },
    details: () => {
        AlertL(`
<h1>Details</h1>
<div class="flex col center">
    <div class="flex left-aligned gap sameWidth">
        <font style="color: gray;">Song Name:</font>
        <font>${songName}</font>
    </div>
    <div class="flex left-aligned gap sameWidth">
        <font style="color: gray;">Artist:</font>
        <font>${artistName}</font>
    </div>
    <div class="flex left-aligned gap sameWidth">
        <font style="color: gray;">Album:</font>
        <font>${albumName}</font>
    </div>
    <div class="flex left-aligned gap sameWidth">
        <font style="color: gray;">Year:</font>
        <font>${albumYear}</font>
    </div>
    <div class="separator"></div>
    <div class="flex center gap sameWidth">
        <font style="color: gray;">Album Art:</font>
        <font><a href="${albumArt}" target="_blank">View</a></font>
    </div>
    <div class="flex center gap sameWidth">
        <font style="color: gray;">Audio:</font>
        <font><a href="${audio.src}" target="_blank">View</a></font>
    </div>
    <div class="flex center gap sameWidth">
        <font style="color: gray;">Details:</font>
        <font><a href="${detail_direct_url}" target="_blank">View</a></font>
    </div>
</div>
`);
    }
}

function mediaSession() {
    if ('mediaSession' in navigator && localStorage.getItem('lock') == 'false') {

        navigator.mediaSession.metadata = new MediaMetadata({
            title: songName,
            artist: artistName,
            album: albumName,
            artwork: [
                { src: albumArt, sizes: '512x512', type: 'image/' + img_ext.split('.')[1] },
            ]
        });

        navigator.mediaSession.setActionHandler('play', function () {
            audio.play();
        });

        navigator.mediaSession.setActionHandler('pause', function () {
            audio.pause();
        });

        navigator.mediaSession.setActionHandler('previoustrack', function () {
            // Change to previous track
            // Or back to start of the track
            audio.currentTime = 0;
        });

        navigator.mediaSession.setActionHandler('nexttrack', function () {
            // Change to next track
            // Or next 10s
            audio.currentTime += 10;
        });

        navigator.mediaSession.setActionHandler('stop', function () {
            audio.pause();
        });

        // Set the duration of the track
        navigator.mediaSession.metadata.duration = audio.duration;

        // Set the playback state
        navigator.mediaSession.playbackState = 'playing';

        // Seek to a new time
        navigator.mediaSession.setActionHandler('seekto', function (details) {
            if (details.seekTime) {
                audio.currentTime = details.seekTime;
            }
        });
    }
}

mediaSession();


var loaded_icons = {};

// Replace all <icon> to <svg>
var icon_holders = document.getElementsByTagName('icon');
async function icons() {
    if (icon_holders.length == 0) {
        return;
    }
    var icon = icon_holders[0].getAttribute('data-icon');
    var icon_element = icon_holders[0];
    var icon_parent = icon_element.parentElement;
    var svgUrl = `assets/icons/contextMenu/${icon}.svg`;
    if (loaded_icons[icon] == void 0) {
        await fetch(svgUrl)
            .then(response => response.text())
            .then(svg => {
                var span = document.createElement('span');
                span.innerHTML = svg;
                var icon_class = icon_element.getAttribute('class');
                span.setAttribute('class', icon_class);
                span.setAttribute('style', '--mask-i: url(' + svgUrl + ')');
                try { icon_parent.replaceChild(span, icon_element); } catch { }
                icons();
                loaded_icons[icon] = svg;
            });
    } else {
        var span = document.createElement('span');
        span.innerHTML = loaded_icons[icon];
        var icon_class = icon_element.getAttribute('class');
        span.setAttribute('class', icon_class);
        span.setAttribute('style', '--mask-i: url(' + svgUrl + ')');
        try { icon_parent.replaceChild(span, icon_element); } catch { }
        icons();
    }
}

icons();

function preloadIcon(icon) {
    if (loaded_icons[icon] == void 0) {
        fetch(`assets/icons/contextMenu/${icon}.svg`)
            .then(response => response.text())
            .then(svg => {
                loaded_icons[icon] = svg;
            });
    }
}

var folders = document.getElementsByClassName('folder');
var sets = document.getElementsByClassName('set');
// if a set contains more than one folder, add a class 'line' to the folders exclude the last one
for (var i = 0; i < sets.length; i++) {
    var set = sets[i];
    var folders = set.getElementsByClassName('folder');
    if (folders.length > 1) {
        for (var j = 0; j < folders.length - 1; j++) {
            if (!folders[j].classList.contains('no-line')) {
                folders[j].classList.add('line');
            }
        }
    }
}