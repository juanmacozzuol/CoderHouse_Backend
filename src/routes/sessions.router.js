import {Router} from 'express'
import { githubAuth, githubCallback, register, login, loginFail, logout } from '../controllers/sessions.controller.js'


const router = Router()

router.get('/github', githubAuth)

router.get('/githubcallback', githubCallback)

router.post('/register', register)

router.get('/failregister', async (req,res)=>{
    console.log("Register failed")
    res.send({error:"Failed"})
})

router.post('/login', login)

router.get('/faillogin', loginFail)


// router.post('/register', async (req,res)=>{
// const {first_name, last_name, email, age, password} = req.body 
// if(!first_name || !last_name || !email || !age || !password){
//     return res.status(400).send({status:"error", msg:'datos incompletos!'})
// }
// const exist = await userModel.findOne({email})
// if(exist){
//     return res.status(400).send({status:'error', msg:'Usuario ya existe!'})

// }
// const user = {
//     first_name,
//     last_name,
//     email,
//     age,
//     password: createHash(password)
// }
// const result = await userModel.create(user)
// res.send({status:"success", msg:"Usuario creado con exito con ID: " + result.id})
// })

// router.post('/login', async (req,res) => {
//   const {email, password} = req.body
//   const user = await userModel.findOne({email})  
//     let rol;
//     if(!user) return res.status(401).send({status:"Error", error:"Incorrect credentials"})
//     if(email == "adminCoder@coder.com" && password == "adminCod3r123"){
//         rol = 'admin'
//     }
//     else{
//         rol = "user"
//     }
//     if(!isValidPassword(user,password)) return res.status(403).send({status:"error", msg:'Invalid Credentials'})
//     req.session.user = {
//         name: `${user.first_name} ${user.last_name}`,
//         email: user.email,
//         age: user.age,
//         rol: rol
//     }

//     res.send({status:'success', payload: req.session.user, message:'Logueo exitoso'})
// })

router.get('/logout', logout)
export default router;