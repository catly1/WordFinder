

window.addEventListener('DOMContentLoaded', (event) => {
    const form = document.getElementById("form");
    form.addEventListener('submit', (e)=>{
        e.preventDefault();
        const bank = document.getElementById("bank").value;
        const length = document.getElementById("length").value
        findWords(bank, length)
    })
    // findWords()
})

function findWords(bank,length, options) {
    fetch('words_alpha.txt').then(res => res.text().then(text => {
        let matches = []
        const words = text.split(/\r\n|\n/)
        words.forEach(word =>{

            if (word.length == length){
                matches.push(word)
            }

        })
        renderResult(matches)
    }))
}

function renderResult(matches){
    const resultsElement = document.getElementById("results")
    console.log(matches)
    matches.forEach((match, index) =>{
        let matchElement = document.createElement("li")
        matchElement.id = index
        matchElement.innerHTML = match
        resultsElement.appendChild(matchElement)
    })
}