import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./pages/login_page";
import TreePage from "./pages/tree_page";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/tree" element={<TreePage />} />
      </Routes>
    </Router>
  );
}

export default App;
