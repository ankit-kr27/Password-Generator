import { useState, useCallback, useEffect, useRef } from "react"

function App() {

  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState()

  const passwordGenerator = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed) str+="0123456789"
    if(charAllowed) str+="@#$%&*!?"

    for(let i=1; i<=length; i++){
      let charIdx = Math.ceil(Math.random()*str.length);
      pass += str.charAt(charIdx)
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword])   // It will keep setPassword in the memory to optimize the execution.

  useEffect(()=>{
    passwordGenerator()
  }, [length, numberAllowed, charAllowed])

// useRef() HOOK

const passwordRef = useRef(null);

const copyPasswordToClip = useCallback(()=>{
  passwordRef.current?.select()
  passwordRef.current?.setSelectionRange(0, password.length) // Just for the sake of optimization

  window.navigator.clipboard.writeText(password)
}, [password])


  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg p-4 my-8 text-orange-500 bg-gray-700
      ">
        <h1 className="text-white text-center text-3xl my-3">Password Generator</h1>
        <div className=" flex shadow rounded-lg overflow-hidden
        ">
          <input type="text" 
          value={password}
          className="outline-none w-full py-1 px-3"
          placeholder="password"
          readOnly
          ref={passwordRef} 
          />
          <button
          className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 hover:bg-blue-800"
          onClick={copyPasswordToClip}
          >Copy</button>
        </div>
        <div className="flex text-sm justify-evenly mt-4">
          <div className="flex items-center gap-x-1">
            <input 
              type="range" 
              id="lengthInput"
              min={6} 
              max={50} 
              value={length}
              className="cursor-pointer"
              onChange={(e)=>setLength(e.target.value)}
              // We've set a reference to this input field
            />
            <label htmlFor="lengthInput" >Label: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input 
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={()=>{
                setNumberAllowed((prev)=>!prev)
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input 
              type="checkbox"
              defaultChecked={charAllowed}
              id="charInput"
              onChange={()=>{
                setCharAllowed((prev)=>!prev)
              }}
            />
            <label htmlFor="charInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
