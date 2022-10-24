const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"))
const PORT = process.env.PORT || 3000

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/signUp.html")
})

app.post("/", (req, res) => {
    let firstName = req.body.fName
    let lastName = req.body.lName;
    let email = req.body.email;

    const data = {
        members : [
            {email_address : email, status : 'subscribed', merge_fields : {FNAME :firstName, LNAME :lastName}}

        ]
    }
    const jsonData = JSON.stringify(data);
    const url = "https://us21.api.mailchimp.com/3.0/lists/1822a9938d"
    const options = {
        method : "POST",
        auth : "dipu:e184b27eb6720ed499efc9af4e33b370-us21"
    }


    const request = https.request(url, options,function(response){
        console.log(response.statusCode)

        if(response.statusCode>=200 && response.statusCode<=299){
            res.sendFile(__dirname + "/success.html")
        }else{
            res.sendFile(__dirname + "/failure.html")
        }
    })
    
    request.write(jsonData);
    request.end()
})

app.post('/failure', (req, res) => {
    res.redirect('/')
})

app.listen(PORT, () => {
    console.log("app is runing at port : " + PORT)
})



