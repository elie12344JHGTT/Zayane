import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';

import HomePage from './pages/HomePage.jsx';
import BoutiquePage from './pages/BoutiquePage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import { cdfMoney, money, products, USD_TO_CDF } from './data.js';
import './styles.css';

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');

function getPaymentNotice() {
  const params = new URLSearchParams(window.location.search);
  const status = params.get('payment');
  const orderRef = params.get('order_ref');

  const messages = {
    success: {
      status: 'success',
      title: 'Paiement reussi',
      message: 'Merci pour votre commande. Nous allons la traiter rapidement.',
    },
    error: {
      status: 'error',
      title: 'Paiement echoue',
      message: 'Le paiement n a pas pu etre finalise. Verifiez vos informations et reessayez.',
    },
    cancel: {
      status: 'cancel',
      title: 'Paiement annule',
      message: 'Vous pouvez reprendre votre commande quand vous le souhaitez.',
    },
  };

  if (!messages[status]) return null;

  return { ...messages[status], orderRef };
}
function App() {
  const [category, setCategory] = useState('all');
  const [cart, setCart] = useState([]);
  const [page, setPage] = useState('home');
  const [customer, setCustomer] = useState({ name: '', email: '', phone: '', address: '', city: '' });
  const [checkout, setCheckout] = useState({ currency: 'USD', method: 'online' });
  const [paymentNotice, setPaymentNotice] = useState(() => getPaymentNotice());

  const filteredProducts = useMemo(() => {
    if (category === 'all') return products;
    return products.filter((product) => product.category === category);
  }, [category]);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);

  function goHome() {
    setPage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function goBoutique(nextCategory = 'all') {
    setCategory(nextCategory);
    setPage('boutique');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function goContact() {
    setPage('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function addToCart(product) {
    setCart((current) => {
      const found = current.find((item) => item.id === product.id);
      if (found) {
        return current.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }
      return [...current, { ...product, quantity: 1 }];
    });
  }

  function changeQty(id, delta) {
    setCart((current) =>
      current
        .map((item) => (item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item))
        .filter((item) => item.quantity > 0),
    );
  }

  return (
    <main>
      {paymentNotice && <PaymentNotice notice={paymentNotice} onClose={() => setPaymentNotice(null)} />}
      {page !== 'cart' && (
        <Header
          count={count}
          solid={page !== 'home'}
          onCart={() => setPage('cart')}
          onHome={goHome}
          onBoutique={() => goBoutique('all')}
          onContact={goContact}
        />
      )}

      {page === 'home' && <HomePage onCollection={() => goBoutique('all')} />}

      {page === 'boutique' && (
        <BoutiquePage
          category={category}
          setCategory={setCategory}
          products={filteredProducts}
          onAdd={addToCart}
        />
      )}

      {page === 'contact' && <ContactPage />}

      {page === 'cart' && (
        <CartPage
          cart={cart}
          total={total}
          customer={customer}
          setCustomer={setCustomer}
          checkout={checkout}
          setCheckout={setCheckout}
          onQty={changeQty}
          onBack={() => goBoutique('all')}
        />
      )}
    </main>
  );
}

function PaymentNotice({ notice, onClose }) {
  return (
    <div className={`payment-notice ${notice.status}`} role="status" aria-live="polite">
      <div>
        <strong>{notice.title}</strong>
        <span>{notice.message}</span>
        {notice.orderRef && <small>Reference commande: {notice.orderRef}</small>}
      </div>
      <button onClick={onClose} aria-label="Fermer le message de paiement">
        <span></span>
        <span></span>
      </button>
    </div>
  );
}
function Header({ count, onCart, onHome, onBoutique, onContact, solid }) {
  const [menuOpen, setMenuOpen] = useState(false);

  function go(action) {
    action();
    setMenuOpen(false);
  }

  return (
    <header className={solid ? 'site-header solid' : 'site-header'}>
      <button className="logo" onClick={() => go(onHome)} aria-label="Accueil Zayane">
        <img src="/assets/logo_font_trans.png" alt="Zayane" />
      </button>
      <nav className={menuOpen ? 'open' : ''}>
        <button onClick={() => go(onHome)}>Accueil</button>
        <button onClick={() => go(onBoutique)}>Collections</button>
        <button onClick={() => go(onContact)}>Contact nous</button>
      </nav>
      <div className="header-actions">
        <button
          className="menu-trigger"
          onClick={() => setMenuOpen((current) => !current)}
          aria-label="Ouvrir le menu"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
        <button className="cart-trigger" onClick={onCart} aria-label="Ouvrir le panier">
          <img src="/assets/cart-shopping-solid.png" alt="" />
          {count > 0 && <span>{count}</span>}
        </button>
      </div>
    </header>
  );
}

function CartPanel({ cart, total, onQty, canCheckout = false, onCheckout, isProcessing = false, paymentMessage = '', paymentStatus = '', compact = false }) {
  return (
    <aside className={`cart-panel ${compact ? 'compact' : ''}`}>
      <div className="cart-head">
        <p>Panier</p>
        <strong>{cart.length} article{cart.length > 1 ? 's' : ''}</strong>
      </div>
      {cart.length === 0 ? (
        <p className="empty">Votre panier est vide.</p>
      ) : (
        <div className="cart-list">
          {cart.map((item) => (
            <div className="cart-item" key={item.id}>
              <img src={item.image} alt={item.name} />
              <div>
                <strong>{item.name}</strong>
                <div className="cart-price">
                  <span>{money.format(item.price)}</span>
                  <small>{cdfMoney.format(item.price * USD_TO_CDF)}</small>
                </div>
                <div className="qty">
                  <button onClick={() => onQty(item.id, -1)}>-</button>
                  <b>{item.quantity}</b>
                  <button onClick={() => onQty(item.id, 1)}>+</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="checkout-box">
        <div>
          <span>Total</span>
          <div className="cart-total-prices">
            <strong>{money.format(total)}</strong>
            <small>{cdfMoney.format(total * USD_TO_CDF)}</small>
          </div>
        </div>
        <button onClick={onCheckout} disabled={!canCheckout || isProcessing || paymentStatus === 'success'}>{isProcessing ? 'Traitement...' : paymentStatus === 'success' ? 'Paiement initialise' : 'Passer au paiement'}</button>
        {!canCheckout && <small className="checkout-hint">Remplissez le formulaire pour continuer.</small>}
        {paymentMessage && <small className={`payment-alert ${paymentStatus}`}>{paymentMessage}</small>}
      </div>
    </aside>
  );
}

function CartPage({ cart, total, customer, setCustomer, checkout, setCheckout, onQty, onBack }) {
  const [paymentState, setPaymentState] = useState({ loading: false, message: '', status: '' });
  const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email.trim());
  const phoneIsValid = customer.phone.replace(/\D/g, '').length >= 8;
  const formIsValid = Boolean(
    customer.name.trim() &&
      emailIsValid &&
      phoneIsValid &&
      customer.address.trim() &&
      customer.city.trim() &&
      checkout.currency &&
      checkout.method,
  );
  const canCheckout = cart.length > 0 && formIsValid;

  async function handleCheckout() {
    if (!canCheckout || paymentState.loading || paymentState.status === 'success') return;

    setPaymentState({ loading: true, message: '', status: '' });
    try {
      const response = await fetch(`${API_BASE_URL}/api/easypay/checkout.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer,
          checkout,
          cart: cart.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          })),
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.ok) {
        throw new Error(data.message || 'Le paiement n a pas pu etre initialise.');
      }

      if (data.redirect_url) {
        window.location.href = data.redirect_url;
        return;
      }

      setPaymentState({
        loading: false,
        status: 'success',
        message: data.reference
          ? 'Votre demande de paiement Mobile Money a ete envoyee. Confirmez la transaction sur votre telephone pour finaliser la commande.'
          : data.message || 'Paiement initialise.',
      });
    } catch (error) {
      setPaymentState({ loading: false, status: 'error', message: error.message });
    }
  }

  return (
    <section className="cart-page">
      <div className="cart-page-heading">
        <button className="back-icon" onClick={onBack} aria-label="Retour a la boutique">
          <img src="/assets/angle-left-solid.png" alt="" />
        </button>
        <p>Checkout</p>
        <h1>Finaliser votre commande</h1>
      </div>
      <div className="checkout-layout">
        <form className="checkout-form">
          <div>
            <p>Informations client</p>
            <h2>Adresse et contact</h2>
          </div>
          <label>
            Nom complet
            <input required value={customer.name} onChange={(event) => setCustomer({ ...customer, name: event.target.value })} placeholder="Votre nom" />
          </label>
          <label>
            Email
            <input required type="email" value={customer.email} onChange={(event) => setCustomer({ ...customer, email: event.target.value })} placeholder="client@email.com" />
          </label>
          <label>
            Telephone
            <input required value={customer.phone} onChange={(event) => setCustomer({ ...customer, phone: event.target.value })} placeholder="+243 ..." />
          </label>
          <label>
            Adresse de livraison
            <input required value={customer.address} onChange={(event) => setCustomer({ ...customer, address: event.target.value })} placeholder="Avenue, quartier, commune" />
          </label>
          <label>
            Ville
            <input required value={customer.city} onChange={(event) => setCustomer({ ...customer, city: event.target.value })} placeholder="Kinshasa" />
          </label>
          <div className="payment-methods currency-methods">
            <span>Devise de paiement</span>
            <button
              type="button"
              className={checkout.currency === 'USD' ? 'active' : ''}
              onClick={() => { setPaymentState({ loading: false, message: '', status: '' }); setCheckout({ ...checkout, currency: 'USD' }); }}
            >
              USD
            </button>
            <button
              type="button"
              className={checkout.currency === 'CDF' ? 'active' : ''}
              onClick={() => { setPaymentState({ loading: false, message: '', status: '' }); setCheckout({ ...checkout, currency: 'CDF' }); }}
            >
              CDF
            </button>
          </div>
          <div className="payment-methods">
            <span>Mode de paiement</span>
            <button
              type="button"
              className={checkout.method === 'online' ? 'active' : ''}
              onClick={() => { setPaymentState({ loading: false, message: '', status: '' }); setCheckout({ ...checkout, method: 'online' }); }}
            >
              Paiement en ligne
            </button>
            <button
              type="button"
              className={checkout.method === 'mobile-money' ? 'active' : ''}
              onClick={() => { setPaymentState({ loading: false, message: '', status: '' }); setCheckout({ ...checkout, method: 'mobile-money' }); }}
            >
              Mobile Money
            </button>
          </div>
        </form>
        <CartPanel cart={cart} total={total} onQty={onQty} canCheckout={canCheckout} onCheckout={handleCheckout} isProcessing={paymentState.loading} paymentMessage={paymentState.message} paymentStatus={paymentState.status} checkout />
      </div>
    </section>
  );
}

createRoot(document.getElementById('root')).render(<App />);











