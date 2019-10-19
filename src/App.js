import React from "react";

// ? Estilização
import { CssBaseline, Grid, makeStyles } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./utils/theme";
import Content from "./components/Content";

const useStyles = makeStyles(() => ({
  root: {
    paddingBottom: "40px",
  },
}));

function App() {
  const classes = useStyles();

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Grid container justify="center" className={classes.root}>
          <Grid item xs={11} md={10} lg={9}>
            <Content />
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
}

export default App;
