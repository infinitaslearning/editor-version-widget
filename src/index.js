import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { getTheme, vanillaTokens } from '@infinitaslearning/pixel-design-system';
import { ThemeProvider } from '@mui/material/styles';

import App from './App';

const EditorWidget = () => (
  <ThemeProvider theme={getTheme(vanillaTokens)}>
    <App />
  </ThemeProvider>
);

ReactDOM.render(<EditorWidget />, document.getElementById('root'));
