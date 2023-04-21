import React from "react";
import './App.css';
import AuthForm from "./pages/AuthForm/AuthForm";
import RegForm from "./pages/RegForm/RegForm";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import {TodoLists} from "./pages/TodoLists/TodoLists";
import NameForm from "./pages/NameForm/NameForm";
import {BrowserRouter, Routes, Route, Link, Navigate} from 'react-router-dom';

// const IP = 'https://d3a0-80-246-81-201.ngrok-free.app'
const IP = 'http://localhost:8000'

const NGROK_TOKEN = {'ngrok-skip-browser-warning': 1}
const config = {
    headers: {
        'ngrok-skip-browser-warning': 1
    },
};
const tryRequest = (requestFunc) =>{
    try {
        requestFunc()
    } catch (error) {
        return 'Ошибка соединения'
    }
}
export { IP, NGROK_TOKEN, config, tryRequest };

function App() {

    const mainPage = 'lists';

  return (
      <BrowserRouter>
          <Routes>
              <Route path='' element={<Navigate to={mainPage}/>} />
              <Route path='*' element={<PageNotFound />} />
              <Route path='lists' element={<TodoLists />} />
              <Route path='sign-up' element={<RegForm />} />
              <Route path='sign-up/set-name' element={<NameForm />}/>
              <Route path='sign-in' element={<AuthForm />} />
          </Routes>
      </BrowserRouter>
  );
}

export default App;
