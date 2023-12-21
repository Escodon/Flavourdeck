/**
 * The default log function for the API.
 * Will only log if the environment variable DEV is set to true.
 * @param message The message to log
 * @param funcName The name of the function calling this
 * @returns {void}
 */
export default function log(message: string, funcName: string) {
  console.log(`[FD] ${funcName}: ${message}`)
}

