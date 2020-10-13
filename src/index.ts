import dotenv from 'dotenv'
import Discord from 'discord.js'

import { isValid, genPyramid } from './util'

const client = new Discord.Client()

dotenv.config()
client.login(process.env.TOKEN)

client.on('ready', async () => {
	console.log('Bot is ready!')
	await client.user?.setActivity('making sideways pyramids')
})

client.on('message', async (msg) => {
	const content = msg.content.split(' ')
	const channel = msg.channel as Discord.TextChannel

	if (content[0] === '/pyramid') {
		const size = parseInt(content[1])
		const toRepeat = content.slice(2).join(' ')
		const valid = await isValid(msg)

		if (!valid.isValid) {
			msg.reply(valid.error)
			msg.react(valid.reaction as Discord.EmojiResolvable)
			return
		}

		channel
			.send(await genPyramid(toRepeat, size))
			.catch((err) =>
				msg.reply(
					`Nice! It looks like you've successfully hacked the Pyramid! Feel free to pen a pull request :). BTW, the error was: ${err}`
				)
			)
	}
})
