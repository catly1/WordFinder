

window.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById("root").innerHTML = "boob"

    findWords()


})

function findWords(length, options) {
    fetch('words_alpha.txt').then(res => res.text().then(text => console.log(text)))
}