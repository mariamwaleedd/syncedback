import React from 'react';
import { Globe, X, AlertCircle, Info, CheckCircle2 } from 'lucide-react';
import './CustomDialog.css';

const CustomDialog = ({ 
  isOpen, 
  title, 
  message, 
  type = 'confirm', // 'alert' or 'confirm'
  onConfirm, 
  onCancel,
  confirmText = 'OK',
  cancelText = 'Cancel'
}) => {
  if (!isOpen) return null;

  return (
    <div className="custom-dialog-overlay">
      <div className="custom-dialog-card">
        <div className="custom-dialog-header">
          <div className="header-host">
            <div className="header-dot"></div>
            <span>{title || 'Synced'}</span>
          </div>
          <button className="close-x" onClick={onCancel}>
            <X size={18} />
          </button>
        </div>
        
        <div className="custom-dialog-body">
          <p>{message}</p>
        </div>

        <div className="custom-dialog-footer">
          {type === 'confirm' && (
            <button className="dialog-btn-secondary" onClick={onCancel}>
              {cancelText}
            </button>
          )}
          <button className="dialog-btn-primary" onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomDialog;
