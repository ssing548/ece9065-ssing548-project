 const passport = require("passport");
 const jwtStarategy = require("passport-jwt").Strategy;
 const LocalStarategy = require("passport-local").Strategy;
 const GooglePlusTokenStarategy = require("passport-google-plus-token");
 const FacebookTokenStarategy = require("passport-facebook-token");
 const {ExtractJwt} = require("passport-jwt");
 const keys = require ("./keys");
 const User  = require("../models/user");


// const User  = require("../models/user");

 passport.use(new jwtStarategy({
    jwtFromRequest:ExtractJwt.fromHeader('authorization'),
    secretOrKey: keys.jwt.secret
    },(payLoad,done)=>{
    try {
        //find user in token
        console.log("validating");
        const user = User.findById(payLoad.sub);
        //if user doesnt exist, handle it
        
        if(!user){
            return done(null,false);
        }
        
        //otherwise return user
        done(null,user);
    } catch (error) {
        console.log("validating");
        done(error,false);
    }

 }));




passport.use('facebookToken',new FacebookTokenStarategy({
    clientID : keys.facebook.clientID,
    clientSecret : keys.facebook.clientSecret
},  (accessToken,refreshToken,profile,done)=>{
    try {
        console.log("accessToken"+accessToken);
        console.log("refreshToken"+refreshToken);
        console.log("profilep"+profile.emails[0].value);


        const existingUser =  User.findOne({"facebook.id": profile.id}).then((res)=>{

            if(res){
                console.log("user exists in db");
                return done(null,res);
            }
           
               //if new account
        console.log("user doesnt exists in db, creating");
        const newUser = new User({
            method:'facebook',
            facebook:{
                id:profile.id,
                email:profile.emails[0].value,
                name:profile.name.givenName
            }
        });
    
      newUser.save().then((res)=>{
      console.log("inside");
      if(res) {
         done(null, res);
      }
       
       }).catch((err)=>{
           console.log("promise error"+err);
       }
       );

        }).catch((err)=>{
            console.log("Promise rejected"+err);
        });
        
    
     
        // if successful, return the new user
       
       
     
    } catch (error) {
        console.log("got in eror");
        done(error,false,error.message);
        next(err);
    }


}));
















 passport.use('googleToken',new GooglePlusTokenStarategy({
    clientID : keys.google.clientID,
    clientSecret : keys.google.clientSecret
 },async (accessToken,refreshToken,profile,done)=>{

    try {
        console.log("accessToken"+accessToken);
        console.log("refreshToken"+refreshToken);
        console.log("profile"+profile);

    //check if user exists
    const existingUser = await User.findOne({"google.id": profile.id});
    if(existingUser){
        console.log("user exists in db");
        return done(null,existingUser);
    }
   

    //if new account
    console.log("user doesnt exists in db, creating");
    const newUser = new User({
        method:'google',
        google:{
            id:profile.id,
            email:profile.emails[0].value
        }
    });

    await newUser.save();
    done(null,newUser);


    } catch (error) {
        done(error,false,error.message);
    }

 }));




 passport.use('local',new LocalStarategy({
    usernameField: 'email'
 },async (email,password,done)=>{

    try {
         //find user given mail
         const user = await User.findOne({"local.email":email});

         //if not handle it
         if(!user)
         return done(null,false);
 
         //if foound check if coredct password
         //console.log("user is " + user);
         const isMatch = await user.isValidPassword(password);
         //if not handle it
         console.log(isMatch);
         if(!isMatch){
             return done(null,false);
         }
 
         //otherwise return user
         done(null,user);
    } catch (error) {
        done(error,false);
    }
       
 }));

// passport.serializeUser((user,done)=>{
//     done(null,user.id);
// });

// passport.deserializeUser((id,done)=>{
//     User.findById(id).then((user)=>{
//         done(null,user);
//     })
    
// });


// passport.use(new GoogleStrategy({
//     //options for google starategy
//     callbackURL: '/auth/google/redirect',
//     clientID : keys.google.clientID,
//     clientSecret : keys.google.clientSecret
// },(accessToken,refreshToken,profile,done)=>{
//    User.findOne({googleId:profile.id}).then((currentUser)=>{
//         if(currentUser){
//             console.log("user is:"+currentUser);
//             done(null,currentUser);

//         }else{
//             new User({
//                 username: profile.displayName,
//                 googleId: profile.id
//             }).save().then((newUser)=>{
//                 console.log("new user created : "+newUser);
//                 done(null,newUser);
//             });

//         }
//    })  
// })
// )