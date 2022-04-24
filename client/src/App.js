import CssBaseline from "@mui/material/CssBaseline";
import ThemeProvider from "@mui/material/styles/ThemeProvider";

import GraphQLProvider from "components/GraphQLProvider";
import Header from "components/Header";
import ShoppingList from "components/ShoppingList";

import theme from "./theme";

import "App.css";

function App() {
  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <GraphQLProvider>
          <div className="App">
            <Header />
            <ShoppingList />
          </div>
        </GraphQLProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
