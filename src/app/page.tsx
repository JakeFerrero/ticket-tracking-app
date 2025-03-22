'use client';

import { useState } from 'react';
import PeopleTab from './components/PeopleTab';
import TicketsTab from './components/TicketsTab';

export default function Home() {
  const [currentTab, setCurrentTab] = useState(0);

  return (
    <div>
      <header className="header">
        <h1>MY App</h1>
      </header>

      <div className="tabs">
        <button className={`tab ${currentTab === 0 ? 'active' : ''}`} onClick={() => setCurrentTab(0)}>
          Tickets
        </button>
        <button className={`tab ${currentTab === 1 ? 'active' : ''}`} onClick={() => setCurrentTab(1)}>
          People
        </button>
      </div>

      <main className="container">
        {currentTab === 0 && <TicketsTab />}
        {currentTab === 1 && <PeopleTab />}
      </main>
    </div>
  );
}
