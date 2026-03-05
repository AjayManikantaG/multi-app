'use client';

import React from 'react';
import { Sidebar, Header } from '@temp-workspace/ui';
import styles from './app-layout.module.css';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.appContainer}>
      <Sidebar />
      <div className={styles.contentArea}>
        <Header />
        <main className={styles.mainScrollArea}>{children}</main>
      </div>
    </div>
  );
}
