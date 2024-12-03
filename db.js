const mongoose = require('mongoose');

const dbUser = process.env.DB_USER
const dbPass = process.env.DB_PASS

const connectDB = async () => {
    mongoose.connect(`mongodb+srv://${dbUser}:${dbPass}@cluster0.vdnll.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`).then(()=>{
        app.listen(3000)
        console.log('conectou')
    }).catch((err) => console.log(err))
}


module.exports = connectDB;