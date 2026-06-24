import { useState, useEffect } from "react";
import "./Footer.css";

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
    <div className={`faixa-tribal-wrapper ${visible ? "footer--visible" : ""}`} />
  );
}

export default Footer;