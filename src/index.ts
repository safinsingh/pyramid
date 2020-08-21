import dotenv from 'dotenv'
dotenv.config()

import Discord from 'discord.js'
const client = new Discord.Client()

client.on('ready', () => {
  console.log('Ready!')
  client!.user!.setActivity('making sideways pyramids')
})

client.on('message', (msg) => {
  if (msg.content.startsWith('/pyramid')) {
    const channel = msg.channel as Discord.TextChannel
    const splitted = msg.content.split(' ')
    if (splitted.length < 3) return
    let toSend = ''
    for (let i = 1; i <= parseInt(splitted[1]); i++) {
      for (let z = 0; z < i; z++) {
        toSend += `${splitted.slice(2).join(' ')} `
      }
      toSend += '\n'
    }
    channel.send(`${toSend}`)
  }
})

client.login(process.env.TOKEN)
