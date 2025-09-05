import './App.css'
import AllRoutes from "./components/all-routes/index.jsx";
import "./index.css";
import {AuthProvider} from "./components/auth/AuthProvider.jsx";

function App() {
  return (
    <>
      <AuthProvider>
        <AllRoutes/>
      </AuthProvider>
    </>
  )
}

export default App
