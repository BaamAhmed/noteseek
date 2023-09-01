import firebase_app from "./config";
import { getFunctions, httpsCallable } from 'firebase/functions'

const functions = getFunctions(firebase_app)
const keywordSearch = httpsCallable(functions, 'keyword_search');
export const useKeywordSearch = async (fileURL) => {
    return await keywordSearch({fileURL: fileURL}).then((response) => {
        return response
    }).catch((err) => console.log(err))
    
}   
