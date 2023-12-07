import mongoose from "mongoose";


const URL = 'mongodb+srv://jazlan:jazlan@cluster0.gj7lhoo.mongodb.net/?retryWrites=true&w=majority'
const connectToMongo = async () => {
  try {
    const res = await mongoose.connect(URL);
    if(res){
        console.log("connection sucessfull")
    }
   } catch (error) {
    console.log(error)
   }
}

export default connectToMongo