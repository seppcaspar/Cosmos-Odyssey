import { createTheme, MantineProvider } from "@mantine/core";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
//import './index.css'

const theme = createTheme(
  {

  }
);

createRoot(document.getElementById('root')).render(


  <MantineProvider defaultColorScheme="dark">
    <StrictMode>
      <App />
    </StrictMode>
  </MantineProvider>
)
