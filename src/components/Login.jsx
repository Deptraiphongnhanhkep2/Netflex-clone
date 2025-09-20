import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "../assets/Images/logo.png";

const Login = () => {
  const [signState, setSignState] = useState("Sign In");
  const direction = signState === "Sign Up" ? 1 : -1;

  // Common styles for input fields
  const inputClass =
    "w-full h-12 px-4 my-3 text-sm font-medium text-white bg-neutral-600 rounded-sm placeholder-gray-300";

  // Animation variants for sliding forms
  const variants = {
    initial: (dir) => ({ x: dir > 0 ? 100 : -100, opacity: 0 }),
    animate: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? -100 : 100, opacity: 0 }),
  };

  return (
    <section className="h-screen bg-cover bg-center bg-[linear-gradient(#0000007e,#0000007e),url('./assets/Images/background.jpg')]">
      {/* Logo */}
      <header className="p-8">
        <img src={Logo} alt="Netflix Logo" className="w-36 cursor-pointer" />
      </header>

      {/* Auth Container */}
      <div className="flex items-center justify-center">
        <div className="w-full max-w-md p-10 bg-black/75 rounded-sm overflow-hidden">
          {/* Animated Form */}
          <AnimatePresence mode="wait" custom={direction}>
            <motion.form
              key={signState}
              custom={direction}
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.4 }}
            >
              {/* Title */}
              <h1 className="mb-7 text-center text-4xl font-semibold text-white">
                {signState}
              </h1>

              {/* Name field (Sign Up only) */}
              {signState === "Sign Up" && (
                <input
                  type="text"
                  placeholder="Your name"
                  className={inputClass}
                />
              )}

              {/* Email and Password fields */}
              <input type="email" placeholder="Email" className={inputClass} />
              <input
                type="password"
                placeholder="Password"
                className={inputClass}
              />

              {/* Submit Button */}
              <button className="mt-5 mb-5 h-10 w-full rounded-sm bg-red-600 text-sm font-medium text-white transition hover:bg-red-700">
                {signState}
              </button>

              {/* Remember Me & Help */}
              <div className="flex items-center justify-between text-sm text-gray-400">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input type="checkbox" className="h-4 w-4" />
                  Remember Me
                </label>
                <p className="cursor-pointer hover:underline">Need Help?</p>
              </div>
            </motion.form>
          </AnimatePresence>

          {/* Toggle between Sign In / Sign Up */}
          <div className="mt-10 text-center text-sm text-gray-400">
            {signState === "Sign In" ? (
              <p>
                New to Netflix?
                <span
                  onClick={() => setSignState("Sign Up")}
                  className="ml-1.5 cursor-pointer font-medium text-white hover:underline"
                >
                  Sign Up Now
                </span>
              </p>
            ) : (
              <p>
                Already have an account?
                <span
                  onClick={() => setSignState("Sign In")}
                  className="ml-1.5 cursor-pointer font-medium text-white hover:underline"
                >
                  Sign In
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
