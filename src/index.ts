import dotenv from 'dotenv'
import Discord from 'discord.js'

import { isValid, genPyramid } from './util'

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

    const valid = isValid(msg)
    if (!valid.isValid) {
      msg.reply(valid.error)
      msg.react(valid.reaction as Discord.EmojiResolvable)
      return
    }

    const toSend = genPyramid(toRepeat, size)

    channel
      .send(toSend)
      .catch((err) =>
        msg.reply(
          `Nice! It looks like you've successfully hacked the Pyramid! Feel free to pen a pull request :). BTW, the error was: ${err}`
        )
      )
  }
})
