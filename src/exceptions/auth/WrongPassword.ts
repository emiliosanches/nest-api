export class WrongPassword extends Error {
  constructor(message: string) {
    super(message)
  }
}
