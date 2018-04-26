const KEY = 'todo';

export class TodoModel {

	constructor() {
		this.map = [];
		this.procedures = {
			onRemove: ({id}) => {
				this.remove(id);
			},
			onChange: ({id, key, value}) => {
				this.change(id, key, value);
			},
			onAdd: ({data}) => {
				this.push(data);
			}
		}
	}

	get storage () {
		let storage = localStorage.getItem(KEY);

		if(storage) {
			return JSON.parse(storage);
		}
		return null;
	}

	save (){
		localStorage.setItem(KEY, JSON.stringify(this.map));
	};

	push (data){
		 this.map.push(data);
		 this.save();
	}

	change (id, key, value){
		console.log(this.map, this.map[id], id, key, value)
		this.map[id][key] = value;
		this.save();
	}

	remove (id){
		this.map.splice(id,1);
		this.save();
	}

}