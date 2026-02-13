import{onLCP as Z}from"https://unpkg.com/web-vitals@4?module";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))n(a);new MutationObserver(a=>{for(const i of a)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(a){const i={};return a.integrity&&(i.integrity=a.integrity),a.referrerPolicy&&(i.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?i.credentials="include":a.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(a){if(a.ep)return;a.ep=!0;const i=t(a);fetch(a.href,i)}})();Z(e=>{console.log("LCP:",e.value,"ms",e.entries[0].element);const r=document.getElementById("lcp-display")||document.createElement("div");r.id="lcp-display",r.style="position: fixed; bottom: 10px; right: 10px; background: rgba(0,0,0,0.8); color: white; padding: 10px; z-index: 10000; font-family: monospace;",r.innerText=`LCP: ${e.value.toFixed(2)}ms`,document.getElementById("lcp-display")||document.body.appendChild(r)});window.addEventListener("load",()=>{axe.run(document,(e,r)=>{if(e)throw e;console.log("Axe Results:",r),r.violations.length>0&&console.warn("Axe Violations:",r.violations)})});const Q="https://potterhead-api.vercel.app/api",ee="https://potterhead-api.vercel.app/api/characters";async function te(){const e=await fetch(`${Q}/movies`);if(!e.ok)throw new Error("Kunde inte hämta karaktärer från SWAPI.");return e.json()}async function re(){const e=await fetch(ee);if(!e.ok)throw new Error("Kunde inte hämta karaktärer från SWAPI.");return e.json()}const y=()=>`
    <footer class="site-footer">
      <div class="footer-brand">
        <h2>Harry Potter Epics</h2>
        <p>Watchlists, trailers and stories from your favorite worlds.</p>
      </div>

      <div class="footer-links">
      <a href="https://github.com/OmarAman1/Frontend-PWA-" target="_blank" rel="noopener noreferrer">
        <i class="bi bi-github"></i>
        GitHub
      </a>
      </div>

      <p class="footer-copy">© ${new Date().getFullYear()} Omar&David. All rights reserved.</p>
    </footer>
  `;function ae(e=""){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function w(e="home",r=""){const t=a=>e===a?"active":"",n=a=>e===a?'aria-current="page"':"";return`<nav class="navbar navbar-expand-lg ">
  <div class="container-fluid">
    <a class="navbar-brand" href="?page=home">Harry Potter Epics</a>
    <button class="navbar-toggler" id="navbar-toggler" type="button" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
     <svg xmlns="http://www.w3.org/2000/svg" width="28" height="24"  fill="currentColor" class="bi bi-list" id="navbar-toggler-icon" viewBox="0 0 16 16 ">
  <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
</svg>
    </button>
    <div class="collapse navbar-collapse"id="navbarSupportedContent">
      <ul class="navbar-nav">
        <li class="nav-item"><a class="nav-link ${t("home")}" ${n("home")} href="?page=home">Home</a></li>
        <li class="nav-item"><a class="nav-link ${t("movies")}" ${n("movies")} href="?page=home">Movies</a></li>
        <li class="nav-item"><a class="nav-link ${t("top-rated")}" ${n("top-rated")} href="?page=top-rated">Top Rated</a></li>
        <li class="nav-item"><a class="nav-link ${t("favorites")}" ${n("favorites")} href="?page=favorites">Favorites</a></li>
      </ul>
      <form class="nav-search" data-search-form>
        <input class="form-control" name="q" type="search" placeholder="Search movie..." aria-label="Search" value="${ae(r)}">
        <button class="btn-search" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>`}function ne(e=""){return`
    <div class="favorites-page">
      ${w("favorites",e)}
      <main class="container">
        <h1 class="page-title">Favorite Movies</h1>
        <p class="top-rated-subtitle">Saved in your browser (IndexedDB).</p>
        <section id="favoritesSection"></section>
      </main>
      ${y()}
    </div>
  `}function ie(){return new Date().getFullYear(),`
  <div class="home-page">
    ${w()}
    <main class="container">
      <!-- Offline-banner visas när du tappar internet -->
    <section class="home-hero" aria-label="Featured Harry Potter epics">
      <img
        class="home-hero__image"
        src="/Frontend-PWA-/hero-poster.svg"
        alt="Harry Potter Epics featured poster"
        width="360"
        height="540"
        loading="eager"
        fetchpriority="high"
        decoding="async"
      />
      <div class="home-hero__content">
        <p class="home-hero__eyebrow">Wizarding world collection</p>
        <h1 class="home-title">Welcome to Harry Potter Epics</h1>
        <p class="home-hero__subtitle">
          Discover every film, dive into trivia, and build your own favorites list.
        </p>
      </div>
    </section>
      <section id="moviesSection">
      </section>
    </main>
    ${y()}
    </div>
  `}function c(e=""){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function oe(e){const r=e?.producers??e?.producer??e?.made_by??e?.creators??e?.crew??[],t=Object.entries(e||{}).filter(([a])=>/producer|creator|made|crew/i.test(a)).map(([,a])=>a),n=Array.isArray(r)?[...r,...t]:[r,...t];return Array.isArray(n)?n.flatMap(a=>Array.isArray(a)?a:[a]).map(a=>typeof a=="string"?{fullName:a}:a&&typeof a=="object"?{id:a.id??a._id??a.code??"",title:a.title??a.role??"Producer",fullName:a.fullName??a.name??a.full_name??"",avatar:a.avatar??a.image??a.photo??""}:null).filter(Boolean).filter(a=>a.fullName):typeof n=="string"&&n.trim()?n.split(",").map(a=>a.trim()).filter(Boolean).map(a=>({fullName:a})):[]}function se(e=""){return e.split(" ").map(r=>r.trim()).filter(Boolean).slice(0,2).map(r=>r[0]?.toUpperCase()||"").join("")}function ce(e=[],r="Actor"){return Array.isArray(e)?e.flatMap(t=>Array.isArray(t)?t:[t]).map(t=>typeof t=="string"?{fullName:t,title:r}:t&&typeof t=="object"?{id:t.id??t._id??t.code??t.slug??"",title:t.title??t.role??t.house??t.species??t.ancestry??r,fullName:t.fullName??t.name??t.full_name??"",avatar:t.avatar??t.image??t.photo??""}:null).filter(Boolean).filter(t=>t.fullName):[]}function le(e,r=[]){const t=Array.isArray(r)&&r.length>0,n=t?ce(r,"Actor"):oe(e),a=t?"Actors":"Producers",i=t?"No actors data available for this movie.":"No producers data available for this movie.";return`
    <section class="producers-section" aria-label="${a}">
      <h2 class="producers-title">${a}</h2>
      <div class="producers-grid">
        ${n.length?n.map((o,s)=>{const l=c(o.fullName||"Unknown"),d=c(o.title||"Producer"),L=c(String(o.id||`PR-${String(s+1).padStart(2,"0")}`)),D=c(o.avatar||""),X=c(se(o.fullName||"P"));return`
                    <article class="producer-card">
                      ${D?`<img class="producer-avatar" src="${D}" alt="${l}" loading="lazy" />`:`<div class="producer-avatar producer-avatar-fallback" aria-hidden="true">${X}</div>`}
                      <div class="producer-info">
                        ${t?"":`<span class="producer-id">${L}</span>`}
                        <p class="producer-role">${d}</p>
                        <p class="producer-name">${l}</p>
                      </div>
                    </article>
                  `}).join(""):`<article class="producer-card"><div class="producer-info"><p class="producer-name">${i}</p></div></article>`}
      </div>
    </section>
  `}function S(e,r="",t={}){const{characters:n=[]}=t;return e?`
    <div class="details-page">
      ${w("movies",r)}
      <main class="container">
        <a class="back-link" href="?page=home">← Back to movies</a>
        <section class="details-card">
          <img class="details-poster"
               src="${c(e.poster||"")}"
               alt="${c(e.title||"Movie poster")}" />

          <div class="details-content">
            <h1>${c(e.title||"Movie")}</h1>
            <p class="details-summary">${c(e.summary||"No summary available.")}</p>
            <p><strong>Release:</strong> ${c(e.release_date||"–")}</p>
            <p><strong>Runtime:</strong> ${c(e.running_time||"–")}</p>
            <p><strong>Rating:</strong> ${c(e.rating||"–")}</p>

            <div class="details-actions">
              <a href="${c(e.trailer||"#")}"
                 class="btn btn-primary"
                 target="_blank" rel="noreferrer"
                 ${e.trailer?"":"aria-disabled='true' onclick='return false;'"}>
                Watch trailer
              </a>
              <a href="${c(e.wiki||"#")}"
                 class="btn btn-outline-secondary"
                 target="_blank" rel="noreferrer"
                 ${e.wiki?"":"aria-disabled='true' onclick='return false;'"}>
                Read wiki
              </a>
            </div>
          </div>

        </section>
        ${le(e,n)}
      </main>
      ${y()}
    </div>
  `:`
      <div class="details-page">
        ${w("movies",r)}
        <main class="container">
          <a class="back-link" href="?page=home">← Back to movies</a>
          <section class="details-card">
            <h1>Movie not found</h1>
            <p>We could not find this movie id.</p>
          </section>
        </main>
        ${y()}
      </div>
    `}function de(e,r={}){const{interactive:t=!0}=r;return`
    <div class="rating-page">
      <div class="${t?"stars rating-input":"stars rating-readonly"}" ${t?"data-rating-input":""} data-movie-id="${e}">
        <span class="star" data-value="1" role="${t?"button":"img"}" tabindex="${t?"0":"-1"}" aria-label="Sätt betyg 1 av 5">&#9733;</span>
        <span class="star" data-value="2" role="${t?"button":"img"}" tabindex="${t?"0":"-1"}" aria-label="Sätt betyg 2 av 5">&#9733;</span>
        <span class="star" data-value="3" role="${t?"button":"img"}" tabindex="${t?"0":"-1"}" aria-label="Sätt betyg 3 av 5">&#9733;</span>
        <span class="star" data-value="4" role="${t?"button":"img"}" tabindex="${t?"0":"-1"}" aria-label="Sätt betyg 4 av 5">&#9733;</span>
        <span class="star" data-value="5" role="${t?"button":"img"}" tabindex="${t?"0":"-1"}" aria-label="Sätt betyg 5 av 5">&#9733;</span>
      </div>
    </div>
  `}function u(e=""){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function x(e,r={}){const t=Array.isArray(e)?e:[e],{allowRating:n=!0}=r;return`
    <section aria-label="Lista med filmer och serier" class="movies-grid">
    <h2 class="visually-hidden">Filmlista</h2>
        ${t.map((a,i)=>{const o=i===0,s=u(a.serial??a.id??""),l=u(a.movieKey??a.id??a.serial??`${a.title??""}-${a.release_date??""}`.trim()),d=`moviesCard-${l||"x"}`,L=`favIcon-${l||"x"}`;return`

                <div class="card h-100 movie-card" id="${d}" data-movie-id="${l}">
                <img class="card-img"
          src="${u(a.poster||"")}"
          alt="${u(a.title||"Movie poster")}"
          loading="${o?"eager":"lazy"}"
          decoding="async" />

                  <div class="card-body d-flex flex-column">
                    <p class="card-title fw-bold">${u(a.title||"Card title")}</p>


                    <p class="mb-1"><strong>Release:</strong> ${u(a.release_date||"–")}</p>
                    <p class="mb-1"><strong>Runtime:</strong> ${u(a.running_time||"–")}</p>
                    <p class="mb-2"><strong>Rating:</strong> ${u(a.rating||"–")}</p>

                <div class=" d-flex justify-content-between mb-2 border-0 ">
                    <div class="movie-rating">
                    ${de(l,{interactive:n})}
                    </div>
                  <button class="btn btn-link p-0 m-2 favorite-btn"
                          type="button"
                          aria-label="Lägg till ${u(a.title||"filmen")} i favoriter"
                          aria-pressed="false"
                          data-serial="${s}"
                          data-movie-id="${l}">
                    <i id="${L}" class="bi bi-heart"></i>
                  </button>

                </div>

                    <div class="mt-auto d-flex gap-2">
                      <a href="${u(a.trailer||"#")}"
                         class="btn btn-primary flex-fill"

                         target="_blank" rel="noreferrer"
                         ${a.trailer?"":"aria-disabled='true' onclick='return false;'"}>Trailer</a>

                      <a href="${u(a.wiki?"":"aria-disabled='true' onclick='return false;'")}"
                         class="btn btn-secondary flex-fill"
                         target="_blank" rel="noreferrer"
                         >Wiki</a>
                    </div>




                </div>
              </div>
            `}).join("")}
    </section>
  `}function ue(e=""){return`
    <div class="top-rated-page">
      ${w("top-rated",e)}
      <main class="container">
        <h1 class="page-title">Top Rated Movies</h1>
        <p class="top-rated-subtitle">The highest-rated picks from the wizarding world.</p>
        <section id="topRatedSection"></section>
      </main>
      ${y()}
    </div>
  `}const fe="movies-app-db",pe=2,p="favorites",K="ratings";function R(){return new Promise((e,r)=>{const t=indexedDB.open(fe,pe);t.onupgradeneeded=()=>{const n=t.result;n.objectStoreNames.contains(p)||n.createObjectStore(p,{keyPath:"movieKey"}),n.objectStoreNames.contains(K)||n.createObjectStore(K,{keyPath:"movieKey"})},t.onsuccess=()=>e(t.result),t.onerror=()=>r(t.error)})}function E(e){return String(typeof e=="string"||typeof e=="number"?e:e?.movieKey??e?.id??e?.serial??`${e?.title??""}-${e?.release_date??""}`.trim())}function b(e){return E(e)}async function $(){const e=await R();return new Promise((r,t)=>{const i=e.transaction(p,"readonly").objectStore(p).getAll();i.onsuccess=()=>r(i.result||[]),i.onerror=()=>t(i.error)})}async function ge(e){const r=E(e);if(!r)return;const t=await R();return new Promise((n,a)=>{const s=t.transaction(p,"readwrite").objectStore(p).put({...e,movieKey:r});s.onsuccess=()=>n(s.result),s.onerror=()=>a(s.error)})}async function ve(e){const r=E(e);if(!r)return;const t=await R();return new Promise((n,a)=>{const s=t.transaction(p,"readwrite").objectStore(p).delete(r);s.onsuccess=()=>n(),s.onerror=()=>a(s.error)})}const me="movies-app-db",he=2,O="favorites",h="ratings";function z(){return new Promise((e,r)=>{const t=indexedDB.open(me,he);t.onupgradeneeded=()=>{const n=t.result;n.objectStoreNames.contains(O)||n.createObjectStore(O,{keyPath:"movieKey"}),n.objectStoreNames.contains(h)||n.createObjectStore(h,{keyPath:"movieKey"})},t.onsuccess=()=>e(t.result),t.onerror=()=>r(t.error)})}async function be(){const e=await z();return new Promise((r,t)=>{const i=e.transaction(h,"readonly").objectStore(h).getAll();i.onsuccess=()=>r(i.result||[]),i.onerror=()=>t(i.error)})}async function V(e,r){const t=String(e||""),n=Number(r||0);if(!t||n<1||n>5)return;const a=await z();return new Promise((i,o)=>{const d=a.transaction(h,"readwrite").objectStore(h).put({movieKey:t,value:n});d.onsuccess=()=>i(d.result),d.onerror=()=>o(d.error)})}const M=document.getElementById("offline-banner-root");function N(){if(!M)return;if(navigator.onLine){M.innerHTML="";return}M.innerHTML=`
    <div role="alert" class="offline-banner">
      ⚠️ Du är offline. Appen kan ha begränsad funktion.
    </div>
  `}N();window.addEventListener("online",N);window.addEventListener("offline",N);const g=document.getElementById("app");let v=null,m=new Set,f=new Map;"serviceWorker"in navigator&&window.addEventListener("load",async()=>{try{const e=await navigator.serviceWorker.register("/Frontend-PWA-/sw.js");console.log("✅ Service Worker registrerad:",e.scope)}catch(e){console.log("❌ Service Worker kunde inte registreras:",e)}});function _(e=""){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}async function T(){return v||(v=await te(),v)}function G(e){return v&&v.find(r=>String(b(r))===String(e))||null}function ye(e){return Array.isArray(e)?e:e&&Array.isArray(e.data)?e.data:e&&Array.isArray(e.results)?e.results:[]}function we(e){const r=new Set;return e?(e.id!==void 0&&e.id!==null&&r.add(String(e.id)),e.serial!==void 0&&e.serial!==null&&r.add(String(e.serial)),e.movieKey!==void 0&&e.movieKey!==null&&r.add(String(e.movieKey)),e.title&&r.add(String(e.title)),e.title&&e.release_date&&r.add(`${e.title} ${e.release_date}`),Array.from(r).map(t=>t.toLowerCase())):[]}function Se(e){const r=["movie","movies","film","films","appearances","appearsIn","appears_in","movieTitle","movie_title","movieId","movie_id","serial","title"],t=[];return r.forEach(n=>{const a=e?.[n];if(a){if(Array.isArray(a)){a.forEach(i=>t.push(i));return}t.push(a)}}),t}function $e(e,r){if(!r.length)return!1;const t=Se(e);return t.length?t.some(n=>n&&typeof n=="object"?[n.title,n.name,n.id,n.movieKey,n.serial].filter(Boolean).some(i=>r.some(o=>String(i).toLowerCase().includes(o))):r.some(a=>String(n).toLowerCase().includes(a))):!1}async function W(e){if(!e)return[];try{const r=await re(),t=ye(r),n=we(e),a=t.filter(o=>$e(o,n));return(a.length?a:t).slice(0,12)}catch{return[]}}function k(e,r){if(!e)return;e.setAttribute("aria-pressed",String(r));const t=String(e.dataset.movieId||""),n=G(t),a=n?.title?String(n.title):"filmen";e.setAttribute("aria-label",r?`Ta bort ${a} från favoriter`:`Lägg till ${a} i favoriter`)}async function Ae(){try{const e=await $();m=new Set(e.map(r=>String(r.movieKey??b(r))))}catch{m=new Set}}function P(e,r){e&&(e.classList.toggle("bi-heart-fill",r),e.classList.toggle("bi-heart",!r))}async function I(){await Ae(),document.querySelectorAll(".favorite-btn[data-movie-id]").forEach(r=>{const t=String(r.dataset.movieId||""),n=r.querySelector("i"),a=m.has(t);P(n,a),k(r,a)})}async function Y(){try{const e=await be();f=new Map(e.map(r=>[String(r.movieKey),Number(r.value||0)]))}catch{f=new Map}}function H(e,r){if(!e)return;e.querySelectorAll(".star").forEach(n=>{const a=Number(n.getAttribute("data-value")||"0");n.style.color=a<=r?"#ffd700":"#d7d7d7"})}async function C(){await Y(),document.querySelectorAll(".stars[data-movie-id]").forEach(r=>{const t=String(r.getAttribute("data-movie-id")||""),n=f.get(t)||0;H(r,n)})}function B(e,r){const t=String(r||"").trim().toLowerCase();return t?e.filter(n=>{const a=String(n.title||"").toLowerCase(),i=String(n.summary||"").toLowerCase();return a.includes(t)||i.includes(t)}):e}function U(e){const r=String(e?.rating??"").replace(/[^\d.]/g,""),t=Number.parseFloat(r);return Number.isFinite(t)?t:0}function F(e="Loading..."){return`
    <div class="status-box status-loading" role="status" aria-live="polite">
      <span class="spinner" aria-hidden="true"></span>
      <p>${_(e)}</p>
    </div>
  `}function q(e){return`
    <div class="status-box status-empty">
      <p>${_(e)}</p>
    </div>
  `}function j(e){return`
    <div class="status-box status-error" role="alert">
      <p>${_(e)}</p>
    </div>
  `}async function Le(e=""){g.innerHTML=ie();const r=document.getElementById("moviesSection");if(r){r.innerHTML=F("Loading movies...");try{const t=await T(),n=B(t,e);r.innerHTML=n.length?x(n,{allowRating:!0}):q(`No movies found for "${e}".`),await I(),await C()}catch{r.innerHTML=j("Could not load movies right now.")}}}async function Me(e=""){g.innerHTML=ue(e);const r=document.getElementById("topRatedSection");if(r){r.innerHTML=F("Loading top rated movies...");try{const t=await T();await Y();const i=[...B(t,e).filter(o=>f.has(String(b(o))))].sort((o,s)=>{const l=f.get(String(b(o)))||0,d=f.get(String(b(s)))||0;return d!==l?d-l:U(s)-U(o)});r.innerHTML=i.length?x(i,{allowRating:!1}):q("No rated movies yet. Please rate movies on Home page."),await I(),await C()}catch{r.innerHTML=j("Could not load top rated movies right now.")}}}async function J(e=""){g.innerHTML=ne(e);const r=document.getElementById("favoritesSection");if(r){r.innerHTML=F("Loading favorites...");try{const t=await $(),n=B(t,e);r.innerHTML=n.length?x(n,{allowRating:!1}):q(`No favorites found${e?` for "${e}"`:""}.`),await I(),await C()}catch{r.innerHTML=j("Could not load favorites from IndexedDB.")}}}async function ke(e,r=""){g.innerHTML=S(null,r);try{let n=(await T()).find(i=>String(i.id??i.serial)===String(e));n||(n=(await $()).find(o=>String(o.movieKey??o.id??o.serial)===String(e)));const a=await W(n);g.innerHTML=S(n||null,r,{characters:a})}catch{try{const n=(await $()).find(i=>String(i.movieKey??i.id??i.serial)===String(e)),a=await W(n);g.innerHTML=S(n||null,r,{characters:a})}catch{g.innerHTML=S(null,r)}}}async function A(){const e=new URLSearchParams(window.location.search),r=e.get("id"),t=e.get("page")||"home",n=e.get("q")||"";if(r){await ke(r,n);return}if(t==="top-rated"){await Me(n);return}if(t==="favorites"){await J(n);return}await Le(n)}function Pe(e){const r=e.target.closest(".navbar-toggler");if(!r)return;const t=document.querySelector("#navbarSupportedContent");if(!t)return;t.classList.toggle("show");const n=t.classList.contains("show");r.setAttribute("aria-expanded",String(n))}async function xe(e){const r=e.target.closest("button.favorite-btn[data-movie-id]");if(!r)return;const t=String(r.dataset.movieId||"");if(!t)return;const n=r.querySelector("i");if(m.has(t))await ve(t),m.delete(t),P(n,!1),k(r,!1);else{const o=G(t);if(!o)return;await ge(o),m.add(t),P(n,!0),k(r,!0)}const i=new URLSearchParams(window.location.search);i.get("page")==="favorites"&&await J(i.get("q")||"")}async function Re(e){const r=e.target.closest(".rating-input[data-movie-id]");if(!r||!e.target.classList.contains("star"))return;e.stopPropagation();const t=Number(e.target.getAttribute("data-value")||"0");if(!t)return;const n=r.getAttribute("data-movie-id")||"";n&&(await V(n,t),f.set(String(n),t),H(r,t))}function Ee(e){const r=e.target.closest(".star[data-value]");if(!r)return;const t=r.closest(".rating-input[data-movie-id]");if(!t||e.key!=="Enter"&&e.key!==" ")return;e.preventDefault();const n=Number(r.getAttribute("data-value")||"0");if(!n)return;const a=t.getAttribute("data-movie-id")||"";a&&V(a,n).then(()=>{f.set(String(a),n),H(t,n)})}function Ne(e){if(e.target.closest("a, button, input, form, .star"))return;const r=e.target.closest(".movie-card[data-movie-id]");if(!r)return;const t=r.dataset.movieId;if(!t)return;const n=new URLSearchParams(window.location.search);n.set("id",t),window.history.pushState({},"",`?${n.toString()}`),A()}function _e(e){const r=e.target.closest("form[data-search-form]");if(!r)return;e.preventDefault();const t=new FormData(r),n=String(t.get("q")||"").trim(),a=new URLSearchParams(window.location.search),i=a.get("page");a.delete("id"),i!=="top-rated"&&i!=="favorites"&&a.set("page","home"),n?a.set("q",n):a.delete("q"),window.history.pushState({},"",`?${a.toString()}`),A()}document.addEventListener("click",Pe);document.addEventListener("click",xe);document.addEventListener("click",Re);document.addEventListener("keydown",Ee);document.addEventListener("click",Ne);document.addEventListener("submit",_e);window.addEventListener("popstate",A);A();
