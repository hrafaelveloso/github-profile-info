import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, TextField, Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  containerSearch: {
    marginBottom: '20px',
  },
}));

const UserSearch = ({ searchUser }) => {
  const [username, setUsername] = useState('');
  const classes = useStyles();

  return (
    <Grid container spacing={2} className={classes.containerSearch}>
      <Grid item xs={7} sm={8} md={5} lg={3}>
        <TextField
          label="Nome do utilizador"
          placeholder="Insira o nome do utilizador"
          fullWidth
          name="username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
      </Grid>
      <Grid item>
        <Button variant="contained" color="primary" onClick={searchUser(username)}>
          Procurar
        </Button>
      </Grid>
    </Grid>
  );
};

UserSearch.propTypes = {
  searchUser: PropTypes.func.isRequired,
};

export default UserSearch;
