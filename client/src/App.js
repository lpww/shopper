import CssBaseline from "@mui/material/CssBaseline";
import ThemeProvider from "@mui/material/styles/ThemeProvider";

import Header from "components/molecules/Header";
import GraphQLProvider from "components/organisms/GraphQLProvider";
import ShoppingListPage from "components/pages/ShoppingList";

import theme from "./theme";

function App() {
  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <GraphQLProvider>
          <div>
            <Header />
            <ShoppingListPage />
          </div>
        </GraphQLProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
