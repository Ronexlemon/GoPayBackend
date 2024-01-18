const {mongoose} = require("mongoose")
const {Schema} = mongoose;
 const userSchema = new Schema(
    {
        
        
        password:{
            type:String,
            required: false,
        },        
          phoneNumber:{
            type:String,
            unique:true,
            required:true
        },
          PublicKey:{
            type:String,
            unique:true,
            required:true,
        },
        PrivateKey:{
            type:String,
            unique:true,
            required:true,
        },

    },
    {timestamps:true}
 );
  module.exports= mongoose.models.User || mongoose.model("User",userSchema);