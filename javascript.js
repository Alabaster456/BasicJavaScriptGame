/* Author: Luigi Vincent A.K.A. Javaliant
FAQ -
*the ternary: ? operator is basically a shortcut for if-else. condition ? runs if true : runs if false;
read more: http://www.codecademy.com/glossary/javascript/ternary-operator
* To create enemies Just use the enemy constructor (look at the example goblin on line 22, and the constructor itself on line 49)
* Alternatively you can now use the createEnemy function passing only the name, and the difficulty you want  (1-5) or  easy, average, challenge, damn, and nightmare.
* To add more battles just use doBattle(player, enemy)
* \n makes a new line. \t uses a tab space. 

*/

var playerName = prompt("What is your name?");
playerName = fixName(playerName);
// Creates player character with 10 attack, 3 defense, 25 hp, and 7 mp. 
var player = new Hero(playerName, 10, 3, 25, 7);

var theDate = new Date();
var theHour = theDate.getHours();
function greet(name){ return theHour < 12 ? "Good Morning, " + name + "." : (theHour < 18 ? "Good Afternoon, " + name + "." : "Good Evening, " + name + "."); }

console.log(greet(playerName) + "\n\n\t\t Welcome to Valiant Academy!");
console.log(" Valiant Academy is an institute that makes Heroes out of plebians.\nYou've always wanted to be a Hero, but do you have what it takes?\nYour first test will be defeating this goblin!");

var goblin_01 = new Enemy("Goblin Scion", 5, 1, 20, 0, 5);
doBattle(player, goblin_01);

console.log("\nHeh, that was easy, but it looks like the goblin had a friend!");
// Randomly generated enemy, name, and difficulty.
var goblin_02 = createEnemy("Goblin Dirtbag", 2);
doBattle(player, goblin_02);

console.log("\nWe hope you had a fun time with Valiant Academy!");


// Capitalizes first letter and decapitalizes the rest, returns that as a string e.g. dErPy becomes Derpy.
function fixName(name){ return name.length > 1 ? name.substring(0,1).toUpperCase() + name.substring(1).toLowerCase() : name; }


// Creates the player character with stats
function Hero(name, atk, def, hp, mp){
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
function Enemy(name, atk, def, hp, mp, xp_val){
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
function createEnemy(name, difficulty){
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

// battleMenu function to recursively obtain player decisions
function battleMenu(){
	selection = + prompt("\n Battle menu\n1: Attack\n2: Defend\n3: Abilities\n4: Status\n5: Enemy Status\n Enter a choice: ");
	// Checks for valid input
	while (selection > 5 || selection < 1){ selection = + prompt("Out of bounds.\n Enter a choice(1-5)"); }
	while (isNaN(selection)){ selection = + prompt("Input must be an integer(1-5)"); }
}

function doBattle(x, y){
	// Set hp and mp to max for new battle;
	x.mp = x.max_mp;
	x.hp = x.max_hp;
	// Display current enemy
	console.log("\t\t\tVS. " + y.name);
	// Battle loop - heart of the game
	do { battleMenu();
		switch(selection){
	        case 1: x.hp  -= Math.max(0, (y.atk - x.def));
	            	y.hp  -= Math.max(0, (x.atk - y.def));
	            	console.log(x.name + " deals " + Math.max(0,(x.atk - y.def)) + " damage and takes " + Math.max(0,(y.atk - x.def)) + " damage.\n" + x.name + " has " + Math.max(0,x.hp) + " health and the opposing " + y.name + " has " + Math.max(0,y.hp) + " health left." );
	            break;
	        case 2: x.def  *= 2;
	            	x.hp  -= Math.max(0, (y.atk - x.def));
	            	x.def /= 2;
	            	console.log(x.name + " takes a defensive stance.\n" + x.name + " takes " + Math.max(0, (y.atk - x.def)) + " damage.\n" + x.name + " has " + Math.max(0,x.hp) + " health and the opposing " + y.name + " has " + Math.max(0,y.hp) + " health left.");
	            break;
	        case 3: var ability = + prompt("\n Ability menu\n1: Power Attack - 2 mp\n2: Meditate - gain 3 mp\n 3: Heal - 3 mp\n4: Back\nEnter a choice:");
	        		// Check for valid input
					while (ability>4 || ability<1){ ability = + prompt("Out of bounds.\n Enter a choice(1-4)"); }
					while (isNaN(ability)){ ability = + prompt("Input must be an integer(1-4)"); }
					switch(ability){
						case 1: if (x.mp <2) console.log("Insufficient mana.\nOpposing " + y.name + " took advantage of your foolishness to attack.");
								else { x.atk  *= 2;
									console.log(x.name + "'s weapon is infused with mana!\n" + x.name + " deals " + Math.max(0, (x.atk - y.def)) + " damage and takes " + Math.max(0,(y.atk - x.def)) + " damage.");
									y.hp  -= Math.max(0, (x.atk - y.def));
									x.atk /= 2;x.mp  -= 2;
								}
								x.hp  -= Math.max(0, (y.atk - x.def));
	            				console.log(x.name + " has " + Math.max(0, x.hp) + " health and the opposing " + y.name + " has " + Math.max(0, y.hp) + " health left.");
							break;
						case 2: console.log(x.name + " calls forth the mana of Valiant Academy.");
								x.mp = Math.min(x.max_mp, x.mp += 3);
								console.log(x.name + " takes " + Math.max(0, (y.atk - x.def)) + " damage.");
								x.hp  -= Math.max(0, (y.atk - x.def));
	            				console.log(x.name + " has " + Math.max(0, x.hp) + " health and the opposing " + y.name + " has " + Math.max(0, y.hp) + " health left.");
							break;
						case 3: if (x.mp <3) console.log("Insufficient mana.\nOpposing " + y.name + " took advantage of your foolishness to attack.");
								else { console.log(x.name + " uses Valiant Academy's power to recover " + Math.floor(x.max_hp * 0.2) + " health!");
									x.hp=Math.min(x.max_hp, x.hp += Math.floor(x.max_hp * 0.4));
									x.mp  -= 3;
								}
								x.hp  -= Math.max(0, (y.atk - x.def));
								console.log(x.name + " takes " + Math.max(0, (y.atk - x.def)) + " damage.");
	            				console.log(x.name + " has " + Math.max(0, x.hp) + " health and the opposing " + y.name + " has " + Math.max(0, y.hp) + " health left.");
							break;
						case 4: // Empty on purpose.
							break;
						} // End of Ability Switch
	            break; 
	        case 4: console.log(x.name + " has " + x.atk + " attack " + x.def + " defense " + x.mp + "/" + x.max_mp + " mana and " + x.hp + "/" + x.max_hp + " health.");
	            break;
	        case 5: console.log("Opposing " + y.name + " has " + y.atk + " attack " + y.def + " defense and " + y.hp + "/" + y.max_hp + " health.");
	            break;
				} // End of Selection Switch
						
			} while(x.hp > 0 && y.hp > 0);

	if (x.hp <= 0 && y.hp <= 0){
		console.log("It is a double K.O.");
	}
	else if (y.hp <= 0){
		x.addExperience(y.xp_val);
		console.log(x.name + " is the victor!\n" + x.name + " gained " + y.xp_val + " experience!\n" + "Current experience: " + x.exp + "/" + x.goal_exp +".");
	}
	else {
		console.log(y.name + " has slain you!");
	}
} // End of doBattle
