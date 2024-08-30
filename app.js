const express=require('express');
const app=express();
const mongoose=require('mongoose');
const path=require('path')  // for path connection
const session = require('express-session')
const flash=require('connect-flash')
const passport=require('passport');
const passportLocal=require('passport-local')
const User=require('./models/user');
const {isLoggedIn}=require('./middleware/middleware');
const EventUser=require('./models/eventReg');

const methodOverride = require('method-override');
app.use(methodOverride('_method'));
const ejsMate=require('ejs-mate');


app.set('view engine','ejs'); // setting up ejs as template
app.set('views', path.join(__dirname,'views')) // joining directory to views
app.use(express.static(path.join(__dirname,'public'))); // for static file
app.use(express.urlencoded({extended:true})); //to parse post request  html/url encoded data
app.use(express.json()); //parse post request json data
app.engine('ejs',ejsMate);

// -----------------xxx---------------xxx--------------------------xxx--------------------
const mongo_URL="mongodb://127.0.0.1:27017/techplanet";


main().then(()=>{
    console.log('conected to db');
    
})
.catch((err)=>{
    console.log(err);
    
})

async function main() {
   await mongoose.connect(mongo_URL)
    
}

// --------------------xx-----------------------xx----------------------------
const sessionOption={
    secret: 'keyboardcat',
    resave: false,
    saveUninitialized: true,
    cookie: { 
        expires:Date.now()+24*60*60*7*1000,
        maxAge:24*60*60*7*1000
     },
     httpOnly:true
  }
app.use(session(sessionOption));
app.use(flash());
app.use((req,res,next)=>{
    res.locals.successMsg=req.flash('success');
    res.locals.errorMsg=req.flash('error');
    // console.log(res.locals.successMsg);
    next()
})

app.use(passport.initialize());
app.use(passport.session());
passport.use(new passportLocal(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



// ------------------------xxxxx-------------------------------
// home route

app.get('/',(req , res)=>{
    res.render('./body/index.ejs')
})
app.get('/home',(req,res)=>{
    
    res.render('./body/index.ejs')
})
app.get('/home/admin',(req,res)=>{
    
    res.render('./body/admin.ejs')
})
app.get('/service',(req , res)=>{
    res.render('./body/service.ejs')
})

app.get('/about',(req , res)=>{
    res.render('./body/about.ejs')
})

app.get('/gallery',(req , res)=>{
    res.render('./body/gallery.ejs')
})

app.get('/price',(req , res)=>{
    res.render('./body/price.ejs')
})

app.get('/review',(req , res)=>{
    res.render('./body/review.ejs')
})

app.get('/contact',(req , res)=>{
    res.render('./body/contact.ejs')
})
// -------------------------xxx-------------------------xx

// for login route
app.get('/login',(req,res)=>{
    res.render('./body/login.ejs')
})

app.post('/login', 
    passport.authenticate('local', 
        { failureRedirect: '/login',failureFlash:true }),
(req,res)=>{
    req.flash('success',"Welcome back! You logged in")
    res.redirect('/');
})

app.get('/logout',isLoggedIn,(req,res,next)=>{
    req.logOut((err)=>{
        if(err){
            next(err)
        }
        req.flash('success',"Successfully! logged Out");
        res.redirect('/home')
    })
})

// ----------------------------xx-------------------------------xx---------------------
// for sign Up route
app.get('/signup',(req,res)=>{
    res.render('./body/signup.ejs')
})

app.post('/signup',async (req,res)=>{
    try {
     let{username,email,password}=req.body
     let newUser=new User({username,email});
     // console.log(newUser);
     let resultUser=await User.register(newUser,password);
    //  console.log(resultUser);
     
    } catch (error) {
     req.flash('error',error.message)
    return  res.redirect('/signup');
    }
     req.flash('success',"registred Successfully!");
     res.redirect('/home');
 
 })
// ------------------xx------------------------------xx----------------------
//  for payments route
app.get('/payment',isLoggedIn,(req,res)=>{
    res.render('./body/payment.ejs')
})
app.get('/payment/success',isLoggedIn,(req,res)=>{
    res.render('./body/paymentsuccess.ejs')
})
app.get('/payment/fails',isLoggedIn,(req,res)=>{
    res.render('./body/paymentfails.ejs')
})
// ----------------------xxx----------------------------xxx-------------------
// for event registration
app.get('/registration',isLoggedIn,(req,res)=>{
    res.render('./body/registration.ejs')
})
app.post('/registration',isLoggedIn,async(req,res)=>{
    try {
        let {name,email,contact}=req.body;
    let newEventUser=new EventUser({name,email,contact});
    console.log(newEventUser);
    await newEventUser.save();
    req.flash('success',"successfully registered for event")
    res.redirect('/home');
    } catch (error) {
       req.flash('error',error.message)
       res.redirect('/home');
    }
})




app.use((err,req,res,next)=>{
    console.log("-----------error------------------");
    let {status=500, message='some error occured'}=err;
    res.status(status).send(message);
    res.send(err);
    // next(err);
})


app.listen(8080,()=>{
    console.log('app is listening to port 8080');
    
})