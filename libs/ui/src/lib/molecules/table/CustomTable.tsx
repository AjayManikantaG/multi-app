import React, { useMemo } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { HeaderContainer, TitleRow, FilterRow } from './custom-table.styles';

export interface CustomTableProps {
  rows: any[];
  columns: GridColDef[];
  filters: Record<string, string>;
  onFilterChange: (field: string, value: string) => void;
}

export const CustomTable: React.FC<CustomTableProps> = ({
  rows,
  columns,
  filters,
  onFilterChange,
}) => {
  // Enhance columns with custom 2-row header via renderHeader property
  const enhancedColumns = useMemo(() => {
    return columns.map((col) => {
      // Find unique data values for this specific column
      const uniqueValues = Array.from(
        new Set(rows.map((r) => r[col.field]))
      ).filter((v) => v !== undefined && v !== null && v !== '');

      return {
        ...col,
        // Override the default header rendering
        renderHeader: () => (
          <HeaderContainer>
            {/* The default DataGrid sort icon will still appear next to this container when hovered/active */}
            <TitleRow>{col.headerName || col.field}</TitleRow>
            
            {/* Prevent click events from triggering column sorting when interacting with the select element */}
            <FilterRow onClick={(e) => e.stopPropagation()}>
              <select
                value={filters[col.field] || 'ALL'}
                onChange={(e) => onFilterChange(col.field, e.target.value)}
              >
                <option value="ALL">ALL</option>
                {uniqueValues.map((val) => (
                  <option key={String(val)} value={String(val)}>
                    {String(val)}
                  </option>
                ))}
              </select>
            </FilterRow>
          </HeaderContainer>
        ),
      };
    });
  }, [columns, rows, filters, onFilterChange]);

  // Apply active filters to rows
  const filteredRows = useMemo(() => {
    return rows.filter((row) => {
      return Object.entries(filters).every(([field, filterVal]) => {
        if (!filterVal || filterVal === 'ALL') return true;
        return String(row[field]) === filterVal;
      });
    });
  }, [rows, filters]);

  return (
    <div style={{ height: 600, width: '100%' }}>
      <DataGrid
        rows={filteredRows}
        columns={enhancedColumns}
        // Increase header height to accommodate title and filter dropdown
        columnHeaderHeight={85}
        // Optional: Disable the native column menu since we provide explicit inline filters
        disableColumnMenu
      />
    </div>
  );
};
