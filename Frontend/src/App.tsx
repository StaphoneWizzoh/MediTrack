import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Home, Auth, NotFound, Profile } from "./pages";

const App = () => {
    return (
        <div className="min-h-screen bg-gradient-to-r from-gray-200 to-blue-200">
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />

                    <Route path="/auth" element={<Auth />} />
                    <Route path="/profile" element={<Profile />} />

                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Router>
        </div>
    );
};

export default App;
