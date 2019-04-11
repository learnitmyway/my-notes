// tslint:disable no-console
export function logError(message: string, backendError: Error) {
  console.error(message, backendError)
}

export function logWarning(message: string) {
  console.warn(message)
}
