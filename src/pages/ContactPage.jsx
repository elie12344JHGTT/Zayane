import React from 'react';

function ContactPage() {
  return (
    <section className="contact-page">
      <div className="contact-hero">
        <p>Contact R.Zayane</p>
        <h1>Parlez-nous de votre commande.</h1>
        <span>Une question sur une piece, une taille ou une livraison ? Envoyez-nous un message.</span>
      </div>

      <div className="contact-layout">
        <form className="contact-form">
          <label>
            Nom complet
            <input placeholder="Votre nom" />
          </label>
          <label>
            Email
            <input type="email" placeholder="client@email.com" />
          </label>
          <label>
            Telephone
            <input placeholder="+243 ..." />
          </label>
          <label>
            Sujet
            <input placeholder="Commande, taille, livraison..." />
          </label>
          <label className="full">
            Message
            <textarea placeholder="Ecrivez votre message ici" rows="6" />
          </label>
          <button type="button">Envoyer le message</button>
        </form>

        <aside className="contact-card">
          <img src="/assets/logo_font_trans.png" alt="R.Zayane" />
          <h2>R.Zayane Boutique</h2>
          <p>Mode, catalogue et commandes R.Zayane.</p>
          <div>
            <strong>Telephone</strong>
            <span>+243 000 000 000</span>
          </div>
          <div>
            <strong>Email</strong>
            <span>contact@rzayane.com</span>
          </div>
          <div>
            <strong>Adresse</strong>
            <span>Kinshasa, RDC</span>
          </div>
        </aside>
      </div>
    </section>
  );
}

export default ContactPage;
