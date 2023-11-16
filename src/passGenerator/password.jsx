import { useCallback, useEffect, useState, useRef } from "react"
import './password.css'

export default function PasswordGenerator(){
    
   
    const [passwordSize, setpasswordSize] = useState(5);
    const [numberAllowed, setNumberAllowed] = useState(false);
    const [characterAllowed, setCharacterAllowed] = useState(false);
    const [password, setPassword] = useState("");
    const [copyPopUp, setcopyPopUp] = useState(false);
    const passwordRef = useRef(null);
    
    const passwordGenerator = useCallback(()=>{
        let pass = "";
        let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        if(numberAllowed) str += "0123456789";
        if(characterAllowed) str += "!#$%&'()*+,-./:;<=>?@[^_`{|}~";

        for(let i = 0; i<passwordSize; i++){
            let idx = Math.floor(str.length*Math.random());
            pass += str[idx];
        }

        setPassword(pass);
    }, [passwordSize, numberAllowed, characterAllowed, setPassword]);

     
    useEffect(()=>{
        passwordGenerator();
        setcopyPopUp(false);
    }, [passwordSize, numberAllowed, characterAllowed, passwordGenerator]);
    
    const copyToClipboard = useCallback(()=>{
        passwordRef.current?.select();
        window.navigator.clipboard.writeText(password);
        setcopyPopUp(true);
    }, [password])



    return(
        <div className="flex items-center justify-center h-screen">
            <div className="bg-gray-600 rounded">
                <h1 className="text-center">Password Generator</h1>
                <div className="mx-10 my-5">  
                    <input className=" bg-gray-500 cursor-text px-1 py-1 w-80"
                     type="text" 
                     value={password}
                     placeholder="Password"
                     ref={passwordRef}
                     ></input>
                    <div className="relative inline-block">
                        <button
                        onClick={copyToClipboard} 
                        className="rounded bg-indigo-500 px-3 py-1 active:bg-indigo-600 "
                        >copy
                        </button>
                        {
                            copyPopUp &&(
                                <div className="popup">
                                    Password Copied !
                                </div>
                            )
                        }
                    </div>
                </div>

                <div className="px-5 flex">
                    <div className="mx-2">
                        <input id='size' name='size'
                        className="cursor-pointer"
                         type="range" min={6} max={50} 
                         value={passwordSize}
                        onChange={(event)=>{setpasswordSize(event.target.value)}}
                         ></input>
                        <label htmlFor="size">Length: {passwordSize}</label>
                    </div>
                    <div className="mx-2">
                        <input id='number' name='number' type="checkbox" 
                        defaultChecked={numberAllowed}
                        onChange={()=>setNumberAllowed((prev) => !prev)}
                        ></input>
                        <label htmlFor="number">Number</label>
                    </div>
                    <div className="mx-5" >
                        <input id='character' name="character" type="checkbox"
                        defaultChecked={characterAllowed}
                        onChange={()=>setCharacterAllowed((prev) => !prev)}
                        ></input>
                        <label htmlFor="character">Special Character</label>
                    </div>
                </div>
            </div>
        </div>

    )
}