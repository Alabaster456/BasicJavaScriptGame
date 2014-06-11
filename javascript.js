/* Author: Luigi Vincent A.K.A. Javaliant
FAQ -
*the ternary: ? operator is basically a shortcut for if-else. condition ? runs if true : runs if false;
read more: http://www.codecademy.com/glossary/javascript/ternary-operator
* To create enemies Just use the enemy constructor (look at the example goblin on line 22, and the constructor itself on line 49)
* To add more battles just user (player, enemy)
* \n makes a new line. \t uses a tab space. 

*/

var playerName = prompt("What is your name?");
playerName = fixName(playerName);
var player = new Hero(playerName, 10, 3, 25, 7);

var theDate = new Date();
var theHour = theDate.getHours();
function greet(name){ return theHour < 12 ? "Good Morning, " + name + "." : (theHour<18 ? "Good Afternoon, " + name + "." : "Good Evening, " + name + "."); }

console.log(greet(playerName) + "\n\t\t Welcome to Valiant Academy!");
console.log(" Valiant Academy is an institute that makes Heroes out of plebians.\nYou've always wanted to be a Hero, but do you have what it takes?\nYour first test will be defeating this goblin!");

var goblin_01 = new Enemy("Goblin Scion", 5, 1, 20, 0, 5);
doBattle(player, goblin_01);

console.log("We hope you had a fun time with Valiant Academy!");


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
	lvl = 1;
	race = "Human";
	exp = 0;
	// Add experience (from enemy.xp_val )
	function addExperience(exp){ this.exp += exp; }
}

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
}

function battleMenu(){
	selection = + prompt("\n Battle menu\n1: Attack\n2: Defend\n3: Abilities\n4: Status\n5: Enemy Status\n Enter a choice: ");
	// Checks for valid input
	while (selection > 5 || selection < 1){
		selection = + prompt("Invalid choice.\n Enter a choice(1-5)");
	}
}

function doBattle(x, y){
	// Set hp and mp to max for new battle;
	x.mp = x.max_mp;
	x.hp = x.max_hp;
	console.log("\t\t\tVs." + y.name);
	do { battleMenu();
		switch(selection){
	        case 1: x.hp  -= Math.max(0,(y.atk - x.def));
	            	y.hp  -= Math.max(0,(x.atk - y.def));
	            	console.log(x.name + " deals " + Math.max(0,(x.atk - y.def)) + " damage and takes " + Math.max(0,(y.atk - x.def)) + " damage.\n" + x.name + " has " + Math.max(0,x.hp) + " health and the opposing " + y.name + " has " + Math.max(0,y.hp) + " health left." );
	            break;
	        case 2: x.def  *= 2;
	            	x.hp  -= Math.max(0,(y.atk - x.def));
	            	x.def /= 2;
	            	console.log(x.name + " takes a defensive stance.\n" + x.name + " takes " + Math.max(0,(y.atk - x.def)) + " damage.\n" + x.name + " has " + Math.max(0,x.hp) + " health and the opposing " + y.name + " has " + Math.max(0,y.hp) + " health left.");
	            break;
	        case 3: ability = + prompt("\n Ability menu\n1: Power Attack - 2 mp\n2: Meditate - gain 3 mp\n 3: Heal - 3 mp\n4: Back\nEnter a choice:");
					while (ability>4 || ability<1){
						ability = + prompt("Invalid choice.\n Enter a choice(1-4)");
						}
					switch(ability){
						case 1: if (x.mp <2) console.log("Insufficient mana.\nOpposing " + y.name + " took advantage of your foolishness to attack.");
								else { x.atk  *= 2;
									console.log(x.name + "'s weapon is infused with mana!\n" + x.name + " deals " + Math.max(0,(x.atk - y.def)) + " damage and takes " + Math.max(0,(y.atk - x.def)) + " damage.");
									y.hp  -= Math.max(0,(x.atk - y.def));
									x.atk /= 2;x.mp  -= 2;
								}
								x.hp  -= Math.max(0,(y.atk - x.def));
	            				console.log(x.name + " has " + Math.max(0,x.hp) + " health and the opposing " + y.name + " has " + Math.max(0,y.hp) + " health left.");
							break;
						case 2: console.log(x.name + " calls forth the mana of Valiant Academy.");
								x.mp=Math.min(x.max_mp, x.mp += 3);
								console.log(x.name + " takes " + Math.max(0,(y.atk - x.def)) + " damage.");
								x.hp  -= Math.max(0,(y.atk - x.def));
	            				console.log(x.name + " has " + Math.max(0,x.hp) + " health and the opposing " + y.name + " has " + Math.max(0,y.hp) + " health left.");
							break;
						case 3: if (x.mp <3) console.log("Insufficient mana.\nOpposing " + y.name + " took advantage of your foolishness to attack.");
								else { console.log(x.name + " uses Valiant Academy's power to recover " + Math.floor(x.max_hp * 0.2) + " health!");
									x.hp=Math.min(x.max_hp,x.hp +=Math.floor(x.max_hp * 0.2));
									x.mp  -= 3;
								}
								x.hp  -= Math.max(0,(y.atk - x.def));
								console.log(x.name + " takes " + Math.max(0,(y.atk - x.def)) + " damage.");
	            				console.log(x.name + " has " + Math.max(0,x.hp) + " health and the opposing " + y.name + " has " + Math.max(0,y.hp) + " health left.");
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

	if (x.hp === y.hp){
		return "It is a double K.O.";
	}
	else if (x.hp > y.hp){
		x.addExperience(y.xp_val);
		return x.name + " is the victor!\n" + x.name + " gained " + y.xp_val + " experience!\n" + "Current experience: " + x.exp + "/50.";
	}
	else {
		return y.name + " has slain you!";
	}
} // End of doBattle
