import './App.css';
import BackToTopButton from './Components/BackToTopButton';
import Home from './Components/Home/Home';
import { theme } from './theme';

function App() {
  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <div className="container mt-5 vh-100 pt-5">
          <Home />
          <BackToTopButton />
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
