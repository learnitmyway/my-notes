interface ErrorObject {
  error?: Error
  description?: string
  errorInfo?: string
}
export function logError(errorObject: ErrorObject) {
  console.error(errorObject)
}

export function logWarning(message: string) {
  console.warn(message)
}
