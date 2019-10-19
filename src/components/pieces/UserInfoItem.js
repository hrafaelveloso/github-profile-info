import React from "react";
import { makeStyles, Typography, Grid } from "@material-ui/core";
import PropTypes from "prop-types";

const useStyles = makeStyles(theme => ({
  itemInfo: {
    display: "flex",
    color: theme.palette.text.secondary,
  },
  marginleft: {
    marginLeft: "8px",
  },
}));

const UserInfoItem = ({ icon, value }) => {
  const classes = useStyles();

  return (
    <Grid item xs={12} md={6} lg={3} className={classes.itemInfo}>
      {icon}
      <Typography variant="body1" className={classes.marginleft}>
        {value}
      </Typography>
    </Grid>
  );
};

UserInfoItem.propTypes = {
  icon: PropTypes.object.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.element]).isRequired,
};

export default UserInfoItem;
