import './todomanager.scss'
import {View} from '../../components/view'
import {TodoList} from '../../modules/todolist/todolist'
import {TodoForm} from '../../modules/todoform/todoform'
import {TodoModel} from '../todoModel'

export class TodoManager extends View {
	constructor(el){
		super(el);
		this.className = "todo-manager";
		this.model = new TodoModel("todo");
		this.init();
	}

	onAttach (el){

		let headerElement = this.deffineElement(this.className, 'header');
		let bodyElement = this.deffineElement(this.className, 'body');

		el.classList.add(this.className);

		el.appendChild(headerElement);
		el.appendChild(bodyElement);

		let todoList = new TodoList(bodyElement, this.model);
		let todoForm = new TodoForm(headerElement);

		todoForm.addItem = (...opt) => {
			todoList.addItem(...opt);
		};

		todoForm.sortList = ({index}) => {
			todoList.sortItems(index);
		};

		todoList.onChange = (element) => {
			console.log(element)
		};

	}

}