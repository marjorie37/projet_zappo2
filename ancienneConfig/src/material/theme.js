import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#57687c",
      main: "#2c3e50",
      dark: "#031828",
      contrastText: "#fff"
    },
    secondary: {
      light: "#f96b55",
      main: "#c0392b",
      dark: "#890001",
      contrastText: "#fff"
    },
    background: {
      default: "rgb(243, 243, 242);"
    }
  },
  infoColor: {
    color: "rgb(0,158,224)"
  },
  typography: {
    display4: {
      fontFamily: "Bernardo Moda",
      fontSize: "1.8rem",
      fontWeight: "bold",
      textTransform: "uppercase"
    }
  }
});
export default theme;
