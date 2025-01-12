const express= require("express")
const app=express()
const PORT=process.env.PORT || 3000
const bodyparser= require("body-parser")

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extened:true}))
app.listen(PORT,()=>console.log(`server started at port ${PORT}`));