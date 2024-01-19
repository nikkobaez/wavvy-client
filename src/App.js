import { Routes, Route } from "react-router-dom";
import { Home, Login, Signup, Dashboard, Profile } from "./pages";
import { ProtectedRoute } from "./components";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/login" element = {<Login />}/>
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={
                <ProtectedRoute>
                    <Dashboard />
                </ProtectedRoute>
            }/>
            <Route path="/profile" element={
                <ProtectedRoute>
                    <Profile />
                </ProtectedRoute>
            }/>
        </Routes>
    );
}

export default App;
