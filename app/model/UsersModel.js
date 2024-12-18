import mongoose from "mongoose";


const DataSchema  = mongoose.Schema({
    email: {type: String, unique: true, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    NIDNumber: {type: String, unique: true, required: true},
    phoneNumber: {type: String, required: true}, 
    password: {type: String, required: true}, 
    bloodGroup: {type: String, required: true}
},
 {timestapms: true, versionKey: false}
);

const UserModel = mongoose.model('users', DataSchema);



export default UserModel;