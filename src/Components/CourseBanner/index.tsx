import React from 'react';
import './CourseBanner.scss';
import bannerBg from '../../Assets/images/banner.png'; // substitua pela imagem real

const CourseBanner = () => {
  return (
    <section className="course-banner" style={{ backgroundImage: `url(${bannerBg})` }}>
      <div className="overlay">
        <div className="banner-content">
          <h1>Comece sua jornada criativa</h1>
          <p>Descubra cursos incríveis e desenvolva novas habilidades com a gente.</p>
          <button>Comece agora</button>
        </div>
      </div>
    </section>
  );
};

export default CourseBanner;
