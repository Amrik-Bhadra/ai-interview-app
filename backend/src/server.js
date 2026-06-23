const app = require('./app.js')
const PORT = process.env.PORT || 3000
require("dotenv").config();
const connectToDB = require('./config/database.js');

connectToDB();

app.listen(3000, () => {
    console.log(`✅ Server is running at port: ${PORT}`);
})