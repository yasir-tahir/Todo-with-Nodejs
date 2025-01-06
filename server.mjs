import express from 'express'
import cors from 'cors'

const app = express()
const port = process.env.PORT || 5001

const todos = []

// To Convert body into JSON
app.use(express.json())
app.use(cors({origin:['http://localhost:5173', 'https://frontend.surge.sh' ]}))


app.get('/api/v1/todos', (request, response)=> {

    
const message = !todos.length?"todos empty" : "ye lo sab todos"


    response.send(
        {data:todos,message:message}
    )

}) 

// naya todo banane ka
app.post('/api/v1/todo', (request, response)=> {

    const obj  = { todoContent: request.body.todo, 
        id: String(new Date().getTime()),
    }

    todos.push(obj);

    response.send({message: "todo add hogaya hai", data:obj})
})
// ye todo ko update ya edit karne ki api hai
app.patch('/api/v1/todo/:id', (request, response)=> { 

    const id = request.params.id

    let isFound = false
    for (let i = 0; i < todos.length; i++) {

        if(todos[i].id === id){
// idher product mil chuka hai
// (ab us product ko add karna hai) 

    todos[i].todoContent = request.body.todoContent        
    isFound = true    
    break;    
        }
    }

    if(isFound){
        response.status(201).send({
            data: { todoContent: request.body.todoContent, 
            id:id,
        }, message:'todo updated successfully!'})
    
    }else{
        response.status(200).send({data: null, message:'todo not found!'})
        
    }

    
    
})
// ye todo ko delete karega
app.delete('/api/v1/todo/:id', (request, response)=> {
    const id = request.params.id

    
    let isFound = false
    for (let i = 0; i < todos.length; i++) {

        if(todos[i].id === id){
// idher product mil chuka hai (ab us product ko delete karna hai) 

    todos.splice(i, 1)        
    isFound = true    
    break;    
        }
    }

    if(isFound){
        response.status(201).send({
            // data: { todoContent: request.body.todoContent, 
            // id:id,   },
             message:'todo deleted successfully!'})
    
    }else{
        response.status(200).send({data: null, message:'todo not found!'})
        
    }
    

 })


app.use((request,response)=>{
    response.status(404).send("no route found!")
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
    
})