import { createMuiTheme } from "@material-ui/core/styles";
import overrides from "./overrides";

const theme = createMuiTheme({
  palette: {
    background: {
      default: "#f7f7f7",
    },
  },
  overrides,
});

export default theme;
