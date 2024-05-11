function removetheme() {
    // Remove all style sheets, apart from player.css
    var styles = document.querySelectorAll('link');
    styles.forEach(function (style) {
        if (style.href != 'player.css') {
            style.remove();
        }
    });
}
function theme(t) {
    var style = document.createElement('link');
    style.rel = 'stylesheet';
    style.href = t;
    document.head.appendChild(style);
}

var immerse = (e) => {
    // Add style sheet to document
    removetheme();
    theme('player.css');
    theme('themes/immerse.css');
    e.getElementsByTagName('img')[0].src = 'assets/icons/contextMenu/immersive_filled.svg';
    e.onclick = () => normal(e);
    localStorage.setItem('theme', 'immerse');
}

var normal = (e) => {
    // Add style sheet to document
    removetheme();
    theme('player.css');
    try {
        e.getElementsByTagName('img')[0].src = 'assets/icons/contextMenu/immersive_stroke.svg';
        e.onclick = () => immerse(e);
    } catch { }

    if (localStorage.getItem('theme') == 'immerse') {
        if (innerWidth < innerHeight) {
            removetheme();
            theme('player.css');
            theme('themes/mobile.css');
        }
    }

    localStorage.setItem('theme', 'normal');

}

var mobile = () => {
    // Add style sheet to document
    normal();
    removetheme();
    theme('player.css');
    theme('themes/mobile.css');
}

var resize_TO;
window.addEventListener('resize', function () {
    clearTimeout(resize_TO);
    resize_TO = setTimeout(function () {
        if (innerWidth < innerHeight) mobile();
        else normal();
    }, 500);
});

if (innerWidth < innerHeight) mobile();
else normal();

// SET UP YOUR OWN THEME HERE.


if (localStorage.getItem('theme') == 'immerse') {
    immerse();
}

if (localStorage.getItem('theme') == 'desktop') {
    desktop();
}

function themeSelect() {
}

function getAverageRGB(imgEl, dim = 0.5) {

    var blockSize = 5, // only visit every 5 pixels
        defaultRGB = { r: 0, g: 0, b: 0 }, // for non-supporting envs
        canvas = document.createElement('canvas'),
        context = canvas.getContext && canvas.getContext('2d'),
        data, width, height,
        i = -4,
        length,
        rgb = { r: 0, g: 0, b: 0 },
        count = 0;

    if (!context) {
        return defaultRGB;
    }

    height = canvas.height = imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
    width = canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;


    context.drawImage(imgEl, 0, 0);

    // dimmer
    context.fillStyle = 'rgba(0, 0, 0, ' + dim + ')';
    context.fillRect(0, 0, width, height);

    try {
        data = context.getImageData(0, 0, width, height);
    } catch (e) {
        /* security error, img on diff domain */
        return defaultRGB;
    }

    length = data.data.length;

    while ((i += blockSize * 4) < length) {
        ++count;
        rgb.r += data.data[i];
        rgb.g += data.data[i + 1];
        rgb.b += data.data[i + 2];
    }

    // ~~ used to floor values
    rgb.r = ~~(rgb.r / count);
    rgb.g = ~~(rgb.g / count);
    rgb.b = ~~(rgb.b / count);

    return rgb;
}

// wait albumArt to be loaded

document.getElementById('albumArt').onload = function () {
    updateColor();
}

function makeRgb(a) {
    return `rgb(${a.r}, ${a.g}, ${a.b})`;
}

function updateColor() {
    var rgb = getAverageRGB(document.getElementById('albumArt'));
    rgb_color = makeRgb(rgb);

    var hex = rgb_color.replace(/rgb\(|\)|\s/g, '').split(',').map(function (x) {
        x = parseInt(x).toString(16);
        return (x.length == 1) ? '0' + x : x;
    }).join('');

    document.head.innerHTML += `<meta name="theme-color" content="#${hex}">`;
}

