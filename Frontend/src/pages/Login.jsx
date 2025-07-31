import { useContext, useState } from "react";
import assets from "../assets/assets";
import { authContextProvider } from "../ccontext/AuthContext";

const Login = () => {
  const [current, setCurrent] = useState("Sign up");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);
  const {login}=useContext(authContextProvider)
  const handleSubmit=(e)=>{
    e.preventDefault();
    if(current=="Sign up" && !isDataSubmitted){
        setIsDataSubmitted(true);
        return;
    }
    login(current==="Sign up"?'Signup':'Login',{fullname,email,password,bio})
  }
  return (
    <div className="min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl">
      <img src={assets.logo_big} className="w-[min(30vw,250px)]" />
      <form onSubmit={handleSubmit}className="border-2 bg-white/8 text-white border-gray-500 p-6 flex flex-col gap-6 rounded-lg shadow-lg">
        <h2 className="font-medium text-2xl flex justify-between items-center">
          {current}
          {isDataSubmitted &&
            <img onClick={()=>setIsDataSubmitted(false)}src={assets.arrow_icon} alt="" className="cursor-pointer w-5" />}
        
        </h2>
        {current == "Sign up" && !isDataSubmitted && (
          <input
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            type="text"
            className="p-2 border border-gray-500 rounded-md focus:outline-none"
            placeholder="Full name"
            required
          />
        )}
        {!isDataSubmitted && (
          <>
            <input
              type="email"
              value={email}
              placeholder="Email Address"
              className="border p-2 border-gray--500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 "
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              value={password}
              placeholder="Password"
              className="border p-2 border-gray--500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 "
              onChange={(e) => setPassword(e.target.value)}
            />
          </>
        )}
        {
            current=="Sign up" && isDataSubmitted &&(
                <>
                <textarea value={bio} onChange={(e)=>setBio(e.target.value)} rows={4} className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Enter bio"></textarea>
                </>
            )
        }
        <button  type="Submit"className="py-3 bg-gradient-to-r from purple-400 to-violet-600 text-white rounded-md cursor-pointer">
            {current == "Sign up"? "Create Account":"Login"}
        </button>
        <div className="flex items-center gap-2 text-sm text-gray-500">
            <input type="checkbox"/>
            <p>Agree to the terms of use and privacy policy</p>
        </div>
        <div className="flex flex-col gap-2">
            {current== "Sign up"? (
                <p className="text-sm text-gray-600">
                 Already have an account? <span onClick={()=>{setCurrent("login");setIsDataSubmitted(false)}} className="font-medium text-violet-500 cursor-pointer">Login here</span>   
                </p>
            ):(
                <p className="text-sm text-gray-600">
                    Create an account <span  onClick={()=>{setCurrent("Sign up");setIsDataSubmitted(false)}} className="font-medium text-violet-500 cursor-pointer">Click here</span>
                </p>
            )}

        </div>
      </form>
    </div>
  );
};
export default Login;
