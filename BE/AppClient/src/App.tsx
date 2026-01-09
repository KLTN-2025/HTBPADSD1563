import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import CuocBoPhieuPage from './pages/CuocBoPhieuPage';
import CuocBoPhieuDetailPage from './pages/CuocBoPhieuDetailPage';
import ResultsPage from './pages/ResultsPage';
import OrganizationsPage from './pages/OrganizationsPage';
import VotersPage from './pages/VotersPage';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/cuoc-bo-phieu" element={<CuocBoPhieuPage />} />
            <Route path="/cuoc-bo-phieu/:id" element={<CuocBoPhieuDetailPage />} />
            <Route path="/cuoc-bo-phieu/:id/ket-qua" element={<ResultsPage />} />
            <Route path="/to-chuc" element={<OrganizationsPage />} />
            <Route path="/cu-tri" element={<VotersPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Layout>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
