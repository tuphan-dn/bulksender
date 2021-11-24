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

const fileName = `${REACT_APP_ID}.json`
fs.writeFileSync(fileName, JSON.stringify(myApp, null, 2))

console.log(
  '\x1b[33m',
  '\n👏👏👏 Finished build register file. Check it out-->',
  '\x1b[36m',
  fileName,
  '\x1b[0m\n',
)
