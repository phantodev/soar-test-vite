import { Link } from "react-router-dom";
import { Button } from "@heroui/button";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Page Not Found</h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Button 
          as={Link} 
          to="/"
          color="primary"
          size="lg"
        >
          Go Back Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
