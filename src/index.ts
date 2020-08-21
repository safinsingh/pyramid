import dotenv from 'dotenv'
import Discord from 'discord.js'

import { isValid } from './util'

dotenv.config()
const client = new Discord.Client()
client.login(process.env.TOKEN)

client.on('ready', () => {
  console.log('Ready!')
  client?.user?.setActivity('making sideways pyramids')
})

client.on('message', (msg) => {
  const content = msg.content.split(' ')
  const channel = msg.channel as Discord.TextChannel

  if (content[0] === '/pyramid') {
    const size = parseInt(content[1])
    const toRepeat = content.slice(2).join(' ')
    let toSend = ''

    const valid = isValid(msg)
    if (!valid.isValid) {
      msg.react(valid.reaction as Discord.EmojiResolvable)
      msg.reply(valid.error)
    }

    for (let i = 0; i <= size; i++) {
      for (let z = 0; z < i; z++) {
        toSend += `${toRepeat} `
      }
      toSend += '\n'
    }

    channel
      .send(`${toSend}`)
      .catch((err) =>
        msg.reply(
          `Nice! It looks like you've successfully hacked the Pyramid! Feel free to pen a pull request :). BTW, the error was: ${err}`
        )
      )
  }
})
