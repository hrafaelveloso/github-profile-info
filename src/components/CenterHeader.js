import React from "react";
import { makeStyles, Grid, Typography, Divider } from "@material-ui/core";
import PropTypes from "prop-types";

const useStyles = makeStyles(() => ({
  containerMargin: {
    marginTop: "20px",
    marginBottom: "20px",
  },
  marginDivider: {
    marginTop: "3px",
  },
}));

const CenterHeader = ({ label, error }) => {
  const classes = useStyles();

  return (
    <Grid container className={classes.containerMargin}>
      <Grid item xs={12}>
        <Typography variant="h5" align="center" color={error ? "error" : "inherit"}>
          {label}
        </Typography>
        <Divider className={classes.marginDivider} />
      </Grid>
    </Grid>
  );
};

CenterHeader.defaultProps = {
  error: false,
};

CenterHeader.propTypes = {
  label: PropTypes.string.isRequired,
  error: PropTypes.bool,
};

export default CenterHeader;
