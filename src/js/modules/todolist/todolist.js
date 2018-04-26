import './todolist.scss'
import {View} from '../../components/view'
import {TodoListItem} from '../todoitem/todoitem'

export class TodoList extends View {
	constructor(el, model){
		super(el);
		this.id = -1;
		this.model = model;
		this.procedures = model.procedures;
		this.className = "todo-list";
		this.init();
	}

	onAttach(el){
		el.classList.add(this.className);
		this.loadItems();
	}

	loadItems(){
		let data = this.model.storage;

		if(data && data instanceof Array){
			for(let {data: options} of data){
				this.addItem(options)
			}
		}
	}

	addItem(options){
		this.model.push(new TodoListItem(this.view, Object.assign(options, {
			id: ++this.id,
			ondatachange: (...opt) => {this.onDataChange(...opt)}
		})));
	}

	/**
	 * change event from TodoListItem
	 * @override
	 */
	onDataChange(procedure, ...data){
		this.procedures[procedure](...data)
	}
}