import React, { createContext, useContext, useState, useCallback } from 'react';
import CustomDialog from './CustomDialog';

const DialogContext = createContext();

export const useDialog = () => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error('useDialog must be used within a DialogProvider');
  }
  return context;
};

export const DialogProvider = ({ children }) => {
  const [dialogConfig, setDialogConfig] = useState({
    isOpen: false,
    title: '',
    message: '',
    type: 'alert',
    resolve: null,
  });

  const showAlert = useCallback((message, title = '') => {
    return new Promise((resolve) => {
      setDialogConfig({
        isOpen: true,
        title,
        message,
        type: 'alert',
        resolve,
      });
    });
  }, []);

  const showConfirm = useCallback((message, title = '') => {
    return new Promise((resolve) => {
      setDialogConfig({
        isOpen: true,
        title,
        message,
        type: 'confirm',
        resolve,
      });
    });
  }, []);

  const handleConfirm = () => {
    const { resolve } = dialogConfig;
    setDialogConfig((prev) => ({ ...prev, isOpen: false }));
    if (resolve) resolve(true);
  };

  const handleCancel = () => {
    const { resolve } = dialogConfig;
    setDialogConfig((prev) => ({ ...prev, isOpen: false }));
    if (resolve) resolve(false);
  };

  return (
    <DialogContext.Provider value={{ alert: showAlert, confirm: showConfirm }}>
      {children}
      <CustomDialog
        isOpen={dialogConfig.isOpen}
        title={dialogConfig.title}
        message={dialogConfig.message}
        type={dialogConfig.type}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </DialogContext.Provider>
  );
};
