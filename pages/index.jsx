import { Routes } from "@config/routes";
import styles from "./index.module.scss";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import Modal from "./modal";

const IssuesPage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch("https://prolog-api.profy.dev/content-page/home");
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const toggleMenu = () => setMenuOpen(prev => !prev);
  const toggleModal = () => setIsModalOpen(prev => !prev);

  const heroSection = data?.sections?.find(section => section.sectionType === "hero");

  return (
    <div>
      <header className={styles.header}>
        <div className={styles.container}>
          <Image src="/icons/logo-large.svg" alt="Prolog logo" width={118} height={33} />
          <nav className={`${styles.menu} ${menuOpen ? styles.show : ""}`}>
            <ul className={styles.navItem}>
              <li><Link href="/" className={styles.navItemText}>Home</Link></li>
              <li><Link href="/products" className={styles.navItemText}>Products</Link></li>
              <li><Link href="/documentation" className={styles.navItemText}>Documentation</Link></li>
              <li><Link href="/pricing" className={styles.navItemText}>Pricing</Link></li>
              <li className={styles.mobileDashboardButton}>
                <Link href={Routes.projects} className={styles.navItemText}>Open Dashboard</Link>
              </li>
            </ul>
          </nav>
          <Link href={Routes.projects} className={styles.dashboardButton}>Open Dashboard</Link>
          <div className={styles.menuToggle} onClick={toggleMenu}>☰</div>
        </div>
      </header>

      {heroSection && (
        <div className={styles.heroSection}>
          <h1>{heroSection.title}</h1>
          <p>{heroSection.subtitle}</p>
          <Image 
            src={`https://prolog-api.profy.dev/${heroSection.image.src}`} 
            width={heroSection.image.width} 
            height={heroSection.image.height} 
            alt="Hero section image"
          />
        </div>
      )}

      <button className={styles.contactButton} onClick={toggleModal}>
        <Image src="/icons/message.svg" alt="Contact" width={24} height={24} />
      </button>
      <Modal isOpen={isModalOpen} onClose={toggleModal} />
    </div>
  );
};

export default IssuesPage;
