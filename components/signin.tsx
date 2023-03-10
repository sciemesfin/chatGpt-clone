import Link from "next/link";
import React, { useState } from "react";
import { validator } from "../utils/validator";



import {

  signInWithPhoneNumber,
  RecaptchaVerifier,
} from "firebase/auth";
import { auth } from "../firebase/config";



export default function Signin() {
  const[otp,setOtp]=useState("")
  const [valid, setValid] = useState({
    phone: true,
  });
  const [user, setUser] = useState({ phone: "0955404902" });

  const handlePhone = (e: string) => {
    const validPhone = validator.validatePhoneNumber(e);
    setValid({ ...valid, phone: validPhone });
    setUser({ ...user, phone: e });
  };

  const checkCaptcha=()=>{
    // if (typeof window !== "undefined")
    // window.recaptchaVerifier = new RecaptchaVerifier(
    //   "sign-in-button",
    //   {
    //     size: "invisible",
    //     callback: () => { },
    //   },
    //   auth
    // );
  }

  const submit = () => {
  
    // checkCaptcha()
    // const appVerifier = window.recaptchaVerifier;
    // signInWithPhoneNumber(auth, user.phone, appVerifier)
    // .then((confirmationResult) => {
      
    //   window.confirmationResult = confirmationResult;
    //   // ...
    // }).catch((error) => {
    //  console.log(error)
    // });

  };

  return (
    <div>
      <div
        className="bg-no-repeat bg-cover bg-center relative"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1951&amp;q=80)",
        }}
      >
        <div className="md:absolute bg-gradient-to-b from-green-500 to-green-400 opacity-75 inset-0 z-0"></div>
        <div className="min-h-screen sm:flex sm:flex-row mx-0 justify-center">
          <div className="flex-col flex  self-center p-10 sm:max-w-5xl xl:max-w-2xl  z-10">
            <div className="self-start hidden lg:flex flex-col  text-white">
              <h1 className="mb-3 font-bold text-5xl">Hi ? Welcome EtyopChat</h1>
              <p className="pr-3">
                Lorem ipsum is placeholder text commonly used in the graphic,
                print, and publishing industries for previewing layouts and
                visual mockups
              </p>
            </div>
          </div>
          <div className="flex justify-center self-center  z-10">
            <div className="p-12 bg-white mx-auto rounded-2xl w-100 ">
              <div className="mb-4">
                <h3 className="font-semibold text-2xl text-gray-800">
                  Sign In{" "}
                </h3>
                <p className="text-gray-500">Please sign in to your account.</p>
              </div>
              <div className="space-y-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 tracking-wide">
                    Phone Number
                  </label>
                  <input
                    className={`w-full content-center text-base px-4 py-2 border ${
                      valid.phone ? "border-gray-300" : "border-red-600"
                    } rounded-lg focus:outline-none`}
                    type=""
                    placeholder="+251911522902"
                    value={user.phone}
                    onChange={(e) => handlePhone(e.target.value)}
                  />
                </div>

                <div className="flex pt-4 items-center justify-between">
                  <div className="flex items-center">
                    <label
                      htmlFor="remember_me"
                      className="ml-2 block text-sm text-gray-800"
                    >
                      Don&#39;t you have an account?
                    </label>
                  </div>
                  <div className="text-sm">
                    <Link
                      href="/join"
                      className="text-green-400 hover:text-green-500"
                    >
                      Sign up now
                    </Link>
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center bg-green-400  hover:bg-green-500 text-gray-100 p-3  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500"
                    disabled={valid.phone && user.phone !== "" ? false : true}
                    onClick={submit}
                  >
                    Sign in
                  </button>
                </div>
              </div>

              <div className="pt-5 text-center text-gray-400 text-xs">
                <span>
                  Copyright ?? 2021-2022
                  <Link
                    href="https://bizenforce.vercel.app/"
                    rel=""
                    target="_blank"
                    title="Ajimon"
                    className="text-green hover:text-green-500 pl-2"
                  >
                    BizEnforce
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="sign-in-button"></div>
    </div>
  );
}
