const fs = require('fs')
const {
  parsed: {
    REACT_APP_ID,
    REACT_APP_NAME,
    REACT_APP_AUTHOR_NAME,
    REACT_APP_AUTHOR_EMAIL,
    REACT_APP_TAGS,
    REACT_APP_URL,
    REACT_APP_DESCRIPTION,
  },
} = require('dotenv-cra').config()

// Color console log
const RED_BACKGROUND = '\x1b[41m'
const GREEN_TEXT = '\x1b[32m'
const BLUE_TEXT = '\x1b[34m'
const YELLOW_TEXT = '\x1b[33m'
const DEFAULT_TEXT = '\x1b[0m'

function logError(error) {
  console.log('❌❌❌', RED_BACKGROUND, error, DEFAULT_TEXT, '❌❌❌')
  console.log(
    '\n✨✨ Reference ✨✨:',
    YELLOW_TEXT,
    ' https://docs.sentre.io/senhub/dapp-information\n',
    DEFAULT_TEXT,
  )
  console.log('🌟🌟 Edit file:', BLUE_TEXT, '.env.local\n', DEFAULT_TEXT)
}

// Validate author
if (!REACT_APP_AUTHOR_NAME)
  return logError(`Invalid author name. Author name cannot be blank!`)

if (!REACT_APP_AUTHOR_EMAIL)
  return logError(`Invalid author email. Author email cannot be blank!`)

// Validate tags
if (!REACT_APP_TAGS) return logError(`Invalid tags. Tags cannot be blank!`)

// Validate description
if (!REACT_APP_DESCRIPTION)
  return logError(`Invalid description. Description cannot be blank!`)

// Validate app name
if (!REACT_APP_NAME)
  return logError(`Invalid App name. App name cannot be blank!`)

// Validate app ID
const expectedAppID = REACT_APP_NAME.toLowerCase().replace(/ /gm, '_')

if (!REACT_APP_ID) return logError(`Invalid AppID. AppID cannot be blank!`)

if (expectedAppID !== REACT_APP_ID)
  return logError(
    `Invalid AppID. AppID expected is '${expectedAppID}' with App Name '${REACT_APP_NAME}'.`,
  )

if (/\W/gm.test(REACT_APP_ID))
  return logError(`Invalid AppID. AppID can't contain any special characters.`)

if (/[A-Z]/gm.test(REACT_APP_ID))
  return logError(
    `Invalid AppID. AppID can't contain any uppercase characters.`,
  )
// Validate URL
if (!REACT_APP_URL) return logError(`Invalid Github. Github cannot be blank!`)
if (!REACT_APP_URL.endsWith(`.github.io/${REACT_APP_ID}`)) {
  return logError(
    `Invalid Github. Github should be end with '.github.io/${REACT_APP_ID}'`,
  )
}

const myApp = {
  url: `${REACT_APP_URL}/index.js`,
  appId: REACT_APP_ID,
  name: REACT_APP_NAME,
  author: {
    name: REACT_APP_AUTHOR_NAME || '',
    email: REACT_APP_AUTHOR_EMAIL || '',
  },
  tags: (REACT_APP_TAGS || '').split(','),
  description: REACT_APP_DESCRIPTION || '',
  verified: false,
}

const fileName = `${REACT_APP_ID}.manifest.json`
fs.writeFileSync(fileName, JSON.stringify(myApp, null, 2))

console.log(
  GREEN_TEXT,
  '\n👏👏 Finished build register configs. Check it out ==>',
  '\x1b[36m',
  fileName,
  '\x1b[0m\n',
)
