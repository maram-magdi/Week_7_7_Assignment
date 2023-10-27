let express = require('express');
let app = express();

const {Database} = require('quickmongo');
const db = new Database ("url")

db.on('ready', () => {
    console.log("Connected to the database");
})
db.connect();

app.use('/', express.static('public/main'));
app.use('/signin', express.static('public/sign-in'));

app.listen(3000, () => {
    console.log("listening at localhost:3000")
})

let allMessages = []; 
let allAnswers = [];

app.use(express.json());
app.post('/messages', (req, res) => {
    // console.log(req.body);

    let time = new Date().toUTCString();
    let obj = {
        "time": time,
        "message": req.body.message
    };

    // allMessages.push(obj);
    // console.log(allMessages);
    // res.json(obj);    
    
    db.push("allMessages", obj);
    res.json(obj);


});

app.get('/messages-show', (req, res) => {
    // let obj = {
    //     "data" : allMessages
    // }

    // res.json(obj);

    db.get("allMessages").then(allMessagesData => {
        let obj = {"data" : allMessagesData};
        res.json(obj);
    })
})

app.post('/answers', (req, res) => {
    
    let time = new Date().toUTCString();
    let obj = {
        "time": time,
        "answer": req.body.answer
    };
    
    // allAnswers.push(obj);
    // console.log(allAnswers);

    // res.json(obj);

    db.push("allMessages", obj);
    res.json(obj);
})

// app.get('/answers-show', (req, res) => {
//     let obj = {
//         "data" : allAnswers
//     }

//     res.json(obj);
// })

console.log(allAnswers);