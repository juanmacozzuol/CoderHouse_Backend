import passport from "passport";
import local from 'passport-local'
import userModel from "../models/user.model.js";
import { createHash, isValidPassword } from "../utils/bcrypt.js";
import GitHubStrategy from 'passport-github2'
import 'dotenv/config' 
import { access } from "fs";
const LocalStrategy = local.Strategy

const initializePassport = () =>{

    passport.use('register',new LocalStrategy(
        {passReqToCallback:true, usernameField:'email'}, async (req,username,password,done)=>{
            const {first_name, last_name, email, age} = req.body
            try{
                let user = await userModel.findOne({email:username})
                if(user){
                    console.log("User already exists")
                    return done(null,false);
                }
                const newUser = {
                    first_name,
                    last_name,
                    email,
                    age,
                    password : createHash(password)
                }
                let result = await userModel.create(newUser);
                return done(null, result)
            }catch(error){
                return done('Error al obtener el usuario: ' + error)
            }

        }
    ))

    passport.use('login', new LocalStrategy({usernameField:'email'}, async (username,password,done)=>{
        try{
            const user = await userModel.findOne({email:username})
            if(!user){
                console.log("User doesn't exists")
                return done(null, false)
            }
            if(!isValidPassword(user,password)) return done (null, false)
            return done(null, user)
        }
        catch(error){
            return done(error)

        }
    }))

    passport.use('github', new GitHubStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: 'http://localhost:8080/api/sessions/githubcallback'
    }, async(accessToken, refreshToken, profile, done) =>{
        try{
            console.log(profile)
            let user = await userModel.findOne({email:profile._json.email})
            if(!user){
                let newUser = {
                    first_name: profile._json.name,
                    last_name: '',
                    age: 31,
                    email: profile._json.email,
                    password:""
                }
                let result = await userModel.create(newUser)
                return done(null, result)
            }
            else{
                return done(null, user)
            }

        }
        catch(error){
            return done(error)

        }
    }
    ))

    passport.serializeUser((user, done)=>{
        done(null, user._id)
    })

    passport.deserializeUser(async (id, done)=>{
        let user = await userModel.findById(id)
        done(null, user)
    })
}

export default initializePassport;