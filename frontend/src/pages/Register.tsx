import { Button } from "../components/Button"
import { useUserStore } from "../store/userStore"
import { useState } from "react"
export const Register=()=>{
    const {register}=useUserStore()
    const [username,setUsername]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")


    const handelRegister=async()=>{
        try {
            await register(username,email,password)
            alert("register success")
        } catch (error) {
            alert("register failed")
        }
    }
    return <div className="flex justify-center items-center min-h-screen" >
        <div className="bg-white shadow-md rounded px-6 py-8 ">
            

            <span className="text-3xl text-[#0c0eff] font-bold mb-2" >Register</span>
            <div className="flex flex-col gap-4 mt-2">
                <input type="text" placeholder="username" className="bg-bottom focus:outline-2 px-2 focus:outline-[#0c0eff]" onChange={(e)=>{setUsername(u=>u=e.target.value)}}/>
                <input type="text" placeholder="password" className="focus:outline-2 px-2 focus:outline-[#0c0eff]" onChange={(e)=>{setPassword(p=>p=e.target.value)}}/>
                <input type="email" placeholder="email" className="focus:outline-2 px-2 focus:outline-[#0c0eff]" onChange={(e)=>{setEmail(m=>m=e.target.value)}}/>
            </div>
            <div className="flex flex-col mt-2">
                <div>
                    Algready have an account <span className="hover:underline text-[#85a8ff] cursor-pointer ease-in duration-150">Login</span>?
                </div>
            </div>
            <Button title="Register" variant="primary" size="md" onclick={handelRegister}/>
           
        </div>
    </div>
}