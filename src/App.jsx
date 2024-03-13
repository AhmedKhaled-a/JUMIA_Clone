import './App.css';
import BackToTopButton from './Components/BackToTopButton';
import Home from './Components/Home/Home';

function App() {
  return (
    <div className="container mt-5 vh-100 pt-5">
      <Home />
      <BackToTopButton />
    </div>
  );
}

export default App;
