import { useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useLiveQuery } from "dexie-react-hooks";
import { Toaster } from "sonner";
import { db } from "./db/db";
import { useConfigStore } from "./store/useConfigStore";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import ResultForm from "./components/ResultForm";
import SetupWizard from "./pages/SetupWizard";
import ResultsList from "./pages/ResultsList";
import Settings from "./pages/Settings";
import EditResult from "./pages/EditResult";

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const setConfig = useConfigStore((state) => state.setConfig);

  const config = useLiveQuery(() => db.config.get(1));

  useEffect(() => {
    if (config === undefined) return; // Still loading

    if (config) {
      setConfig(config);
      if (!config.isSetupComplete && location.pathname !== "/setup") {
        navigate("/setup", { replace: true });
      }
    } else {
      // No config exists yet
      if (location.pathname !== "/setup") {
        navigate("/setup", { replace: true });
      }
    }
  }, [config, navigate, location.pathname, setConfig]);

  // if (config === undefined) {
  //   return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  // }

  return (
    <>
      <Toaster position="top-right" richColors />
      <Routes>
        <Route path="/setup" element={<SetupWizard />} />
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/results/create" element={<ResultForm />} />
          <Route path="/results/edit/:id" element={<EditResult />} />
          <Route path="/results" element={<ResultsList />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
