import { serveStatic } from '@hono/node-server/serve-static'
import { Button, Frog, TextInput } from 'frog'
import { devtools } from 'frog/dev'
// import { neynar } from 'frog/hubs'
import chatFLockBot from './api/flock-api'

export const app = new Frog({
  // Supply a Hub to enable frame verification.
  // hub: neynar({ apiKey: 'NEYNAR_FROG_FM' })
})

app.use('/*', serveStatic({ root: './public' }))

app.frame('/', async (c) => {
  const { buttonValue, inputText, status } = c
  const prompt = inputText
  const modelId = buttonValue

  let response;

  if (prompt == undefined || modelId == undefined) {
    response = "Detail not satisfied, please insert prompt";
  } else {
    try {
      response = await chatFLockBot(prompt, modelId);

    } catch (e) {
      response = "There is somthing wrong with the process, please try again"
    }
  }


  return c.res({
    image: (
      <div
        style={{
          alignItems: 'center',
          background: 'black',
          backgroundSize: '100% 100%',
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'nowrap',
          height: '100%',
          justifyContent: 'center',
          textAlign: 'center',
          width: '100%',
        }}
      >
        <div
          style={{
            color: 'white',
            fontSize: 24,
            fontStyle: 'normal',
            letterSpacing: '-0.025em',
            lineHeight: 1.4,
            marginTop: 30,
            padding: '0 120px',
            whiteSpace: 'pre-wrap',
          }}
        >
          {status === 'response' && `Your question is: ${prompt}`}
        </div>
        <div
          style={{
            color: 'white',
            fontSize: status === 'response' ? 16 : 60,
            fontStyle: 'normal',
            letterSpacing: '-0.025em',
            lineHeight: 1.4,
            marginTop: 30,
            padding: '0 120px',
            whiteSpace: 'pre-wrap',
          }}
        >
          {status === 'response' ? response.answer : "Lets chat about FLock!"}
        </div>
      </div>
    ),
    intents: [
      <TextInput placeholder="Enter Prompt about FLock" />,
      <Button value={process.env.FLOCK_BOT_ID}>Lets Chat!</Button>,
      status === 'response' && <Button.Reset>Reset</Button.Reset>,
    ],
  })
})

devtools(app, { serveStatic })
