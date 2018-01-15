import { randomBytes } from 'crypto'

export default function id () {
  return randomBytes(8).toString('hex')
}
