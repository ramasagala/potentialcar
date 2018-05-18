var mongoose = require('mongoose');  
var CarSchema = new mongoose.Schema({  
  name: String,
  status: Number,
  created: { type : Date, default: Date.now },
  license_plate: String
});
mongoose.model('Car', CarSchema);
module.exports = mongoose.model('Car');