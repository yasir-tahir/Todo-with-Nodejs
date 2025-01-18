import express from 'express'
import cors from 'cors'
import 'dotenv/config'

import './database.mjs'
import { Todo } from './models/index.mjs'


// setTimeout(()=>{
//     process.exit(0);
// }, 3000)

const app = express()
const port = process.env.PORT || 5001

const todos = []

// To Convert body into JSON
app.use(express.json())
app.use(cors({origin:['http://localhost:5173', 'https://frontend.surge.sh' ]}))


app.get('/api/v1/todos', async (request, response)=> {

    try {
        const todos = await Todo.find({},
         {ip: 0, __v: 0, updatedAt: 0}  //projection 0 wale frontend per nhi ayee gaye 
        //  {todoContent: 1, _id: 0 } // 1 se show nhi hoga or 2 se show hoga
   
        )
        
    const message = !todos.length?"todos empty" : "ye lo sab todos"
    
    
        response.send(
            {data:todos,message:message}
        )
        
    } catch (error) {
        response.status(500).send("Internal server error")
        
    }

}) 

// naya todo banane ka
app.post('/api/v1/todo', async (request, response)=> {
try {
    
    const obj  = { 
        todoContent: request.body.todo, 
        ip:request.ip,
    };


    const result = await Todo.create(obj)
    

    // todos.push(obj);

    response.send({message: "todo add hogaya hai", data:result})
} catch (error) {
    response.status(500).send("Internal server error")
    
}
})


// ye todo ko update ya edit karne ki api hai
app.patch('/api/v1/todo/:id', async (request, response)=> { 

    const id = request.params.id

    const result = await Todo.findByIdAndUpdate(id, 
        {
            todoContent: request.body.todoContent
        }
    )

    console.log('result=>', result);
    

    // let isFound = false
    // for (let i = 0; i < todos.length; i++) {

    //     if(todos[i].id === id){
// idher product mil chuka hai
// (ab us product ko add karna hai) 

    // todos[i].todoContent = request.body.todoContent        
    // isFound = true    
    // break;    
    //     }
    // }

    if(result){
        response.status(201).send({
            data: result,
             message:'todo updated successfully!'})
    
    }else{
        response.status(200).send({data: null, message:'todo not found!'})
        
    }

    
    
})
// ye todo ko delete karega
app.delete('/api/v1/todo/:id', async (request, response)=> {
    const id = request.params.id

    const result = await Todo.findByIdAndDelete(id) 
    

    if(result){
        response.status(201).send({
            // data: { todoContent: request.body.todoContent, 
            // id:id,   },
             message:'todo deleted successfully!'})
    
    }else{
        response.status(200).send({data: null, message:'todo not found!'})
        
    }
    

 })


app.use((request,response)=>{
    response.status(404).send({message: "no route found!"})
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
    
})