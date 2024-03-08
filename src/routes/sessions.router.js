import {Router} from 'express'
import { register, login, githubAuth, githubCallback, registerGithub, loginGithub, loginFail, logout, loggerTest } from '../controllers/sessions.controller.js'

const router = Router()

router.get('/github', githubAuth)

router.get('/githubcallback', githubCallback)

router.post('/registerGithub', registerGithub)

router.get('/failregister', async (req,res)=>{
    req.logger.error("Register failed")
    req.logger.http(`${req.url}`)

    res.send({error:"Failed"})
})

router.post('/loginGithub', loginGithub)

router.get('/faillogin', loginFail)


router.post('/register', register)

router.post('/login', login)

router.get('/logout', logout)

router.get('/loggerTest', loggerTest)

export default router;