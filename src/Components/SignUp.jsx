import React from "react";
import { supabase } from "../client";
import { Link } from 'react-router-dom'

function Signup () {
    const [signupData, setSignupData] = React.useState({
        firstName:'',
        email:'',
        password:'',
    });

    function handleChange(event) {
        const {name, value} = event.target
        setSignupData(prevSignupData =>({
            ...prevSignupData,
            [name]: value,
        }
        )
    )}

    async function handleSubmit(event){
        event.preventDefault()
        
    try {
        const { data, error } = await supabase.auth.signUp(
            {
              email: signupData.email,
              password: signupData.password,
              options: {
                data: {
                  first_name: signupData.firstName,
                }
              }
            }
          )
          alert('Please check your amail inbox and verify signup.')
        
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
        display: 'grid',
        justifyContent: 'center',
    }

    return(
        <div style={formDivStyle}>
            <form onSubmit={handleSubmit} style={loginFormStyle}>
                <input type="text" name="firstName" 
                placeholder="First name" 
                onChange={handleChange}/>
                <br />
                <input type="email" name="email" 
                placeholder="Email address" 
                onChange={handleChange}/>
                <br />
                <input type="password" name="password" 
                placeholder="Password" 
                onChange={handleChange}/>
                <br />
                <button type="submit">Sign up</button>
            </form>
            <h4><Link to='/'>If already have an account, click here to login</Link></h4>
        </div>
    )
}
export default Signup