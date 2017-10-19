import './index.sass'
import { hello } from './js/_greetings'

document.getElementById('hello').innerHTML = hello('from app.js')
