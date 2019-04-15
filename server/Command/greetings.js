const Response = require('../Common/response')
const Constant = require('../Common/constants')

exports.getClosingTime = function () {

  var welcomeSpeechOutput = 'Hey Bro," />'
  const tempOutput = Constant.WHISPER + welcomeSpeechOutput + Constant.CLOSING_TIME + Constant.PAUSE;
  const speechOutput = welcomeSpeechOutput + tempOutput + Constant.MORE_MESSAGE
  const more = Constant.MORE_MESSAGE

  return Response.buildResponseWithRepromt(speechOutput, false, '', more);
}

exports.getInitialGreetings = function () {

  var welcomeSpeechOutput = 'Hey buddy How are you?"<break time="0.3s" />'
  const tempOutput = Constant.WHISPER + welcomeSpeechOutput + Constant.PAUSE;
  const speechOutput = tempOutput + Constant.MORE_MESSAGE;
  const more = Constant.MORE_MESSAGE

  return Response.buildResponseWithRepromt(speechOutput, false, '', more);
}
exports.getPriceOfBeer = function (intent) {
  var welcomeSpeechOutput = 'Price of beer ' + intent.slots.beer.value + ' is 300Rs'
  const tempOutput = Constant.WHISPER + welcomeSpeechOutput + Constant.PAUSE;
  const speechOutput = tempOutput + Constant.MORE_MESSAGE;
  const more = speechOutput

  return Response.buildResponseWithRepromt(speechOutput, false, '', more);
}