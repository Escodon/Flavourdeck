import { getDownloadURL, getStorage, ref, uploadString } from "firebase/storage";
import { app } from "../firebase";


const storage = getStorage(app);

export async function getIcon(UserID: string) {
    let iconRef = ref(storage,  "icons/"+UserID + ".png");
    let url = await getDownloadURL(iconRef);
    return url;
}

export async function setIcon(UserID: string, icon: string) {
    let iconRef = ref(storage,  "icons/"+UserID + ".png");
    let res = await uploadString(iconRef, icon, 'data_url');
    return res;
}

