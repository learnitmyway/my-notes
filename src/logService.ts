interface ErrorObject {
  error?: Error
  description?: string
  detials?: string
}
// tslint:disable no-console
export function logError(errorObject: ErrorObject) {
  console.error(errorObject)
}

export function logWarning(message: string) {
  console.warn(message)
}
