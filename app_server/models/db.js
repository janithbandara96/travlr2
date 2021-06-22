const mongoose = require('mongoose');
const host = process.env.DB_HOST || '127.0.0.1'
const dbURI = 'mongodb://localhost:27017/travlr'; //'mongodb://${host}/travlr';
const readLine = require('readline');

// avoid 'current Server Discovery and Monitoring engine is depricated'
mongoose.set('useUnifiedTopology', true);

const connect = () => {
    setTimeout(() => mongoose.connect(dbURI, {
        useNewUrlPaser: true,
        useCreateIndex: true
    }), 1000);
}

mongoose.connection.on('connected',() =>{
    console.log(`Mongoose connected to ${dbURI}`);
});

mongoose.connection.on('error',err =>{
    console.log(`Mongoose connection error: ${err}`);
});

mongoose.connection.on('disconnected',() =>{
    console.log('Mongoose disconnected');
});

if(process.platform=='win32'){
    var rl = readLine.createInterface ({
        input: process.stdin,
        output: process.stdout
    });
    rl.on ("SIGINT", function (){
        process.emit ("SIGINT");
    });
}
const gracefulShutdown=(msg,callback) =>{
    mongoose.connection.close(function () {
        console.log('Mongoose disconnected through ' + msg);
        callback();
    });
};

//for nodemon restarts
process.once('SIGUSR2',() =>{ 
    gracefulShutdown('nodemon restart', function () {
        process.kill(process.pid, 'SIGUSR2');
    }); 
})
//for app termination
process.on('SIGINT',() =>{
    gracefulShutdown('app termination', function () {
        process.exit(0);
    });  
})
//for Heroku app termination
process.on('SIGTERM',() =>{  
    gracefulShutdown('Heroku app shutdown', function () {
        process.exit(0);
    });
})

connect();

//bring in the Mongoose schema
require('./travlr');