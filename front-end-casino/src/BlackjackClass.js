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

    async startGame(){
        // set gameState to drawing
        this.gameState = "drawing";
        // get deck id
        let res = await Shuffle(6);
        this.deckID = res.data.deck_id;
        // get balance
        this.balance = localStorage.getItem("balance");
        // get current bet
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
    
    

    calculateHandValue(hand){
        // get total value of cards based off of values
        let sum = 0;
        let hasAce = false;

        for (const card of hand) {
            if (card.value === 'ACE') {
            hasAce = true;
            }
            if (['JACK', 'QUEEN', 'KING'].includes(card.value)) {
            sum += 10;
            } else if (card.value !== 'ACE') {
            sum += parseInt(card.value);
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
    
    }

    endGame(){
        let msg;
        if (this.gameState === "playerBust"){
            msg = `You busted with a total of ${this.playerHandTotal}! You lose your bet.`;
            this.balance -= this.currentBet;
            localStorage.setItem("balance", this.balance);
        } else if (this.gameState === "dealerBust"){
            msg = `Dealer busted with a total of ${this.dealerHandTotal}! You win your bet.`;
            this.balance += this.currentBet;
            localStorage.setItem("balance", this.balance);
        } else if (this.gameState === "draw"){
            msg = "It's a draw! You lose your bet.";
            this.balance -= this.currentBet;
            localStorage.setItem("balance", this.balance);
        } else if (this.gameState === "playerWin"){
            msg = `You won with a total of ${this.playerHandTotal}! You win your bet.`;
            this.balance += this.currentBet;
            localStorage.setItem("balance", this.balance);
        } else if (this.gameState === "dealerWin"){
            msg = `Dealer wins with a total of ${this.dealerHandTotal}! You lose your bet.`;
            this.balance -= this.currentBet;
            localStorage.setItem("balance", this.balance);
        } else {
            msg = "Something went wrong. You lose your bet.";
            this.balance -= this.currentBet;
            localStorage.setItem("balance", this.balance);
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
        // Add a card to dealer hand if dealer total less than 17
        // Check if bust
        // If no bust, and dealer hand total still less than 17, add another card to dealer hand
        // Check if bust
        // If no bust, and dealer hand total still less than 17, add another card to dealer hand
        // Run checkWin

        // While dealer hand total is less than 17, keep adding cards
        while (this.dealerHandTotal < 17) {
            this.dealCard();
            this.dealerHand.push(this.dealCard());
            this.dealerHandTotal = this.calculateHandValue(this.dealerHand);
            this.checkBust();
        }

        // Once dealer hand is finalized, check the result
        this.checkWin();
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

    async doubleBet(){
        this.currentBet *= 2;
        await CasinoApi.placeBet(this.currentBet);
    }

    async tripleBet(){
        this.currentBet *= 3;
        await CasinoApi.placeBet(this.currentBet);
    }   
}

export default BlackjackClass;
