import './App.css';
import BackToTopButton from './Components/BackToTopButton';
// import Home from './Components/Home/Home';
import Store from './Components/Store'

function App() {
  return (
    <div className="container mt-5">
      {/* <Home /> */}
      <Store />
      <BackToTopButton />
    </div>
  );
}

export default App;
