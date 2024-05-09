> [!NOTE]  
> The project is completely free and does not require a license, making it available for use in your personal projects. For AlphaBrate Music, please refer to [AlphaBrate/Music](https://github.com/alphabrate/music)

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

## 🔗 Quick Links

> - [📍 Overview](#-overview)
> - [📦 Features](#-features)
> - [📂 Repository Structure](#-repository-structure)
> - [🧩 Modules](#-modules)
> - [🚀 Getting Started](#-getting-started)
>   - [⚙️ Installation](#️-installation)
>   - [🤖 Running alb-msplayer](#-running-alb-msplayer)
>   - [🧪 Tests](#-tests)
> - [🛠 Project Roadmap](#-project-roadmap)
> - [🤝 Contributing](#-contributing)
> - [📄 License](#-license)
> - [👏 Acknowledgments](#-acknowledgments)

---

## 📍 Overview

A music player with a alphabrate-themed design, built using HTML, CSS, and JavaScript.

---

## 📦 Features

FREE TO USE, NO LICENSE REQUIRED
> (Built under the APEL License, specially consent to no license required for use.)

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

`Love Story - Taylor Swift`

```url
index.html?song=Love+Story&artist=Taylor+Swift&year=2009&album=Love+Story
```

---

## 🖊️ Edit for you Own

### 📂 Change Song Path

`player/js/player.js`

```js
const paths = {
    img: '/player/assets/defaults/art/',
    sounds: '/player/assets/defaults/music/'
};
```

> Others waiting for the documentation.
