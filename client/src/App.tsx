import React, {useState} from 'react';
import './App.css';
import {useRegistrationMutation} from "./redux/authApi";

function App() {
  const [ registration ] = useRegistrationMutation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const registrationHandler = async (e: any) =>{
    e.preventDefault()
    await registration({email, password})
  }

  return (
    <div className="App">
      <form>
        <div>
          <input type="text" value={email} onChange={(e)=> setEmail(e.currentTarget.value)}/>
        </div>
        <div>
          <input type="password" value={password} onChange={(e)=> setPassword(e.currentTarget.value)}/>
        </div>
        <button onClick={registrationHandler}>Регистрация</button>
      </form>
    </div>
  );
}

export default App;
