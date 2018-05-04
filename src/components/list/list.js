import "./list.scss";
import {View} from "../../modules/view";
import {TodoListItem} from "../listitem/listitem";

export class TodoList extends View {
  constructor(el, model) {
    super(el);
    this.id = -1;
    this.model = model;
    this.procedures = model.procedures;
    this.className = "todo-list";
    this.init();
  }

  onAttach(el) {
    el.classList.add(this.className);
    this.loadItems();
  }

  sortItems(index) {
    let data = this.model.storage;

    let sortable = [];

    if (index === 0) {
      sortable = data.sort((a, b) => {
        return a.text.length < b.text.length
      });
    }

    if (index === 1) {
      sortable = data.sort((a, b) => {
        return a.priority.value > b.priority.value
      });
    }


    Array.from(this.view.children).map(el => {
      el.remove();
    });

    this.model.storage = sortable;

    if (data && data instanceof Array) {
      for (let options of data) {
        new TodoListItem(this.view, Object.assign(options, {
          id: ++this.id,
          ondatachange: (...opt) => {
            this.onDataChange(...opt)
          }
        }))
      }
    }
  }

  loadItems(data = this.model.storage) {
    if (data && data instanceof Array) {
      for (let options of data) {
        this.addItem(options)
      }
    }
  }

  addItem(options) {
    this.model.push(new TodoListItem(this.view, Object.assign(options, {
      id: ++this.id,
      ondatachange: (...opt) => {
        this.onDataChange(...opt)
      }
    })));
  }

  /**
   * change event from TodoListItem
   * @override
   */
  onDataChange(procedure, ...data) {
    this.procedures[procedure](...data)
  }
}
