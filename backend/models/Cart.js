const mongoose = require("mongoose");
const Schema = mongoose.Schema


const CartSchema = new Schema ({
    products: [
        {productId:{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    quantity: {type: Number}
}
],
    totalAmount: {type: Number}
})


module.exports = mongoose.model("Cart", CartSchema);