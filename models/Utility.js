const {mongoose} = require("mongoose")
const {Schema} = mongoose;
 const userUtilitySchema = new Schema(
    {
        
        
          
          phoneNumber:{
            type:String,
            
            required:true
        },
          amount:{
            type:String,
            
            required:true,
        },
        type:{
            type:String,
           
            required:true,
        },
       

    },
    {timestamps:true}
 );
  module.exports= mongoose.models.Utility || mongoose.model("Utility",userUtilitySchema);