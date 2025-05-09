import { Button } from "../components/Button";
import { useState } from "react";
import { useUserStore } from "../store/userStore";

export const Login = () => {
  const { login } = useUserStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handelLogin = async () => {
    try {
      await login(email, password);
      alert("register success");
    } catch (error) {
      alert("register failed");
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white shadow-md rounded px-6 py-8 ">
        <span className="text-3xl text-[#0c0eff] font-bold mb-2">Login</span>
        <div className="flex flex-col gap-4 mt-2">
          <input
            type="email"
            placeholder="email or username"
            className="focus:outline-2 px-2 focus:outline-[#0c0eff]"
            onChange={(e) => setEmail((m) => (m = e.target.value))}
          />
          <input
            type="text"
            placeholder="password"
            className="focus:outline-2 px-2 focus:outline-[#0c0eff]"
            onChange={(e) => setPassword((p) => (p = e.target.value))}
          />
        </div>
        <div className="flex flex-col mt-2">
          <div>
            Don't have an account{" "}
            <span className="hover:underline text-[#85a8ff] cursor-pointer ease-in duration-150">
              Register
            </span>
            ?
          </div>
        </div>
        <Button
          title="Login"
          variant="primary"
          size="md"
          onclick={handelLogin}
        />
      </div>
    </div>
  );
};
