import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackPageView, initTracker, cleanupTracker } from "@/lib/tracker";

const TrackingProvider = () => {
  const location = useLocation();

  useEffect(() => {
    initTracker();
    return () => cleanupTracker();
  }, []);

  useEffect(() => {
    trackPageView(location.pathname);
  }, [location.pathname]);

  return null;
};

export default TrackingProvider;
