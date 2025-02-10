
import Link from 'next/link';
import styles from './Nav.module.css';

const Nav = () => {
  return (
    <nav className={styles.nav}>
      <Link href="/products/echo" className={styles.navLink}>
        Amazon Echo
      </Link>
      <Link href="/products/apple-watch" className={styles.navLink}>
        Apple Watch
      </Link>
    </nav>
  );
};

export default Nav;