import {Router} from 'express'
import userModel from '../models/user.model.js'

const router = Router()

router.post('/register', async (req,res)=>{
const {first_name, last_name, email, age, password} = req.body 

const exist = await userModel.findOne({email})
if(exist){
    return res.status(400).send({status:'error', msg:'Usuario ya existe!'})

}
const user = {
    first_name,
    last_name,
    email,
    age,
    password
}
const result = await userModel.create(user)
res.send({status:"success", msg:"Usuario creado con exito con ID: " + result.id})
})

router.post('/login', async (req,res) => {
  const {email, password} = req.body
  const user = await userModel.findOne({email, password})  
    let rol;
    if(!user) return res.status(401).send({status:"Error", error:"Incorrect credentials"})
    if(email == "adminCoder@coder.com" && password == "adminCod3r123"){
        rol = 'admin'
    }
    else{
        rol = "user"
    }
    req.session.user = {
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        age: user.age,
        rol: rol
    }

    res.send({status:'success', payload: req.session.user, message:'Logueo exitoso'})
})

router.get('/logout',  (req,res)=>{
    req.session.destroy(err =>{
        if(!err) return res.status(200).send("deslogueo exitoso")
        else res.send("fallo el deslogueo")
    })
})
export default router;