import dotenv from 'dotenv'
dotenv.config()

import Discord from 'discord.js'
const client = new Discord.Client()

client.on('ready', () => {
  console.log('Ready!')
  // eslint-disable-next-line
  client!.user!.setActivity('making sideways pyramids')
})

client.on('message', (msg) => {
  if (msg.content.startsWith('/pyramid')) {
    const channel = msg.channel as Discord.TextChannel
    const splitted = msg.content.split(' ')
    if (splitted.length < 3) {
      msg.react('🗑️')
      msg.reply('invalid length! gimme something better')
      return
    }
    let toSend = ''
    let done = false
    splitted.slice(1).forEach((e) => {
      if (e === '/pyramid') {
        msg.reply('no recursiveness :( ps. ur bad')
        done = true
      }
      if (e.includes('͔')) {
        msg.reply('sshhh we dont talk about that')
        done = true
      }
    })
    if (parseInt(splitted[1]) * splitted.slice(2).join(' ').length > 1500) {
      msg.reply('stop hacking not nice :(')
      done = true
    }
    if (done) {
      msg.react('😡')
      return
    }
    for (let i = 0; i <= parseInt(splitted[1]); i++) {
      for (let z = 0; z < i; z++) {
        toSend += `${splitted.slice(2).join(' ')} `
      }
      toSend += '\n'
    }
    const user = msg.author.tag
    channel
      .send(`${toSend}`)
      .catch((err) =>
        channel.send(
          `${user}, oops that didnt work, stop tryna break me :(\n${err}`
        )
      )
  }
})

client.login(process.env.TOKEN)
