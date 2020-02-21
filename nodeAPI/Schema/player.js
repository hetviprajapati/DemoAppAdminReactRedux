var mongoose =require('mongoose');
var Schema=mongoose.Schema;

var playerSchema=new Schema({
    name:{
        type:String,
        require:true,
        trim:true
    },
    email:{
        type:String,
        require:true,
        trim:true,
        unique:true
    },
    password:{
        type:String,
        require:true,
        trim:true
    },
    profile:{
        type:String
    },
    dob:{
        type:Date,
        require:true
    },
    role:{
        type:String,
        default:'user'
    },
    rolebowler:{
        type:String,
        trim:true
    },
    rolebatsman:{
        type:String,
        trim:true
    },
    team:{
        type:String,
        trim:true
    }
},{
    collection:'player',
    timestamps:true
})

module.exports=mongoose.model('player',playerSchema);