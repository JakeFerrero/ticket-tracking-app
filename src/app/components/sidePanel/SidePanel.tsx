import { ReactNode } from 'react';
import { Button, ButtonClass } from '../buttons/Button';
import styles from './sidePanel.module.css';

interface Props {
  children: ReactNode;
  hasChanges: boolean;
  onClose: () => void;
  onSave?: () => void;
  onCancel: () => void;
}

export default function SidePanel({ children, onClose, onSave, onCancel, hasChanges }: Props) {
  return (
    <div className={styles.sidePanelOverlay}>
      <div className={styles.sidePanel}>
        <div className={styles.sidePanelHeader}>
          <h2>Details</h2>
          <button className={styles.closeButton} onClick={onClose}>
            <img src="/close.svg" alt="Close" />
          </button>
        </div>
        <div className={styles.sidePanelContent}>{children}</div>
        {hasChanges && onSave && (
          <div className={styles.sidePanelButtons}>
            <Button buttonClass={ButtonClass.SECONDARY} text="Cancel" onClick={onCancel} />
            <Button buttonClass={ButtonClass.PRIMARY} text="Save Changes" onClick={onSave} />
          </div>
        )}
      </div>
    </div>
  );
}
