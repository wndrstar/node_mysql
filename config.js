 const mysql = require('mysql');

const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'yash_handicraft',
});

connection.connect((error)=>{
    if(error){
        console.log("Not Connected");
    }
    else{
        console.log('Connected');
    }
})

module.exports = connection;