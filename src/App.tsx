import React, { useEffect, useState } from 'react';
import './App.css';
import {ListContactsPage, LoginPage} from './pages';
import { namePages } from './globals/constants/constants';
import { Pages } from './typesAndInterfaces/types/basic.types';

function App() {
  const [page] = useState<Pages>(namePages.login);
  useEffect(() => {
    window.history.pushState(null, "", page);
  },[page])
  return (
    <>
      {page === namePages.login && <LoginPage />}
      {page === namePages.listContacts && <ListContactsPage />}
    </>
  );
}

export default App;