const express = require('express')
const next = require('next')
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
let bodyParser = require('body-parser')

const alexaRequestVerifier = require('./Auth/alexaRequestVerifier')
const greetings = require('./Command/greetings')
const response = require('./Common/response')
const Constant = require('./Common/constants')
app
  .prepare()
  .then(() => {
    const server = express()
    server.use(bodyParser.json({
      verify: function getRawBody(req, res, buf) {
        req.rawBody = buf.toString();
      }
    }));

    server.get('/p/:id', (req, res) => {
      const actualPage = '/post'
      const queryParams = { title: req.params.id }
      app.render(req, res, actualPage, queryParams)
    })

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(3000, err => {
      if (err) throw err
      console.log('> Ready on http://localhost:3000')
    })
    server.post('/beer', alexaRequestVerifier.requestVerifier, function (req, res) {
      console.log('req.body.request', req.body.request)
      if (req.body.request.type === 'LaunchRequest') {

        res.json(greetings.getInitialGreetings());
      }
      else if (req.body.request.type === 'SessionEndedRequest') {
        log("Session End")
      } else if (req.body.request.type === 'IntentRequest') {
        switch (req.body.request.intent.name) {
          case 'GetClosingTime':
            res.json(greetings.getClosingTime());
            break;
          case 'GetPriceOfBeer':
            res.json(greetings.getPriceOfBeer(req.body.request.intent));
            break;
          case 'AMAZON.YesIntent':
            res.json(getNewHero());
            break;
          case 'AMAZON.NoIntent':
            res.json(stopAndExit());
            break;
          case 'AMAZON.HelpIntent':
            res.json(help());
            break;
          default:
            res.json(greetings.getInitialGreetings());
        }
      }
    });
  })
  .catch(ex => {
    console.error(ex.stack)
    process.exit(1)
  })



function log() {
  if (true) {
    console.log.apply(console, arguments);
  }
}



function handleDataMissing() {
  return buildResponse(Constant.MISSING_DETAILS, true, null)
}

function stopAndExit() {

  const speechOutput = Constant.STOP_MESSAGE
  var jsonObj = buildResponse(speechOutput, true, "");
  return jsonObj;
}

function help() {

  const speechOutput = Constant.HELP_MESSAGE
  const reprompt = Constant.HELP_REPROMPT
  var jsonObj = response.buildResponseWithRepromt(speechOutput, false, "", reprompt);

  return jsonObj;
}



function buildResponse(speechText, shouldEndSession, cardText) {

  const speechOutput = "<speak>" + speechText + "</speak>"
  var jsonObj = {
    "version": "1.0",
    "response": {
      "shouldEndSession": shouldEndSession,
      "outputSpeech": {
        "type": "SSML",
        "ssml": speechOutput
      }
    },
    "card": {
      "type": "Simple",
      "title": Constant.SKILL_NAME,
      "content": cardText,
      "text": cardText
    },
  }
  return jsonObj
}