import { useState, useEffect } from "react";
import "./Footer.css";
import grafismo from "../img/grafismo.svg";


function Footer() {
  const [visible, setVisible] = useState(false);


  useEffect(() => {
    const handleScroll = () => {
      const scrolledToBottom =
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 20;
      setVisible(scrolledToBottom);
    };


    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  return (
    <div className={`footer-faixa-wrapper ${visible ? "footer--visible" : ""}`}>
    <img src={grafismo} alt="" className="faixa-tribal" />
    </div>
  );
}


export default Footer;
