//IMPORTING PACKAGES
const express = require('express'); //returns a func 
const morgan = require('morgan')
const moviesRouter = require('./Routers/moviesRouters');
const authRouter = require('./Routers/authRouter')
const CustomError = require('./Utils/CustomError');
const globalErrorHandler = require('./controllers/errorController')


let app = express(); //returns obj
app.use(express.json()); 
app.use(express.static('./public'))

//USING ROUTES
app.use('/api/v1/movies',moviesRouter)
app.use('/api/v1/users',authRouter);

app.all('*',(req,res,next)=>{        //DEFAULT ROUTE
      // res.status(400).json({
      //   status:'fail',
      //   message:`cant find ${req.originalUrl} not found on server`
      // })
//      const err = new Error(`cant find ${req.originalUrl} not found on server`);
//      err.status='fail'
//      err.statusCode=404

      // using cusomError class to catch the error
      const err = new CustomError(`cant find ${req.originalUrl} not found on server`,404);
      next(err);
})
 // GLOBAL ERROR HANDLING ROUTE

 app.use(globalErrorHandler);
    
module.exports = app;
// const logger = function(req,res,next){
//   console.log('middleware called');
//   next()
// }

// app.use(express.json())//middleware //it uses () bcoz this is not the middleware func it return sthe middleware func
// if(process.NODE_ENV === 'development'){
// app.use(morgan("dev"))
// }
 //logger is the actual middleware func so it does not contain ()

// app.use((req,res,next)=>{
//      req.requestedAt = new Date(). toISOString();
//      next()
// })