import styles from "./modal.module.scss";
import { FC } from "react";
import Image from "next/image";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <Image src="/icons/email.svg" alt="Email Icon" width={48} height={48} />
        <h2 className={styles.modalTitle}>Contact Us Via Email</h2>
        <p className={styles.modalText}>
          Any questions? Send us an email at jungtalents@gmail.com. We usually
          answer within 24 hours.
        </p>
        <div className={styles.modalButtons}>
          <button className={styles.cancelButton} onClick={onClose}>
            Cancel
          </button>
          <button
            className={styles.openEmailButton}
            onClick={() =>
              (window.location.href = "mailto:jungtalents@gmail.com")
            }
          >
            Open Email App
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
