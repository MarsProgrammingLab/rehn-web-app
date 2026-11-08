import { NavLink } from "react-router";
import styles from "./Navigation.module.css";

export default function Navigation() {
  return (
    <nav aria-label="Main" className={styles.nav}>
      <ul>
        <li>
          <NavLink to="/" end>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/about">About Us</NavLink>
        </li>
        <li>
          <NavLink to="/shows">Shows</NavLink>
        </li>
        <li>
          <NavLink to="/contact">Contact</NavLink>
        </li>
        <li>
          <a
            href="https://www.instagram.com/rehnandtheidols/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow us on Instagram"
          >
            Instagram
          </a>
        </li>
      </ul>
    </nav>
  );
}
