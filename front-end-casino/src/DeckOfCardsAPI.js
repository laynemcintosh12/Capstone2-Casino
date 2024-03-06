import axios from "axios";


// shuffles new deck and returns it
const Shuffle= async (deck_count) => {
    let deck = await axios.get(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=${deck_count}`)
    return deck;
}


// draws a card from a deck 
const drawCard = async (deck_id) => {
    let card = await axios.get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`)
    return card;
}


export { Shuffle, drawCard };