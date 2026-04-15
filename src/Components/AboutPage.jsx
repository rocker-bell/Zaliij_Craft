const AboutPage = () => {
  return (
    <main className="about-page">
      <header className="hero mini-hero">
        <div className="pattern-overlay"></div>
        <div className="hero-content">
          <span className="badge">Notre Histoire</span>
          <h1>Gardiens d'un <br /><span>Savoir-Faire Millénaire</span></h1>
        </div>
      </header>

      <section className="about-details" style={{ padding: '80px 10%', background: '#fff' }}>
        <div className="project-grid">
           <img src="URL_ARTISAN_FOTOT" alt="Artisan" style={{ borderRadius: '24px', width: '100%' }} />
           <div className="text-side">
             <span className="section-subtitle">Notre Atelier</span>
             <h2>Un Héritage Familial Transmis avec Fierté</h2>
             <p className="section-desc">Fondé en 1985 au cœur de la médina de Fès...</p>
           </div>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;