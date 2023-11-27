export default function log(message: string, funcName: string) {
    if (process.env.DEV === 'true') {
  console.log(`[API] ${funcName}: ${message}`)
    } else return
}