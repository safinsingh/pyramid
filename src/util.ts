import Discord from 'discord.js'

interface validCheck {
  isValid: boolean
  error?: string
  reaction?: Discord.EmojiResolvable
}

const willOverflow = (msgArr: Array<string>): boolean => {
  const iter = parseInt(msgArr[1]) + 1

  if (iter * (iter - 1) * msgArr.slice(2).join(' ').length > 1000) {
    return true
  }
  return false
}

export const isValid = (msg: Discord.Message): validCheck => {
  const msgArr = msg.content.split(' ')

  if (msgArr.length < 3) {
    console.log('1')
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
  } else {
    let toReturn: validCheck = {
      isValid: true,
    }

    msg.content
      .split(' ')
      .slice(1)
      .forEach((e) => {
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
      })

    if (!toReturn.isValid) {
      return toReturn
    }

    if (willOverflow(msgArr)) {
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
}
