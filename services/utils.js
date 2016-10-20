var fs = require('fs');
var pixiLib = require('pixi-lib');

var SPRITE_MC = pixiLib.types.SPRITE_MC;
var SPRITE_SP = pixiLib.types.SPRITE_SP;
var SPRITE_IM = pixiLib.types.SPRITE_IM;

function mkdirIfNotExists(dir,cb) {
  fs.exists(dir, function (exists) {
    if(!exists){
      fs.mkdir(dir, function () {
        cb && cb();
      });
    }
    cb && cb();
  });
};

function spriteTypeFn(type) {
  var map = {
    'image':'getIm',
    'movieClip':'getMc',
    [SPRITE_IM]:'getIm',
    [SPRITE_MC]:'getMc',
    [SPRITE_SP]:'getSp',
  };

  return map[type];
};

var encode = (text) => {
  var key = 'magical_pixi_'
  var crypto = require('crypto');
  return crypto.createHash('md5').update(text + key).digest('hex');
}

module.exports = {
  mkdirIfNotExists,
  spriteTypeFn,
  encode
};
