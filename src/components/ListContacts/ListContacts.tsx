import React, { useEffect, useState } from 'react';
import { TextField, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Typography, Button } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { Contacts } from '../../models';
import { IContacts } from '../../typesAndInterfaces/interfaces';
import { text } from '../../globals/constants/constants';
import { useAppSelector } from '../../store/hook';
import { userSelect } from '../../store/user/user-selectors';

export const ListContacts = (): JSX.Element => {
  const [contacts, setContacts] = useState<IContacts.Db[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<IContacts.Db[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const user = useAppSelector(userSelect);
  const [currentContact, setCurrentContact] = useState<IContacts.Form | null>(null);

  const getFilteredConctacts = () => {
    return contacts.filter(contact => {
      const isExists = Object.values(contact).some(value => {
        if (typeof value === "string") {
          return value?.toLowerCase().includes(searchTerm.toLowerCase())
        }
        return false;
      })
      return isExists;
    });
  }

  const getAllContacts = async () => {
    if (user?.data?.id) {
      const listContacts = await Contacts.getByIdUser(user.data.id);
      if (listContacts.data) setContacts(listContacts.data);
    }
  }

  const addContact = () => {
    console.log('===addContact')
    // После добавления или обновления контакта, получите все контакты заново
    // await getAllContacts();
  }

  const updateContact = () => {
    console.log('===updateContact')
    // После добавления или обновления контакта, получите все контакты заново
    // await getAllContacts();
  }

  useEffect(() => {
    getAllContacts();
  }, [])

  useEffect(() => {
    const list = getFilteredConctacts();
    if (list) setFilteredContacts(list)
  }, [contacts, searchTerm])

  const handleAddOrUpdateContact = async (event: React.FormEvent) => {
    event.preventDefault();
    if (currentContact?.id) {
      updateContact()
    } else {
      addContact()
    }
  };

  const handleChange = (field: string, value: string) => {
    setCurrentContact(prev => ({ ...prev, [field]: value }));
  };

  const handleEditClick = (id: number) => {
    const currentContact = filteredContacts.find(contact => contact.id === id)
    if (currentContact) setCurrentContact(currentContact);
  };
  


  return (
    <>
      <div style={{ margin: '20px' }}>
      <TextField
        label={text.search}
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <List>
        {filteredContacts.map((contact) => (
          <ListItem key={contact.id}>
            <ListItemText primary={contact.name} secondary={`${contact.email}, ${contact.phone}`} />
            <ListItemSecondaryAction>
              <IconButton edge="end" onClick={() => handleEditClick(contact.id)}>
                <Edit />
              </IconButton>
              <IconButton edge="end">
                <Delete />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
        {!contacts.length &&
          <ListItem sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <ListItemText primary={
              <Typography variant="body2" color="textSecondary" align="center">
                {text.listEmpty}
              </Typography>
            } />
          </ListItem>
        }
      </List>
      <form style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
        onSubmit={handleAddOrUpdateContact} autoComplete="off" 
      >
        <TextField label={text.name} value={currentContact?.name || ''}
          onChange={(e) => handleChange('name', e.target.value)} fullWidth required />
        <TextField label={text.email} value={currentContact?.email || ''}
          onChange={(e) => handleChange('email', e.target.value)} fullWidth required />
        <TextField label={text.phoneNumber} value={currentContact?.phone || ''}
          onChange={(e) => handleChange('phone', e.target.value)} fullWidth required />
        <Button variant="contained" type="submit">
          {currentContact?.id ? text.updateContact : text.addContact}
        </Button>
        {currentContact?.id && (
          <Button 
            variant="outlined" 
            onClick={() => setCurrentContact(null)}
            style={{marginTop: '10px'}}
          >
            {text.cancelEdit}
          </Button>
        )}
      </form>
    </div>
    </>
  );
}