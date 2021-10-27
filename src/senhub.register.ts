export type ComponentManifest = {
  url: string
  appId: string
  name: string
}

export type SenHubRegister = Record<string, ComponentManifest>

const register: SenHubRegister = {
  [process.env.REACT_APP_ID as string]: {
    url: `${process.env.REACT_APP_URL}/index.js`,
    appId: process.env.REACT_APP_ID as string,
    name: 'My App',
  },
}

export default register
