import React from "react";
import { ListItem, ListItemText } from "@material-ui/core";
import PropTypes from "prop-types";

const InfoRepoItem = ({ primary, secondary }) => {
  return (
    <ListItem>
      <ListItemText primary={primary} secondary={secondary} />
    </ListItem>
  );
};

InfoRepoItem.propTypes = {
  primary: PropTypes.string.isRequired,
  secondary: PropTypes.string.isRequired,
};

export default InfoRepoItem;
