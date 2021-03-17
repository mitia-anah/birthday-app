var webFont = require('webfontloader')

webFont.load({
    google: {
        families: ['Rubik', 'Sans-serif']
    }
})

// var newStyle = document.createElement('style');
// newStyle.appendChild(document.createTextNode("\
// @font-face {\
//     font-family: " + Rubik + ";\
//     src: url('" +  + "') format('yourFontFormat');\
// }\
// "));

// document.head.appendChild(newStyle);