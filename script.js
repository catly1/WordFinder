

window.addEventListener('DOMContentLoaded', (event) => {
    const form = document.getElementById("form");
    form.addEventListener('submit', (e)=>{
        e.preventDefault();
        const bank = document.getElementById("bank").value.toLowerCase().split("");
        const length = document.getElementById("length").value;
        const xWord = handleXwordFormat(document.getElementById("xWord").value.toLowerCase());
        clearInputs();
        if (bank && length){
            findWords(bank, length, xWord)
        }
    })

    const clearButton = document.getElementById("clear");
    clearButton.addEventListener('click', (e)=>{
        e.preventDefault();
        clearInputs();
        clearResults();
    })
    // findWords()
})


function clearInputs(){
    document.getElementById("bank").value = "";
    document.getElementById("length").value = "";
    document.getElementById("xWord").value = "";
}

function clearResults(){
    document.getElementById("results").innerHTML="";
}

function handleXwordFormat(xWord){
    if (xWord == "") return "";
    let obj = {};
    for (let index = 0; index < xWord.length; index++) {
        const letter = xWord[index];
        obj[index] = letter;
    }
    return obj;
}

function findWords(bank,length, xWord) {
    fetch('words_alpha.txt').then(res => res.text().then(text => {
        let matches = []
        const words = text.split(/\r\n|\n/)
        words.forEach(word =>{

            if (word.length == length){
                if (matchWord(word,bank, xWord)){
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

function matchWord(word, bank, xWord){
    let bankCopy = bank.slice();
    for (let index = 0; index < word.length; index++) {

        const letter = word[index];
        if (xWord != "" && xWord[index] != "*" && xWord[index] != letter) {
            return false
        }


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