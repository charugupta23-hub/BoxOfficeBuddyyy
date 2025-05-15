import React from "react";
import { motion } from "framer-motion";
import { Film } from "lucide-react";

const WelcomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-red-700 to-red-500 flex flex-col items-center justify-center text-white p-8">

      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2 }}
        className="text-center space-y-10 max-w-2xl mx-auto"
      >
        {/* Film Icon with Animation */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
        >
          <Film className="w-28 h-28 text-white mx-auto animate-pulse" />
        </motion.div>

        {/* Header */}
        <h1 className="text-6xl font-extrabold tracking-wide text-center text-transparent bg-clip-text bg-gradient-to-r from-white to-red-300">
          Welcome to <span className="text-white">BoxOfficeBuddy</span>
        </h1>

        {/* Description Text */}
        <p className="text-lg max-w-xl mx-auto text-red-100 opacity-90">
          Your gateway to effortless movie ticket bookings. Discover the best movies playing now and secure your seat before it's too late!
        </p>

        {/* Call-to-Action Button */}
        <motion.button
          whileHover={{ scale: 1.05, backgroundColor: "#ffffff", color: "#b91c1c", boxShadow: "0 4px 12px rgba(0,0,0,0.3)" }}
          className="mt-8 px-10 py-4 bg-white text-red-700 font-bold rounded-3xl shadow-2xl hover:bg-red-100 transition duration-300"
          onClick={() => window.location.href = "/home"}
        >
          Now Showing
        </motion.button>
      </motion.div>
    </div>
  );
};

export default WelcomePage;
