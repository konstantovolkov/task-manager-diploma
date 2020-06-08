import { Theme } from "theme-ui";

const theme: Theme & { [prop: string]: any } = {
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  colors: {
    background: "#fafafa",
    muted: "white",
    text: "#1a1a1a",
    inactiveText: "rgba(0, 0, 0, 0.6)",
    activeText: "rgb(240, 0, 52, 0.7)",
    primary: "rgb(240, 0, 52, 0.7)"
  },
  text: {
    heading: {
      marginTop: 0,
      marginRight: "auto",
      marginBottom: 3
    }
  },
  badges: {
    active: {
      color: "muted",
      bg: "primary"
    },
    inactive: {
      borderStyle: "solid",
      borderWidth: "1px",
      borderColor: "inactiveText",
      color: "inactiveText",
      bg: "muted"
    }
  },
  fontWeights: {
    medium: 500
  },
  shadows: {
    blockShadow: "0 2px 7px 0 rgba(0,0,0,0.16)",
    navTileInactive: "0 2px 7px 0 rgba(0, 0, 0, 0.16)",
    navTileActive: "0 2px 9px 0 rgb(240, 0, 52, 0.5)"
  },
  fonts: {
    body: "Segoe UI, sans-serif",
    heading: "Segoe UI, sans-serif"
  },
  buttons: {
    primary: {
      color: "white",
      background: "primary",
      outline: "none",
      borderStyle: "solid",
      borderWidth: "1px",
      borderColor: "primary",
      "&:hover": {
        background: "white",
        color: "primary",
        cursor: "pointer"
      }
    }
  },
  styles: {
    root: {
      fontFamily: "body"
    },
    h5: {
      my: 1
    },
    p: {
      my: 1
    }
  }
};

export default theme;
