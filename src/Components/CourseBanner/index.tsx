// src/Components/CourseBanner/index.tsx
import React, { useState, useEffect } from 'react';
import './CourseBanner.scss';
import bannerBg from '../../Assets/images/banner.png';


interface BannerSlide {
  title: string;
  description: string;
  image: string;
  buttonText: string;
  buttonLink: string;
}

const bannerSlides: BannerSlide[] = [
  {
    title: "Comece sua jornada criativa",
    description: "Descubra cursos incríveis e desenvolva novas habilidades com a gente.",
    image:'../../Assets/images/urso.jpg',
    buttonText: "Comece agora!",
    buttonLink: "/courses"
  },
  {
    title: "Aprenda Design Thinking",
    description: "Resolva problemas complexos com metodologias inovadoras de design.",
    image: bannerBg, // Ideal seria ter imagens diferentes para cada slide
    buttonText: "Ver curso",
    buttonLink: "/courses/2"
  },
  {
    title: "Criatividade com IA",
    description: "Use a inteligência artificial para potencializar seu processo criativo.",
    image: bannerBg,
    buttonText: "Saiba mais",
    buttonLink: "/courses/1"
  }
];

const CourseBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [userName, setUserName] = useState("Criativo");

  // Simula obtenção do nome do usuário
  useEffect(() => {
    // Em um caso real, você buscaria o nome do usuário da API/context
    const storedUser = localStorage.getItem('@CaldeiraoCreativo:user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        if (userData.name) {
          setUserName(userData.name.split(' ')[0]); // Pega só o primeiro nome
        }
      } catch (e) {
        console.error('Erro ao ler dados do usuário:', e);
      }
    }
  }, []);

  // Rotação automática dos slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const slide = bannerSlides[currentSlide];

  return (
    <section className="course-banner" style={{ backgroundImage: `url(${slide.image})` }}>
      <div className="overlay"></div>
      <div className="banner-content">
        <h1>{slide.title.replace('sua', `sua, ${userName}`)}</h1>
        <p>{slide.description}</p>
        <button onClick={() => window.location.href = slide.buttonLink}>
          {slide.buttonText}
        </button>
        
        {/* Indicadores de slide */}
        <div className="slide-indicators">
          {bannerSlides.map((_, index) => (
            <span 
              key={index} 
              className={`indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CourseBanner;