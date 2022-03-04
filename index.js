
import characterData from "./data.js";
import Character from "./character.js";

let villainArray = ["sindel", "rain", "sonya", "kano","johnny", "fujin"]
let heroArray = ["jade","kitana", "skarlet"]
let isWaiting = false

function getNewVillain(){
    const nextVillainData = characterData[villainArray.shift()]
    return nextVillainData ? new Character(nextVillainData) : {}

}

function getNewHero(){
    const nextHeroData = characterData[heroArray.shift()]
    return nextHeroData ? new Character(nextHeroData): {}
}
function attack(){
    if(!isWaiting){

        hero.setDiceHtml()
        villain.setDiceHtml()
        hero.takeDamage(villain.currentDiceScore)
        villain.takeDamage(hero.currentDiceScore)
        render()

        if(hero.dead) {
            isWaiting = true
            if(heroArray.length >0){
                setTimeout(()=>{
                    hero = getNewHero()
                    render()
                    isWaiting = false
                }, 1000)
            }
            else{
                endGame()
            }
            // endGame()
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
    const endMessage  = hero.health === 0 && villain.health === 0 ? "Everyone is dead" : 
        hero.health > 0 ? "Jade's Team Wins": "The Villains Win"
    const endEmoji = hero.health > 0 ? "💚 " : "☠️"
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
    document.getElementById("hero").innerHTML = hero.getCharacterHtml()
    document.getElementById("villain").innerHTML = villain.getCharacterHtml()

}


let hero = getNewHero()
let villain = getNewVillain()
render()