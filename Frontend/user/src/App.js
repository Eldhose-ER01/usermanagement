import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import User from './Routes/UserRoutes'
import Admin from './Routes/Adminroutes'
function App() {
  return (
    <div className="page">
      <Router>
        <Routes>
          <Route path='/*'element={<User/>} />
          <Route path='/admin/*'element={<Admin />} />
        
        </Routes>
      </Router>
    </div>
  );
}

export default App;
