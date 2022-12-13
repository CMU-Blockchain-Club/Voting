import { ConnectWallet } from '@thirdweb-dev/react'
import styles from '../styles/Login.module.css'
/**
 * `useMetamask` is a hook that returns a function that, when called, will connect
 * the user to MetaMask
 * @returns A button that when clicked will connect to metamask.
 */
const Login = () => {
    return (
        <div className={styles.container}>
            <ConnectWallet accentColor="#7449bb" colorMode="light" />
        </div>
    );
};
export default Login;