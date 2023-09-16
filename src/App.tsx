import React, { useEffect } from 'react';
import './App.css';
import {ListContactsPage, LoginPage} from './pages';
import { namePages } from './globals/constants/constants';
import { useAppSelector } from './store/hook';
import { pageSelect } from './store/page/page-selectors';

function App() {
  const page = useAppSelector(pageSelect);
  useEffect(() => {
    window.history.pushState(null, "", page.current);
  },[page])
  return (
    <>
      {page.current === namePages.login && <LoginPage />}
      {page.current === namePages.listContacts && <ListContactsPage />}
    </>
  );
}

export default App;