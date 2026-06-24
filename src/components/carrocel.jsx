import { useState, useEffect, useCallback } from "react";
import "./ImageCarousel.css";

const SLIDES = [
  {
    id: 1,
    label: "Natureza",
    title: "Florestas que respiram junto com você",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80",
  },
  {
    id: 2,
    label: "Arquitetura",
    title: "Linhas que definem o horizonte urbano",
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",
  },
  {
    id: 3,
    label: "Oceano",
    title: "Onde o céu encontra a profundidade",
    image: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=800&q=80",
  },
  {
    id: 4,
    label: "Montanhas",
    title: "Silêncio que só o cume conhece",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
  },
  {
    id: 5,
    label: "Deserto",
    title: "Luz que esculpe cada curva na areia",
    image: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&q=80",
  },
];

export default function ImageCarousel() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % SLIDES.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [paused, next]);

  return (
    <div className="carousel-wrapper">
      <div
        className="carousel-container"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Slides */}
        <div className="carousel-track-wrapper">
          <div
            className="carousel-track"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {SLIDES.map((slide) => (
              <div className="carousel-slide" key={slide.id}>
                <img
                  className="slide-image"
                  src={slide.image}
                  alt={slide.title}
                  draggable={false}
                />
                <div className="slide-overlay">
                  <p className="slide-label">{slide.label}</p>
                  <h2 className="slide-title">{slide.title}</h2>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom controls */}
        <div className="carousel-bottom">
          <div className="carousel-controls">
            {/* Dots */}
            <div className="carousel-dots">
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  className={`dot${i === current ? " active" : ""}`}
                  onClick={() => setCurrent(i)}
                  aria-label={`Ir para slide ${i + 1}`}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="arrow-group">
              <button className="arrow-btn" onClick={prev} aria-label="Anterior">
                <svg viewBox="0 0 24 24">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button className="arrow-btn" onClick={next} aria-label="Próximo">
                <svg viewBox="0 0 24 24">
                  <polyline points="9 6 15 12 9 18" />
                </svg>
              </button>
            </div>
          </div>

          <p className="slide-counter">
            <span>{current + 1}</span> / {SLIDES.length}
          </p>
        </div>
      </div>
    </div>
  );
}