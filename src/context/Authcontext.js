import { createContext, useEffect, useState } from "react";
import axios from "axios"
import BackendLink from "../datasource/backendlink";
const AuthContext=createContext()

const AuthState= ({children})=>{
    const [Valid,setValid] =useState(false)
    const [LoginOpen,setLoginOpen]=useState(false)
    const [SignOpen,setSignOpen]=useState(false)
    const [Next,setNext]=useState("/")
    const [Loading,setLoading]=useState(true)

    useEffect(()=>{
        if (localStorage.getItem("token")){
                try{
            axios
                .post(BackendLink.jwt,{token:localStorage.getItem("token")})
                .then(res =>{
                setLoading(false)
                if (res.status==200){
                    setValid(res.data.id)
                }
            } )
            .catch(err => console.error(err));}
                catch(err){
                console.log(err)
            }
        }
        else{
            setLoading(false)
        }
    },[])
    
    return (
        <AuthContext.Provider value={{Valid,setValid,LoginOpen,setLoginOpen,SignOpen,setSignOpen,Next,setNext,Loading,setLoading}}>
            {children}
        </AuthContext.Provider>
    )
}
export {AuthState,AuthContext}