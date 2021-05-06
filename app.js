const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
//To deliver Static files
app.use(express.static("Static Files"));

app.listen(process.env.PORT || 3000 , function(){
    console.log("Server is running at port 3000");
});


app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
    const fname = req.body.firstName;
    const lname = req.body.lastName;
    const email = req.body.emailId;

    const data ={
        members: [
            {
                email_address : email,
                status : "subscribed",
                merge_fields : {
                    FNAME : fname,
                    LNAME : lname
                }
            }
        ]
    };
    const jsonData = JSON.stringify(data);
    const options = {
        method : "POST",
        auth : "Shashwat:7bd094ec4ba0c71c65fc733c02e0d8b6-us1"
    }

    const url = "https://us1.api.mailchimp.com/3.0/lists/1a91868cbc";

    const request = https.request(url , options , function(response){

        if (response.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
        } else{
            res.sendFile(__dirname + "/failure.html");
        }

        //response.on("data",function(data){
          //  console.log(JSON.parse(data));
        //});
    });
    request.write(jsonData);
    request.end();
});

app.post("/failure", function(req,res){
    res.redirect("/");
})

/*API KEY : 7bd094ec4ba0c71c65fc733c02e0d8b6-us1
Audience/List Id : 1a91868cbc fname = */