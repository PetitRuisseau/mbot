let eyes = {
  right: true,
  left: true
};

// Assumes the reflectance sensor is put into PORT 3

// Gives you values of the reflectance sensor.
var five = require("johnny-five");
var max_speed_l = 80;
var max_speed_r = 80;
var board = new five.Board({port: process.argv[2]});
var l_motor = r_motor = null;

board.on("ready", function() {
    l_motor = new five.Motor({pins: {pwm: 6, dir: 7}});
    r_motor = new five.Motor({pins: {pwm: 5, dir: 4}});
  // Create a new `reflectance` hardware instance.
  var eyesleft = new five.IR.Reflect.Array({
    emitter: 13,
    pins: ["A2"], // any number of pins
    freq: 100,
    autoCalibrate: true,
  });
  eyesleft.on('data', function() {
    if( this.values == 0 ) {
      eyes.left = false;
    } else {
      eyes.left = true;
    }
    console.log(eyes.left);
    run();
  });

  eyesleft.enable();

  var eyesright = new five.IR.Reflect.Array({
    emitter: 13,
    pins: ["A3"], // any number of pins
    freq: 10,
    autoCalibrate: true,
  });
  eyesright.on('data', function() {
    if( this.values == 0 ) {
      eyes.right = false;
    } else {
      eyes.right = true;
    }
    console.log(eyes.right)
    run();
  });

  eyesright.enable();
});

let run = function () {
   if ( eyes.left === false && eyes.right === false ) {
    l_motor.reverse(max_speed_l);
    r_motor.forward(max_speed_r);
  } else if ( eyes.left === false && eyes.right === true ) {
    l_motor.stop();
    r_motor.forward(max_speed_r);
  } else if ( eyes.left === true && eyes.right === false ) {
    l_motor.reverse(max_speed_l);
    r_motor.stop();
  }
} 