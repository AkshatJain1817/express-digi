import express from 'express';

const app = express()
const port = 3000
app.use(express.json())

let data = []
let nextId = 1

//add data
app.post('/data' , (req,res)=>{
    const {name} = req.body
    const newData = {id: nextId++, name}
    data.push(newData)
    res.status(201).send(newData)
})

//get all the data
app.get('/alldata', (req,res) => {
    res.status(200).send(data)
})
//get data by id
app.get('/data/:id', (req,res) => {
    const findDataById = data.find((data) => data.id === parseInt(req.params.id)) 
    if(!findDataById){
        return res.status(404).send('Data not found')
    }
    res.status(200).send(findDataById)
})

//update data
app.put('/data/:id', (req,res) => {    
    const findDataById = data.find((data) => data.id === parseInt(req.params.id))//find data by id
    if(!findDataById){//if data not found
        return res.status(404).send('Data not found')
    }
    const {name} = req.body//get the name from the body
    findDataById.name = name//update the name
    res.status(200).send(findDataById)//send the updated data
})

//delete data
app.delete('/data/:id',(req,res) => {
    const index = data.findIndex(d => d.id === parseInt(req.params.id))//find data by id
    if(index === -1){//if data not found
        return res.status(404).send('Data not found')
    }
    data.splice(index,1)//delete the data
    res.status(204).send('deleted')//send the status code
})

app.listen(port, () => {
    console.log(`server running at ${port}`);
})