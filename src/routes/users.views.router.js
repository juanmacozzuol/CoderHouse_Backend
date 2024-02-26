import {Router } from 'express'
import UserDto from '../services/DTOs/user.dto.js'; 
const router = Router();

router.get("/login", (req,res)=>{
    res.render('login')
})

router.get("/register", (req,res)=>{
    res.render('register')
})

router.get("/current", (req,res)=>{
    res.render('profile', {user:new UserDto(req.session.user)})
})

export default router

