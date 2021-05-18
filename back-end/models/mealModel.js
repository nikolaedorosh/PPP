const {Schema, model} = require('mongoose')

const mealSchema = new Schema({
    user: {
      type: Schema.Types.ObjectId,
      ref: "userModel"
    },
    date: {
     type: Date,
     default: Date.now() 
    },
    items:[]
})


const mealModel = model('Meal', mealSchema)

module.exports = mealModel
