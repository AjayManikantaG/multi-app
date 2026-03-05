import React, { useState } from 'react';
import styled from 'styled-components';
import {
  Dialog,
  IconButton,
  Typography,
  TextField,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Button as MuiButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

// ============================================================
// STYLED COMPONENTS
// ============================================================

const StyledDialog = styled(Dialog)`
  .MuiDialog-paper {
    width: 900px;
    max-width: 95vw;
    height: 700px;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  background-color: #f3f3f3;
  border-bottom: 1px solid #e0e0e0;
`;

const HeaderTitle = styled(Typography)`
  flex: 1;
  font-size: 14px !important;
  font-weight: 500 !important;
  color: #333;
  margin-left: 8px !important;
`;

const Body = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
  background-color: #f9f9f9;
`;

const Sidebar = styled.div`
  width: 250px;
  background-color: #f3f3f3;
  border-right: 1px solid #e0e0e0;
  display: flex;
  flex-direction: column;
`;

const TabItem = styled.div<{ $active?: boolean }>`
  padding: 12px 16px;
  font-size: 13px;
  color: ${({ $active }) => ($active ? '#fff' : '#333')};
  background-color: ${({ $active }) => ($active ? '#3f51b5' : 'transparent')};
  cursor: pointer;
  border-bottom: 1px solid #e0e0e0;

  &:hover {
    background-color: ${({ $active }) => ($active ? '#3f51b5' : '#e8e8e8')};
  }
`;

const ContentArea = styled.div`
  flex: 1;
  padding: 24px;
  overflow-y: auto;
  background-color: #fff;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const FormLabel = styled(Typography)`
  font-size: 13px !important;
  font-weight: 500 !important;
  color: #333;
  margin-bottom: 6px !important;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: #f3f3f3;
  border-top: 1px solid #e0e0e0;
`;

const FooterRight = styled.div`
  display: flex;
  gap: 8px;
`;

const StyledButton = styled(MuiButton)<{ $variant?: 'primary' | 'secondary' }>`
  text-transform: none !important;
  font-size: 13px !important;
  padding: 6px 16px !important;
  background-color: ${({ $variant }) =>
    $variant === 'primary' ? '#dca629 !important' : '#e0e0e0 !important'};
  color: ${({ $variant }) =>
    $variant === 'primary' ? '#fff !important' : '#333 !important'};
  box-shadow: none !important;

  &:hover {
    background-color: ${({ $variant }) =>
      $variant === 'primary' ? '#c29224 !important' : '#d5d5d5 !important'};
  }
`;

const SchemaCheckWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
`;

// ============================================================
// COMPONENT
// ============================================================

export interface ModuleConfigModalProps {
  open: boolean;
  onClose: () => void;
  moduleType?: string;
  initialData?: Record<string, any>;
  onSave?: (data: Record<string, any>) => void;
}

export const ModuleConfigModal: React.FC<ModuleConfigModalProps> = ({
  open,
  onClose,
  moduleType = 'HTTP Connector',
  initialData = {},
  onSave,
}) => {
  const [activeTab, setActiveTab] = useState('HTTP Connector Properties');

  const [formData, setFormData] = useState<Record<string, any>>(initialData);

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <StyledDialog open={open} onClose={onClose} maxWidth={false}>
      <Header>
        {/* Replace with actual icon if available */}
        <div
          style={{
            width: 24,
            height: 24,
            backgroundColor: '#4caf50',
            borderRadius: 4,
          }}
        />
        <HeaderTitle>Create New module - {moduleType}</HeaderTitle>
        <IconButton size="small" onClick={onClose}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </Header>

      <Body>
        <Sidebar>
          <TabItem
            $active={activeTab === 'General module properties'}
            onClick={() => setActiveTab('General module properties')}
          >
            General module properties
          </TabItem>
          <TabItem
            $active={activeTab === 'System Connector properties'}
            onClick={() => setActiveTab('System Connector properties')}
          >
            System Connector properties
          </TabItem>
          <TabItem
            $active={activeTab === 'HTTP Connector Properties'}
            onClick={() => setActiveTab('HTTP Connector Properties')}
          >
            HTTP Connector Properties
          </TabItem>
        </Sidebar>

        <ContentArea>
          {activeTab === 'HTTP Connector Properties' && (
            <>
              <FormGroup>
                <FormLabel>Module</FormLabel>
                <TextField
                  fullWidth
                  size="small"
                  label="Name"
                  placeholder="Enter the value"
                  variant="outlined"
                  value={formData.moduleName || ''}
                  onChange={(e) => handleChange('moduleName', e.target.value)}
                  sx={{ mb: 2 }}
                />

                <Select
                  fullWidth
                  size="small"
                  displayEmpty
                  value={formData.pluginGroup || ''}
                  onChange={(e) => handleChange('pluginGroup', e.target.value)}
                  sx={{ mb: 2, fontSize: 13 }}
                >
                  <MenuItem value="" disabled>
                    Select Value (Plug-in group)
                  </MenuItem>
                  <MenuItem value="group1">Group 1</MenuItem>
                  <MenuItem value="group2">Group 2</MenuItem>
                </Select>

                <Select
                  fullWidth
                  size="small"
                  displayEmpty
                  value={formData.pluginName || ''}
                  onChange={(e) => handleChange('pluginName', e.target.value)}
                  sx={{ fontSize: 13 }}
                >
                  <MenuItem value="" disabled>
                    Select Value (Plug-in Name)
                  </MenuItem>
                  <MenuItem value="plugin1">Plugin 1</MenuItem>
                  <MenuItem value="plugin2">Plugin 2</MenuItem>
                </Select>
              </FormGroup>

              <FormGroup>
                <FormLabel>Message type</FormLabel>
                <Select
                  fullWidth
                  size="small"
                  displayEmpty
                  value={formData.inputType || ''}
                  onChange={(e) => handleChange('inputType', e.target.value)}
                  sx={{ mb: 1, fontSize: 13 }}
                >
                  <MenuItem value="" disabled>
                    Input* Select Value
                  </MenuItem>
                  <MenuItem value="json">JSON</MenuItem>
                  <MenuItem value="xml">XML</MenuItem>
                </Select>
                <SchemaCheckWrapper>
                  <FormControlLabel
                    control={
                      <Checkbox
                        size="small"
                        checked={!!formData.schemaCheckInput}
                        onChange={(e) =>
                          handleChange('schemaCheckInput', e.target.checked)
                        }
                      />
                    }
                    label={<Typography fontSize={13}>Schema check</Typography>}
                    sx={{ margin: 0 }}
                  />
                  <TextField
                    size="small"
                    placeholder="Select Value"
                    disabled={!formData.schemaCheckInput}
                  />
                </SchemaCheckWrapper>

                <Select
                  fullWidth
                  size="small"
                  displayEmpty
                  value={formData.outputType || ''}
                  onChange={(e) => handleChange('outputType', e.target.value)}
                  sx={{ mt: 3, mb: 1, fontSize: 13 }}
                >
                  <MenuItem value="" disabled>
                    Output* Select Value
                  </MenuItem>
                  <MenuItem value="json">JSON</MenuItem>
                  <MenuItem value="xml">XML</MenuItem>
                </Select>
                <SchemaCheckWrapper>
                  <FormControlLabel
                    control={
                      <Checkbox
                        size="small"
                        checked={!!formData.schemaCheckOutput}
                        onChange={(e) =>
                          handleChange('schemaCheckOutput', e.target.checked)
                        }
                      />
                    }
                    label={<Typography fontSize={13}>Schema check</Typography>}
                    sx={{ margin: 0 }}
                  />
                  <TextField
                    size="small"
                    placeholder="Select Value"
                    disabled={!formData.schemaCheckOutput}
                  />
                </SchemaCheckWrapper>
              </FormGroup>

              <FormGroup>
                <FormLabel>Error suppression</FormLabel>
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      checked={!!formData.errorSuppression}
                      onChange={(e) =>
                        handleChange('errorSuppression', e.target.checked)
                      }
                    />
                  }
                  label={
                    <Typography fontSize={13}>
                      Consider workflow as successful despite executed error
                      branch or scope
                    </Typography>
                  }
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>Comment</FormLabel>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  placeholder="Enter the value"
                  variant="outlined"
                  size="small"
                  value={formData.comment || ''}
                  onChange={(e) => handleChange('comment', e.target.value)}
                />
              </FormGroup>
            </>
          )}
          {activeTab !== 'HTTP Connector Properties' && (
            <Typography color="textSecondary" fontSize={13}>
              Settings for {activeTab} will appear here.
            </Typography>
          )}
        </ContentArea>
      </Body>

      <Footer>
        <div>
          <StyledButton $variant="secondary" style={{ marginRight: 8 }}>
            &lt; Back
          </StyledButton>
          <StyledButton $variant="secondary">Next &gt;</StyledButton>
        </div>
        <FooterRight>
          <StyledButton $variant="secondary" onClick={onClose}>
            Cancel
          </StyledButton>
          <StyledButton $variant="secondary">Validate</StyledButton>
          <StyledButton
            $variant="primary"
            onClick={() => {
              if (onSave) onSave(formData);
              onClose();
            }}
          >
            Finish
          </StyledButton>
        </FooterRight>
      </Footer>
    </StyledDialog>
  );
};
