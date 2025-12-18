import "../styles/global.scss";
import NavigationLoader from "../components/NavigationLoader";
import { Provider } from "react-redux";
import { store } from "../store/store";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <NavigationLoader />
      <Component {...pageProps} />
    </Provider>
  );
}
