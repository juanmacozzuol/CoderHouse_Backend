import {Router} from 'express'
import { register, login, githubAuth, githubCallback, registerGithub, loginGithub, loginFail, logout } from '../controllers/sessions.controller.js'

const router = Router()

router.get('/github', githubAuth)

router.get('/githubcallback', githubCallback)

router.post('/registerGithub', registerGithub)

router.get('/failregister', async (req,res)=>{
    console.log("Register failed")
    res.send({error:"Failed"})
})

router.post('/loginGithub', loginGithub)

router.get('/faillogin', loginFail)


router.post('/register', register)

router.post('/login', login)

router.get('/logout', logout)

export default router;