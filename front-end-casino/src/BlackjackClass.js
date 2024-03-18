// Blackjack Class for Logic Handling
import { Shuffle, drawCard } from "./DeckOfCardsAPI";
import CasinoApi from "./api";

class BlackjackClass {
    constructor() {
        this.deckID = null;
        this.playerHand = [];
        this.dealerHand = [];
        this.gameState = "start";
        this.playerHandTotal = 0;
        this.dealerHandTotal = 0;
        this.currentBet = 0;
        this.balance = 0;
    }

    getBalance() {
        this.balance = localStorage.getItem("balance");
        return this.balance;
    }

    async startGame(){
        // set gameState to drawing
        this.gameState = "drawing";
        // get deck id
        let res = await Shuffle(6);
        this.deckID = res.data.deck_id;
    }

    async dealCard(){
        // draws a card from DeckofCardsAPI based off of this.deckID
        let res = await drawCard(this.deckID);
        return res.data.cards[0];
    }

    async dealCards() {
        // deals all starting cards
        // draw a card for player
        let playerCard1 = await this.dealCard();
        this.playerHand.push(playerCard1); 
    
        // draw a card for dealer 
        let dealerCard1 = await this.dealCard();
        this.dealerHand.push(dealerCard1);
    
        // draw a card for player 
        let playerCard2 = await this.dealCard();
        this.playerHand.push(playerCard2);
    
        // draw a card for dealer with card face down
        let dealerCard2 = await this.dealCard();
        this.dealerHand.push(dealerCard2); 
        this.dealerHand[1].isFaceDown = true;

        // Update hand totals after all cards have been drawn
        this.playerHandTotal = this.calculateHandValue(this.playerHand);
        this.dealerHandTotal = this.calculateHandValue(this.dealerHand);
    
        this.gameState = "playing";
    }
    
    

    calculateHandValue(hand) {
        // get total value of cards based off of values
        let sum = 0;
        let hasAce = false;
    
        for (const card of hand) {
            // Skip facedown cards
            if (!card.isFaceDown) {
                if (card.value === 'ACE') {
                    hasAce = true;
                }
                if (['JACK', 'QUEEN', 'KING'].includes(card.value)) {
                    sum += 10;
                } else if (card.value !== 'ACE') {
                    sum += parseInt(card.value);
                }
            }
        }
    
        if (hasAce) {
            if (sum + 11 <= 21) {
                sum += 11;
            } else {
                sum += 1;
            }
        }
    
        return sum;
    }
    
    async increaseBet(bet, username){
        // increase bet by 10
        this.currentBet += bet;
        await CasinoApi.placeBet(username, bet);
        this.balance = this.balance - bet;
        localStorage.setItem("balance", this.balance);
    }

    endGame(){
        let msg;
        if (this.gameState === "playerBust"){
            msg = `You busted with a total of ${this.playerHandTotal}! You lose your bet.`;
        } else if (this.gameState === "dealerBust"){
            msg = `Dealer busted with a total of ${this.dealerHandTotal}! You win your bet.`;
        } else if (this.gameState === "draw"){
            msg = "It's a draw! You lose your bet.";
        } else if (this.gameState === "playerWin"){
            msg = `You won with a total of ${this.playerHandTotal}! You win your bet.`;
        } else if (this.gameState === "dealerWin"){
            msg = `Dealer wins with a total of ${this.dealerHandTotal}! You lose your bet.`;
        } else {
            msg = "Something went wrong. You lose your bet.";
        }

        return msg;
    }

    async hit(){
        // add a card to player hand and check if bust
        // if bust, set gameState to playerBust
        console.log("hitting...");
        let playerCard = await this.dealCard();
        this.playerHand.push(playerCard);
        this.playerHandTotal = this.calculateHandValue(this.playerHand);
        this.checkBust();
    }

    async stand(){
        // flip dealers second card
        this.dealerHand[1].isFaceDown = false;
        // calculate new hand value
        this.dealerHandTotal = this.calculateHandValue(this.dealerHand);
        // check if dealer bust
        this.checkBust();

        // if hand value is less than 17, continue drawing cards until hand value is greater than 17 checking for bust inbetween
        while (this.dealerHandTotal < 17) {
            let dealerCard = await this.dealCard();
            this.dealerHand.push(dealerCard);
            this.dealerHandTotal = this.calculateHandValue(this.dealerHand);
            console.log("dealer hand total: ", this.dealerHandTotal);
            console.log("dealer hand: ", this.dealerHand);
            this.checkBust();
        }
        // Once dealer hand is finalized, check the result
        this.checkWin();
        console.log(this.gameState)
    }

    checkWin(){
        // Check if anyone has busted
        this.checkBust();

        // Check if player total is greater than dealer total
        if (this.playerHandTotal > this.dealerHandTotal) {
            this.gameState = "playerWin";
        } 
        // Check if player total is less than dealer total
        else if (this.dealerHandTotal > this.playerHandTotal) {
            this.gameState = "dealerWin";
        } 
        // If totals are equal, it's a draw
        else {
            this.gameState = "draw";
        }
        
        // Move on to endGame
        this.endGame();
    }

    checkBust(){
        // Check if player hand is over 21
        if (this.playerHandTotal > 21) {
            this.gameState = "playerBust";
        }

        // Check if dealer hand is over 21
        if (this.dealerHandTotal > 21) {
            this.gameState = "dealerBust";
        }
    }

    restartGame(){
        // Reset game state and clear hands
        this.playerHand = [];
        this.dealerHand = [];
        this.playerHandTotal = 0;
        this.dealerHandTotal = 0;
        this.gameState = "start";
        this.currentBet = 0;
    }

    async doubleBet(username){
        await CasinoApi.placeBet(username, this.currentBet);
        this.currentBet *= 2;
        this.balance -= this.currentBet;
        localStorage.setItem("balance", this.balance);
    }

    async tripleBet(username){
        let oldBet = this.currentBet;
        let newBet = oldBet * 3;
        let bet = newBet - oldBet;
        await CasinoApi.placeBet(username, bet);
        this.currentBet = newBet;
        this.balance -= this.currentBet;
        localStorage.setItem("balance", this.balance);
    }   
}

export default BlackjackClass;
