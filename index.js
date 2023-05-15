const connection = require('./App/config/config');
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended : true}));
const mongoose = require('mongoose');
const mongodb = require('mongodb');


app.get('',(request,response)=>{
    response.send("Server Is Working Fineeeee");
})


app.post('/insert-user',async (request,response)=>{
    const data ={
         'name': request.body.name,
         'mobile_number':request.body.mobile_number,
         'email':request.body.email,
         'password': request.body.password
    }
    connection.query('Insert INTO users SET ?',data, (error,result)=>{
        if(error){
            response.send({
                'status': false,
                'message':'Something Went Wrong ....'
            });
        }
        else{
            response.send({
                'status': true,
                'message':'Inserted Sucessfully ....'
            });
        }
    });
})

app.get('/view-user',async (request,response)=>{
   
    connection.query('select * from users', (error,result)=>{
        if(error){
            response.status(500).send({
                'status': false,
                'message':'Something Went Wrong ....'
            });
        }
        else{
            response.send({
                'status': true,
                'message':'Record Found Sucessfully ....',
                'data':result
            });
        }
    });
})

app.put('/update-user/:id',async (request,response)=>{
    const data =[
        request.body.name,
        request.body.mobile_number,
        request.body.email,
        request.body.password,
        request.params.id,

    ]
    connection.query('update users SET name = ?, mobile_number = ?, email = ?, password = ? where id = ?',data, (error,result)=>{
        if(error){
            response.send({
                'status': false,
                'message':'Something Went Wrong ....'
            });
        }
        else{
            response.send({
                'status': true,
                'message':'Updated Sucessfully ....'
            });
        }
    });
})

app.delete('/delete-user/:id',async (request,response)=>{
    connection.query('delete from users where id = '+request.params.id, (error,result)=>{
        if(error){
            response.send({
                'status': false,
                'message':'Something Went Wrong ....'
            });
        }
        else{
            response.send({
                'status': true,
                'message':'Deleted Sucessfully ....'
            });
        }
    });
})

app.get('/views',async (request,response)=>{
    
    connection.query('select id ,name,email from users where name LIKE "%'+request.body.name+'%" ORDER BY id DESC',(error,result)=>{
        if(error){
            response.status(500).send({
                'status': false,
                'message':'Something Went Wrong ....'
            });
        }
        else{
            if(result.length){
                    response.send({
                    'status': true,
                    'message':'Record Found Sucessfully ....',
                    'data':result
                });
            }

        }
    });
})

app.listen(3001);