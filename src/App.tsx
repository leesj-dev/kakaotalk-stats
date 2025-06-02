import MainPage from "./components/pages/MainPage";
import { Routes, Route } from "react-router-dom";
import AttachmentPage from "./components/pages/AttachmentPage";
import DashboardPage from "./components/pages/DashboardPage";
import Footer from "./components/sections/footer/Footer";
import DetailPage from "./components/pages/DetailPage";
import FloatingMenu from "./components/molecules/common/FloatingMenu";
import Wrapper from "./components/wrapper/Wrapper";
import GlobalStyle from "./style/GlobalStyles";
import Navigation from "./components/sections/navigation/Navigation";
import { useLocation } from "react-router-dom";
import NotFoundPage from "./components/pages/NotFoundPage";

function App() {
    const location = useLocation();
    const isDashboardPage = location.pathname === "/dashboard";

    return (
        <>
            <GlobalStyle />
            <Wrapper>
                <FloatingMenu />
                <Navigation />
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/attachment" element={<AttachmentPage />} />
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/detail" element={<DetailPage />} />

                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
                {isDashboardPage ? <Footer dashboard={true} /> : <Footer />}
            </Wrapper>
        </>
    );
}

export default App;
