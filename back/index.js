// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express

var bodyParser = require('body-parser');
var multer = require('multer'); // v1.0.5
var upload = multer(); // for parsing multipart/form-data

var port = process.env.PORT || 8080;        // set our port
app.use(express.static('front'));

app.get('/', function(req, res) {
    res.redirect('/index.html');
});

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.post('/back', function (req, res, next) {
    res.json(req.body.instruction);
    switch (req.body.instruction) {
        case 'btn_topgo':
            bot.top = true;
            break;
        case 'btn_topstop':
            bot.top = false;
            break;
        case 'btn_backgo':
            bot.back = true;
            break;
        case 'btn_backstop':
            bot.back = false;
            break;
        case 'btn_leftgo':
            bot.left = true;
            break;
        case 'btn_leftstop':
            bot.left = false;
            break;
        case 'btn_rightgo':
            bot.right = true;
            break;
        case 'btn_rightstop':
            bot.right = false;
            break;
        case 'btn_bipgo':
            bot.bip = true;
            break;
        case 'btn_bipstop':
            bot.bip = false;
            break;
    }

    if ( eyes.right === true && eyes.left === true ) {
        if ( eyes.right === true && eyes.left === true ) {
        if ( bot.top === true ) {
            top();
        } 
        if ( bot.back === true ) {
            back();
        } 
        if ( bot.left === true ) {
            left();
        } 
        if ( bot.right === true ) {
            right();
        } 
        if ( bot.bip === true ) {
            bip();
        }
        if ( bot.top === false && bot.right === false && bot.left === false && bot.back === false ) {
            stop();
        }
    }
    } else {
        bip();
        stop();
    }
});

app.use(function(req, res) {
  res.status(404).sendFile(__dirname + '/404.html');
});

// START THE SERVER
app.listen(port);

let bot = {
    top: false,
    back: false,
    left: false,
    right: false,
    bip: false
}

let eyes = {
  right: false,
  left: true
};

let five = require("johnny-five");
let max_speed_l = 150;
let max_speed_r = 140;
let board = new five.Board({port: process.argv[2]});
let l_motor = r_motor = piezo = null;

board.on("ready", function() {

    l_motor = new five.Motor({pins: {pwm: 6, dir: 7}});
    r_motor = new five.Motor({pins: {pwm: 5, dir: 4}});
    piezo = new five.Piezo(8);

    let eyesleft = new five.IR.Reflect.Array({
        emitter: 13,
        pins: ["A2"],
        freq: 100,
        autoCalibrate: true,
    });

    eyesleft.on('data', function() {
        if ( this.values == 0 ) {
            eyes.left = false;
        } else {
            eyes.left = true;
        }
    });

    eyesleft.enable();

    let eyesright = new five.IR.Reflect.Array({
        emitter: 13,
        pins: ["A3"],
        freq: 10,
        autoCalibrate: true,
    });

    eyesright.on('data', function() {
        if( this.values == 0 ) {
            eyes.right = false;
        } else {
            eyes.right = true;
        }
    });

    eyesright.enable();
    
});

let top = function() {
    l_motor.reverse(150);
    r_motor.forward(140);
    console.log('ok');
}

let back = function() {
    l_motor.forward(max_speed_l);
    r_motor.reverse(max_speed_r);
}

let left = function() {
    l_motor.reverse(max_speed_l);
    r_motor.reverse(max_speed_r);
}

let right = function() {
    l_motor.forward(max_speed_l);
    r_motor.forward(max_speed_r);
}

let bip = function() {
    piezo.play({
        song: [
            ["C4", 1 / 4],
            ["D4", 1 / 4]
        ],
        tempo: 200
    });
}

let stop = function() {
    l_motor.stop();
    r_motor.stop();
}