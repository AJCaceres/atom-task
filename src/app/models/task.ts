import firebase from 'firebase/compat/app'; // Asegúrate de importar firebase

// Definir la interfaz que extiende DocumentData
export interface Task extends firebase.firestore.DocumentData {
  id:string;
  title: string;
  description?: string;
  status: string;
  createdDate:firebase.firestore.Timestamp;
  userId:string;
}