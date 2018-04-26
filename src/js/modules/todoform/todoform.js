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
		this.createSort();
	}

	createOption (text) {
		let option = document.createElement('option');
		option.text = text;
		return option;
	};

	createHint() {
		let hint = this.deffineElement(this.className, 'hint');
		hint.innerHTML = "Use Ctrl+Enter to create todo-item";
		this.view.appendChild(hint);
	}

	createSelect() {
		let select = this.deffineElement(this.className, 'priority', 'select');
		for(let value of ['low', 'middle', 'high']){
			select.add(this.createOption(value));
		}
		this.view.appendChild(select);
	}

	createSort() {
		let select = this.deffineElement(this.className, 'sort', 'select');
		for(let value of ['по имени', 'по приоритету']){
			select.add(this.createOption(value));
		}

		this.view.appendChild(select);

		select.addEventListener('change', () => {
			let {selectedIndex: sortIndex} = select.options;
			this.sortList({
				index: sortIndex
			});
		});
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
		let select = this.getElement('priority');
		let {selectedIndex: priorityValue} = select.options;
		let text = textarea.value;

		if(text.trim() !== ""){
			textarea.value = "";
			textarea.focus();
			select.options.selectedIndex = 0;
			this.addItem({
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
	addItem(opt) {}

	/**
	 * Обновление
	 * @override
	 * @param text
	 */
	sortList(opt) {}
}