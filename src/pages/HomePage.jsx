export default function HomePage({ onCollection }) {
  return (
    <>
      <section className="hero" id="top">
        <img className="hero-fallback" src="/assets/acceuil_img.jpg" alt="" />
        <video autoPlay muted loop playsInline poster="/assets/acceuil_img.jpg">
          <source src="/accueil_video.mp4" type="video/mp4" />
        </video>
        <div className="hero-overlay" />
        <div className="hero-content">
          <p>Nouvelle saison</p>
          <h1>Zayane Store</h1>
          <span>Style direct. Pieces fortes. Allure assumee.</span>
          <div className="hero-actions">
            <button onClick={onCollection}>Voir la collection</button>
          </div>
        </div>
      </section>

      <section className="home-editorial" data-reveal>
        <div className="editorial-benefits">
          <article data-reveal>
            <span>01</span>
            <div>
              <h3>Pieces selectionnees</h3>
              <p>Des vetements choisis pour leur coupe, leur confort et leur allure.</p>
            </div>
          </article>
          <article data-reveal>
            <span>02</span>
            <div>
              <h3>Style quotidien</h3>
              <p>Des looks faciles a porter pour travailler, sortir ou celebrer.</p>
            </div>
          </article>
          <article data-reveal>
            <span>03</span>
            <div>
              <h3>Paiement facile</h3>
              <p>Une experience d'achat fluide, du choix des pieces jusqu'a la commande.</p>
            </div>
          </article>
          <article data-reveal>
            <span>04</span>
            <div>
              <h3>Service rapide</h3>
              <p>Un parcours clair du choix du produit jusqu'au panier.</p>
            </div>
          </article>
        </div>

        <div className="editorial-main" data-reveal>
          <img src="/assets/home_img_2.jpg" alt="Campagne Zayane" />
          <div className="editorial-copy">
            <p>Sur Zayane</p>
            <h2>Decouvre les pieces qui donnent le ton.</h2>
            <span>
              Une selection mode qui met en avant robes, chemises, polos et silhouettes fortes.
              Chaque categorie ouvre vers la boutique pour explorer les nouveautes disponibles.
            </span>
            <ul>
              <li>Robes et chemises en vedette</li>
              <li>Pieces casual pour le quotidien</li>
              <li>Panier clair avant validation de la commande</li>
            </ul>
            <button onClick={onCollection}>Entrer dans la boutique</button>
          </div>
        </div>

        <div className="editorial-process" data-reveal>
          <div className="process-copy">
            <p>Comment choisir</p>
            <h2>Un parcours simple, a ton rythme.</h2>
            <div className="process-steps">
              <span>1</span>
              <span>2</span>
              <span>3</span>
              <span>4</span>
            </div>
          </div>
          <img src="/assets/home_img_1.jpg" alt="Details chemise Zayane" />
        </div>

        <div className="editorial-cards">
          <article data-reveal>
            <h3>Public vise</h3>
            <p>Femmes, hommes et clients qui veulent une boutique claire.</p>
          </article>
          <article data-reveal>
            <h3>Collections</h3>
            <p>Robes, chemises, polos et pantalons disponibles dans la boutique.</p>
          </article>
          <article className="highlight" data-reveal>
            <h3>Agencement</h3>
            <p>Accede directement aux nouveautes ou ouvre toute la boutique.</p>
            <button onClick={onCollection}>Explorer</button>
          </article>
        </div>
      </section>

      <section className="brand-section home-brand-section" data-reveal>
        <div>
          <p>R.Zayane</p>
          <h2>Une boutique rapide, claire et pensee pour R.Zayane.</h2>
        </div>
        <p>
          La boutique rassemble tous les produits disponibles. Les onglets montrent les nouveautes
          par categorie, et la page collections pourra ensuite afficher les gammes completes.
        </p>
      </section>

      <footer>
        <img src="/assets/logo_font_trans.png" alt="Zayane" />
        <p>R.Zayane Boutique</p>
        <span>Mode, catalogue et commandes R.Zayane.</span>
      </footer>    </>
  );
}




