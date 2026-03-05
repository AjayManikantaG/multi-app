'use client';

import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Sidebar, Header, theme, GlobalStyles } from '@temp-workspace/ui';
import styles from './app-layout.module.css';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <div className={styles.mainLayout}>
        <Header />
        <div className={styles.appContainer}>
          <Sidebar />
          <main className={styles.mainScrollArea}>{children}</main>
        </div>
      </div>
    </ThemeProvider>
  );
}
