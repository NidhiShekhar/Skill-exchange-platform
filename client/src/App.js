import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "../src/pages/HomePage";
import ProfilePage from "../src/pages/ProfilePage";
import ProjectDetailsPage from "./pages/ProjectDetailsPage";
import AboutUsPage from "./pages/AboutUsPage";
import LoginPage from "./pages/LoginPage";
import Skills from "./pages/Skills";
import SignupPage from "./pages/SignupPage";
import SkillDetails from "./pages/SkillDetails";// Import SkillDetails
import ProjectPage from "./pages/ProjectPage";
import NotificationsPage from "./pages/NotificationsPage";

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profilepage" element={<ProfilePage />} />
          <Route path="/explore" element={<ProjectDetailsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/about-us" element={<AboutUsPage />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/register" element={<SignupPage />} />
          <Route path="/skill-details/:skill_id" element={<SkillDetails />} /> {/* Add new route */}
            <Route path="/project" element={<ProjectPage />} />
            <Route path="/notifications" element={<NotificationsPage />} />

        </Routes>
      </Router>
  );
}

export default App;