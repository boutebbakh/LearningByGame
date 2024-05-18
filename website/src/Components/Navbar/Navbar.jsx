import React from 'react'
import {Link } from 'react-router-dom'
import { Gbutton } from '../Gbutton/Gbutton';

import { useState,useEffect } from 'react';

import './Navbar.css'
export const Navbar = () => {
 
   

    
    const [button, setButton] = useState(true);

    
      const [scrolled, setScrolled] = useState(false);
      const showButton = () => {
        if (window.innerWidth <= 960) {
          setButton(false);
        } else {
          setButton(true);
        }
      };
    
      useEffect(() => {
        
        showButton();

      }, []);
    
      window.addEventListener('resize', showButton);
    
  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    }

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [])
  
  return (
    <div className={scrolled ? "nav scrolled " : "nav"}>
    
     <div className="logo">
     GemiLearn
     </div>
     <div className="navtext">
      <ul>
      
       
      <li><Link to="/">Home</Link></li>
      <li><Link to="/Courses">Courses</Link></li>
    
         </ul>
       
     </div>
     <div className="connexion">
       {button && <Gbutton buttonStyle='btn--primary' to='/login' >Login</Gbutton>}
       {button && <Gbutton buttonStyle='btn--outline' to='/Singup'  >Sign up</Gbutton>}
     </div>
    </div>
  
    
  )
}
