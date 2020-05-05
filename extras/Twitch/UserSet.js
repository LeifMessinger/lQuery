with(require('./BattleRoyale.js','utf8')){
	class UserSet {
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
			return (user1['user-id'] == user2['user-id']);
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
	module.exports = UserSet;
}