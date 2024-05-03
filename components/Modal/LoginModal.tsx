// components/LoginModal.tsx
"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
const LoginModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (provider: string) => {
    signIn(provider);
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)} variant="cus">
        Sign In
      </Button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-96 flex items-center justify-center">
            <div className="p-12 z-96 bg-orange-50 rounded-md shadow-lg">
              <h2 className="text-lg text-center font-bold mb-4">
                Sign In Account
              </h2>
              <div className="px-4 py-2 bg-orange-400 text-white rounded transition-all duration-300 hover:bg-orange-600">
                {isLoading ? <Spinner /> : ""}
                <button onClick={() => handleLogin("google")}>
                  Sign in with Google
                </button>
              </div>
            </div>
            <div
              className="absolute -z-10 inset-0 bg-black opacity-50"
              onClick={() => setIsOpen(false)}
            ></div>
          </div>
        </>
      )}
    </>
  );
};

export default LoginModal;
