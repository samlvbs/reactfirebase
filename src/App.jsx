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
        <h1>Adicionar usuario</h1>
        <input type="text" placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="text" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
        <button onClick={createUser}>Criar usuario</button>
        </div>
      <h2>Usuarios adicionados</h2>
      <table className="tabUsers">
        <thead>
          <tr>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Deletar</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) =>{
            return (
              <tr>
                <th>{user.name}</th>
                <th>{user.email}</th>
                <th><button className="buttonRed" onClick={() => deleteUser(user.id)}>X</button></th>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}