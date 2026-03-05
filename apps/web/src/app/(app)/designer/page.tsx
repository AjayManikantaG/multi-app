'use client';

import React from 'react';
import styled from 'styled-components';
import dynamic from 'next/dynamic';

const WorkflowCanvas = dynamic(
  () => import('@temp-workspace/features').then((mod) => mod.WorkflowCanvas),
  { ssr: false },
);

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 48px); /* Subtract header height */
  width: 100%;
  overflow: hidden;
`;

const BreadcrumbBar = styled.div`
  height: 32px;
  background: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
  display: flex;
  align-items: center;
  padding: 0 16px;
  font-size: 13px;
  color: #6c757d;
`;

const BreadcrumbItem = styled.span`
  &:not(:last-child)::after {
    content: '>';
    margin: 0 8px;
  }

  &.active {
    font-weight: 600;
    color: #212529;
  }
`;

const TabsBar = styled.div`
  height: 40px;
  background: #fff;
  border-bottom: 1px solid #dee2e6;
  display: flex;
  align-items: center;
`;

const TabItem = styled.div<{ $active?: boolean }>`
  height: 100%;
  padding: 0 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  border-right: 1px solid #dee2e6;
  color: ${({ $active }) => ($active ? '#212529' : '#6c757d')};
  background: ${({ $active }) => ($active ? '#fff' : '#f8f9fa')};
  border-top: 3px solid
    ${({ $active }) => ($active ? '#dca629' : 'transparent')};

  &:hover {
    background: #fff;
  }
`;

const TabCloseIcon = styled.span`
  font-size: 14px;
  margin-left: 4px;
  opacity: 0.6;
  &:hover {
    opacity: 1;
  }
`;

const CanvasArea = styled.div`
  flex: 1;
  position: relative;
`;

const StatusBar = styled.div`
  height: 28px;
  background: #f8f9fa;
  border-top: 1px solid #dee2e6;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  font-size: 11px;
  color: #6c757d;
`;

const StatusGroup = styled.div`
  display: flex;
  gap: 16px;
`;

export default function DesignerPage() {
  return (
    <PageContainer>
      <BreadcrumbBar>
        <BreadcrumbItem>Flow 02</BreadcrumbItem>
        <BreadcrumbItem className="active">Flow 01</BreadcrumbItem>
      </BreadcrumbBar>

      <TabsBar>
        <TabItem $active={true}>
          Flow 01
          <TabCloseIcon>&times;</TabCloseIcon>
        </TabItem>
        <TabItem>Show module versions</TabItem>
        <TabItem>Show module numbers</TabItem>
      </TabsBar>

      <CanvasArea>
        <WorkflowCanvas />
      </CanvasArea>

      <StatusBar>
        <StatusGroup>
          <span>
            Type: <b>Technical Workflow</b>
          </span>
          <span>
            Version: <b>Head</b>
          </span>
          <span>
            Mode: <b>Editor</b>
          </span>
        </StatusGroup>
        <div>v3.0.01 - Technical Workflow - Version - Mode: Editor</div>
      </StatusBar>
    </PageContainer>
  );
}
