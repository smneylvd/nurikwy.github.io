const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const https = require("https");
const mongoose = require("mongoose");

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"));
app.set("view engine", "ejs")

//<mongoose>
mongoose.connect("mongodb://localhost:27017/posts",{ useNewUrlParser: true, useUnifiedTopology: true })

// const itemsSchema = mongoose.Schema({
//   title:String
// })

const listNews = new mongoose.Schema({
  title: String, 
  category: String, 
  author: String,
  email: String, 
  content: String 

})

// const Item = mongoose.model("Item", itemsSchema)
const news = mongoose.model("news", listNews)
//</mongoose>

app.get("/", function(req, res){
  res.render("index", {weather_title:null, weather_desc:null});  
})

app.get("/single-post", function(req, res){
  res.render("single-post", {message:""});  
})



app.get("/cat-education", function(req, res){
  news.find({category:'education'}, function(err, foundItem){
    console.log(foundItem);
    res.render("education", {weather_title:null, weather_desc:null, itemList: foundItem});  
  })
})      //adik





app.post("/delete", function(req, res){
  const checkId = req.body.check
  // console.log(req.body);
  news.deleteOne({_id:req.body.check}, function(){
    res.redirect(req.get('referer'));
  })
});
  
  


app.post("/single-post", function(req, res){
  let form = req.body;
  const title = form.title;
  const email = form.email;
  const category = form.category;
  const author = form.author;
  const content = form.content;
  
  const post = new news({
    title: title,
    email: email,
    category: category,
    author: author,
    content: content
  });
  console.log(post);
  post.save();

  res.render("single-post", {message:"Successfully posted!"})

})

app.post("/", function(req, res){
  //res.send(req.body)
  var city = req.body.city;
  apiKey = "07e6be11058f287f345016199616cd77"

  url = "https:/api.openweathermap.org/data/2.5/weather?appid="+apiKey+"&q="+city+"&units=metric"
  https.get(url, function(response){
    // console.log(response)
    response.on("data", function(data){

      var weatherData = JSON.parse(data)
      
      if(weatherData.cod == 404 || city == null){
        res.render("index", {weather_title: weatherData.message, weather_desc:null})
      }
      
      else {
      var country = weatherData.sys.country;
      var flag = "http://openweathermap.org/images/flags/" + country.toLowerCase() + ".png"

      let title = weatherData.name + ", "
                + weatherData.sys.country + " "
                + weatherData.weather[0].description;
      let info = weatherData.main.temp + " C temperature from "
                  +  weatherData.main.temp_min + " to "
                  +  weatherData.main.temp_max + " C, wind  "
                  + weatherData.wind.speed +"m/s. ";
      res.render("index", {weather_title: title, weather_desc: info});
    }})
  })

})


app.listen(5000,function(){
  console.log("localhost:5000")
})
