const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
    email: {
        type: String,
        unique: true
    },
    password: String,
    salt: String,
    firstName: String,
    lastName: String,
    avatarUrl: String,
    accessToken: String,
    address: String,
    // address: [
    //     {type: Schema.Types.ObjectId, ref: 'address', require: true}
    // ],
    cart: [
        {
            product: {type: Schema.Types.ObjectId, ref: 'product', require: true},
            unit: {type: Number, require: true}
        }
    ],
    wishlist: [
        // {
        //     type: Schema.Types.ObjectId, ref: 'product', require: true
        // }

        { 
            _id: { type: String, require: true},
            name: { type: String},
            description: {type: String},
            banner: { type: String},
            available: {type: Boolean},
            price: { type: Number}
        }
    ],
    orders: [
        {type: Schema.Types.ObjectId, ref: 'order', require: true}
    ]

}, {
    toJSON: {
        transform(doc, ret) {
            delete ret.password;
            delete ret.salt;
            delete ret.__v;
        }
    },
    timestamps: true
});

module.exports = mongoose.model('customer', CustomerSchema);