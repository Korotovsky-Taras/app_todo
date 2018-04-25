export class View {

    constructor(initElement, prepend = false) {
    	this.el = document.createElement('div');
		this.elements = {};
		this.prepend = prepend;
    	this.initElement = initElement;
    }

    init(template = null) {

    	if(template) {
			this.el.innerHTML = template;
			this.el = this.el.children[0];
		}

		if(this.prepend) {
			this.initElement.prepend(this.el);
		} else {
			this.initElement.append(this.el);
		}

		this.onAttach(this.el);
    }

	deffineElement(selector, key, type = 'div'){
		let el = this.getElement(key);
		if(!el) el = this.createElement(key, type);
		el.classList.add(selector + "__" + key);
		return el;
	}

	createElement(key, type = 'div'){
		let div = document.createElement(type);
		this.elements[key] = div;
		return div;
	}

	getElement(key) {
		if(this.elements.hasOwnProperty(key)) {
			return this.elements[key];
		}
	}

    get view() {
    	return this.el;
	}

	/**
	 * событие аттача в DOM
	 * @override
	 */
	onAttach(){};

}