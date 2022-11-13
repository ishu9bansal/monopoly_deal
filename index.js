class Player{
	constructor(initHand){
		this.handPile = [];
		initHand.forEach(c => this.handPile.push(c));
		this.showPile = [];	// 0th is the bank pile
	}
}

const GAME_IN_PROGRESS = "Game in progress";

class Game {
	constructor(numberOfPlayers){
		this.numberOfPlayers = numberOfPlayers;
		this.openPile = [];
		this.closedPile = [];
		this.players = []
		let i = cards.length;
		while(i--)	this.closedPile.push(i);
		shuffle(this.closedPile);
		for(let i=0; i<this.numberOfPlayers; i++){
			// TODO: add constraints on n
			this.players.push(new Player(this.pop(5)));
		}
		this.refreshView();
		this.actionStack = [this.startTurn(0)];
		this.prompt = GAME_IN_PROGRESS;
		this.next();
	}

	next(...args){
		this.actionStack.pop()(...args);
	}

	refreshView(){
		refreshViewCards(this.players);
	}

	showPrompt(){
		showGamePrompt(this.prompt);
		this.renderHandPile(this.promtPlayer);
	}

	pop(l){
		if(this.closedPile.length < l){
			this.closedPile.forEach(c => this.openPile.push(c));
			this.closedPile = [];
			this.openPile.forEach(c => this.closedPile.push(c));
		}
		var arr = [];
		while(l--)
			arr.push(this.closedPile.pop());
		return arr;
	}

	startTurn(i){
		let that = this;
		return function(){
			let l = that.players[i].handPile.length != 0 ? 2 : 5;
			let cards = that.pop(l);
			showGameMessage("Draw " + l + " cards for player " + i)
			cards.forEach(c => that.players[i].handPile.push(c));
			that.actionStack.push(that.endTurn(i));
			that.actionStack.push(that.playHand(i));
			that.actionStack.push(that.playHand(i));
			that.actionStack.push(that.playHand(i));
			that.next();
		}
	}

	endTurn(i){
		let that = this;
		return function(){
			that.actionStack.push(that.startTurn((i+1)%(that.numberOfPlayers)));
			showGameMessage("Checking if any card needs to dismiss for player " + i);
			let c = that.players[i].handPile.length - 7;
			if(c > 0)
				while(c--)	
					that.actionStack.push(that.dismissCard(i));
			that.next();
		}
	}

	playerActionHelper(prompt, playerAction, player){
		let that = this;
		return function(){
			that.prompt = prompt;
			that.promtPlayer = player;
			that.actionStack.push(that.playerResponseHelper(playerAction));
			that.showPrompt();
		}
	}

	playerResponseHelper(playerAction){
		let that = this;
		return function(...args){
			console.log("Player responded with args", args);
			let response = playerAction(...args);
			if(response.length){	// means error, recur same method
				showGamePrompt(response);
				that.actionStack.push(that.playerActionHelper(that.prompt,playerAction,that.promtPlayer));
			}else{
				showGameMessage("game progressed after user move");
				that.prompt = GAME_IN_PROGRESS;
			}
			that.next();
		}
	}

	dismissCard(i){
		let that = this;
		let msg = "Player " + i + " has to DISCARD a card.\n"
		msg += "Please respond a number i.e. the index of the card you want to DISCARD from your hand."
		return this.playerActionHelper(
			msg,
			function(card){
				if(!Number.isInteger(card) || card > that.players[i].handPile.length || card <= 0){
					return "invalid card provided. Choose an integer from 0 to " + that.players[i].handPile.length;
				}
				let cardValue = that.players[i].handPile[card-1];
				showGameMessage("Moving card" +  cardValue +  "to discard pile from player " + i);
				that.players[i].handPile.splice(card-1,1);
				that.openPile.push(cardValue);
				return "";
			},
			i
		);
	}

	playHand(i){
		let that = this;
		let msg = "Player " + i + " has to play a card.\n";
		msg += "Please respond a number i.e. the index of the card you want to play from your hand.\n";
		msg += "Or respond with 0 if you want to skip";
		return this.playerActionHelper(
			msg,
			function(l){
				if(!Number.isInteger(l) || l > that.players[i].handPile.length || l < 0){
					return "invalid card provided. Choose an integer from 0 to " + that.players[i].handPile.length;
				}
				if(l==0){
					showGameMessage("Player " + i + " skipped one turn.");
					return "";
				}
				let card = that.players[i].handPile[l-1];
				showGameMessage("Player " + i + " is playing card " +  card);
				that.players[i].handPile.splice(l-1,1);
				that.actionStack.push(that.playCard(i,card));
				return "";
			},
			i
		);
	}

	playCard(i,card){
		let allowedActions = [];
		allowedActions.push({
			message: "Move to show pile.",
			action: this.showCard(i,card)
		});
		if(cards[card].prompt){
			allowedActions.push({
				message: cards[card].promt,
				action: this.useCard(i,card)
			});
		}
		return this.playerOptionHelper(i,allowedActions);
	}

	playerOptionHelper(i,allowedActions){
		let msg = "Player " + i + " choose one of these options to play";
		for(let x=0; x<allowedActions.length; x++){
			msg = msg.concat("\n" + x + ": " + allowedActions[x].message);
		}
		let that = this;
		return allowedActions.length == 1 ? allowedActions[0].action : this.playerActionHelper(msg,
			function(l){
				if(!Number.isInteger(l) || l >= allowedActions.length || l < 0){
					return "invalid operation. Choose an integer from 0 to " + allowedActions.length;
				}
				showGameMessage("Player " + i + " chose: " +  allowedActions[l].message);
				that.actionStack.push(allowedActions[l].action);
				return "";
			},
			i
		);
	}

	showCard(i,card){
		let that = this;
		return function(){
			showGameMessage("Moving card " + card + " to player " +  i +  " show pile.");
			that.players[i].showPile.push(card);
			that.refreshView();
			that.next();
		}
	}

	viewShowPile(player){
		if(!Number.isInteger(player) || player >= this.numberOfPlayers || player < 0){
			return "invalid player. Choose an integer from 0 to " + this.numberOfPlayers;
		}
		console.log(this.players[player].showPile);
	}

	viewHandPile(player){
		if(!Number.isInteger(player) || player >= this.numberOfPlayers || player < 0){
			return "invalid player. Choose an integer from 0 to " + this.numberOfPlayers;
		}
		console.log(this.players[player].handPile);
	}

	renderHandPile(player){
		var nodes = this.players[player].handPile.map((val,ind) => createHandCard(cards[val].label,(++ind).toString()));
		handCards.replaceChildren(...nodes);
	}
}

function shuffle(array){
	var i = array.length;
	var t, r;
	while(0!=i){
		r = Math.floor(Math.random()*i--);
		t = array[i];
		array[i] = array[r];
		array[r] = t;
	}
	return array;
}

var game = null;

var userInput = document.getElementById("userInput");
var messageBoard = document.getElementById("messageBoard");
var handCards = document.getElementById("handCards");
var viewCards = document.getElementById("viewCards");

var addMessageToBoard = function(messageNode){
	messageBoard.appendChild(messageNode);
	messageBoard.appendChild(document.createElement('br'));
	messageBoard.scrollTop = messageBoard.scrollHeight;
}

var showGamePrompt = function(text){
	addMessageToBoard(createGamePrompt(text));
}

var showGameMessage = function(text){
	addMessageToBoard(createGameMessage(text));
}

var handleUserInput = function(text){
	addMessageToBoard(createPlayerMessage(text));
	var num = parseInt(text);
	if(!Number.isInteger(num))	return;
	if(!game){
		game = new Game(num);
		return;
	}
	game.next(num);
}

function createMessageCard(cardClassName, text){
	var cardContent = document.createElement('div');
	cardContent.className = 'card-body';
	cardContent.innerText = text;
	var card = document.createElement('div');
	card.className = cardClassName;
	card.appendChild(cardContent);
	return card;
}

function createHandCard(text, ind){
	var cardValue = document.createElement('div');
	cardValue.className = 'hand-card-value';
	cardValue.innerText = text;
	var cardIndex = document.createElement('div');
	cardIndex.className = 'hand-card-index';
	cardIndex.innerText = ind.toString();
	var card = document.createElement('div');
	card.className = 'hand-card';
	card.appendChild(cardValue);
	card.appendChild(cardIndex);
	return card;
}

function refreshViewCards(players){
	var nodes = players.map((p,i) => createPlayerViewCards("Player "+i, p.showPile));
	viewCards.replaceChildren(...nodes);
}

function createPlayerViewCards(playerName,cards){
	var player = document.createElement('div');
	player.className = 'player';
	player.innerText = playerName;
	var l = 10 - cards.length;
	if(l<0)	l = 0;
	var nodes = [];
	while(l--)	nodes.push(createEmptyViewCard());
	cards.forEach(c => nodes.push(createViewCard(cards[c].label)));
	nodes.push(player);
	var playerPile = document.createElement('div');
	playerPile.className = 'player-view-cards';
	playerPile.replaceChildren(...nodes);
	return playerPile;
}

function createViewCard(text){
	var card = document.createElement('div');
	card.className = 'view-card';
	card.innerText = text;
	return card;
}

function createEmptyViewCard(){
	var card = document.createElement('div');
	card.className = 'empty-card';
	return card;
}

function createGameMessage(text){
	return createMessageCard('card bg-info text-white', text);
}

function createGamePrompt(text){
	return createMessageCard('card bg-primary text-white', text);
}

function createPlayerMessage(text){
	return createMessageCard('card', text);
}

userInput.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    handleUserInput(userInput.value);
    userInput.value = "";
  }
});
