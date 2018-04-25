import './todoform.scss'
import {View} from '../../components/view'

export class TodoForm extends View {
	constructor(el){
		super(el);
		this.className = 'todo-form';
		this.init();
	}

	onAttach(el){
		el.classList.add(this.className);
		this.createTextarea();
		this.createSelect();
		this.createHint();
	}

	createHint() {
		let hint = this.deffineElement(this.className, 'hint');
		hint.innerHTML = "Use Ctrl+Enter to create todo-item";
		this.view.appendChild(hint);
	}

	createSelect() {
		let createOption = (text) => {
			let option = document.createElement('option');
			option.text = text;
			return option;
		};

		let select = this.deffineElement(this.className, 'select', 'select');
		for(let value of ['low', 'middle', 'high']){
			select.add(createOption(value));
		}
		this.view.appendChild(select);
	}

	createTextarea() {
		let textarea = this.deffineElement(this.className, 'textarea', 'textarea');
		this.view.appendChild(textarea);
		textarea.addEventListener('keyup', event => {
			if (event.ctrlKey && event.keyCode === 13) {
				this.send();
			}
		});
	}

	send(){
		let textarea = this.getElement('textarea');
		let select = this.getElement('select');
		let {selectedIndex: priorityValue} = select.options;
		let text = textarea.value;

		if(text.trim() !== ""){
			textarea.value = "";
			textarea.focus();
			select.options.selectedIndex = 0;
			this.insertMessage({
				text: text,
				priority: {
					value: priorityValue,
					selector: select.options[priorityValue].innerText
				}
			})
		}
	}

	/**
	 * Добавляение
	 * @override
	 * @param text
	 */
	insertMessage(opt) {}
}