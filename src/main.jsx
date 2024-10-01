import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { store } from "./redux/store.js";
import { ApolloProvider } from "@apollo/client";
import client from "@/lib/apollo-client";
import { Toaster } from "react-hot-toast";
import { I18nextProvider } from "react-i18next";
import i18n from "@/i18n.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <I18nextProvider i18n={i18n}>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <BrowserRouter>
          <App />
          <Toaster position="bottom-right" reverseOrder={false} />
        </BrowserRouter>
      </Provider>
    </ApolloProvider>
    </I18nextProvider>
    
  </StrictMode>
);
