import { useMetamask } from '@thirdweb-dev/react'
import styles from '../styles/Login.module.css'
/**
 * `useMetamask` is a hook that returns a function that, when called, will connect
 * the user to MetaMask
 * @returns A button that when clicked will connect to metamask.
 */
const Login = () => {
    const { connect } = useMetamask();
    return (
        <div className={styles.container}>
            <button onClick={connect} className={styles.button}>Connect to MetaMask</button>
        </div>
    );
};
export default Login;