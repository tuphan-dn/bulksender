import Gun from 'gun'

export const db = Gun({ peers: ['https://gun-manhattan.herokuapp.com/gun'] })

export const TOPIC = 'ANH_EM_767'
