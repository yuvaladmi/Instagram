import { Routes, Route, Navigate } from "react-router-dom";
import { MainLayout } from "./cmps/MainLayout";
import { StoryIndex } from "./pages/StoryIndex";
import { StoryDetails } from "./cmps/StoryDetails";
import { LoginSignup } from "./pages/LoginSignup";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { Profile } from "./pages/Profile";
import { UserDetails } from "./pages/userDetails";
import { CreateStory } from "./cmps/CreateStory";

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" />} />

            {/* עוטף את כל הדפים שצריכים את ה-SideBar */}
            <Route element={<MainLayout />}>
                <Route path="/post" element={<StoryIndex />} />
                <Route path="/post/:storyId" element={<StoryDetails />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/:username" element={<UserDetails />} />
				<Route path="/create" element={<CreateStory />} />
            </Route>

            {/* דף התחברות - בלי סיידבר */}
            <Route path="/login" element={<LoginSignup />}>
                <Route index element={<Login />} />
                <Route path="signup" element={<Signup />} />
            </Route>
        </Routes>
    );
}
