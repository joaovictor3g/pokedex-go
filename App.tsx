import React from 'react';
import { Routes } from './src/routes/tab.routes';
import { ThemeProvider } from 'styled-components/native';

export interface Colors {
  theme: {
      red: string;
      white: string;
      gray: string;
      blue: string;
  }
};

const globalColors = {
  red: "#EB5757",
  white: "#FAFAFA",
  gray: "#F1F1F1",
  blue: "#48A9E0",
};

export default function App() {
  return (
    <ThemeProvider theme={globalColors}>
      <Routes />
    </ThemeProvider>
  );
}
