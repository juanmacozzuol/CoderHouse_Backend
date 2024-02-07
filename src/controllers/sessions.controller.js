import userModel from '../models/user.model.js'
import { createHash, isValidPassword } from '../utils/bcrypt.js'
import passport from 'passport'


export const githubAuth = () =>{ passport.authenticate('github',{scope:['user:email']}),async(req,res)=>{}}

export const githubCallback = () => {passport.authenticate('github',{failureRedirect:'/login'}),async (req,res)=>{
    req.session.user = req.user
    res.redirect('/')
}}

export const register = () => {passport.authenticate('register',{failureRedirect:'/failregister'}), async (req,res) =>{

    res.send({status:'success',msg:"User registered"})
}}

export const login = () => {passport.authenticate('login',{failureRedirect:'/faillogin'}), async (req,res) => {
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
}}

export const loginFail = (req, res)=>{
    res.send({error:'Failed login'})
}

export const logout =  (req,res)=>{
    req.session.destroy(err =>{
        if(!err) return res.status(200).send("deslogueo exitoso")
        else res.send("fallo el deslogueo")
    })
}