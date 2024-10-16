"use client"
import { useState } from "react";
import mockFetchSecureWord from "./api/getSecureWord/route";
import Navbar from "./components/navbar";
import { LogIn, ArrowRightFromLine, Upload } from 'lucide-react';
import bcrypt from 'bcryptjs';
import { useRouter } from "next/navigation";

async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function Index() {
  const router = useRouter()
  const [state, setState] = useState("initialState");
  const [securedWord, getSecureWord] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginMsg, setLoginMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const data = await mockFetchSecureWord()
    getSecureWord(data.word)
    setState("secureWordSecured")
    console.log(username)
  };

  const handleSubmitPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    console.log(hashedPassword)

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, hashedPassword }),
      });

      const data = await res.json();
      setLoginMsg(data.message)
      await sleep(500) //wait 0.5s
      router.push('/home')

    } catch (error) {
      console.error('Error:', error);
    }
  };


  return (
    <>
      <Navbar />
      <main>
        <div className={state === "initialState"
          ? "flex justify-center m-20"
          : "flex justify-center m-20 hidden"}>
          {state === "initialState" && (
            <form onSubmit={handleSubmit}>
              <div>
                <input
                  type="text"
                  className="bg-gray-200 rounded-xl mr-2 placeholder:text-center p-2"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)} />
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                  <div className="flex items-center">
                    <div className="p-1">Login</div> <LogIn size={30} className="p-1" />
                  </div>
                </button>
              </div>
            </form>
          )}
        </div>

        {state === "secureWordSecured" && (
          <>
            <div className={state === "secureWordSecured"
              ? "flex flex-col justify-center items-center m-10"
              : "flex flex-col justify-center items-center m-10 hidden"}>
              <div>Secure Word: {securedWord}</div>

              <button
                onClick={() => setState("securedWordChecked")}
                type="button"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                <div className="flex items-center mx-auto">
                  <div className="p-1">Next</div> <ArrowRightFromLine size={30} className="p-1" />
                </div>
              </button>
            </div>
          </>
        )}

        {state === "securedWordChecked" && (
          <>
            <div className="flex justify-center m-20">
              <form onSubmit={handleSubmitPassword}>
                <div>
                  <input
                    type="password"
                    className="bg-gray-200 rounded-xl mr-2 placeholder:text-center p-2"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} />
                  <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                    <div className="flex items-center">
                      <div className="p-1">Submit</div> <Upload size={30} className="p-1" />
                    </div>
                  </button>
                </div>
              </form>
            </div>
            <div className="flex justify-center items-center m-10">
              {loginMsg && <p className="m-2">{loginMsg}</p>}
            </div>
          </>
        )}
      </main></>
  );
}
