import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
   title:{ type : String, required: true}, 
   price:{ type : Number, required: true},
   slug:{ type : String, required: true},
   description:{ type : String, required: true},
   cat:{ type : String, required: true},
   count:{ type : Number, required: true,default:0},
   image:{ type : String, required: true},
})

// "title": "Awareness",
// "author": "Anthony De Mello",
// "price": 32,
// "slug": "book-1",
// "description": "“Wisdom from one of the greatest spiritual masters of our time.”—James Martin, SJ, author of Jesus: A Pilgrimage\n\nThe heart of Anthony de Mello's bestselling spiritual message is awareness. Mixing Christian spirituality, Buddhist parables, Hindu breathing exercises, and psychological insight, de Mello's words of hope come together in Awareness in a grand synthesis.\n\nIn short chapters for reading in quiet moments at home or at the office, he cajoles and challenges: We must leave this go-go-go world of illusion and become aware. And this only happens, he insists, by becoming alive to the needs and potential of others, whether at home or in the workplace.\n\nHere, then, is a masterful book of the spirit, challenging us to wake up in every aspect of our lives.",
// "cat": "Conversations with the Masters",
// "count": 6,
// "image": "/images/book1.jpg"

const Product = mongoose.models.Product || mongoose.model('Product', productSchema)

export default Product