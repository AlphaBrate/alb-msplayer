<p align="center">
    <h1 align="center">AlphaBrate Music Player</h1>
</p>
<p align="center">
    <em><code>Simple Web Based Music Player</code></em>
</p>
<p align="center">
 <img src="https://img.shields.io/github/license/alphabrate/alb-msplayer?style=flat&color=0080ff" alt="license">
 <img src="https://img.shields.io/github/last-commit/alphabrate/alb-msplayer?style=flat&logo=git&logoColor=white&color=0080ff" alt="last-commit">
 <img src="https://img.shields.io/github/languages/top/alphabrate/alb-msplayer?style=flat&color=0080ff" alt="repo-top-language">
 <img src="https://img.shields.io/github/languages/count/alphabrate/alb-msplayer?style=flat&color=0080ff" alt="repo-language-count">
<p>
<p align="center">
  <em>Developed with the languages:</em>
</p>
<p align="center">
 <img src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=flat&logo=JavaScript&logoColor=black" alt="JavaScript">
 <img src="https://img.shields.io/badge/HTML5-E34F26.svg?style=flat&logo=HTML5&logoColor=white" alt="HTML5">
</p>
<hr>

Sample available here: [https://chutm.github.io/player/?list=all](https://chutm.github.io/player/?list=all)

## 📍 Overview

A music player with a AlphaBrate-themed design, built using HTML, CSS, and JavaScript.

---

## 📦 Features

FREE TO USE, NO LICENSE REQUIRED
> (Built under the APEL License, chartered to have no license required for use.)

- Play from File or URL
- MediaSession API
- Customizable Themes
- Customizable Controls
- Customizable Context Menu
- Customizable Icons
- Customizable Artwork
- Customizable Music
- Settings Menu
- Share Menu
- Social Media Links
- Responsive Design
- Mobile Friendly
- Keyboard Shortcuts
- Immersive Mode

---

## 🚀 Getting Started

### ⚙️ Installation

1. Clone the alb-msplayer repository:

```sh
git clone https://github.com/alphabrate/alb-msplayer
```

2. Change to the project directory:

```sh
cd alb-msplayer/player
```

3. Start the project from `player/index.html`:

```sh
start index.html
```

3.1. Default songs are provided.

---

## 🖊️ Edit for Your Own

### 📂 Change Song Path

`player/js/player.js`

```js
const paths = {
    img: '/player/assets/defaults/art/',
    sounds: '/player/assets/defaults/music/',
    list: '/player/assets/defaults/lists/'
};
```

### 🎨 Add Theme

`player/js/theme.js`

```js
var THEME = () => {
    // Add style sheet to document
    removetheme();
    theme('player.css'); // May not be necessary
    theme('themes/THEME.css');
    localStorage.setItem('theme', 'THEME');
}
```

> Simply add a new theme file to the `player/css/themes/` directory and add a new line to the `THEME` function.


<center>
    <p>Other files waiting for documentation.</p>
</center>

> [!WARNING]  
> Please note that you cannot pulish this project with those default songs. (C) ReTrn 2024, All Rights Reserved.
