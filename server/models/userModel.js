const {Schema, model} = require('mongoose')

const userSchema = new Schema({
  // info : [
  //   {
  //     age:Number,
  //     gender:String,
  //     weight: Number,
  //     height:Number,
  //     activity:Boolean,
  //   },
  // ],
  // food : [
  //   {
  //     date:Number,
  //     kcal:Number,
  //     Proteins:Number,
  //     carbohydrates: Number,
  //     fats:Number
  //   }
  // ],
  // target : [
  //   {
  //   weigthKG:Number,
  //   kcalNow: Number,
  //   ProteinsNow:Number,
  //   carbohydratesNow: Number,
  //   fatsNow:Number
  //   }
  // ]
  
      weigthKG:Number,
      kcalNow: Number,
      ProteinsNow:Number,
      carbohydratesNow: Number,
      fatsNow:Number,
  
})

const userModel = model("User", userSchema);

module.exports = userModel;
