import './app.scss'
import {TodoManager} from './modules/todomanager/todomanager';

window.addEventListener('DOMContentLoaded', () => {
	new TodoManager(document.body)
});
