import React from "react";
import './App.css';
import AuthForm from "./AuthForm";
import RegForm from "./RegForm";
import PageNotFound from "./PageNotFound";
import TodoLists from "./TodoLists";
import SetName from "./SetName";
import {BrowserRouter, Routes, Route, Link, Navigate} from 'react-router-dom';

/*const IP = 'http://25.23.9.220:8000';*/
const IP = 'https://a029-80-246-81-211.ngrok-free.app'
let userToken
export { IP, userToken };

function App() {

    const mainPage = 'lists';

  return (
      <BrowserRouter>
          <Routes>
              <Route path='' element={<Navigate to={mainPage}/>} />
              <Route path='*' element={<PageNotFound />} />
              <Route path='lists' element={<TodoLists />} />
              <Route path='sign-up' element={<RegForm />} />
              <Route path='sign-up/set-name' element={<SetName />}/>
              <Route path='sign-in' element={<AuthForm />} />
          </Routes>
      </BrowserRouter>
  );
}

export default App;
