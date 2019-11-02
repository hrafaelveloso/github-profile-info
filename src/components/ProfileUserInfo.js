import React from "react";
import { makeStyles, Grid, Paper, Avatar } from "@material-ui/core";
import isEmpty from "../utils/theme/isEmpty";
import UserInfoItem from "./UserInfoItem";
import { PersonRounded, Email, Room, Work, CalendarToday, Bookmarks, Language } from "@material-ui/icons";
import { format, parseISO } from "date-fns";
import PropTypes from "prop-types";

const useStyles = makeStyles(theme => ({
  avatar: {
    width: "100%",
    height: "auto",
  },
  link: {
    textDecoration: "none",
    color: theme.palette.text.secondary,
    "&:hover": {
      color: "#E6AA05",
    },
  },
}));

const ProfileUserInfo = ({ user }) => {
  const classes = useStyles();

  return (
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
  );
};

ProfileUserInfo.propTypes = {
  user: PropTypes.object.isRequired,
};

export default ProfileUserInfo;
