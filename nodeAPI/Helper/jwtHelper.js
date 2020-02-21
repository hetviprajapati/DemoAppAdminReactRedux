var jwt=require('jsonwebtoken');

module.exports={
    sign:function(secret,body){
        return jwt.sign(body,secret,{});
    },
    verify:async function(token,secret){
        try{
            var data=await jwt.verify(token,secret);
            return {data}
        }catch(err){
            console.log("Error occured while verifying");
            return {err}
        }
    }
}