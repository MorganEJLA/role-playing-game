
import characterData from "./data.js";
import Character from "./character.js";

let villainArray = ["sindel", "rain", "sonya"]
let isWaiting = false

function getNewVillain(){
    const nextVillainData = characterData[villainArray.shift()]
    return nextVillainData ? new Character(nextVillainData) : {}

}
function attack(){
    if(!isWaiting){
        jade.setDiceHtml()
        villain.setDiceHtml()
        jade.takeDamage(villain.currentDiceScore)
        villain.takeDamage(jade.currentDiceScore)
        render()

        if(jade.dead) {
            endGame()
        }
        else if (villain.dead){
            isWaiting = true
            if(villainArray.length > 0){
                setTimeout(()=>{
                    villain = getNewVillain()
                    render()
                    isWaiting = false
                },1000)
            }
            else{
                endGame()
            }
        }
     
    }

}



function endGame(){
    isWaiting = true
    const endMessage  = jade.health === 0 && villain.health === 0 ? "Everyone is dead" : 
        jade.health > 0 ? "Jade Wins": "The Villains Win"
    const endEmoji = jade.health > 0 ? "💚" : "☠️"
        setTimeout(()=>{
            document.body.innerHTML = 
            `<div class = "end-game">
                <h2>Game Over</h2>
                <h3>${endMessage}</h3>
                <p class = "end-emoji">${endEmoji}</p>
            </div>`

        }, 1500)
}
   


document.getElementById("attack-button").addEventListener("click", attack)

function render(){
    document.getElementById("hero").innerHTML = jade.getCharacterHtml()
    document.getElementById("villain").innerHTML = villain.getCharacterHtml()

}


const jade = new Character(characterData.hero)
let villain = getNewVillain()
render()