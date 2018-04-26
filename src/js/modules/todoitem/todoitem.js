import './todoitem.scss'
import listItemView from './todoitem.pug'
import {View} from '../../components/view'

export class TodoListItem extends View {
	constructor(el, {text, checked = false, priority: {value, selector}, id, ondatachange}){
		super(el, true);
		this.text = text;
		this.data = {
			text: text,
			checked: checked,
			priority: {
				value: value,
				selector: selector
			}
		};
		this.id = id;
		this.prioritySelector = selector;
		this.ondatachange = ondatachange;
		this.init(listItemView({text: text}));
	}

	onAttach(el){
		el.classList.add(this.prioritySelector);
		this.loadCheckbox();
		this.loadCloseButton();
	}

	loadCloseButton(){
		let closeButton = this.view.querySelector(".todo-list__item-close");
		closeButton.addEventListener('click', () => {
			this.view.remove();
			this.onRemove();
		});
	}

	loadCheckbox(){
		let checkButton = this.view.querySelector(".todo-list__item-checkbox");
		let setChecked = (checkedValue) => {
			this.view.classList.toggle('checked', checkedValue);
			if(checkedValue) {
				checkButton.checked = true;
			}
		};

		setChecked(this.data.checked);

		checkButton.addEventListener( 'change', () => {
			let checkedValue = checkButton.checked;
			this.data.checked = checkedValue;
			setChecked(checkedValue);
			this.onCheckbox();
		});
	}

	onRemove(){
		this.ondatachange("onRemove", {
			id: this.id
		});
	}

	onCheckbox(){
		this.ondatachange("onChange", {
			id: this.id,
			key: "checked",
			value: this.data.checked
		});
	}
}