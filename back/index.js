// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);

let bot = {
    top: false,
    back: false,
    left: false,
    right: false,
    bip: true
}

let eyes = {
  right: true,
  left: true
};

let five = require("johnny-five");
let max_speed_l = 80;
let max_speed_r = 80;
let board = new five.Board({port: process.argv[2]});
let l_motor = r_motor = null;
/*
if (isset ($_POST['instruction'])) {
    if ($_POST['instruction'] === 'topgo') {
        bot.top = true;
        return "j'avance";
    }
    if ($_POST['instruction'] === 'topstop') {
        bot.top = false;
        return "stop";
    }
    if ($_POST['instruction'] === 'backgo') {
        bot.back = true;
        return "je recule";
    }
    if ($_POST['instruction'] === 'backstop') {
        bot.back = false;
        return "stop";
    }
    if ($_POST['instruction'] === 'leftgo') {
        bot.left = true;
        return "je tourne a gauche";
    }
    if ($_POST['instruction'] === 'leftstop') {
        bot.left = false;
        return "stop";
    }
    if ($_POST['instruction'] === 'rightgo') {
        bot.right = true;
        return "je tourne a droite";
    }
    if ($_POST['instruction'] === 'rightstop') {
        bot.right = false;
        return "stop";
    }
    if ($_POST['instruction'] === 'bipgo') {
        bot.bip = true;
        return "pouette";
    }
    if ($_POST['instruction'] === 'bipstop') {
        bot.bip = false;
        return "stop";
    }
}
*/
board.on("ready", function() {

    l_motor = new five.Motor({pins: {pwm: 6, dir: 7}});
    r_motor = new five.Motor({pins: {pwm: 5, dir: 4}});
    let piezo = new five.Piezo(8);

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
        callFunctions();
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
        callFunctions();
    });

    eyesright.enable();

});

let callFunction = function () {
    if ( verifCapteur() === true ) {
        if ( bot.top === true ) {
            top();
        } else if ( bot.top === false ) {
            stop();
        }
        if ( bot.back === true ) {
            back();
        } else if ( bot.back === false ) {
            stop();
        }
        if ( bot.left === true ) {
            left();
        } else if ( bot.left === false ) {
            stop();
        }
        if ( bot.right === true ) {
            right();
        } else if ( bot.right === false ) {
            stop();
        }
        if ( bot.bip === true ) {
            bip();
        } else if ( bot.bip === false ) {
            stop();
        }
    } else if ( verifCapteur() === false ) {
        stop();
        bip();
    }
}

let verifCapteur = function () {
    if ( eyes.left === false && eyes.right === false ) {
        return true;
    } else if ( eyes.left === true || eyes.right === true ) {
        return false;
    } 
} 

let top = function() {
    l_motor.reverse(max_speed_l);
    r_motor.forward(max_speed_r);
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