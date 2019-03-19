const mongoose = require('mongoose');

const restauranteSchema = mongoose.Schema({

    id: {
        type: String
    },
    name: {
        type: String
    },
    contact: {
        type: Object,
        site: {
            type: String,
            email: String,
            phone: String
        },
        email: {
            type: String
        },
        phone: {
            type: String
        }
    },
    address: {
        type: Object,
        street: {
            type: String
        },
        city: {
            type: String
        },
        state: {
            type: String
        },
        location: {
            type: Object
        }
    },
    rating: {
        type: Number
    }
})


const Restaurante = mongoose.model("Restaurante", restauranteSchema, "restaurants")

module.exports = { Restaurante }