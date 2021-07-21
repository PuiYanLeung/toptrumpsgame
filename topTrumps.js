//Global variables
let isTwoPlay = false;
let defaultNumCard = 6; //Default Number of Card: 30

class Card {

    constructor(type){
        this._type = type;
        this._attributes = [];
        //this._questions = [];
    }

    get type(){
        return this._type;
    }

    getRandomNumber(min, max){
        return ((Math.random() * (max - min)) + min);
    }

}

class DinosaurCard extends Card {

    constructor(type){
        super(type);
        this._height = this.updateheight();
        this._attributes = [this._height];
    }

    get height(){
        return this._height;
    }

    updateheight(){
        return Math.ceil(this.getRandomNumber(1,10));
    }

    get attributes(){
        return this._attributes;
    }

}

class Player {

    constructor(type){
        this._playType = type;
        this._numCard = 0;
        this._playCards = [];
    }

    reset(type){
        this._playType = type;
        this._numCard = 0;
        this._playCards = [];
    }

    printPlayerCards(){
        for (let i=0; i<this._playCards.length; i++){
            // console.log(`attributes[0]`);
            console.log(`${this._playCards[i].attributes[0]}`);
            // console.log(`height`);
            // console.log(`${this._playCards[i].height}`);
        }        
    }

}

class Game {

    constructor(type){
        this._gameType = type;
        this._player1 = new Player(type);
        this._player2 = new Player(type);
        this._gameCards = [];
        this._limboArray = [];
    }

    updateGameCards(){
        for (let i=0; i<defaultNumCard; i++){
            if (this._gameType == "Dinosaur"){
                this._gameCards[i] = new DinosaurCard(this._gameType);
            }
        }
    }

    shuffleGameCards(){
        for (let i = this._gameCards.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * i);
            let temp = this._gameCards[i];
            this._gameCards[i] = this._gameCards[j];
            this._gameCards[j] = temp;
        }
    }

    distributeGameCards(){
        for (let i=0; i<defaultNumCard; i++){
            
            let temp = this._gameCards[i];

            if (i%2){ //Odd index
                // console.log(`Odd: ${i}`);
                this._player1._playCards.push(temp);

            }else{    //Even index
                // console.log(`Even: ${i}`);
                this._player2._playCards.push(temp);
            }
        }
    }

    compareStatistic(){
        let p1_firstElement = this._player1._playCards.shift();
        let p2_firstElement = this._player2._playCards.shift();

        let p1_attribute = p1_firstElement.attributes[0];
        let p2_attribute = p2_firstElement.attributes[0];

        console.log(`Player 1 card's height is ${p1_attribute} metres.`);
        console.log(`Player 2 card's height is ${p2_attribute} metres.`);

        if (p1_attribute > p2_attribute){

            if(this._limboArray.length>0){
                console.log(`Player 1 wins limbo cards.`);
            }

            while(this._limboArray.length>0){                
                this._player1._playCards.push(this._limboArray.pop());                
            }

            console.log(`Player 1 has the highest statistic, wins both cards.`);
            this._player1._playCards.push(p1_firstElement, p2_firstElement);

        }else if (p2_attribute > p1_attribute){

            if(this._limboArray.length>0){
                console.log(`Player 2 wins limbo cards.`);
            }

            while(this._limboArray.length>0){                
                this._player2._playCards.push(this._limboArray.pop());                
            }

            console.log(`Player 2 has the highest statistic, wins both cards.`);
            this._player2._playCards.push(p1_firstElement, p2_firstElement);

        }else{ //p1_attribute == p2_attribute
            console.log(`Statistics of player 1 and player 2 are the same, both cards go into limbo`);
            this._limboArray.push(p1_firstElement, p2_firstElement);
        }

        if (this._player1._playCards.length == 0){
            console.log(`Player 1 lose!`);
        }
        
        if (this._player2._playCards.length == 0){
            console.log(`Player 2 lose!`);
        }

        if(this._player1._playCards.length == defaultNumCard){
            console.log(`Player 1 win. Congratulations!`);
        }

        if(this._player2._playCards.length == defaultNumCard){
            console.log(`Player 2 win. Congratulations!`);
        }

    }

    printGameCards(){
        for (let i=0; i<defaultNumCard; i++){
            console.log(`${this._gameCards[i].attributes[0]}`);
        }        
    }
}

const game = new Game("Dinosaur");
game.updateGameCards();
console.log("Create Cards");
//game.printGameCards();

console.log("Shuffle the cards");
game.shuffleGameCards();

console.log("After shuffling the cards");
game.printGameCards();
game.distributeGameCards();

console.log("Player 1 Cards");
game._player1.printPlayerCards();

console.log("Player 2 Cards");
game._player2.printPlayerCards();

for (let i=0; i<10; i++){
    game.compareStatistic();
    console.log("Player 1 Cards");
    game._player1.printPlayerCards();
    
    console.log("Player 2 Cards");
    game._player2.printPlayerCards();

}











// let dinoCardArray = [];

// for (let i=0; i<30; i++){
//     dinoCardArray[i] = new DinosaurCard("Dinosaur");
// }

// for (let i=0; i<30; i++){
//     console.log(`${dinoCardArray[i].height}`);
// }

/*
let objArray = [];

for (let i=0; i<10; i++){
    //objArray.push(new Bunny(i));
    objArray[i] = new Bunny("obj" + i);
}

objArray[4].increaseHops();

console.log(objArray);
*/

