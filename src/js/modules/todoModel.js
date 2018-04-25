const KEY = 'todoList';

export class TodoModel {

	constructor() {
		this.data = [];
	}

	add({data}) {
		this.data.push(data);
		this.update();
	}

	update(data) {
		localStorage.setItem(KEY, JSON.stringify(this.data));
	}

	getData() {
		let data = localStorage.getItem(KEY);
		if (data) {
			return JSON.parse(data);
		}
		return null;
	}

}