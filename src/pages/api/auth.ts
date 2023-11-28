export default async function checkAuthKey(key: string) {
    if (process.env.DEV == "true") {
        return true;
    } else {
        return false; //@vbf <-------
    }
    
}