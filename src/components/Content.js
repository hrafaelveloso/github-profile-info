import React, { useState, useReducer } from "react";
import { Grid, TextField, makeStyles, Button, Paper, Avatar } from "@material-ui/core";
import { PersonRounded, Email, Room, CalendarToday, Bookmarks, Work, Language } from "@material-ui/icons";
import CenterHeader from "./pieces/CenterHeader";
import reducer from "./pieces/reducer";
import axios from "axios";
import isEmpty from "../utils/theme/isEmpty";
import UserInfoItem from "./pieces/UserInfoItem";
import { format, parseISO } from "date-fns";
import UserRepoItem from "./pieces/UserRepoItem";

const useStyles = makeStyles(theme => ({
  buttonItem: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  containerSearch: {
    marginBottom: "20px",
  },
  avatar: {
    width: "100%",
    height: "auto",
  },
  itemInfo: {
    display: "flex",
    color: theme.palette.text.secondary,
  },
  link: {
    textDecoration: "none",
    color: theme.palette.text.secondary,
    "&:hover": {
      color: "#E6AA05",
    },
  },
}));

const Content = () => {
  const classes = useStyles();
  const [state, dispatch] = useReducer(reducer, {
    user: {},
    error: "",
    userRepos: [],
  });
  const [username, setUsername] = useState("");
  const { user, error, userRepos } = state;

  const searchUser = e => {
    e.preventDefault();

    axios
      .get(`https://api.github.com/users/${username}`)
      .then(res => {
        dispatch({
          type: "SET_USER",
          payload: res.data,
        });

        if (res.data.public_repos > 0) {
          axios
            .get(`https://api.github.com/users/${username}/repos`)
            .then(res => {
              dispatch({
                type: "SET_USER_REPOS",
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
          type: "SET_ERROR_USER",
          payload: "Utilizador não encontrado.",
        });
      });
  };

  return (
    <>
      <CenterHeader label="Github finder" />
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
        <Grid item className={classes.buttonItem}>
          <Button variant="contained" color="primary" onClick={searchUser}>
            Procurar
          </Button>
        </Grid>
      </Grid>
      {!isEmpty(user) && (
        <>
          <CenterHeader label="Informação do utilizador" />
          <Grid container>
            <Grid item xs={12}>
              <Paper>
                <Grid container spacing={2}>
                  <Grid item xs={4} md={3} lg={2}>
                    <Avatar src={user.avatar_url} className={classes.avatar} />
                  </Grid>
                  <Grid item xs={8} md={9} lg={10}>
                    <Grid container spacing={2}>
                      {!isEmpty(user.name) && <UserInfoItem icon={<PersonRounded />} value={user.name} />}
                      {!isEmpty(user.email) && <UserInfoItem icon={<Email />} value={user.email} />}
                      {!isEmpty(user.location) && <UserInfoItem icon={<Room />} value={user.location} />}
                      {!isEmpty(user.company) && <UserInfoItem icon={<Work />} value={user.company} />}
                      <UserInfoItem icon={<CalendarToday />} value={`Registo em ${format(parseISO(user.created_at), "dd/MM/yyyy")}`} />
                      <UserInfoItem icon={<Bookmarks />} value={`Repositórios: ${user.public_repos}`} />
                      <UserInfoItem
                        icon={<Language />}
                        value={
                          <a href={`https://github.com/${user.login}`} target="_blank" rel="noopener noreferrer" className={classes.link}>
                            {user.login}
                          </a>
                        }
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
          {userRepos.length > 0 && (
            <>
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
