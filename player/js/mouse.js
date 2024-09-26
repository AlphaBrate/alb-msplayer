var x, y;
document.body.addEventListener('contextmenu', function (e) {
    // When right clicked, show context menu
    // But if touched the border of body, fix the position of context menu to another side of the mouse
    // Touched right border: show context menu on the left side of the mouse;
    // Touched bottom border: show context menu on the top side of the mouse;
    // The context menu should be on the left bottom side of the mouse by default
    let devMode = localStorage.getItem('dev') === 'true';
    if (devMode) {
        return;
    }
    var menu = document.getElementById('contextMenu');
    menu.style.animation = 'none';
    x = e.clientX;
    y = e.clientY;
    var w = window.innerWidth;
    var h = window.innerHeight;
    if (x + menu.offsetWidth > w) {
        x -= menu.offsetWidth;
    }
    if (y + menu.offsetHeight > h) {
        y -= menu.offsetHeight;
    }
    menu.style.left = x + 'px';
    menu.style.top = y + 'px';
    menu.style.opacity = '1';
    menu.style.pointerEvents = 'auto';
    // Solve the problem that the context menu shown as one up and one down
    // If the context menu is shown as one up and one down, change the position of the context menu
    // If the context menu is shown as one left and one right, do nothing
    if (menu.offsetTop + menu.offsetHeight > h) {
        menu.style.top = h - menu.offsetHeight + 'px';
    }
    if (menu.offsetLeft + menu.offsetWidth > w) {
        menu.style.left = w - menu.offsetWidth + 'px';
    }

    // Prevent default right click event
    if (e.target != menu && e.target.className != 'item') {
        e.preventDefault();
    } else {
        // If clicked on the context menu, remove the context menu
        menu.style.opacity = '0';
        // Remove animation(fadein) to context menu with css (animation: fadein 0.3s ease-in-out;)
        menu.style.animation = 'none';
        menu.style.pointerEvents = 'none';
    }
    // Add animation
    menu.style.animation = 'fadein 0.1s ease-in-out';
});

var items = document.getElementsByClassName('item');
for (var i = 0; i < items.length; i++) {
    items[i].addEventListener('click', function (e) {
        // Click event for context menu items
        var menu = document.getElementById('contextMenu');
        menu.style.opacity = '0';
        // Remove animation(fadein) to context menu with css (animation: fadein 0.3s ease-in-out;)
        menu.style.animation = 'none';
        menu.style.pointerEvents = 'none';
    });
}

document.getElementById('time').addEventListener('click', function () {
    // show context menu on the same position of the #time
    var menu = document.getElementById('contextMenu');
    menu.style.animation = 'none';
    x = document.getElementById('time').offsetLeft;
    y = document.getElementById('time').offsetTop;
    var w = window.innerWidth;
    var h = window.innerHeight;
    if (x + menu.offsetWidth > w) {
        x -= menu.offsetWidth;
    }
    if (y + menu.offsetHeight > h) {
        y -= menu.offsetHeight;
    }

    menu.style.left = x + 'px';
    menu.style.top = y + 'px';
    menu.style.opacity = '1';
    menu.style.pointerEvents = 'auto';
});

// Pre load context menu, position it to the top-left corner of the screen
var menu = document.getElementById('contextMenu');
menu.style.left = '0px';
menu.style.top = '0px';
menu.style.display = 'block';
menu.style.opacity = '0';
menu.style.pointerEvents = 'none';


// Remove context menu
document.body.addEventListener('click', function (e) {
    const t = e.target;
    // Remove context menu if clicked outside
    var menu = document.getElementById('contextMenu');
    if (t != menu && t.className != 'item' && t.id != 'time') {
        menu.style.opacity = '0';
        // Remove animation(fadein) to context menu with css (animation: fadein 0.3s ease-in-out;)
        menu.style.animation = 'none';
        menu.style.pointerEvents = 'none';
    }
});

// document.body.addEventListener('dblclick', function (e) {
//     // DOUBLED CLICK EVENT
//     if (e.target.id === 'albumArt') {
//         return;
//     }
// });

document.addEventListener('gesturestart', function (e) {
    e.preventDefault();
});
document.addEventListener('doubleclick', function (e) {
    e.preventDefault();
});

// Ctrl + S event
document.addEventListener('keydown', function (e) {
    if (e.ctrlKey && e.key === 's' && !e.altKey) {
        e.preventDefault();
        app.share();
    }
    else if (e.ctrlKey && e.altKey && e.key === 's') {
        e.preventDefault();
        app.settings();
    }
    else if (e.ctrlKey && e.key === 'd') {
        e.preventDefault();
        app.details();
    }
    else if (e.ctrlKey && e.key === 'q') {
        e.preventDefault();
        app.queue();
    }
});

Max = (a, b) => {
    return a > b ? a : b;
}

Min = (a, b) => {
    return a < b ? a : b;
}