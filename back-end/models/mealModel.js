const {Schema,model} = require('mongoose')

const mealSchema = new Schema({
    date:Number,
    items:[],
    info: {
      totalKcal:String,
      totalProteins:String,
      totalCarbohydrates: String,
      totalFats:String,
    },

})


const mealModel = model('Meal' , mealSchema )

module.exports = mealModel
