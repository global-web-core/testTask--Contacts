import React from 'react';
import { ListContacts, Login } from '../../components';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import {userSelect} from '../../store/user/user-selectors';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';
import { text } from '../../globals/constants/constants';
import {clearUser} from '../../store/user/user-actions';

export const ListContactsPage = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(userSelect);
  return (
    <>
      <div>
        <AppBar position="sticky">
          <Toolbar>
            <Typography variant="h6" component="div">{text.contacts}</Typography>
            <div style={{ flexGrow: 1 }}></div>
            {user.data && <Button color="inherit" onClick={() => {dispatch(clearUser())}}>{text.logout}</Button>}
          </Toolbar>
        </AppBar>
      </div>
      {!user.data && <Login />}
      {user.data && <ListContacts />}
    </>
  );
}