const User = require("../models/user.js");

module.exports.renderSignupForm = (req,res)=>{
    res.render("./users/signup.ejs");
}

module.exports.signup = async (req,res)=>{
    try{
        let {username,email,password} = req.body;
        let user = {
        username : username,
        email : email,
        };
        const newUser = new User(user);
        const resgisteredUser = await User.register(newUser,password);
        req.login(resgisteredUser,(err)=>{
            if(err) {
                return next(err);
            }
            req.flash("success","Welcome to Wanderlust!");
            res.redirect("/listings");
        });
       
    } catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");

    }
    
}
module.exports.renderLoginForm = (req,res)=>{
    res.render("./users/login.ejs");
}
module.exports.login = async (req,res)=>{
    req.flash("success","Welcome Back to Wanderlust!");
    if(!res.locals.redirectUrl) {
        return res.redirect("/listings");
    }
    res.redirect(res.locals.redirectUrl);
}
module.exports.logout = (req,res,next)=>{
    req.logOut((err)=>{
        if(err){
           return next(err);
        }
        req.flash("success","You are Logged Out!");
        res.redirect("/listings");
    })
}