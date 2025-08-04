import Link from 'next/link';
import React from 'react';
import styles from './Navbar.module.css';

export default function Navbar() {
    return (
        <nav className={styles.navbar}>
            <div className={styles.logo}>NEXT JS</div>
            <ul className={styles.navLinks}>
                <li><Link href="/home" className={styles.navLink}>Home</Link></li>
                <li><Link href="/about" className={styles.navLink}>About</Link></li>
                <li><Link href="/contact" className={styles.navLink}>Contact</Link></li>
                <li><Link href="/login" className={styles.navLink}>login</Link></li>
                <li><Link href="/tips" className={styles.navLink}>tips</Link></li>
                <li><Link href="/remember" className={styles.navLink}>remember</Link></li>
            </ul>
        </nav>
    );
}