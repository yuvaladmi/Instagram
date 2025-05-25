import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";

export function MainLayout({ children }) {
    return (
        <div className="app-container">
            <SideBar />
            <main className="content-container">
                <Outlet />
            </main>
        </div>
    );
}
