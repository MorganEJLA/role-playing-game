
import characterData from "./data.js";
import Character from "./character.js";

function attack(){
    jade.getDiceHtml()
    sindel.getDiceHtml()
    jade.takeDamage(sindel.currentDiceScore)
    sindel.takeDamage(jade.currentDiceScore)
    render()
    if(jade.dead|| sindel.dead ){
        endGame()
    }

}

function endGame(){
    const endMessage  = jade.health === 0 && sindel.health === 0 ? "Everyone is dead" : 
        jade.health > 0 ? "Jade Wins": "Sindel Wins"
    const endEmoji = jade.health > 0 ? "💚" : "☠️"
    document.body.innerHTML = 
        `<div class = "end-game">
            <h2>Game Over</h2>
            <h3>${endMessage}</h3>
            <p class = "end-emoji">${endEmoji}</p>
        </div>`
}

document.getElementById("attack-button").addEventListener("click", attack)

function render(){
    document.getElementById("hero").innerHTML = jade.getCharacterHtml();
    document.getElementById("villain").innerHTML = sindel.getCharacterHtml();

}


const jade = new Character(characterData.hero)
const sindel = new Character(characterData.villain)
render()