import React, { useReducer } from 'react';
import { Grid } from '@material-ui/core';
import CenterHeader from './CenterHeader';
import reducer from './reducer';
import axios from 'axios';
import isEmpty from '../utils/theme/isEmpty';
import UserRepoItem from './UserRepoItem';
import ProfileUserInfo from './ProfileUserInfo';
import UserSearch from './UserSearch';

const Content = () => {
  const [state, dispatch] = useReducer(reducer, {
    user: {},
    error: '',
    userRepos: [],
  });
  const { user, error, userRepos } = state;

  const searchUser = handle => e => {
    e.preventDefault();

    axios
      .get(`https://api.github.com/users/${handle}`)
      .then(res => {
        dispatch({
          type: 'SET_USER',
          payload: res.data,
        });

        if (res.data.public_repos > 0) {
          axios
            .get(`https://api.github.com/users/${handle}/repos`)
            .then(res => {
              dispatch({
                type: 'SET_USER_REPOS',
                payload: res.data,
              });
            })
            .catch(err => {
              console.log(err.response);
            });
        }
      })
      .catch(() => {
        dispatch({
          type: 'SET_ERROR_USER',
          payload: 'Utilizador não encontrado.',
        });
      });
  };

  return (
    <>
      <CenterHeader label="Github finder" />
      {/* Componente responsável por obter o handle do utilizador e pesquisar a informação relativa */}
      <UserSearch searchUser={searchUser} />
      {!isEmpty(user) && (
        <>
          {/* Se existir utilizador, exibe a informação relativa ao mesmo */}
          <CenterHeader label="Informação do utilizador" />
          <ProfileUserInfo user={user} />
          {userRepos.length > 0 && (
            <>
              {/* Se o utilizador tiver repos publicos, mostra essa informação também */}
              <CenterHeader label={`Repositórios públicos de @${user.login}`} />
              <Grid container spacing={3}>
                {userRepos.map((repo, idx) => (
                  <UserRepoItem key={idx} repo={repo} />
                ))}
              </Grid>
            </>
          )}
        </>
      )}
      {!isEmpty(error) && <CenterHeader label={error} error />}
    </>
  );
};

export default Content;
