'use client';

import { useState } from 'react';
import PeoplePage from './components/pages/PeoplePage';
import TicketsPage from './components/pages/TicketsPage';
import styles from './main.module.css';

export default function Home() {
  const [currentTab, setCurrentTab] = useState(0);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>My App</h1>
      </header>

      <div className={styles.content}>
        <div className="tabs">
          <button className={`tab ${currentTab === 0 ? 'active' : ''}`} onClick={() => setCurrentTab(0)}>
            Tickets
          </button>
          <button className={`tab ${currentTab === 1 ? 'active' : ''}`} onClick={() => setCurrentTab(1)}>
            People
          </button>
        </div>

        <main className={styles.pageWrapper}>
          {currentTab === 0 && <TicketsPage />}
          {currentTab === 1 && <PeoplePage />}
        </main>
      </div>
    </div>
  );
}
