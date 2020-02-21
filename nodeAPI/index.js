var mongoose=require('mongoose');
var express=require('express');
var app=express()
var chalk=require('chalk');

var player=require('./Route/player');
app.use('/player',player);

mongoose.connect('mongodb://localhost:27017/ReactDemo',{});
mongoose.connection.on('error',function(err){
    console.log(chalk.red("An error occured while making an connection"));
}).once('open',function(){
    console.log(chalk.green("Connction successfully established"));
})

app.listen(3001,(error)=>{
    if(error)
    {
       console.log(chalk.red("Error occured while running on port 3001"));
       return
    }
    console.log(chalk.green("Server started on 3001"));
});
          