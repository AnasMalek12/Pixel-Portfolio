
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import PixelWindow from "@/components/PixelWindow";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <PixelWindow title="error.txt" className="max-w-md w-full">
        <div className="flex flex-col items-center justify-center">
          <h1 className="font-pixel text-2xl text-pixel-pink mb-4">404</h1>
          <p className="font-mono text-sm mb-4">File not found</p>
          <div className="font-mono text-xs text-gray-400 mb-6">
            The page you are looking for does not exist or has been moved.
          </div>
          <Link to="/" className="pixel-btn">
            Return Home
          </Link>
        </div>
      </PixelWindow>
    </div>
  );
};

export default NotFound;
