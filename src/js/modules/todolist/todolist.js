import './todolist.scss'
import {View} from '../../components/view'
import {TodoListItem} from '../todoitem/todoitem'

export class TodoList extends View {
	constructor(el, model){
		super(el);
		this.model = model;
		this.data = model.getData();
		this.className = "todo-list";
		this.init();
	}

	onAttach(el){
		el.classList.add(this.className);

		console.log(this.data, this.data instanceof Array)
		if(this.data && this.data instanceof Array){
			for(let item of this.data){
				this.addItem(item)
			}
		}
		// загрузить если есть
	}

	addItem(options){
		this.model.add(new TodoListItem(this.view, Object.assign(options, {
			onchange: el => {this.onChange(el)}
		})));
	}

	/**
	 * change event from TodoListItem
	 * @override
	 */
	onChange(){

	}
}