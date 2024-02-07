import {Router} from 'express'
import userModel from '../models/user.model.js'
import { createHash, isValidPassword } from '../utils/bcrypt.js'
import passport from 'passport'

const router = Router()

router.get('/github', passport.authenticate('github',{scope:['user:email']}),async(req,res)=>{})

router.get('/githubcallback',passport.authenticate('github',{failureRedirect:'/login'}),async (req,res)=>{
    req.session.user = req.user
    res.redirect('/')
})

router.post('/register', passport.authenticate('register',{failureRedirect:'/failregister'}), async (req,res) =>{

    res.send({status:'success',msg:"User registered"})
})

router.get('/failregister', async (req,res)=>{
    console.log("Register failed")
    res.send({error:"Failed"})
})

router.post('/login', passport.authenticate('login',{failureRedirect:'/faillogin'}), async (req,res) => {
    if(!req.user) return res.status(400).send({status:'error',msg:'Invalid credentials'})
    let rol;
    if(req.user.email == "adminCoder@coder.com"){
        rol = 'admin'
    }
    else{
        rol = "user"
    }

    req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        age: req.user.age,
        email: req.user.email,
        rol: rol
    }
    res.send({status:'success', payload:req.session.user})
})

router.get('/faillogin', (req, res)=>{
    res.send({error:'Failed login'})
})


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

router.get('/logout',  (req,res)=>{
    req.session.destroy(err =>{
        if(!err) return res.status(200).send("deslogueo exitoso")
        else res.send("fallo el deslogueo")
    })
})
export default router;