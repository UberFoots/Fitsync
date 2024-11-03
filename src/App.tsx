import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/shared/Layout';
import { Dashboard } from './components/dashboard/Dashboard';
import { Settings } from './components/settings/Settings';
import { Profile } from './components/profile/Profile';
import { Tracking } from './components/tracking/Tracking';
import { LandingPage } from './components/landing/LandingPage';
import { NutrientsAndTargets } from './components/tracking/NutrientsAndTargets';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/tracking" element={<Tracking />} />
        <Route path="/nutrients" element={<NutrientsAndTargets />} />
      </Route>
    </Routes>
  );
}

export default App;