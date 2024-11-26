import mongoose from 'mongoose'
// mongodb+srv://banguyen:banguyen164@cluster0.58q4j.mongodb.net/DB_IE307?retryWrites=true&w=majority&appName=Cluster0
const connect = async (uri) => {
  try {
    await mongoose.connect(uri)
    console.log('Connect Successfully')
  } catch (err) {
    console.error('Connection error:', err)
  }
}
export default connect
