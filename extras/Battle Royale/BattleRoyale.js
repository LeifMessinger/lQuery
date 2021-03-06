/*|||||||||||||||||||||||||||||||
BattleRoyale.js by Leif Messinger
|||||||||||||||||||||||||||||||*/
class Weapon{
	constructor(weaponStats){
		this.name = "unequipped";
		this.ammo = Infinity;
		this.damage = 1;
		this.attack = function(){};
		this.aliases = ["none","0"];
		this.killIcon = "https://upload.wikimedia.org/wikipedia/commons/2/2a/Fist.svg";
		this.hitFeed = new KillFeed({verb:"hit",how:"with his bare hands",killIcon:{src:this.killIcon,alt:"punched"}});	//Assume if someone has the audacity to edit the weapon,
		this.killFeed = new KillFeed({verb:"killed",how:"with his bare hands",killIcon:{src:this.killIcon,alt:"punched"}});	//they would change the KillFeeds as well.
		this.toString = () => name;
		Object.assign(this,weaponStats);
	}
	toString(){
		return this.name;
	}
}
class KillFeed{
	constructor(info){	//this.verb this.how this.grammar this.icon
		this.suicide = function(victim){
			return victim + " offed himself.";
		}
		this.prefixStatement = function(){
			return this.prefix?this.prefix():"";
		}
		this.postfixStatement = function(){
			return (this.postfix?(" " + this.postfix):"") + (this.damage?(" for" + this.damage):"") + ".";	//Parentheses are necessary
		}
		this.toString = function(){	//Can be overloaded if needed
			if(this.attacker === this.victim && this.suicide) return this.suicide(this.victim);
			let ans = this.prefixStatement();
			switch(this.grammar){
				case 1:	//to death, how
					ans += this.attacker + " " + this.verb + " " + this.victim + " to death " + this.how;
					break;
				case 2:	//how, to death
					ans += this.attacker + " " + this.verb + " " + this.victim + " " + this.how + " to death";
					break;
				default:
					ans += this.attacker + " " + this.verb + " " + this.victim + " " + this.how ;
			}
			ans += this.postfixStatement();
			return ans;
		}
		this.gui = function(){
			let arr = [];
			arr.push(this.attacker);
			if(this.killIcon) arr.push(this.killIcon);
			if(this.wallbang) arr.push(this.wallbang);
			if(this.headshot) arr.push(this.headshot);
			
			return arr;
		}
		Object.assign(this,info);
	}
}
class Inventory{
	constructor(loadout){
		this.unequipped = new Weapon();
		this.weapons = [];
		this.inventory = [];
		if(loadout) Object.assign(this,loadout);
		if(!this.weapons.selected) this.weapons.selected = -1;
	}
	pickup(item, slot = this.weapons){
		slot.push(item);
	}
	equipped(slot = this.weapons){
		if(slot.selected < 0 || slot.selected >= slot.length || !slot[slot.selected]) return this.unequipped;
		return slot[slot.selected];
	}
	unequip(slot = this.weapons){
		slot.selected = -1;
	}
}
class Spectator{
	constructor(playerSave){
		this['display-name'] = "bruh";
		this.health = 100;
		this.score = 0;
		this.inventory = new Inventory();
		this.god = true;
		if(playerSave) Object.assign(this,playerSave);
	}
	command(cmd){
		
	}
	toString(){
		return this['display-name'] + "";
	}
}
class Player extends Spectator{
	constructor(playerSave){
		super(playerSave);
	}
	command(cmd){
		console.log(cmd + " : " + this['display-name']);
		for(let w in this.inventory.weapons){
			if(this.inventory.weapons[w].name == cmd) this.inventory.weapons.selected = w;
			for(let a in this.inventory.weapons[w].aliases){
				if(this.inventory.weapons[w].aliases[a] == cmd) this.inventory.weapons.selected = w;
			}
		}
	}
	damage(hp,godKiller){	//damage -> me
		if(!this.god || godKiller){
			this.health -= hp;
		}
		return this.health;
	}
	die(){	//Nobody who dies here ever really dies
		
	}
	pickup(item,slot){
		inventory.pickup(item,slot);
	}
	equipped(slot){
		return this.inventory.equipped(slot);
	}
	attack(you){
		let weapon = this.equipped();
		if(weapon){
			let hp = weapon.attack(you,this);
			if(hp > 0){
				let oof = you.damage(hp);
				if(oof > 0) return Object.assign({attacker:this,victim:you},weapon.hitFeed);
				else return Object.assign({attacker:this,victim:you},weapon.killFeed);
			}
		}
		return null;
	}
	setLoadout(stats,loadout){
		if(stats) Object.assign(this,stats);
		if(loadout) Object.assign(this,loadout);
	}
}
function spawnPlayer(playerSave = {'display-name': "ThiccDaddyLOAF".substring(0,Math.ceil(Math.random()*14))},loadout/* = rpsLoadout*/){
	function deepCopy(obj){
		var clone = {};
		for(var i in obj) {
			if(obj[i] != null &&  typeof(obj[i])=="object")
				clone[i] = deepCopy(obj[i]);
			else
				clone[i] = obj[i];
		}
		return clone;
	}
	let player = new Player(playerSave);
	if(loadout){
		let weaponDeepCopy = deepCopy(loadout);
		console.log(weaponDeepCopy);
		player.inventory = new Inventory(weaponDeepCopy);
		console.log(player.inventory);
	}
	return player;
}
class PlayerSet {
	constructor(save){
		this.clear();
		this.onAdd = function(user){};
		Object.assign(this,save);
	}
	add(user){
		for(let u in this.users){
			if(this.userEquals(this.users[u],user)) return this.users[u];
		}
		this.users.push(user);
		this.onAdd(user);
		return user;
	}
	remove(user){
		if(!user){
			return this.users.shift();
		}
		for(let u in this.users){
			if(this.userEquals(this.users[u],user)) return this.users.splice(u,1);
		}
		return null;
	}
	getUser(user){
		for(let u in this.users){
			if(this.userEquals(this.users[u],user)) return this.users[u];
		}
		return null;
	}
	userEquals(user1,user2){
		if(user1['user-id'] && user2['user-id']) return (user1['user-id'] == user2['user-id'])
		return (user1['display-name'] == user2['display-name']);
	}
	thaw(user){
		if(user){
			user = new Player(user);
		}else{
			for(let u in this.users){
				thaw(this.users[u]);
			}
		}
	}
	size(){
		return this.users.length;
	}
	clear(){
		this.users = [];
	}
}
module.exports = {spawnPlayer,Weapon,KillFeed,Inventory,Spectator,Player,PlayerSet};