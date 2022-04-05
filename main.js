// all cards have
// - an image
// - a name
// - a unqiue id
// - a list of tags
// - and a discription


function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
  }

// define new class card
class Card {
    constructor(image, name, id, tags, description, cost, play, type, discard, die) {
        this.image = image;
        this.name = name;
        this.id = id;
        this.tags = tags;
        this.description = description;
        this.cost = cost;
        this.play = play;
        this.type = type;
        this.discard = discard;
        this.die = die;
    }
    
    // check if tag is in tags array
    hasTag(tag) {
        return this.tags.includes(tag);
    }

    // check if you have the required resources to play the card
    canPlay(resources) {
        // check to see if the key value pairs in the resources object are greater than the cost of the card
        for (let key in resources) {
            if (resources[key] < this.cost[key]) {
                return false;
            }
        }
        return true;
    }

    // play the card
    playCard() {
        this.play();
    }

    discardCard() {
        this.discard();
    }

    killCard() {
        this.die();
    }

    // round start 
    // round end 
    // game start
    // 
}

// class creature extends card

// all creature cards have
// - a toughness value
// - a power value
class Creature extends Card {
    constructor(image, name, id, tags, description, cost, play, power, toughness) {
        super(image, name, id, tags, description, cost, play);
        this.power = power;
        this.toughness = toughness;
    }

    // check if the creature is dead
    isDead() {
        return this.toughness <= 0;
    }


}


class Zone {
    constructor(name, cards) {
        this.name = name;
        this.cards = cards;
    }

    // add a card to the zone
    addCard(card) {
        this.cards.push(card);
    }

    // remove a card from the zone
    removeCard(card) {
        return this.cards.splice(this.cards.indexOf(card), 1);   
    }

    // remove random card from the zone
    removeRandomCard() {
        return this.cards.splice(Math.floor(Math.random() * this.cards.length), 1);
    }

    // remove top card of the zone
    removeTopCard() {
        return this.cards.splice(0, 1);
    }

    // shuffle the cards in the zone
    shuffleCards() {
        this.cards = shuffle(this.cards);
    }


}

class player {
    constructor(name, life, deck) {
        this.name = name;
        this.life = life;
        this.resources = resources;
        this.hand = new Zone("hand", []);
        this.deck = new Zone("deck", deck);
        this.discard = new Zone("discard", []);
        this.play = new Zone("play", []);
        fatigue = 0;
    }

    // check if you are dead
    isDead() {
        return this.life <= 0;
    }

    // shuffle deck
    shuffleDeck() {
        this.deck.shuffleCards(); 
    }

    // draw a card
    drawCard() {
        if (this.deck.cards.length > 0) {
            this.hand.addCard(this.deck.removeTopCard());
        } else {
            this.fatigue += 1;
            this.life -= this.fatigue;
        }
    }

    // play a card
    playCard(card) {
        if (this.hand.cards.includes(card) && card.canPlay(this.resources)) {
            this.hand.removeCard(card);
            this.play.addCard(card);
            card.playCard();
        }
    }

    // discard a card
    discardCardFromHand(card) {
        if (this.hand.cards.includes(card)) {
            this.hand.removeCard(card);
            this.discard.addCard(card);
            card.discardCard();
        }
    }

    // discard a card from play
    discardCardFromPlay(card) {
        if (this.play.cards.includes(card)) {
            this.play.removeCard(card);
            this.discard.addCard(card);
            card.discardCard();
        }
    }


    // draw opening hand of 5 cards
    drawOpeningHand() {
        for (let i = 0; i < 5; i++) {
            this.drawCard();
        }
    }

    // mulligan
    mulligan(returnedCards) {
        // for card in returned cards
        // add card to deck and remove from hand
        for (let card of returnedCards) {
            this.deck.addCard(card);
            this.hand.removeCard(card);
        }
        // shuffle deck
        this.deck.shuffleCards();
        // draw cards equal to the number of cards returned
        for (let i = 0; i < returnedCards.length; i++) {
            this.drawCard();
        }
    }

}
