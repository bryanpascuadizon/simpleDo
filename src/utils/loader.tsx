import { LinearProgress } from "@mui/material";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { RootState } from "./store";

interface PaletteColor {
  main: string;
  darker?: string;
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#311b92",
    },
  },
});

const Loader = () => {
  const loaderState = useSelector((state: RootState) => state.loader);

  const { isLoading } = loaderState;

  return (
    <div className="load_container">
      {isLoading ? (
        <ThemeProvider theme={theme}>
          <LinearProgress color={"primary"} />
        </ThemeProvider>
      ) : (
        ""
      )}
    </div>
  );
};

export default Loader;
