import "../styles/globals.css";
import { ThirdwebProvider, ChainId } from "@thirdweb-dev/react";
const activeChainId = ChainId.Goerli;
/**
 * `MyApp` is a function that returns a `ThirdwebProvider` component that wraps the
 * `Component` prop and passes it the `pageProps` prop
 * @returns The ThirdwebProvider is being returned with the Component and
 * pageProps. Wrap in the ThirdwebProvider to use the Thirdweb SDK for login
 */
function MyApp({ Component, pageProps }) {
  return (
    <ThirdwebProvider desiredChainId={activeChainId}>
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}
/* Exporting the component MyApp to be used in the next.js app. */
export default MyApp;