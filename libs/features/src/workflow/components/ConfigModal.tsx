'use client';

import React, { useState, useEffect } from 'react';
import { dia } from '@joint/core';
import { useDiagram } from '../context/DiagramProvider';
import { ModuleConfigModal } from '@temp-workspace/ui';

interface ConfigModalProps {
  cell: dia.Cell;
  onClose: () => void;
}

export default function ConfigModal({ cell, onClose }: ConfigModalProps) {
  const { commandManager } = useDiagram();

  // Form state synced with cell
  const [initialData, setInitialData] = useState<Record<string, any>>({});

  // Initialize state from cell attributes
  useEffect(() => {
    if (!cell) return;

    setInitialData({
      moduleName:
        (cell.attr('module/name') as string) ||
        (cell.attr('label/text') as string) ||
        '',
      pluginGroup: (cell.attr('module/pluginGroup') as string) || '',
      pluginName: (cell.attr('module/pluginName') as string) || '',
      inputType: (cell.attr('module/inputType') as string) || '',
      outputType: (cell.attr('module/outputType') as string) || '',
      errorSuppression:
        (cell.attr('module/errorSuppression') as boolean) || false,
      comment: (cell.attr('module/comment') as string) || '',
      schemaCheckInput:
        (cell.attr('module/schemaCheckInput') as boolean) || false,
      schemaCheckOutput:
        (cell.attr('module/schemaCheckOutput') as boolean) || false,
    });
  }, [cell]);

  const handleSave = (data: Record<string, any>) => {
    commandManager.startBatch('configure-element');

    // Save attributes to cell
    if (data.moduleName !== undefined)
      cell.attr('module/name', data.moduleName);
    if (data.pluginGroup !== undefined)
      cell.attr('module/pluginGroup', data.pluginGroup);
    if (data.pluginName !== undefined)
      cell.attr('module/pluginName', data.pluginName);
    if (data.inputType !== undefined)
      cell.attr('module/inputType', data.inputType);
    if (data.outputType !== undefined)
      cell.attr('module/outputType', data.outputType);
    if (data.errorSuppression !== undefined)
      cell.attr('module/errorSuppression', data.errorSuppression);
    if (data.comment !== undefined) cell.attr('module/comment', data.comment);
    if (data.schemaCheckInput !== undefined)
      cell.attr('module/schemaCheckInput', data.schemaCheckInput);
    if (data.schemaCheckOutput !== undefined)
      cell.attr('module/schemaCheckOutput', data.schemaCheckOutput);

    // Also update the visible label to match the module name
    if (data.moduleName) {
      cell.attr('label/text', data.moduleName);
    }

    commandManager.stopBatch();
  };

  return (
    <ModuleConfigModal
      open={true}
      onClose={onClose}
      initialData={initialData}
      onSave={handleSave}
      moduleType={
        cell.get('type') === 'httpConnector'
          ? 'HTTP Connector'
          : (cell.attr('label/text') as string) || 'Module'
      }
    />
  );
}
