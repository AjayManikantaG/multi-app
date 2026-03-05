'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import {
  Palette as PaletteIcon,
  Edit as EditIcon,
  Folder as FolderIcon,
  TrendingUp as MonitoringIcon,
  Description as LogIcon,
  Settings as AdminIcon,
  Search as SearchIcon,
  Add as AddIcon,
  CreateNewFolder as NewFolderIcon,
  Storage as ServerIcon,
  Computer as LocalIcon,
  ChevronRight,
  ExpandMore,
} from '@mui/icons-material';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import {
  SidebarWrap,
  ColIcons,
  ColContent,
  IconButton,
  TabRow,
  TabButton,
  ContentArea,
  IconRow,
  IconDivider,
  ActionIcon,
  SearchContainer,
  SidebarSearchWrapper,
  SearchIconRight,
  SearchInputClean,
  TreeContainer,
  Resizer,
  ResizerHandle,
} from './sidebar.styles';
import Typography from '@mui/material/Typography';

interface SideMenuProps {
  children?: React.ReactNode;
}

type FileTabType = 'server' | 'local';

const demoTree = [
  {
    id: 'diagram-group',
    label: 'Diagram OF Group: Admin',
    children: [
      { id: 'process-maps', label: 'Process Maps' },
      { id: 'business-process', label: 'Business Process Diagrams' },
      { id: 'business-object', label: 'Business Object Diagrams' },
      { id: 'org-diagrams', label: 'Organization Diagrams' },
      { id: 'system-diagrams', label: 'System Diagrams' },
      { id: 'tech-workflows', label: 'Technical Workflows' },
    ],
  },
  {
    id: 'diagram-user',
    label: 'Diagram Of User: Root',
    children: [
      {
        id: 'user-tech-workflows',
        label: 'Technical Workflows',
        children: [
          { id: 'flow-01', label: 'Flow 01' },
          { id: 'flow-02', label: 'Flow 02' },
        ],
      },
    ],
  },
];

const monitoringTree = [
  {
    id: 'queue-manager',
    label: 'Queue Manager',
    href: '/monitoring/queue-manager',
  },
  { id: 'system-log', label: 'System log', href: '/monitoring/system-logs' },
  { id: 'audit-log', label: 'Audit log', href: '/monitoring/audit-log' },
  {
    id: 'scheduler-manager',
    label: 'Scheduler Manager',
    href: '/monitoring/scheduler-manager',
  },
  { id: 'key-manager', label: 'Key Manager', href: '/monitoring/key-manager' },
];

interface TreeData {
  id: string;
  label: string;
  href?: string;
  children?: TreeData[];
}

function renderMuiTree(
  nodes: TreeData[],
  onNavigate: (href: string) => void,
  pathname: string,
) {
  return nodes.map((node) => (
    <TreeItem
      key={node.id}
      itemId={node.id}
      onClick={() => node.href && onNavigate(node.href)}
      sx={{
        '& .MuiTreeItem-content': {
          backgroundColor:
            node.href && pathname === node.href
              ? 'rgba(211, 163, 58, 0.1) !important'
              : 'transparent',
          borderLeft:
            node.href && pathname === node.href
              ? '3px solid #D3A33A'
              : '3px solid transparent',
        },
      }}
      label={
        <Typography
          sx={{
            fontSize: '13px',
            py: 0.5,
            fontWeight: node.href && pathname === node.href ? 600 : 400,
          }}
        >
          {node.label}
        </Typography>
      }
    >
      {node.children && renderMuiTree(node.children, onNavigate, pathname)}
    </TreeItem>
  ));
}

export const Sidebar: React.FC<SideMenuProps> = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [fileTab, setFileTab] = useState<FileTabType>('server');
  const [query, setQuery] = useState('');

  const SIDEBAR_STORAGE_KEY = 'sidebar-width';
  const DEFAULT_WIDTH = 344; // 64 (Icons) + 280 (Content)
  const MIN_WIDTH = 200;
  const MAX_WIDTH = 600;

  const [sidebarWidth, setSidebarWidth] = useState<number>(DEFAULT_WIDTH);

  useEffect(() => {
    const stored = localStorage.getItem(SIDEBAR_STORAGE_KEY);
    if (stored) {
      setSidebarWidth(Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, Number(stored))));
    }
  }, []);

  const draggingRef = useRef(false);
  const startXRef = useRef(0);
  const startWidthRef = useRef(DEFAULT_WIDTH);

  const onPointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      draggingRef.current = true;
      startXRef.current = e.clientX;
      startWidthRef.current = sidebarWidth;
      (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
      e.preventDefault();
    },
    [sidebarWidth],
  );

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    const delta = e.clientX - startXRef.current;
    const next = Math.min(
      MAX_WIDTH,
      Math.max(MIN_WIDTH, startWidthRef.current + delta),
    );
    setSidebarWidth(next);
  }, []);

  const onPointerUp = useCallback(() => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    localStorage.setItem(SIDEBAR_STORAGE_KEY, String(sidebarWidth));
  }, [sidebarWidth]);

  const menuItems = [
    { id: 'designer', Icon: PaletteIcon, label: 'Designer', href: '/designer' },
    { id: 'editor', Icon: EditIcon, label: 'Editor', href: '/editor' },
    {
      id: 'repository',
      Icon: FolderIcon,
      label: 'Repository',
      href: '/repository',
    },
    {
      id: 'monitoring',
      Icon: MonitoringIcon,
      label: 'Monitoring',
      href: '/monitoring',
    },
    { id: 'logging', Icon: LogIcon, label: 'Log files', href: '/logging' },
    { id: 'admin', Icon: AdminIcon, label: 'Admin', href: '/admin' },
  ];

  return (
    <SidebarWrap $width={sidebarWidth}>
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <ColIcons>
          {menuItems.map((item) => (
            <IconButton
              key={item.id}
              $active={pathname?.startsWith(item.href)}
              onClick={() => router.push(item.href)}
              title={item.label}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <item.Icon sx={{ fontSize: 20 }} />
                <span style={{ fontSize: '9px', textAlign: 'center' }}>
                  {item.label}
                </span>
              </div>
            </IconButton>
          ))}
        </ColIcons>

        <ColContent>
          <TabRow>
            <TabButton
              $active={fileTab === 'server'}
              onClick={() => setFileTab('server')}
            >
              <ServerIcon sx={{ fontSize: 16, mr: 1 }} />
              Server
            </TabButton>
            <TabButton
              $active={fileTab === 'local'}
              onClick={() => setFileTab('local')}
            >
              <LocalIcon sx={{ fontSize: 16, mr: 1 }} />
              Local
            </TabButton>
          </TabRow>

          <ContentArea>
            <IconRow>
              <ActionIcon title="New File">
                <AddIcon sx={{ fontSize: 18 }} />
              </ActionIcon>
              <IconDivider />
              <ActionIcon title="New Folder">
                <NewFolderIcon sx={{ fontSize: 18 }} />
              </ActionIcon>
            </IconRow>

            <SearchContainer>
              <SidebarSearchWrapper>
                <SearchInputClean
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search"
                />
                <SearchIconRight>
                  <SearchIcon sx={{ fontSize: 16 }} />
                </SearchIconRight>
              </SidebarSearchWrapper>
            </SearchContainer>

            <TreeContainer>
              <SimpleTreeView
                slots={{ collapseIcon: ExpandMore, expandIcon: ChevronRight }}
              >
                {renderMuiTree(
                  pathname?.startsWith('/monitoring')
                    ? monitoringTree
                    : demoTree,
                  (href) => router.push(href),
                  pathname || '',
                )}
              </SimpleTreeView>
            </TreeContainer>
          </ContentArea>
        </ColContent>
      </div>

      <Resizer
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
        <ResizerHandle>
          <span />
          <span />
        </ResizerHandle>
      </Resizer>
    </SidebarWrap>
  );
};

export default Sidebar;
