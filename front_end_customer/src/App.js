import List  from "./components/List";
import Create from "./components/Create";
import Edit from "./components/Edit";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Link } from "react-router-dom";
function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand navbar-light bg-light">
          <div className="nav navbar-nav">
              <Link className="nav-item nav-link active" to={ "/" }>Lista de clientes</Link>
              <Link className="nav-item nav-link" to={ "/create" }>Crear Cliente</Link>
          </div>
      </nav>
      <div className="container">   
      <br/><br/>
        <Routes>
          <Route exact path="/" element={ <List/>}></Route>      
          <Route path="/create" element={ <Create/>}></Route>
          <Route path="/edit/:id" element={ <Edit/>}></Route>        
        </Routes>
      </div>
    </Router>
  );
}

export default App;
