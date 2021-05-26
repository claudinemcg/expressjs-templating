const express = require('express');
const app = express(); // excuting express
const path = require('path');
const redditData = require('./data.json');
// console.log(redditData);

// app.use(express.static('public')) // public directory with multiple directories in it
app.use(express.static(path.join(__dirname, 'public'))) // so you can open file from anywhere and it will find the folder

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'))

app.get('/', (req, res) => {
    res.render('home')
    // don't need to write home.ejs because it's set to ejs above
    // don't need view/home because the default is to look in the views folder
})

app.get('/rand', (req, res) => {
    const num = Math.floor(Math.random() * 10) + 1;
    //res.render('random', {rand : num}) 
    res.render('random', { num })
    // 'random' stands for random.ejs
    // if you name key and value num can put in one num so stands for {num: num}
})
app.get('/cats', (req, res) => {
    const cats = ['Blue', 'Tiger', 'Monty', 'Lily']
    // this usually comes from a database which we will cover later
    res.render('cats', { cats }) // cats : cats

})

app.get('/r/:subreddit', (req, res) => {
    const { subreddit } = req.params;
    const data = redditData[subreddit]; // soccer is a key in data.json
    // console.log(data);
    // type in browser localhost:8080/r/soccer
    // it goes to redditData and gets the soccer object info
    // terminal shows the soccer info
    if (data) {
        res.render('subreddit', { ...data });
    } else {
        res.render('notfound', { subreddit }) // notfound.ejs
    }
    // spread data into the object we pass in
    // cana access individual properties e.g. keys in the soccer object
})

app.listen(8080, () => {
    console.log('Listening on Port 8080');
})