var mongoose = require('mongoose');  
var CarSettingSchema = new mongoose.Schema({  
    car_id: { type: String, required:true },
    lights: { type: Number, default: 0 },
    left_signal: { type: Number, default: 0 },
    right_signal: { type : Number, default: 0 },
    speed: { type : Number, default: 0  }
});
mongoose.model('CarSetting', CarSettingSchema);
module.exports = mongoose.model('CarSetting');