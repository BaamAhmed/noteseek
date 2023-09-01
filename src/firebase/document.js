import firebase_app from "./config";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useKeywordSearch } from '@/firebase/functions'
import { collection, addDoc, getFirestore, doc, getDoc, query, where, getDocs } from "firebase/firestore"; 

const storage = getStorage();
const db = getFirestore(firebase_app)



export const uploadDocument = async (docFile, userID) => {
    const storageRef = ref(storage, `user_uploaded_docs/${userID}_${docFile.name}`);
    
    return await uploadBytes(storageRef, docFile).then(async (snapshot) => {
        console.log('Uploaded a blob or file!');
        return await getDownloadURL(snapshot.ref).then(async (downloadURL) => {
            console.log('File available at: ' + downloadURL)
            // Call firebase function, sending this URL as a parameter
            const returned = await useKeywordSearch(downloadURL)
            console.log('Call to Functions was made')
            console.log(returned)
            return {
                docURL: downloadURL,
                docName: docFile.name,
                richData: returned.data
            }
        })
    });
}

export const addDocumentToDB = async (docData) => {
    const db = getFirestore(firebase_app)
    console.log('Doc data received in addDocumentToDB')
    console.log(docData)
    // Add a new document with a generated id.
    const docRef = await addDoc(collection(db, "user_rich_documents"), docData);
    console.log("Document written with ID: ", docRef.id);
    return docRef.id
}

export const fetchDocument = async (docID) => {

    const docRef = doc(db, "user_rich_documents", docID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        // console.log("Document data:", docSnap.data());
        return docSnap.data()
    } else {
    // docSnap.data() will be undefined in this case
        console.log("No such document!");
        return null
    }
}

export const fetchDocList = async (userID) => {

    const q = query(collection(db, "user_rich_documents"), where("userID", "==", userID));
    const querySnapshot = await getDocs(q);
    let docList = []
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        let docData = doc.data()
        docList.push({id: doc.id, title: docData.title, pages: docData.numPages})
    });
    return docList
}