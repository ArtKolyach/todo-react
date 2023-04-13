import React from "react";
import './App.css';
import AuthForm from "./AuthForm";
import RegForm from "./RegForm";
import PageNotFound from "./PageNotFound";
import TodoLists from "./TodoLists";
import {BrowserRouter, Routes, Route, Link, Navigate} from 'react-router-dom';

function App() {

    const mainPage = 'lists';

  return (
      <BrowserRouter>
          <Routes>
              <Route path='' element={<Navigate to={mainPage}/>} />
              <Route path='*' element={<PageNotFound />} />
              <Route path='lists' element={<TodoLists />} />
              <Route path='sign-up' element={<RegForm />} />
              <Route path='sign-in' element={<AuthForm />} />
          </Routes>
      </BrowserRouter>
  );
}

export default App;
