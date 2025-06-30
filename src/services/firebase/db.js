import { db } from "./config";
import { 
    collection, 
    getDocs, 
    addDoc, 
    updateDoc, 
    deleteDoc, 
    doc, 
    query, 
    where, 
    getDoc, 
    serverTimestamp,
    orderBy,
    limit,
    startAfter
} from "firebase/firestore";


export const addDocument = async (collectionName, data) => {
    try {
        const docRef = await addDoc(collection(db, collectionName), {...data, createdAt: serverTimestamp()});
        return {
            success: true,
            id: docRef.id,
            message: "Details submitted successfully"
        };
    } catch (error) {
        console.error("Error adding document: ", error);
        return {
            success: false,
            message: error.message
        };
    }
}



//Getting document
// Getting documents with cursor-based pagination and custom queries
export const getDocuments = async (
    collectionName, 
    userId = null, 
    lastDoc = null, 
    pageSize = 5, 
    whereConditions = [],
    orderByField = 'createdAt',
    orderByDirection = 'desc'
) => {
    try {
        const collectionRef = collection(db, collectionName);
        let q = query(collectionRef);

        // Apply userId filter if provided
        if (userId) {
            q = query(q, where("userId", "==", userId));
        }

        // Apply additional where conditions
        whereConditions.forEach(condition => {
            const { field, operator, value } = condition;
            q = query(q, where(field, operator, value));
        });

        // Apply ordering
        q = query(q, orderBy(orderByField, orderByDirection));

        // Apply pagination
        if (lastDoc) {
            q = query(q, startAfter(lastDoc));
        }

        q = query(q, limit(pageSize));

        const querySnapshot = await getDocs(q);
        
        if (querySnapshot.empty) {
            return {
                success: true,
                data: [],
                hasMore: false,
                lastDoc: null
            };
        }

        const documents = querySnapshot.docs.map(doc => ({ 
            id: doc.id, 
            ...doc.data() 
        }));

        const hasMore = querySnapshot.docs.length === pageSize;
        const newLastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];

        return {
            success: true,
            data: documents,
            hasMore,
            lastDoc: newLastDoc
        };
    } catch (error) {
        console.error("Error getting documents: ", error);
        return {
            success: false,
            message: error.message
        };
    }
}




export const updateDocument = async (collectionName, docId, data) => {
    try {
        const docRef = doc(db, collectionName, docId);
        await updateDoc(docRef, {...data, updatedAt: serverTimestamp()});
        return {
            success: true,
            message: "Document updated successfully"
        };
    } catch (error) {
        console.error("Error updating document: ", error);
        return {
            success: false,
            message: error.message
        };
    }
}



export const deleteDocument = async (collectionName, docId) => {
  try {
    const docRef = doc(db, collectionName, docId);
    await deleteDoc(docRef);
    return {
      success: true,
      message: "Document deleted successfully",
    };
  } catch (error) {
    console.error("Error deleting document: ", error);
    return {
      success: false,
      message: error.message,
    };
  }
};
