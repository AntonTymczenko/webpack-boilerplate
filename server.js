// dependencies:
const express = require('express'),
  bodyParser = require('body-parser'),
  path = require('path')

const app = express()

// configuration
require('dotenv').config()
// built distro:
const dist = path.join(__dirname, 'dist')

// middleware: --------------------------------------------------------------
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(dist))

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())


// ROUTES: -----------------------------------------------------------------
app.get('/', (req, res) => {
  res.render(dist + '/index.html')
});
app.post('/callme', (req, res) => {
  res.send('You\'ve reached the POST ')
})
app.get('*', (req, res) => {
  res.send('404')
})

// fire app
app.listen(process.env.PORT, () => {
  console.log(`listening on port  ${process.env.PORT} \nin ${process.env.NODE_ENV} mode`)
});
