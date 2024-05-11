const paths = {
    img: 'assets/defaults/art/',
    sounds: 'assets/defaults/music/',
    lists: 'assets/defaults/lists/',
};

var search = window.location.search;
var searchParams = new URLSearchParams(search);
var search_json = searchParams.get('s');
var list_a = searchParams.get('list');
var list_done = searchParams.get('list_done');

var list_data = {};
if (list_a) {
    fetch(paths.lists + list_a + '.json')
        .then(response => response.json())
        .then(data => {
            var songs = data.songs;

            list_data = data.songs;

            if (songs.length == 0) {
                Alert('No songs in this list.', 'error', 2000);
                return;
            }

            if (list_done) return;

            if (searchParams.get('index')) {
                var index = searchParams.get('index');
                if (index > songs.length) {
                    Alert('Invalid index.', 'error', 2000);
                    return;
                }
                var song = songs[index - 1];
            } else {
                var song = songs[0];
            }

            console.log(data.song);
            searchParams.set('song', song.song);
            searchParams.set('album', song.album);
            searchParams.set('year', song.year);
            searchParams.set('artist', song.artist);
            searchParams.set('list_done', 'true');
            if (song.song_direct_url) searchParams.set('song_direct_url', song.song_direct_url);
            if (song.album_art_direct_url) searchParams.set('album_art_direct_url', song.album_art_direct_url);
            if (song.detail_direct_url) searchParams.set('detail_direct_url', song.detail_direct_url);
            searchParams.set('index', songs.indexOf(song) + 1);
            window.history.pushState({}, '', location.pathname + '?' + searchParams.toString());
            location.reload();
        });
}

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

var img_ext = '.webp';
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

// For Title, try best make sure it's in one line, adjust font-size if needed
if (songName.length > 20) {
    songTitle.style.fontSize = '1.6rem';
} else if (songName.length > 30) {
    songTitle.style.fontSize = '1.2rem';
} else {
    songTitle.style.fontSize = '2rem';
}


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

const AlertL = (html, scroll = false, id) => {
    var a = document.createElement('div');
    a.innerHTML = html;
    a.className = 'large-alert';
    if (scroll) {
        a.style.display = 'block';
        a.style.overflowY = 'scroll';
    };

    if (id) a.id = id;

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

var alerts_toggled = [];

const app = {
    share: () => {
        if (!alerts_toggled.includes('share')) {
            alerts_toggled.push('share');
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
`, false, 'share');
        } else {
            $('#share').style.animation = 'slideout .5s';
            // remove from array
            try {
                setTimeout(() => {
                    $('#share').remove();
                    alerts_toggled.pop('share');
                }, 500);
            } catch { }
        }
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
        if (!alerts_toggled.includes('settings')) {
            alerts_toggled.push('settings');
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
    <div class="flex left-aligned gap sameWidth">
        <font>Shuffle All Songs</font>
        <span class="switch settings" onclick="app.toggle.shuffle();" id="s.shuffle"></span>
    </div>
        
    </div>
</div>
        `, false, 'settings');

            document.querySelectorAll('.switch').forEach((s) => {
                s.addEventListener('click', () => {
                    s.classList.toggle('checked');
                });
            });

            // get all items from local storage, check if there is a switch with the same s.id, if there is, add class checked
            var settings = ['autoplay', 'dev', 'lock', 'loop', 'duration', 'shuffle'];
            settings.forEach((s) => {
                if (localStorage.getItem(s) == 'true') {
                    var switch_ = document.getElementById('s.' + s);
                    switch_.classList.add('checked');
                }
            });
        }
        else {
            $('#settings').style.animation = 'slideout .5s';
            // remove from array
            try {
                setTimeout(() => {
                    $('#settings').remove();
                    alerts_toggled.pop('settings');
                }, 500);
            } catch { }
        }

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
        shuffle: () => {
            let shuffle = localStorage.getItem('shuffle');
            if (shuffle == 'true') {
                localStorage.setItem('shuffle', 'false');
            } else {
                localStorage.setItem('shuffle', 'true');
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
        if (alerts_toggled.includes('details')) {
            $('#details').style.animation = 'slideout .5s';
            // remove from array
            try {
                setTimeout(() => {
                    $('#details').remove();
                    alerts_toggled.pop('details');
                }, 500);
            } catch { }
        } else {
            let LIST = '';
            if (list_data.length > 0) {
                LIST = `<div class="separator"></div>
<h1>Songs</h1>
<div class="flex col left-aligned">
    ${list_data.map((s, i) => {
                    let CURRENT = '';
                    if (s.song == songName) {
                        CURRENT = ' current';
                    }
                    return `
    <div class="flex left-aligned gap sameWidth${CURRENT}" onclick="playSongFromList(${i})">
        <font>${i + 1}.</font>
        <font>${s.song}</font>
    </div>
    `;
                }).join('')}
</div>`;
            }
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
    ${LIST}
    <div class="separator"></div>
    <div class="flex center gap sameWidth">
        <font style="color: gray;">© ReTrn 2022 - 2024. All rights reserved.</font>
    </div>
</div>
`, true, 'details');
            alerts_toggled.push('details');
        }
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
            previous();
        });

        navigator.mediaSession.setActionHandler('nexttrack', function () {
            next();
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