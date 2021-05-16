const {Schema, model} = require('mongoose')

const mealSchema = new Schema({
    date:Number,
    items:[]
})


const mealModel = model('Meal', mealSchema)

module.exports = mealModel
