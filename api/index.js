import * as usersRepository from './repositories/users'
import * as postgres from './repositories/postgres'
//delete dummy data
//connect to database
import express from 'express' //imports
import cors from 'cors' //imports
import * as bodyParser from 'body-parser' //imports


const app = express() //Creates an Express application. The express() function is a top-level function exported by the express module.

postgres.connect()

app.use(cors()) //layers of express middleware 
app.use(bodyParser.json())//deserializes request.body(req) from to json to object

const users = [ // initializing a user variable to a  array of (user) objects
    {email: 'bob', password:'1234', isAdmin:true},
    {email:'hanes',password:'123'}
]

app.post('/login', handleLoginRequest) //tell app to call handleLoginRequest, when it get post requet to login

function handleLoginRequest(req, res) { 
    const typedEmail =req.body.email   //(creating the variable) `request has a property called body and body is also an object and it ahs a probpery called email.
    const typedPassword = req.body.password //this is an example of a variable you stupid fucker

    // const user = getUser(typedEmail, typedPassword) //calling getUser with typedEmail, typedPassword
    const user= usersRepository.get(typedEmail, typedPassword)
    
    if (user !== null){
        res.send(user)
    } 
    else{
        res.sendStatus(401)//unauthorized
    }
}

function getUser (email, password){
    let user =null //initialized to null
    for (let i = 0; i < users.length; i++){
        const dbuser = users[i]
        if (dbuser.email === email && dbuser.password === password){
            user = dbuser //reassigned to dbuser
        }
     }
     return user 

     
}
app.listen(4001, () => console.log('example app listening on port 4001'))