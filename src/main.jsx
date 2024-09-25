
import { StrictMode } from 'react';
import Context, {AuthContext} from './store/authContext';
import App from './App'
import { createRoot } from 'react-dom/client'
import fireBaseContext from "./store/firebaseContext"
import  firebaseConfig  from './firebase/config'; 
import Post from './store/viewContext';




createRoot(document.getElementById('root')).render(
  <StrictMode>  
    <fireBaseContext.Provider value={{firebase :firebaseConfig}}>
      <Context>  
       <Post>   
      <App/>
      </Post>
      </Context>
    </fireBaseContext.Provider>
    </StrictMode>
  );

