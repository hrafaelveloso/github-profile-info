import React from "react";
import { makeStyles, Grid, Paper, Typography, List } from "@material-ui/core";
import { format, parseISO } from "date-fns";
import PropTypes from "prop-types";
import ListItemRepo from "./ListItemRepo";
import isEmpty from "../utils/theme/isEmpty";

const useStyles = makeStyles(theme => ({
  link: {
    textDecoration: "none",
    color: theme.palette.text.primary,
    "&:hover": {
      color: "#E6AA05",
    },
  },
}));

const UserRepoItem = ({ repo }) => {
  const classes = useStyles();

  return (
    <Grid item xs={12} sm={6} lg={4}>
      <Paper>
        <Typography variant="h6">
          <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className={classes.link}>
            {repo.name}
          </a>
        </Typography>
        {!isEmpty(repo.description) && <Typography variant="caption">{repo.description}</Typography>}
        <List dense>
          <ListItemRepo primary="Criado em" secondary={format(parseISO(repo.created_at), "dd/MM/yyyy - HH:mm")} />
          <ListItemRepo primary="Linguagem" secondary={repo.language} />
          <ListItemRepo primary="Stars" secondary={repo.stargazers_count} />
        </List>
      </Paper>
    </Grid>
  );
};

UserRepoItem.propTypes = {
  repo: PropTypes.object.isRequired,
};

export default UserRepoItem;
