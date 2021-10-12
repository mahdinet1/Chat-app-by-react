import React,{Suspense} from "react";
import Login from "./pages/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
//import ChatApp from "./pages/ChatApp";
 const ChatApp = React.lazy(()=>import('./pages/ChatApp'))
const App = () => {
  return (
    <Router>
      <div>
        <AuthProvider>
          <Switch>
            <Route component={Login} path="/" exact />
            <Route  path="/chats" exact >
              <Suspense fallback={<div>Loading...</div>}>
                <ChatApp />
              </Suspense>
            </Route>
          </Switch>
        </AuthProvider>
      </div>
    </Router>
  );
};

export default App;
