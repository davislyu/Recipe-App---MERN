import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Home } from "./pages/home";
import { Auth } from "./pages/auth";
import { CreateRecipe } from "./pages/create-recipe";
import { SavedRecipes } from "./pages/saved-recipes";
import { Navbar } from './components/navbar';

function App() {
  return (
    <div className="App">
      <Router>
        <div className="background-image"></div>

        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} ></Route>
          <Route path="/auth" element={<Auth />} ></Route>
          <Route path="/create-recipe" element={<CreateRecipe />} ></Route>
          <Route path="/saved-recipes" element={<SavedRecipes />} ></Route>
        </Routes>

        <ToastContainer />
      </Router>
    </div>
  );
}

export default App;
