import './todoitem.scss'
import listItemView from './todoitem.pug'
import {View} from '../../components/view'

export class TodoListItem extends View {
	constructor(el, {text, priority: {value, selector}, onchange}){
		super(el, true);
		this.text = text;
		this.data = {
			text: text,
			priority: {
				value: value,
				selector: selector
			}
		};
		this.prioritySelector = selector;
		this.onchange = onchange;
		this.init(listItemView({text: text}));
	}

	onAttach(el){
		el.classList.add(this.prioritySelector);

		let checkButton = el.querySelector(".todo-list__item-checkbox");
		let closeButton = el.querySelector(".todo-list__item-close");

		checkButton.addEventListener( 'change', () => {
			el.classList.toggle('checked', checkButton.checked);
			this.onchange([this.data, "изменили"]);
		});

		closeButton.addEventListener('click', () => {
			el.remove();
			this.onchange([this.data, "удалили"]);
		});
	}
}