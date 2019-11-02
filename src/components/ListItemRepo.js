import React from "react";
import { ListItem, ListItemText } from "@material-ui/core";
import PropTypes from "prop-types";

const ListItemRepo = ({ primary, secondary }) => {
  return (
    <ListItem disableGutters>
      <ListItemText primary={primary} secondary={secondary} />
    </ListItem>
  );
};

ListItemRepo.propTypes = {
  primary: PropTypes.string.isRequired,
  secondary: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default ListItemRepo;
