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
  const [formContact, setFormContact] = useState<IContacts.Form | null>(null);

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

  const addContact = async () => {
    if (formContact?.name && formContact?.email && formContact?.phone && user?.data?.id) {
      const dataContact = {
        idUser: user?.data?.id,
        name: formContact?.name,
        email: formContact?.email,
        phone: formContact?.phone,
      }

      const addedContact = await Contacts.add(dataContact);
      if (addedContact.data) {
        const newContacts = [...contacts, addedContact.data]
        setContacts(newContacts);
        setFormContact(null);
        return;
      }
      alert(text.error);
      return;
    }

    alert(text.fillFields);
  }

  const updateContact = async () => {
    if (formContact?.name && formContact?.email && formContact?.phone && formContact?.id && formContact?.idUser) {
      const updatedContact = await Contacts.update(formContact as IContacts.Db);
      if (updatedContact.data) {
        const newContacts = updatedContact.data
        setContacts(prevContacts => {
          return prevContacts.map(contact => 
            contact.id === newContacts.id 
              ? { ...contact, ...newContacts }
              : contact
          );
        });
        return;
      }
    }
    alert(text.error);
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
    if (formContact?.id) {
      updateContact()
    } else {
      addContact()
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormContact(prev => ({ ...prev, [field]: value }));
  };

  const handleEditClick = (id: number) => {
    const formContact = filteredContacts.find(contact => contact.id === id)
    if (formContact) setFormContact(formContact);
  };

  const handleDeleteClick = async (id: number) => {
    const deleteContact = filteredContacts.find(contact => contact.id === id)

    if (deleteContact?.id) {
      const deletedContact = await Contacts.removeById(deleteContact.id);
      if (deletedContact.data && Object.keys(deletedContact.data).length === 0) {
        const newContacts = contacts.filter(contact => contact.id !== deleteContact.id)
        setContacts(newContacts);
        return;
      }
    }
    alert(text.error);
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
              <IconButton edge="end" onClick={() => handleDeleteClick(contact.id)}>
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
        <TextField label={text.name} value={formContact?.name || ''}
          onChange={(e) => handleChange('name', e.target.value)} fullWidth required />
        <TextField label={text.email} value={formContact?.email || ''}
          onChange={(e) => handleChange('email', e.target.value)} fullWidth required />
        <TextField label={text.phoneNumber} value={formContact?.phone || ''}
          onChange={(e) => handleChange('phone', e.target.value)} fullWidth required />
        <Button variant="contained" type="submit">
          {formContact?.id ? text.updateContact : text.addContact}
        </Button>
        {formContact?.id && (
          <Button 
            variant="outlined" 
            onClick={() => setFormContact(null)}
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