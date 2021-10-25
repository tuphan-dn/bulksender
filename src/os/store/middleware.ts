import { getDefaultMiddleware } from '@reduxjs/toolkit'

// Need it cause https://github.com/GoogleChromeLabs/jsbi/issues/30
declare global {
  interface BigInt {
    toJSON: (this: bigint) => string
  }
}
BigInt.prototype.toJSON = function () {
  return this.toString()
}

function isPlainObject(obj: object): boolean {
  if (obj === null) return false
  const proto = Object.getPrototypeOf(obj)
  return proto !== null && Object.getPrototypeOf(proto) === null
}

function isPlain(val: any): boolean {
  return (
    typeof val === 'undefined' ||
    val === null ||
    typeof val === 'string' ||
    typeof val === 'boolean' ||
    typeof val === 'number' ||
    Array.isArray(val) ||
    isPlainObject(val) ||
    typeof val === 'bigint'
  )
}

const middleware = getDefaultMiddleware({
  serializableCheck: {
    isSerializable: isPlain,
  },
})

export default middleware
