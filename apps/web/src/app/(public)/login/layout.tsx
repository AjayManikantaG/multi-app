'use client';

import React from 'react';
import { LoginLayoutWrapper, LoginCard } from './login-layout.styles';

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LoginLayoutWrapper>
      <LoginCard>{children}</LoginCard>
    </LoginLayoutWrapper>
  );
}
