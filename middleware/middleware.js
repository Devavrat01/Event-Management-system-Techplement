module.exports.isLoggedIn=(req,res,next)=>{
    
    if(!req.isAuthenticated()){
        req.flash('error',"Not Login! Login First");
       return  res.redirect('/login');
    }
    next();
}