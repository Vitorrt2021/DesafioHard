const express = require('express')
const app =  express()

app.use(express.static(__dirname + '/src'))

app.get('/',(req,res)=>{
    res.send('Funciona')
})
const port = 3005
app.listen(port,()=>console.log(`Ouvindo na porta ${port} ...`))
