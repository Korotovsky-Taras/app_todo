import './manager.scss'
import {View} from '../../modules/view'
import {TodoList} from '../list/list'
import {TodoForm} from '../form/form'
import {TodoModel} from '../data'

export class TodoManager extends View {
  constructor (el) {
    super(el)
    this.className = 'todo-manager'
    this.model = new TodoModel('todo')
    this.init()
  }

  onAttach (el) {
    let headerElement = this.deffineElement(this.className, 'header')
    let bodyElement = this.deffineElement(this.className, 'body')

    el.classList.add(this.className)

    el.appendChild(headerElement)
    el.appendChild(bodyElement)

    let todoList = new TodoList(bodyElement, this.model)
    let todoForm = new TodoForm(headerElement)

    todoForm.addItem = (...opt) => {
      todoList.addItem(...opt)
    }

    todoForm.sortList = ({index}) => {
      todoList.sortItems(index)
    }

    todoList.onChange = (element) => {
      console.log(element)
    }
  }
}
