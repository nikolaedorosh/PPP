const {Schema, model} = require('mongoose')

const userSchema = new Schema({
  name:String,
  email:String,
  info : 
    {
      age:String,
      gender:String,
      weight: String,
      height:String,
      activity:String,
      bmi: String
    },
  
  food : [
    {
      type: Schema.Types.ObjectId,
      ref: 'Meal',
    },
  ],
  target : 
    {
    targetWeigth:Number,
    kcal: Number,
    Proteins:Number,
    carbohydrates: Number,
    fats:Number
    }
})

const userModel = model("User", userSchema);

module.exports = userModel;
