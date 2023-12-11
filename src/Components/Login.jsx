import React from "react";
import { supabase } from "../client";
import { Link, useNavigate } from 'react-router-dom'

function Login () {
    const navigate = useNavigate()
    const [loginData, setLoginData] = React.useState({
        email:'',
        password:'',
    });

    function handleChange(event) {
        const {name, value} = event.target
        setLoginData(prevLoginData =>({
            ...prevLoginData,
            [name]: value,
        }
        )
    )}

    async function handleSubmit(event){
        event.preventDefault()
        
    try {
        
    const { data, error } = await supabase.auth.signInWithPassword({
    email: loginData.email,
    password: loginData.password,
  })
  
          if(error) throw error
        console.log(data)
        navigate('/showlist')
    } catch (error) {
        alert(error)        
    }
    }

    const loginFormStyle = {
        marginTop: '25vh',
        display: 'grid',
        justifyContent: 'center',
    }

    const formDivStyle = {
        // marginTop: '25vh',
        display: 'grid',
        justifyContent: 'center',
    }

    return(
        <div style={formDivStyle} >
            <form onSubmit={handleSubmit} style={loginFormStyle}>
                <input type="email" name="email" 
                placeholder="Email address" 
                onChange={handleChange}/>
                <br />
                <input type="password" name="password" 
                placeholder="Password" 
                onChange={handleChange}/>
                <br />
                <button type="submit">Login</button>
            </form>
            <h4><Link to='/signup'>Click here to create an account</Link></h4>
        </div>
    )
}
export default Login