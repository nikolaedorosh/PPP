const {Schema, model} = require('mongoose')

const mealSchema = new Schema({
    user: {
      type: Schema.Types.ObjectId,
      ref: "userModel"
    },
    date:Number,
    items:[]
})


const mealModel = model('Meal', mealSchema)

module.exports = mealModel
