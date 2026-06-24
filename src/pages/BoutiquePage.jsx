import { categories, money, cdfMoney, USD_TO_CDF } from '../data.js';

export default function BoutiquePage({ category, setCategory, products, onAdd }) {
  return (
    <>
      <section className="newness-tabs" aria-label="Nouveautes par categorie">        <div className="category-strip">
          {categories.map((item) => (
            <button
              key={item.id}
              className={category === item.id ? 'active' : ''}
              onClick={() => setCategory(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </section>
      <section className="shop-layout" id="products">
        <div className="products-area">
          <div className="section-head">
            <div>
              <p>Collection Zayane</p>
              <h2>Vetements pour bouger avec style</h2>
            </div>
            <span>{products.length} articles</span>
          </div>
          <div className="product-grid">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} onAdd={onAdd} />
            ))}
          </div>
        </div>
      </section>
<Footer />
    </>
  );
}

function ProductCard({ product, onAdd }) {
  return (
    <article className="product-card">
      <div className="image-wrap">
        <img src={product.image} alt={product.name} />
        <button aria-label="Favori">
          <img src="/assets/heart-regular.png" alt="" />
        </button>
      </div>
      <div className="product-copy">
        <div className="meta-row">
          <span>{product.tag}</span>
          <span>{product.code}</span>
        </div>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <small>{product.color}</small>
      </div>
      <div className="product-buy">
        <div className="price-stack">
          <strong>{money.format(product.price)}</strong>
          <span>{cdfMoney.format(product.price * USD_TO_CDF)}</span>
        </div>
        <button className="add-bag" onClick={() => onAdd(product)} aria-label="Ajouter au panier">
          <img src="/assets/bag-shopping-solid.png" alt="" />
        </button>
      </div>
    </article>
  );
}

function Footer() {
  return (
    <footer>
      <img src="/assets/logo_font_trans.png" alt="Zayane" />
      <p>R.Zayane Boutique</p>
      <span>Mode, catalogue et commandes R.Zayane.</span>
    </footer>
  );
}


