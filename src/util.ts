import Discord from 'discord.js'

interface validCheck {
	isValid: boolean
	error?: string
	reaction?: Discord.EmojiResolvable
}

const willOverflow = async (msgArr: Array<string>): Promise<boolean> => {
	const iter = parseInt(msgArr[1]) + 1

	if (iter * (iter - 1) * msgArr.slice(2).join(' ').length > 1000) {
		return true
	}
	return false
}

const wordChecks = async (e: string): Promise<validCheck> => {
	let toReturn: validCheck = { isValid: true }
	if (e === '/pyramid') {
		toReturn = {
			isValid: false,
			error: 'Recursiveness is not allowed!',
			reaction: '😡',
		}
	} else if (e === '͔') {
		toReturn = {
			isValid: false,
			error: "Sorry, but that character doesn't work :(",
			reaction: '😔',
		}
	}
	return toReturn
}

export const isValid = async (msg: Discord.Message): Promise<validCheck> => {
	const msgArr = msg.content.split(' ')

	if (msgArr.length < 3) {
		return {
			isValid: false,
			error: 'Invalid command, must have at least 3 arguments!',
			reaction: '🗑️',
		}
	} else if (isNaN(parseInt(msgArr[1]))) {
		return {
			isValid: false,
			error: 'Invalid number, must be an integer!',
			reaction: '🗑️',
		}
	}

	const toReturn = (
		await Promise.all(
			msg.content
				.split(' ')
				.slice(1)
				.map((e) => wordChecks(e))
		)
	).reduce((acc, cur) => {
		return acc && cur
	})

	if (!toReturn.isValid) {
		return toReturn
	}

	if (await willOverflow(msgArr)) {
		return {
			isValid: false,
			error: 'Whoops! Looks like that exceeds the maximum characters!',
			reaction: '😔',
		}
	} else {
		return {
			isValid: true,
		}
	}
}

export const genPyramid = async (
	toRepeat: string,
	size: number
): Promise<string> => {
	let toSend = ''

	for (let i = 0; i <= size; i++) {
		for (let z = 0; z < i; z++) {
			toSend += `${toRepeat} `
		}
		toSend += '\n'
	}
	return toSend
}
