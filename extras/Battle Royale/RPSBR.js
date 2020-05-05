with(require('./BattleRoyale.js','utf8')){
	var rock = new Weapon({
		name:"rock",
		ammo:Infinity,
		damage:100,
		attack: function(you){	//Rock attack
			switch(you.inventory.equipped(you.inventory.weapons).name){
				case("rock"):
					return 0;	//lose
					break;
				case("paper"):
					return 0;
					break;
				case("scissors"):
					return this.damage;	//tie
					break;
				default:
					return this.damage;
			}
			return null;
		},
		aliases:["Rock","1","r","R","ro","Ro"],
		killIcon: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Fist.svg",
		hitFeed: new KillFeed({verb:"crushed",how:"with a rock",ico:this.killIcon}),
		killFeed: new KillFeed({verb:"pummeled",how:"with a rock",ico:this.killIcon,grammar:1}),
		toString:() => name
	});
	var paper = new Weapon({
		name:"paper",
		ammo:Infinity,
		damage:100,
		attack: function(you){	//Paper attack
			switch(you.inventory.equipped(you.inventory.weapons).name){
				case("rock"):
					return this.damage;	//lose
					break;
				case("paper"):
					return 0;
					break;
				case("scissors"):
					return 0;	//tie
					break;
				default:
					return this.damage;
			}
			return null;
		},
		aliases:["Paper","2","p","P","sham","Sham"],
		killIcon: "https://upload.wikimedia.org/wikipedia/commons/f/fe/File_font_awesome.svg",
		hitFeed: new KillFeed({verb:"gave",how:"a paper cut",ico:this.killIcon}),
		killFeed: new KillFeed({verb:"gave",how:"a paper cut",ico:this.killIcon,grammar:2}),
		toString:() => name
	});
	var scissors = new Weapon({
		name:"scissors",
		ammo:Infinity,
		damage:100,
		attack: function(you){	//Scissors attack
			switch(you.inventory.equipped(you.inventory.weapons).name){
				case("rock"):
					return 0;	//lose
					break;
				case("paper"):
					return this.damage;
					break;
				case("scissors"):
					return 0;	//tie
					break;
				default:
					return this.damage;
			}
		},
		aliases:["Scissors","3","s","S","bo","Bo"],
		killIcon: "https://upload.wikimedia.org/wikipedia/commons/7/74/Scissors_icon_black.svg",
		hitFeed: new KillFeed({verb:"cut",how:"with scissors",ico:this.killIcon}),
		killFeed: new KillFeed({verb:"stabbed",how:"with scissors",suicide:function(victim){return victim + " ran with scissors."},ico:this.killIcon,grammar:1}),
		toString:() => name
	});
	var rpsLoadout = {weapons:[rock,paper,scissors]};
}
module.exports = rpsLoadout;