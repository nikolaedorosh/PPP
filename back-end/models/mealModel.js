const {Shema,model} = require('mongoose')

const mealSchema = newSchema({
  meal : {
    date:Number,
    items:[],
    info: {
      totalKcal:String,
      totalProteins:String,
      totalCarbohydrates: String,
      totalFats:String,
    },
  },

})


const mealModel = ('Meal' , mealSchema )
module.exports = mealModel
