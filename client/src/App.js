import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from 'scenes/homePage';
import LoginPage from 'scenes/loginPage';
import ProfilePage from 'scenes/profilePage';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { themeSettings } from "./theme";


//grabbing mode that we have from our state/initial state, if ever wanting to grab from the store,  useSelector grab the state and correct reducer.
//set up our theme useMemo and createTheme
//theme provider tag configures theme, pass in theme
//then cssbaseline resets css 
//

function App() {

  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);


  return (
    <div className="app">
      
     <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
         <Route path="/" element={<LoginPage />} />
         <Route path="/home" element={<HomePage />} />
         <Route path="/profile/:id" element={<ProfilePage />} />
        </Routes>
      </ThemeProvider>
     </BrowserRouter>
     
    </div>
  );
}

export default App;
