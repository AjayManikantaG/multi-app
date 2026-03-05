'use client';

import React, { useState, useCallback } from 'react';
import { dia } from '@joint/core';
import styled from 'styled-components';
import { DiagramProvider } from './context/DiagramProvider';
import Canvas from './components/Canvas';
import Palette from './components/Palette';
import ContextMenu from './components/ContextMenu';
import Tooltip from './components/Tooltip';
import ConfigModal from './components/ConfigModal';
import Minimap from './components/Minimap';
import TopToolbar from './components/TopToolbar';
import type { ContextMenuEvent, TooltipEvent } from './engine/interactions';

// ============================================================
// STYLED COMPONENTS
// ============================================================

const DesignerWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: ${({ theme }) => theme.colors?.bg?.canvas || '#f0f0f0'};
`;

const CanvasContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const PaletteWrapper = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 100;
`;

const MinimapWrapper = styled.div`
  position: absolute;
  bottom: 20px;
  left: 20px;
  z-index: 90;
  border: 1px solid ${({ theme }) => theme.colors?.border?.subtle || '#ccc'};
  background: #fff;
  border-radius: 4px;
  overflow: hidden;
`;

// ============================================================
// COMPONENT
// ============================================================

export function WorkflowCanvas() {
  const [contextMenuEvent, setContextMenuEvent] =
    useState<ContextMenuEvent | null>(null);
  const [tooltipEvent, setTooltipEvent] = useState<TooltipEvent | null>(null);
  const [configuringCell, setConfiguringCell] = useState<dia.Cell | null>(null);

  const handleContextMenu = useCallback((event: ContextMenuEvent) => {
    setContextMenuEvent(event);
  }, []);

  const handleCloseContextMenu = useCallback(() => {
    setContextMenuEvent(null);
  }, []);

  const handleTooltipShow = useCallback((event: TooltipEvent) => {
    setTooltipEvent(event);
  }, []);

  const handleTooltipHide = useCallback(() => {
    setTooltipEvent(null);
  }, []);

  return (
    <DiagramProvider>
      <DesignerWrapper>
        <CanvasContainer>
          <Canvas
            onContextMenu={handleContextMenu}
            onTooltipShow={handleTooltipShow}
            onTooltipHide={handleTooltipHide}
            onConfigure={setConfiguringCell}
          />
        </CanvasContainer>

        <TopToolbar />

        <PaletteWrapper>
          <Palette />
        </PaletteWrapper>

        <MinimapWrapper>
          <Minimap />
        </MinimapWrapper>

        {/* Floating Overlays */}
        <ContextMenu
          event={contextMenuEvent}
          onClose={handleCloseContextMenu}
        />
        <Tooltip event={tooltipEvent} />

        {configuringCell && (
          <ConfigModal
            cell={configuringCell}
            onClose={() => setConfiguringCell(null)}
          />
        )}
      </DesignerWrapper>
    </DiagramProvider>
  );
}

export default WorkflowCanvas;
