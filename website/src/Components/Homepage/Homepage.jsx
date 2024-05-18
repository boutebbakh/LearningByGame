import React ,{useEffect, useState} from 'react'
import headersvg from '../../assets/person3d-min.svg'
import { Gbutton } from '../Gbutton/Gbutton';
import "./Homepage.css"
import {Navbar} from '../Navbar/Navbar'
import {Gfooter}from '../Gfooter/Gfooter'

// import { ProgrammingLanguage } from '../ProgrammingLanguages/ProgrammingLanguage';
export const Homepage = () => {

  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');
  const [delta, setDelta] = useState(200 - Math.random() * 100);
  const [index, setIndex] = useState(1);
  const toRotate = [ "Welcome to Gemilearn", "Play and become a better developer on Gemilearn", "Learn to Code Through the Power of Play" ];
  const period = 200;
  

  useEffect(()=>{
    
    let ticker = setInterval(() => {
      tick();
    }, delta);
     
    return () => { clearInterval(ticker) };

  },[text])

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta(prevDelta => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setIndex(prevIndex => prevIndex - 1);
      setDelta(period);
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setIndex(1);
      setDelta(200);
    } else {
      setIndex(prevIndex => prevIndex + 1);
    }
  }
  return (


    <div  className='container'>
      <Navbar />
        <div className="Row">
            <div className="col text-container">
            <h1><span className="txt-rotate" dataPeriod="500" data-rotate='[ "Welcome to Gemilearn", "Play and become a better developer on Gemilearn", "Learn to Code Through the Power of Play" ]'><span className="wrap">{text}</span></span></h1>
               <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae, magni quo ea repudiandae ut vel dolorem! 
                Vero ullam accusantium adipisci perspiciatis quos omnis, praesentium est alias nemo! Molestiae, obcaecati ratione.</p>
               <Gbutton buttonStyle='btn--primary' to='/login' >let's get started</Gbutton>
            </div>
            <div className="col">
              
            <img src={headersvg} alt="" className='person' />
             
            </div>
             
        </div>
        {/* <ProgrammingLanguage /> */}
       <Gfooter className="footer"/>
    </div>
  )
}
