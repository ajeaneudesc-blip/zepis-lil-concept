/* Zépis Lil: boutique concept. Panier simulé : aucun paiement, aucune donnée envoyée. */

const PRODUCTS = {
  vanille: {
    name: "Gousses de vanille Bourbon", meta: "Vanille noire, gousses de 14 à 16 cm",
    tint: "--peach", art: "pod",
    variants: [{ id: "3", label: "3 gousses", price: 450 }, { id: "6", label: "6 gousses", price: 820 }],
    desc: "Gousses souples et grasses, à fendre pour parfumer desserts, rhums arrangés et sauces.",
  },
  the: {
    name: "Thé noir à la vanille", meta: "Feuilles entières, sachet refermable",
    tint: "--sky", art: "tea",
    variants: [{ id: "100", label: "100 g", price: 290 }, { id: "250", label: "250 g", price: 640 }],
    desc: "Un thé noir rond, relevé d'éclats de gousse. Infuser 3 minutes à 95 °C.",
  },
  cari: {
    name: "Mélange cari maison", meta: "Curcuma, coriandre, cumin, fenugrec",
    tint: "--sand", art: "jar",
    variants: [{ id: "80", label: "80 g", price: 220 }, { id: "200", label: "200 g", price: 480 }],
    desc: "Le mélange de base du cari mauricien, torréfié puis moulu en petites quantités.",
  },
  piment: {
    name: "Piment confit", meta: "Piment oiseau, citron, huile",
    tint: "--mint", art: "chili",
    variants: [{ id: "190", label: "Bocal 190 g", price: 260 }],
    desc: "Le condiment de table : piquant franc, pointe acide. Se garde au frais après ouverture.",
  },
};

const FREE_SHIPPING = 1500; // Rs, seuil fictif de la maquette
const rs = (n) => "Rs " + n.toLocaleString("fr-FR");

/* Photos des produits (Unsplash, voir img/CREDITS.md). Le « view » change le cadrage. */
const PHOTOS = {
  vanille: "img/vanille/vanille-sidath-vimukthi.jpg",
  the: "img/the/the-alice-pasqual.jpg",
  cari: "img/cari/cari-anju-ravindranath.jpg",
  piment: "img/piment/piment-abhishek-hajare.jpg",
};
function art(key, view = 0) {
  const p = PRODUCTS[key];
  const pos = ["50% 50%", "20% 40%", "80% 60%"][view];
  return `<img class="ph" src="${PHOTOS[key]}" alt="${p.name}" loading="lazy" style="object-position:${pos}">`;
}

const icon = {
  plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 5V19M5 12H19"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.6L10 17.4L19 7"/></svg>',
  trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4.5 7H19.5"/><path d="M9.5 7V5.2A1.2 1.2 0 0 1 10.7 4H13.3A1.2 1.2 0 0 1 14.5 5.2V7"/><path d="M6.3 7L7.1 18.8A1.2 1.2 0 0 0 8.3 20H15.7A1.2 1.2 0 0 0 16.9 18.8L17.7 7"/><path d="M10.2 11V16M13.8 11V16"/></svg>',
};

/* Panier */
const cart = {
  items: [],
  load() { try { this.items = JSON.parse(localStorage.getItem("zl-cart")) || []; } catch { this.items = []; } },
  save() { try { localStorage.setItem("zl-cart", JSON.stringify(this.items)); } catch {} render(); },
  add(key, vid, qty = 1) {
    const line = this.items.find((l) => l.key === key && l.vid === vid);
    if (line) line.qty += qty; else this.items.push({ key, vid, qty });
    this.save();
  },
  set(i, qty) { if (qty < 1) this.items.splice(i, 1); else this.items[i].qty = qty; this.save(); },
  count() { return this.items.reduce((s, l) => s + l.qty, 0); },
  total() { return this.items.reduce((s, l) => s + variant(l.key, l.vid).price * l.qty, 0); },
};
const variant = (key, vid) => PRODUCTS[key].variants.find((v) => v.id === vid);

function render() {
  const n = cart.count();
  document.querySelectorAll("[data-count]").forEach((b) => { b.textContent = n; b.hidden = n === 0; });
  const list = document.querySelector("#cart-items");
  if (!list) return;
  if (!cart.items.length) {
    list.innerHTML = '<li class="empty">Votre panier est vide.</li>';
  } else {
    list.innerHTML = cart.items.map((l, i) => {
      const p = PRODUCTS[l.key], v = variant(l.key, l.vid);
      return `<li class="line"><div class="th">${art(l.key)}</div><div><h3>${p.name}</h3><p>${v.label} · ${rs(v.price)}</p>
        <div class="qty" role="group" aria-label="Quantité"><button data-q="${i}" data-d="-1" aria-label="Retirer un">−</button><output aria-live="polite">${l.qty}</output><button data-q="${i}" data-d="1" aria-label="Ajouter un">+</button></div></div>
        <button class="del press" data-del="${i}" aria-label="Supprimer ${p.name}">${icon.trash}</button></li>`;
    }).join("");
  }
  const t = cart.total(), left = Math.max(0, FREE_SHIPPING - t);
  document.querySelector("#sub").textContent = rs(t);
  document.querySelector("#ship").textContent = t === 0 ? "Rs 0" : left === 0 ? "Offerte" : rs(150);
  document.querySelector("#total").textContent = rs(t === 0 ? 0 : t + (left === 0 ? 0 : 150));
  document.querySelector("#bar").style.width = Math.min(100, (t / FREE_SHIPPING) * 100) + "%";
  document.querySelector("#hint").textContent = left === 0 ? "Livraison offerte à Maurice." : `Plus que ${rs(left)} pour la livraison offerte.`;
  document.querySelector("#checkout").disabled = t === 0;
}

/* Tiroir : focus piégé, Échap pour fermer */
let lastFocus;
function openCart() {
  lastFocus = document.activeElement;
  document.querySelector(".drawer").classList.add("open");
  document.querySelector(".scrim").classList.add("open");
  document.querySelector(".drawer [data-close]").focus();
}
function closeCart() {
  document.querySelector(".drawer").classList.remove("open");
  document.querySelector(".scrim").classList.remove("open");
  lastFocus?.focus();
}

let toastTimer;
function toast(msg) {
  const t = document.querySelector(".toast");
  t.innerHTML = icon.check + msg;
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("show"), 2200);
}

/* Grille des best-sellers */
function renderGrid() {
  const g = document.querySelector("#grid");
  if (!g) return;
  g.innerHTML = Object.entries(PRODUCTS).map(([k, p]) => `
    <article class="card"><a class="media" href="produit.html?p=${k}" tabindex="-1" aria-hidden="true">${art(k)}</a>
      <div class="card-body"><h3><a href="produit.html?p=${k}">${p.name}</a></h3><p class="meta">${p.variants[0].label}</p>
      <div class="row"><span class="price">${rs(p.variants[0].price)}</span>
      <button class="add-mini press" data-add="${k}" aria-label="Ajouter ${p.name} au panier">${icon.plus}</button></div></div></article>`).join("");
}

/* Fiche produit */
function renderPdp() {
  const root = document.querySelector("#pdp");
  if (!root) return;
  const key = PRODUCTS[new URLSearchParams(location.search).get("p")] ? new URLSearchParams(location.search).get("p") : "vanille";
  const p = PRODUCTS[key];
  let qty = 1, view = 0;
  document.title = `${p.name} · Zépis Lil (concept)`;
  root.querySelector("[data-name]").textContent = p.name;
  document.querySelector("[data-crumb]").textContent = p.name;
  root.querySelector("[data-meta]").textContent = p.meta;
  root.querySelector("[data-desc]").textContent = p.desc;
  const main = root.querySelector(".gallery-main");
  const thumbs = root.querySelector(".thumbs");
  const draw = () => {
    main.innerHTML = art(key, view);
    thumbs.innerHTML = [0, 1, 2].map((i) => `<button class="press" aria-label="Vue ${i + 1}" aria-pressed="${i === view}" data-view="${i}">${art(key, i)}</button>`).join("");
  };
  draw();
  thumbs.addEventListener("click", (e) => { const b = e.target.closest("[data-view]"); if (b) { view = +b.dataset.view; draw(); } });

  const seg = root.querySelector(".seg");
  seg.innerHTML = p.variants.map((v, i) => `<label><input type="radio" name="v" value="${v.id}" ${i === 0 ? "checked" : ""}><span>${v.label}</span></label>`).join("");
  const priceEls = document.querySelectorAll("[data-price]");
  const current = () => variant(key, seg.querySelector("input:checked").value);
  const updatePrice = () => priceEls.forEach((el) => (el.textContent = rs(current().price * qty)));
  seg.addEventListener("change", updatePrice);
  const out = root.querySelector(".buy output");
  root.querySelector(".buy .qty").addEventListener("click", (e) => {
    const b = e.target.closest("[data-step]"); if (!b) return;
    qty = Math.max(1, Math.min(20, qty + +b.dataset.step)); out.textContent = qty; updatePrice();
  });
  updatePrice();
  const add = () => { cart.add(key, current().id, qty); toast(`${p.name} ajouté au panier`); };
  document.querySelectorAll("[data-buy]").forEach((b) => b.addEventListener("click", add));

  // Barre d'achat mobile : visible quand le bouton principal sort de l'écran
  const sticky = document.querySelector(".sticky-buy");
  new IntersectionObserver(([e]) => sticky.classList.toggle("show", !e.isIntersecting && e.boundingClientRect.top < 0))
    .observe(root.querySelector(".buy"));
}

/* Démarrage */
cart.load();
renderGrid();
renderPdp();
render();

document.addEventListener("click", (e) => {
  const t = e.target.closest("button, a");
  if (!t) return;
  if (t.matches("[data-open-cart]")) openCart();
  else if (t.matches("[data-close]")) closeCart();
  else if (t.dataset.add) { const p = PRODUCTS[t.dataset.add]; cart.add(t.dataset.add, p.variants[0].id); toast(`${p.name} ajouté au panier`); }
  else if (t.dataset.q !== undefined) { const i = +t.dataset.q; cart.set(i, cart.items[i].qty + +t.dataset.d); }
  else if (t.dataset.del !== undefined) cart.set(+t.dataset.del, 0);
  else if (t.id === "checkout") {
    document.querySelector("#hint").textContent = "Démonstration : le tunnel s'arrête ici, aucun paiement n'est demandé.";
  }
});
document.querySelector(".scrim")?.addEventListener("click", closeCart);
document.addEventListener("keydown", (e) => {
  const d = document.querySelector(".drawer");
  if (!d.classList.contains("open")) return;
  if (e.key === "Escape") closeCart();
  if (e.key === "Tab") {
    const f = [...d.querySelectorAll("button:not([disabled]), a[href]")];
    if (!f.length) return;
    if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f.at(-1).focus(); }
    else if (!e.shiftKey && document.activeElement === f.at(-1)) { e.preventDefault(); f[0].focus(); }
  }
});

/* Newsletter : simulée */
document.querySelector("#news")?.addEventListener("submit", (e) => {
  e.preventDefault();
  e.target.querySelector(".msg").textContent = "Merci ! (démo : aucune adresse n'est enregistrée)";
  e.target.reset();
});
