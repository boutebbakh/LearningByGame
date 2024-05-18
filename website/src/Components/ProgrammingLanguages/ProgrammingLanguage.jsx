import React from 'react'
import './ProgrammingLanguage.css'
import  Iconsvg from '../../assets/angularIcon.svg'


export const ProgrammingLanguage = () => {
  return (
    <div className="programming-languages">
    <div className="row">
      <img src={Iconsvg} alt="Java" className="animated left" />
      <img src="/python-logo.png" alt="Python" className="animated right" />
    </div>
    <div className="row">
      <img src="/html-logo.png" alt="HTML" className="animated left" />
      <img src="/css-logo.png" alt="CSS" className="animated right" />
    </div>
    {/* Add more rows as needed */}
  </div>
  )
}
