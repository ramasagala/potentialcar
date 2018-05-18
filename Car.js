var mongoose = require('mongoose');  
var CarSchema = new mongoose.Schema({  
  name: String,
  status: Integer,
  created: DateTime,
  license_plate: String
});
mongoose.model('Car', CarSchema);
module.exports = mongoose.model('Car');