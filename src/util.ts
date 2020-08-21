import Discord from 'discord.js'

interface validCheck {
  isValid: boolean
  error?: string
  reaction?: Discord.EmojiResolvable
}

const willNotOverflow = (msg: Discord.Message): boolean => {
  const arr = msg.content.split(' ')
  const iter = parseInt(arr[1]) + 1

  if (iter * arr.slice(2).join(' ').length > 1000) {
    return false
  }
  return true
}

export const isValid = (msg: Discord.Message): validCheck => {
  if (msg.content.length < 3) {
    return {
      isValid: false,
      error: 'Invalid command, must have at least 3 arguments!',
      reaction: '🗑️',
    }
  } else {
    msg.content
      .split(' ')
      .slice(1)
      .forEach((e) => {
        const overflow = willNotOverflow(msg)
        switch (e) {
          case '/pyramid':
            return {
              isValid: true,
              error: 'Recursiveness is not allowed!',
              reaction: '😡',
            }
            break
          case '͔':
            return {
              isValid: false,
              error: "Sorry, but that character doesn't work :(",
              reaction: '😔',
            }
          default:
            return {
              isValid: overflow,
              error:
                overflow &&
                'Whoops! Looks like that exceeds the maximum characters!',
              reaction: overflow && '😔',
            }
        }
      })
  }
  return {
    isValid: false,
  }
}
