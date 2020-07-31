

window.addEventListener('DOMContentLoaded', (event) => {
    const form = document.getElementById("form");
    form.addEventListener('submit', (e)=>{
        e.preventDefault();
        const bank = document.getElementById("bank").value.split("");
        const length = document.getElementById("length").value;
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
                if (matchWord(word,bank)){
                    matches.push(word)
                }
            }

        })
        renderResult(matches)
    }))
}

function renderResult(matches){
    const resultsElement = document.getElementById("results")
    matches.forEach((match, index) =>{
        let matchElement = document.createElement("li")
        matchElement.id = index
        matchElement.innerHTML = match
        resultsElement.appendChild(matchElement)
    })
}

function matchWord(word, bank){
    let bankCopy = bank.slice();
    for (let index = 0; index < word.length; index++) {
        const letter = word[index];
        let bankIndex = bankCopy.indexOf(letter)
        if (bankIndex == -1) {
            return false
        } else {
            bankCopy.splice(bankIndex, 1)
        }
    }
    // word.split("").forEach(letter => {
    //     let index = bankCopy.indexOf(letter)
    //     if (index == -1){
    //         return false
    //     } else {
    //         bankCopy.splice(index, 1)
    //     }
    // })
    // console.log(bankCopy)
    return true
}