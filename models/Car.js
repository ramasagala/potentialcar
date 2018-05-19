var mongoose = require('mongoose');  
var CarSchema = new mongoose.Schema({  
  name: { type: String, required: true },
  status: { type: Number, required: true, default: 0 },
  created: { type : Date, default: Date.now },
  license_plate: { type: String }
});
mongoose.model('Car', CarSchema);
module.exports = mongoose.model('Car');