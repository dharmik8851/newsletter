const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const https = require("https");

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

app.listen(process.env.PORT || 3000,function () {
  console.log("server running at 3000 port");
})

app.get("/",function (req,res) {
  res.sendFile(__dirname+"/signup.html");
});

app.post("/",function (req,res) {
  console.log(req.body);
  const fName = req.body.fName;
  const lName = req.body.lName;
  const email = req.body.mailId;
  //res.send("successfull");
  const data = {
    members : [{
      email_address : email,
      status : "subscribed",
      merge_fields : {
        FNAME : fName,
        LNAME : lName
      }
    }]
  };
  const jsonData =  JSON.stringify(data);
  const url = "https://us21.api.mailchimp.com/3.0/lists/533929a773";
  const options = {
    method: 'POST',
    auth: 'dharmik:33f0cf8df3630beb662065f4698513ad-us21'
  };
  const request = https.request(url,options,function (response) {
    response.on('data',function (data) {
      console.log(JSON.parse(data).errors);
    })
    if(response.statusCode === 200) res.sendFile(__dirname + "/success.html");
    else res.sendFile(__dirname+"/failure.html");
  });
  request.write(jsonData);
  request.end();

  


});

//API key
//33f0cf8df3630beb662065f4698513ad-us21
//533929a773
