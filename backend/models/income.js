import mongosoe from 'mongoose';


const incomeSchema = new mongosoe.Schema({
    userId:{type:mongosoe.Schema.Types.ObjectId, required:true ,ref:'User'},
    icon:{type:String, required:true},
    source:{type:String, required:true},
    amount:{type:Number, required:true},
    date:{type:Date, default:Date.now},


},{timestamps:true});
export default mongosoe.model('Income',incomeSchema);