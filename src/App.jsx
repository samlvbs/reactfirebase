import { initializeApp} from "firebase/app"; 
import { getDocs, getFirestore, collection, addDoc, doc, deleteDoc} from "firebase/firestore"; 
import { useEffect, useState } from "react";
import './App.css'

const firebaseApp = initializeApp({
  apiKey: "AIzaSyCKmEnFL-86zHEdGfuwAcQIL6h6B86rqNQ",
  authDomain: "fir-react-e0e1b.firebaseapp.com",
  projectId: "fir-react-e0e1b",
})

export const App = () => { 
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [users, setUsers] = useState([])

  const db = getFirestore(firebaseApp)
  const userCollectionRef = collection(db, 'users')

  async function createUser(){
    const user = await addDoc(userCollectionRef, {
      name, email,
    })
  }



  useEffect(() =>{
    const getUsers = async () =>{
      const data = await getDocs(userCollectionRef)
     
      setUsers(data.docs.map((doc)=>({...doc.data(), id: doc.id })))
    }
    getUsers()
  })

  async function deleteUser(id){
    const userDoc = doc(db, 'users', id);
    await deleteDoc(userDoc)
  }

  return (
    <div className="container">
      <div className="formAddUser">
        <input type="text" placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="text" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
        <button onClick={createUser}>Criar usuario</button>
        </div>
      <ul>
        {users.map((user) => {
          return (
          <div key={user.id}>
            <li>
              {user.name}
            </li>
            <li>
              {user.email}
            </li>
            <button onClick={() => deleteUser(user.id)}>Deletar usuario</button>
          </div>
          )
          
        }) 
        }
      </ul>
    </div>
  )
}