// This file ensures React is globally available for UMD modules
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as jsxRuntime from 'react/jsx-runtime';

// Expose React to the global scope
if (typeof window !== 'undefined') {
  (window as any).React = React;
  (window as any).ReactDOM = ReactDOM;
  (window as any).jsxRuntime = jsxRuntime;
}

export {};