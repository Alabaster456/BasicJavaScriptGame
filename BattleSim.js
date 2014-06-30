/* Author: Luigi Vincent A.K.A. Javaliant
FAQ -
*the ternary: ? operator is basically a shortcut for if-else. condition ? runs if true : runs if false;
read more: http://www.codecademy.com/glossary/javascript/ternary-operator
* To create enemies Just use the enemy constructor (look at the example goblin on line 73, and the constructor itself on line 107 & 120)
* Alternatively you can now use the createEnemy function passing only the name, and the difficulty you want  (1-5) or  easy, average, challenge, damn, and nightmare.
* To add more battles just use doBattle(player, enemy)
* Use valiantLog() instead of console.log for messages that should be displayed right away
* Use valiantLogX("msg", seconds to wait) for timed messages

TO DO:
Feel free to post your suggestions and ideas here: 
	*Fix whatever is broken
	* Add more comments
	* Reference shortcuts/methods/functions in an laternate file?
	* Maybe break up the js files so things are a bit simpler
*/

var playerName = prompt("What is your name?");
playerName = fixName(playerName);
// Creates player character with 10 attack, 3 defense, 25 hp, and 7 mp. 
var player = new Hero(playerName, 10, 3, 25, 7);

var theDate = new Date();
var theHour = theDate.getHours();
// Greet function that appropriates message according to time of day
function greet(){ return theHour < 12 ? "Good Morning, " : (theHour < 18 ? "Good Afternoon, " : "Good Evening, "); }

function wrapText(context, text, con_x, con_y, maxWidth, lineHeight) {
        var words = text.split(' ');
        var line = '';

        for(var n = 0; n < words.length; n++) {
          var testLine = line + words[n] + ' ';
          var metrics = context.measureText(testLine);
          var testWidth = metrics.width;
          if (testWidth > maxWidth && n > 0) {
            context.fillText(line, con_x, con_y);
            line = words[n] + ' ';
            con_y += lineHeight;
          }
          else {
            line = testLine;
          }
        }
        context.fillText(line, con_x, con_y);
      }

var canvas = document.getElementById("battle_canvas");
var context = canvas.getContext("2d");
var maxWidth = 400;
var lineHeight = 25;
var con_x = (canvas.width - maxWidth) / 2;
var con_y = 60;
var vLogTime = 0; // To keep track of valiantLogX time-based calls
context.fillStyle = "green";
context.font = "bold 24px Georgia";
// Initital message
valiantLog(greet() + playerName + ". Welcome to Valiant Academy.");
valiantLogX("We hope you enjoy your time", 2);


valiantLogX("Valiant Academy is an institute that makes Heroes out of plebians.You've always wanted to be a Hero, but do you have what it takes? Your first test will be defeating this goblin!", 2);
valiantLogX("Make your selections with the buttons below!", 5);
function valiantLog(text) {
	context.clearRect(0, 0, canvas.width , canvas.height);
	wrapText(context, text, con_x, con_y, maxWidth, lineHeight)
}
// Wish I could overload this like in Java, sadness
function valiantLogX(text, timer){
	vLogTime += timer;
	window.setTimeout(function() {
    valiantLog(text)
	}, vLogTime * 1000);
}

var goblin_01 = new Enemy("Goblin Scion", 5, 1, 20, 0, 5);
doBattle(player, goblin_01);

valiantLogX("Heh, that was easy, but it looks like the goblin had a friend!", 2);
// Randomly generated enemy, name, and difficulty.
var goblin_02 = createEnemy("Goblin Dirtbag", 2);
doBattle(player, goblin_02);

valiantLogX("We hope you had a fun time with Valiant Academy!", 1);


// Capitalizes first letter and decapitalizes the rest, returns that as a string e.g. dErPy becomes Derpy.
function fixName(name){ return name.length > 1 ? name.substring(0,1).toUpperCase() + name.substring(1).toLowerCase() : name; }


// Creates the player character with stats
function Hero(name, atk, def, hp, mp) {
    this.name = name;
	this.atk = atk;
	this.def = def;
	this.max_hp = hp;
	this.hp = hp;
	this.mp = mp;
	this.max_mp = mp;
	this.lvl = 1;
	this.race = "Human";
	this.exp = 0;
	this.goal_exp = 50;
	// Add experience function
	this.addExperience = function(val){ this.exp += val; }
}

var totalEnemies = 0;
// Enemy Constructor
function Enemy(name, atk, def, hp, mp, xp_val) {
	this.name = name;
	this.atk = atk;
	this.def= def;
	this.hp = hp;
	this.max_hp = hp;
	this.mp = mp;
	this.max_mp = mp;
	this.xp_val = xp_val;
	totalEnemies++; 
}

// Random enemy constructor, only pass name, and difficulty(1 - 5) or easy, average, challenge, damn, and nightmare
function createEnemy(name, difficulty) {
	var atk = getIntBetween(3, 7);
	var def = getIntBetween (0, 3);
	var hp = getIntBetween(10, 25);
	var mp = getIntBetween(0, 7);
	var xp_val = getIntBetween(5, 12);
	var multiplier;

	if (typeof difficulty === "string"){ difficulty = difficulty.toLowerCase(); }

	if (difficulty === 1 || difficulty === "easy"){ multiplier = 1; }
	if (difficulty === 2 || difficulty === "average"){ multiplier = 2; }
	if (difficulty === 3 || difficulty === "challenge"){ multiplier = 4; }
	if (difficulty === 4 || difficulty === "damn"){ multiplier = 7; }
	if (difficulty === 5 || difficulty === "nightmare"){ multiplier = 11; }

	atk *= multiplier;
	def *=multiplier;
	hp *= multiplier;
	mp *= multiplier;
	xp_val *= multiplier;

	return new Enemy(name, atk, def, hp, mp, xp_val);
}

// Generates a random integer between min and max value. 
function getIntBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function doBattle(x, y) {
	// Set hp and mp to max for new battle;
	x.mp = x.max_mp;
	x.hp = x.max_hp;
	// Display current enemy
	valiantLogX("               VS. " + y.name, 1);
	// Battle loop - heart of the game
	do {
		$("input[type='button']").click(function() {
			switch(this.id){
		        case 'attack': 
		        	x.hp -= Math.max(0, (y.atk - x.def));
		            y.hp -= Math.max(0, (x.atk - y.def));
		            valiantLog(x.name + " deals " + Math.max(0,(x.atk - y.def)) + " damage and takes " + Math.max(0, (y.atk - x.def)) + " damage. " + x.name + " has " + Math.max(0,x.hp) + " health and the opposing " + y.name + " has " + Math.max(0,y.hp) + " health left." );
		            break;
		        case 'defend': 
		        	x.def *= 2;
		            x.hp -= Math.max(0, (y.atk - x.def));
		            x.def /= 2;
		            valiantLog(x.name + " takes a defensive stance. " + x.name + " takes " + Math.max(0, (y.atk - x.def)) + " damage. " + x.name + " has " + Math.max(0,x.hp) + " health and the opposing " + y.name + " has " + Math.max(0,y.hp) + " health left.");
		            break;
		        case 'power_attack': 
		        	if (x.mp <2) valiantLogX("Insufficient mana. Opposing " + y.name + " took advantage of your foolishness to attack.", 1);
					else {
						x.atk  *= 2;
						valiantLog(x.name + "'s weapon is infused with mana!" + x.name + " deals " + Math.max(0, (x.atk - y.def)) + " damage and takes " + Math.max(0,(y.atk - x.def)) + " damage.");
						y.hp -= Math.max(0, (x.atk - y.def));
						x.atk /= 2;x.mp -= 2;
					}
					x.hp -= Math.max(0, (y.atk - x.def));
		            valiantLogX(x.name + " has " + Math.max(0, x.hp) + " health and the opposing " + y.name + " has " + Math.max(0, y.hp) + " health left.", 2);
					break;
				case 'meditate' : 
					valiantLog(x.name + " calls forth the mana of Valiant Academy.");
					x.mp = Math.min(x.max_mp, x.mp += 3);
					valiantLogX(x.name + " takes " + Math.max(0, (y.atk - x.def)) + " damage.", 1);
					x.hp -= Math.max(0, (y.atk - x.def));
		            valiantLogX(x.name + " has " + Math.max(0, x.hp) + " health and the opposing " + y.name + " has " + Math.max(0, y.hp) + " health left.", 1);
					break;
				case 'heal' :
					if (x.mp < 3) valiantLog("Insufficient mana. Opposing " + y.name + " took advantage of your foolishness to attack.");
					else {
						valiantLog(x.name + " uses Valiant Academy's power to recover " + Math.floor(x.max_hp * 0.2) + " health!");
						x.hp=Math.min(x.max_hp, x.hp += Math.floor(x.max_hp * 0.4));
						x.mp  -= 3;
					}
					x.hp -= Math.max(0, (y.atk - x.def));
					valiantLogX(x.name + " takes " + Math.max(0, (y.atk - x.def)) + " damage.", 2);
		           	valiantLogX(x.name + " has " + Math.max(0, x.hp) + " health and the opposing " + y.name + " has " + Math.max(0, y.hp) + " health left.", 1);
					break;
		        case 'status' :
		        	valiantLog(x.name + " has " + x.atk + " attack " + x.def + " defense " + x.mp + "/" + x.max_mp + " mana and " + x.hp + "/" + x.max_hp + " health.");
		        	valiantLogX("Opposing " + y.name + " has " + y.atk + " attack " + y.def + " defense and " + y.hp + "/" + y.max_hp + " health.", 2);
		            break;
				} // End of Selection Switch
			});			
		} while(x.hp > 0 && y.hp > 0);
			
	if (x.hp <= 0 && y.hp <= 0) {
		valiantLogX("It is a double K.O.", 1);
	}
	else if (y.hp <= 0) {
	x.addExperience(y.xp_val);
	valiantLogX(x.name + " is the victor!" + x.name + " gained " + y.xp_val + " experience!" + " Current experience: " + x.exp + "/" + x.goal_exp +".", 1);
	}
	else {
	valiantLogX(y.name + " has slain you!", 1);
	}
} // End of doBattle
