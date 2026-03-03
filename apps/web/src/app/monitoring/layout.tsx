import React from 'react';
import Sidebar from '../../../../../libs/ui/src/lib/organisms/Sidebar/Sidebar';

export default function MonitoringLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        width: '100vw',
        overflow: 'hidden',
      }}
    >
      <Sidebar />
      <div style={{ flex: 1, overflowY: 'auto' }}>{children}</div>
    </div>
  );
}
