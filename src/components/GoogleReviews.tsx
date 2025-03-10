import { useEffect } from "react";

const GoogleReviews = () => {
  useEffect(() => {
    // Ensure the script is loaded before initializing Elfsight widgets
    const script = document.createElement("script");
    script.src = "https://static.elfsight.com/platform/platform.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div className="w-full flex justify-center">
      {/* Elfsight Google Reviews Widget */}
      <div className="elfsight-app-c49598ee-833f-4adf-afa0-599c447c8093" data-elfsight-app-lazy></div>
    </div>
  );
};

export default GoogleReviews;
