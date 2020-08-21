import dotenv from 'dotenv'
dotenv.config()

import Discord from 'discord.js'
const client = new Discord.Client()

client.on('ready', () => {
  console.log('Ready!')
})

client.on('message', (msg) => {
  if (
    msg.content.startsWith('/pyramid') &&
    parseInt(msg.content.split(' ')[1]) < 15
  ) {
    const channel = msg.channel as Discord.TextChannel
    let toSend = ``
    for (let i = 1; i <= parseInt(msg.content.split(' ')[1]); i++) {
      for (let z = 0; z < i; z++) {
        toSend += `${msg.content.split(' ')[2]} `
      }
      toSend += '\n'
    }
    channel.send(toSend)
  }
})

client.login(process.env.TOKEN)
