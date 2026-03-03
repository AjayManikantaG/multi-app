'use client';

import React, { useState, useRef, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPalette,
  faPenToSquare,
  faFolder,
  faChartLine,
  faFileLines,
  faGear,
  faPlus,
  faFolderPlus,
  faSearch,
  faHardDrive,
  faServer,
  faUsers,
  faTree,
  faChevronDown,
  faList,
  faClock,
  faKey,
  faShieldAlt,
  faFileSignature,
} from '@fortawesome/free-solid-svg-icons';
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
  SearchWrapper,
  SearchIconRight,
  SearchInputClean,
  TreeContainer,
  Resizer,
  ResizerHandle,
} from './sidebar.styles';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';

const ICONS = {
  FOLDER: faFolder as any,
  SECURITY: faShieldAlt as any,
};

interface SideMenuProps {
  children?: React.ReactNode;
  onFileSelect?: (folderName: string | undefined, fileName: string) => void;
  onFolderSelect?: (folderName: string) => void;
}

type FileTabType = 'server' | 'local';

// simple nested demo data
const demoTree = [
  {
    id: 'src',
    label: 'src',
    children: [
      {
        id: 'src-app',
        label: 'app',
        children: [
          { id: 'src-app-layout', label: 'layout.tsx' },
          { id: 'src-app-page', label: 'page.tsx' },
        ],
      },
      {
        id: 'src-lib',
        label: 'lib',
        children: [{ id: 'src-lib-ui', label: 'ui' }],
      },
    ],
  },
  { id: 'package', label: 'package.json' },
];

function renderMuiTree(nodes: any[]) {
  return nodes.map((node) => (
    <TreeItem key={node.id} itemId={node.id} label={node.label}>
      {node.children && renderMuiTree(node.children)}
    </TreeItem>
  ));
}

export const Sidebar: React.FC<SideMenuProps> = ({
  children,
  onFileSelect,
  onFolderSelect,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const [fileTab, setFileTab] = useState<FileTabType>('local');
  const [query, setQuery] = useState('');

  const SIDEBAR_STORAGE_KEY = 'sidebar-width';
  const DEFAULT_WIDTH = 280;
  const MIN_WIDTH = 64; // icon column width — ColContent collapses to 0 at this point
  const MAX_WIDTH = 480;

  const [sidebarWidth, setSidebarWidth] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(SIDEBAR_STORAGE_KEY);
      if (stored)
        return Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, Number(stored)));
    }
    return DEFAULT_WIDTH;
  });

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

  const onPointerUp = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    const delta = e.clientX - startXRef.current;
    const next = Math.min(
      MAX_WIDTH,
      Math.max(MIN_WIDTH, startWidthRef.current + delta),
    );
    localStorage.setItem(SIDEBAR_STORAGE_KEY, String(next));
  }, []);

  const menuItems = [
    { id: 'designer', icon: faPalette, label: 'Designer', href: '/designer' },
    {
      id: 'systemDiagram',
      icon: ICONS.FOLDER,
      isImage: false,
      label: 'System Diagram',
      href: '/designer1',
    },
    {
      id: 'moduleEditor',
      icon: faPenToSquare,
      label: 'Module Editor',
      href: '/designer2',
    },
    {
      id: 'repository',
      icon: faFolder,
      label: 'Repository',
      href: '/designer3',
    },
    {
      id: 'monitoring',
      icon: faChartLine,
      label: 'Monitoring',
      href: '/monitoring',
    },
    { id: 'logging', icon: faFileLines, label: 'Logging', href: '/designer4' },
    { id: 'admin', icon: faGear, label: 'Admin', href: '/designer5' },
    {
      id: 'securityCockpit',
      icon: ICONS.SECURITY,
      isImage: false,
      label: 'Security Cockpit',
      href: '/designer6',
    },
  ];

  const isMonitoring = pathname?.startsWith('/monitoring');

  const monitoringSubMenuItems = [
    {
      id: 'queueManager',
      icon: faList,
      label: 'Queue Manager',
      href: '/monitoring/queue-manager',
    },
    {
      id: 'systemLog',
      icon: faFileLines,
      label: 'System log',
      href: '/monitoring/system-log',
    }, // Active default for monitoring
    {
      id: 'auditLog',
      icon: faFileSignature,
      label: 'Audit log',
      href: '/monitoring/audit-log',
    },
    {
      id: 'schedulerManager',
      icon: faClock,
      label: 'Scheduler Manager',
      href: '/monitoring/scheduler-manager',
    },
    {
      id: 'keyManager',
      icon: faKey,
      label: 'Key Manager',
      href: '/monitoring/key-manager',
    },
  ];

  return (
    <SidebarWrap width={sidebarWidth}>
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Tab Buttons */}
        <ColIcons>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              alignItems: 'center',
            }}
          >
            {menuItems.map((item) => (
              <IconButton
                key={item.id}
                active={pathname?.startsWith(item.href) && item.href !== '/'}
                onClick={() => router.push(item.href)}
                title={item.label}
                aria-label={item.label}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <FontAwesomeIcon
                    icon={item.icon}
                    style={{ fontSize: '20px' }}
                  />

                  <span
                    style={{
                      fontSize: '9px',
                      textAlign: 'center',
                      wordBreak: 'break-word',
                      lineHeight: 1.1,
                      padding: '0 2px',
                    }}
                  >
                    {item.label}
                  </span>
                </div>
              </IconButton>
            ))}
          </div>
        </ColIcons>

        {/* Content Area */}
        <ColContent>
          {isMonitoring ? (
            /* Monitoring Sub-menu List */
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                height: '100%',
                backgroundColor: '#f9fbfd',
              }}
            >
              <div
                style={{
                  padding: '16px',
                  borderBottom: '1px solid #e0e0e0',
                  fontWeight: '600',
                  fontSize: '14px',
                  color: '#333',
                  backgroundColor: '#fff',
                }}
              >
                Monitoring
              </div>
              <div style={{ flex: 1, overflowY: 'auto', padding: '12px 8px' }}>
                {monitoringSubMenuItems.map((subItem) => (
                  <div
                    key={subItem.id}
                    onClick={() => router.push(subItem.href)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '10px 16px',
                      cursor: 'pointer',
                      borderRadius: '6px',
                      marginBottom: '4px',
                      backgroundColor:
                        pathname === subItem.href ? '#e3f2fd' : 'transparent',
                      color: pathname === subItem.href ? '#1976d2' : '#555',
                      fontWeight: pathname === subItem.href ? 600 : 400,
                      transition: 'background-color 0.2s, color 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      if (pathname !== subItem.href) {
                        e.currentTarget.style.backgroundColor = '#f0f4f8';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (pathname !== subItem.href) {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }
                    }}
                  >
                    <FontAwesomeIcon
                      icon={subItem.icon}
                      style={{ width: '16px', marginRight: '12px' }}
                    />
                    <span style={{ fontSize: '13px' }}>{subItem.label}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Normal Default File Tree Layout */
            <>
              {/* Tab Row */}
              <TabRow>
                <TabButton
                  active={fileTab === 'server'}
                  onClick={() => setFileTab('server')}
                >
                  <FontAwesomeIcon
                    icon={faServer}
                    style={{ marginRight: '6px' }}
                  />
                  Server
                </TabButton>
                <TabButton
                  active={fileTab === 'local'}
                  onClick={() => setFileTab('local')}
                >
                  <FontAwesomeIcon
                    icon={faHardDrive}
                    style={{ marginRight: '6px' }}
                  />
                  Local
                </TabButton>
              </TabRow>

              <ContentArea>
                {/* Icon Row */}
                <IconRow>
                  <ActionIcon title="New File">
                    <FontAwesomeIcon icon={faPlus} />
                  </ActionIcon>
                  <IconDivider />
                  <ActionIcon title="New Folder">
                    <FontAwesomeIcon icon={faFolderPlus} />
                  </ActionIcon>
                </IconRow>

                {/* Search Row */}
                <SearchContainer>
                  <SearchWrapper>
                    <SearchInputClean
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search files"
                    />
                    <SearchIconRight>
                      <FontAwesomeIcon icon={faSearch} />
                    </SearchIconRight>
                  </SearchWrapper>
                </SearchContainer>

                {/* Tree View as Accordions */}
                <TreeContainer>
                  <Accordion
                    defaultExpanded
                    sx={{ mb: 1, boxShadow: 'none', border: '1px solid #eee' }}
                  >
                    <AccordionSummary
                      expandIcon={
                        <FontAwesomeIcon
                          icon={faChevronDown}
                          style={{ fontSize: 12 }}
                        />
                      }
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 8,
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faTree}
                          style={{ color: '#666', fontSize: 13 }}
                        />
                        <Typography
                          variant="body2"
                          sx={{ fontWeight: 500, fontSize: 13 }}
                        >
                          INUBIT - X
                        </Typography>
                      </div>
                    </AccordionSummary>
                    <AccordionDetails sx={{ padding: '0 8px 8px' }}>
                      <SimpleTreeView>{renderMuiTree(demoTree)}</SimpleTreeView>
                    </AccordionDetails>
                  </Accordion>

                  <Accordion
                    sx={{ mb: 1, boxShadow: 'none', border: '1px solid #eee' }}
                  >
                    <AccordionSummary
                      expandIcon={
                        <FontAwesomeIcon
                          icon={faChevronDown}
                          style={{ fontSize: 12 }}
                        />
                      }
                      aria-controls="panel2a-content"
                      id="panel2a-header"
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 8,
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faUsers}
                          style={{ color: '#666', fontSize: 13 }}
                        />
                        <Typography
                          variant="body2"
                          sx={{ fontWeight: 500, fontSize: 13 }}
                        >
                          TEAMS
                        </Typography>
                      </div>
                    </AccordionSummary>
                  </Accordion>
                </TreeContainer>
              </ContentArea>
            </>
          )}
        </ColContent>
      </div>
      <Resizer
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        title="Drag to resize"
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
