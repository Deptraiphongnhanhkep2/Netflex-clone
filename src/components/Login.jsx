import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "../assets/Images/logo.png";

function Login() {
  const [signState, setSignState] = useState("Sign In");

  const inputClass =
    "w-full h-12 px-4 my-3 text-sm font-medium text-white bg-neutral-600 rounded-sm";

  const toggleSignState = () => {
    setSignState((prev) => (prev === "Sign In" ? "Sign Up" : "Sign In"));
  };

  // Animation variants
  const variants = {
    initial: (direction) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    animate: { x: 0, opacity: 1 },
    exit: (direction) => ({
      x: direction > 0 ? -100 : 100,
      opacity: 0,
    }),
  };

  const direction = signState === "Sign Up" ? 1 : -1;

  return (
    <div className="h-screen bg-[linear-gradient(#0000007e,#0000007e),url('./assets/Images/background.jpg')] bg-cover bg-center">
      {/* Logo */}
      <div className="p-8">
        <img src={Logo} alt="Logo" className="w-36 cursor-pointer" />
      </div>

      {/* Form Container */}
      <div className="flex items-center justify-center">
        <div className="w-full max-w-md p-10 bg-[rgba(0,0,0,0.75)] rounded-sm overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.form
              key={signState}
              variants={variants}
              custom={direction}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.4 }}
            >
              <h1 className="mb-7 text-4xl font-semibold text-white text-center">
                {signState}
              </h1>

              {/* Only show name input on Sign Up */}
              {signState === "Sign Up" && (
                <input
                  type="text"
                  placeholder="Your name"
                  className={inputClass}
                />
              )}

              <input type="email" placeholder="Email" className={inputClass} />
              <input
                type="password"
                placeholder="Password"
                className={inputClass}
              />

              <button className="w-full h-10 px-2 mt-5 mb-5 text-sm text-center bg-red-500 cursor-pointer">
                {signState}
              </button>

              {/* Remember Me + Help */}
              <div className="flex items-center justify-between text-gray-500">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input type="checkbox" id="remember" className="w-4 mt-1" />
                  Remember Me
                </label>
                <p className="cursor-pointer">Need Help?</p>
              </div>
            </motion.form>
          </AnimatePresence>

          {/* Toggle between Sign In / Sign Up */}
          <div className="mt-10 text-sm text-center text-gray-400">
            {signState === "Sign In" ? (
              <p>
                New to Netflex?
                <span
                  className="ml-1.5 font-medium text-white cursor-pointer"
                  onClick={toggleSignState}
                >
                  Sign Up Now
                </span>
              </p>
            ) : (
              <p>
                Already Have Account?
                <span
                  className="ml-1.5 font-medium text-white cursor-pointer"
                  onClick={toggleSignState}
                >
                  Sign In
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
