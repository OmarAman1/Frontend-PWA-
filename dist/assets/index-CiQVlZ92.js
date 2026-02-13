(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))n(a);new MutationObserver(a=>{for(const i of a)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function e(a){const i={};return a.integrity&&(i.integrity=a.integrity),a.referrerPolicy&&(i.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?i.credentials="include":a.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(a){if(a.ep)return;a.ep=!0;const i=e(a);fetch(a.href,i)}})();const Z="https://potterhead-api.vercel.app/api",Q="https://potterhead-api.vercel.app/api/characters";async function tt(){const t=await fetch(`${Z}/movies`);if(!t.ok)throw new Error("Kunde inte hämta karaktärer från SWAPI.");return t.json()}async function et(){const t=await fetch(Q);if(!t.ok)throw new Error("Kunde inte hämta karaktärer från SWAPI.");return t.json()}const y=()=>`
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
  `;function rt(t=""){return String(t).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function w(t="home",r=""){const e=a=>t===a?"active":"",n=a=>t===a?'aria-current="page"':"";return`<nav class="navbar navbar-expand-lg ">
  <div class="container-fluid">
    <a class="navbar-brand" href="?page=home">Harry Potter Epics</a>
    <button class="navbar-toggler" id="navbar-toggler" type="button" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
     <svg xmlns="http://www.w3.org/2000/svg" width="28" height="24"  fill="currentColor" class="bi bi-list" id="navbar-toggler-icon" viewBox="0 0 16 16 ">
  <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
</svg>
    </button>
    <div class="collapse navbar-collapse"id="navbarSupportedContent">
      <ul class="navbar-nav">
        <li class="nav-item"><a class="nav-link ${e("home")}" ${n("home")} href="?page=home">Home</a></li>
        <li class="nav-item"><a class="nav-link ${e("movies")}" ${n("movies")} href="?page=home">Movies</a></li>
        <li class="nav-item"><a class="nav-link ${e("top-rated")}" ${n("top-rated")} href="?page=top-rated">Top Rated</a></li>
        <li class="nav-item"><a class="nav-link ${e("favorites")}" ${n("favorites")} href="?page=favorites">Favorites</a></li>
      </ul>
      <form class="nav-search" data-search-form>
        <input class="form-control" name="q" type="search" placeholder="Search movie..." aria-label="Search" value="${rt(r)}">
        <button class="btn-search" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>`}function at(t=""){return`
    <div class="favorites-page">
      ${w("favorites",t)}
      <main class="container">
        <h1 class="page-title">Favorite Movies</h1>
        <p class="top-rated-subtitle">Saved in your browser (IndexedDB).</p>
        <section id="favoritesSection"></section>
      </main>
      ${y()}
    </div>
  `}function nt(){return new Date().getFullYear(),`
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
  `}function c(t=""){return String(t).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function it(t){const r=t?.producers??t?.producer??t?.made_by??t?.creators??t?.crew??[],e=Object.entries(t||{}).filter(([a])=>/producer|creator|made|crew/i.test(a)).map(([,a])=>a),n=Array.isArray(r)?[...r,...e]:[r,...e];return Array.isArray(n)?n.flatMap(a=>Array.isArray(a)?a:[a]).map(a=>typeof a=="string"?{fullName:a}:a&&typeof a=="object"?{id:a.id??a._id??a.code??"",title:a.title??a.role??"Producer",fullName:a.fullName??a.name??a.full_name??"",avatar:a.avatar??a.image??a.photo??""}:null).filter(Boolean).filter(a=>a.fullName):typeof n=="string"&&n.trim()?n.split(",").map(a=>a.trim()).filter(Boolean).map(a=>({fullName:a})):[]}function st(t=""){return t.split(" ").map(r=>r.trim()).filter(Boolean).slice(0,2).map(r=>r[0]?.toUpperCase()||"").join("")}function ot(t=[],r="Actor"){return Array.isArray(t)?t.flatMap(e=>Array.isArray(e)?e:[e]).map(e=>typeof e=="string"?{fullName:e,title:r}:e&&typeof e=="object"?{id:e.id??e._id??e.code??e.slug??"",title:e.title??e.role??e.house??e.species??e.ancestry??r,fullName:e.fullName??e.name??e.full_name??"",avatar:e.avatar??e.image??e.photo??""}:null).filter(Boolean).filter(e=>e.fullName):[]}function ct(t,r=[]){const e=Array.isArray(r)&&r.length>0,n=e?ot(r,"Actor"):it(t),a=e?"Actors":"Producers",i=e?"No actors data available for this movie.":"No producers data available for this movie.";return`
    <section class="producers-section" aria-label="${a}">
      <h2 class="producers-title">${a}</h2>
      <div class="producers-grid">
        ${n.length?n.map((s,o)=>{const l=c(s.fullName||"Unknown"),d=c(s.title||"Producer"),L=c(String(s.id||`PR-${String(o+1).padStart(2,"0")}`)),K=c(s.avatar||""),X=c(st(s.fullName||"P"));return`
                    <article class="producer-card">
                      ${K?`<img class="producer-avatar" src="${K}" alt="${l}" loading="lazy" />`:`<div class="producer-avatar producer-avatar-fallback" aria-hidden="true">${X}</div>`}
                      <div class="producer-info">
                        ${e?"":`<span class="producer-id">${L}</span>`}
                        <p class="producer-role">${d}</p>
                        <p class="producer-name">${l}</p>
                      </div>
                    </article>
                  `}).join(""):`<article class="producer-card"><div class="producer-info"><p class="producer-name">${i}</p></div></article>`}
      </div>
    </section>
  `}function S(t,r="",e={}){const{characters:n=[]}=e;return t?`
    <div class="details-page">
      ${w("movies",r)}
      <main class="container">
        <a class="back-link" href="?page=home">← Back to movies</a>
        <section class="details-card">
          <img class="details-poster"
               src="${c(t.poster||"")}"
               alt="${c(t.title||"Movie poster")}" />

          <div class="details-content">
            <h1>${c(t.title||"Movie")}</h1>
            <p class="details-summary">${c(t.summary||"No summary available.")}</p>
            <p><strong>Release:</strong> ${c(t.release_date||"–")}</p>
            <p><strong>Runtime:</strong> ${c(t.running_time||"–")}</p>
            <p><strong>Rating:</strong> ${c(t.rating||"–")}</p>

            <div class="details-actions">
              <a href="${c(t.trailer||"#")}"
                 class="btn btn-primary"
                 target="_blank" rel="noreferrer"
                 ${t.trailer?"":"aria-disabled='true' onclick='return false;'"}>
                Watch trailer
              </a>
              <a href="${c(t.wiki||"#")}"
                 class="btn btn-outline-secondary"
                 target="_blank" rel="noreferrer"
                 ${t.wiki?"":"aria-disabled='true' onclick='return false;'"}>
                Read wiki
              </a>
            </div>
          </div>

        </section>
        ${ct(t,n)}
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
    `}function lt(t,r={}){const{interactive:e=!0}=r;return`
    <div class="rating-page">
      <div class="${e?"stars rating-input":"stars rating-readonly"}" ${e?"data-rating-input":""} data-movie-id="${t}">
        <span class="star" data-value="1" role="${e?"button":"img"}" tabindex="${e?"0":"-1"}" aria-label="Sätt betyg 1 av 5">&#9733;</span>
        <span class="star" data-value="2" role="${e?"button":"img"}" tabindex="${e?"0":"-1"}" aria-label="Sätt betyg 2 av 5">&#9733;</span>
        <span class="star" data-value="3" role="${e?"button":"img"}" tabindex="${e?"0":"-1"}" aria-label="Sätt betyg 3 av 5">&#9733;</span>
        <span class="star" data-value="4" role="${e?"button":"img"}" tabindex="${e?"0":"-1"}" aria-label="Sätt betyg 4 av 5">&#9733;</span>
        <span class="star" data-value="5" role="${e?"button":"img"}" tabindex="${e?"0":"-1"}" aria-label="Sätt betyg 5 av 5">&#9733;</span>
      </div>
    </div>
  `}function u(t=""){return String(t).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function R(t,r={}){const e=Array.isArray(t)?t:[t],{allowRating:n=!0}=r;return`
    <section aria-label="Lista med filmer och serier" class="movies-grid">
    <h2 class="visually-hidden">Filmlista</h2>
        ${e.map((a,i)=>{const s=i===0,o=u(a.serial??a.id??""),l=u(a.movieKey??a.id??a.serial??`${a.title??""}-${a.release_date??""}`.trim()),d=`moviesCard-${l||"x"}`,L=`favIcon-${l||"x"}`;return`

                <div class="card h-100 movie-card" id="${d}" data-movie-id="${l}">
                <img class="card-img"
          src="${u(a.poster||"")}"
          alt="${u(a.title||"Movie poster")}"
          loading="${s?"eager":"lazy"}"
          decoding="async" />

                  <div class="card-body d-flex flex-column">
                    <p class="card-title fw-bold">${u(a.title||"Card title")}</p>


                    <p class="mb-1"><strong>Release:</strong> ${u(a.release_date||"–")}</p>
                    <p class="mb-1"><strong>Runtime:</strong> ${u(a.running_time||"–")}</p>
                    <p class="mb-2"><strong>Rating:</strong> ${u(a.rating||"–")}</p>

                <div class=" d-flex justify-content-between mb-2 border-0 ">
                    <div class="movie-rating">
                    ${lt(l,{interactive:n})}
                    </div>
                  <button class="btn btn-link p-0 m-2 favorite-btn"
                          type="button"
                          aria-label="Lägg till ${u(a.title||"filmen")} i favoriter"
                          aria-pressed="false"
                          data-serial="${o}"
                          data-movie-id="${l}">
                    <i id="${L}" class="bi bi-heart"></i>
                  </button>

                </div>

                    <div class="mt-auto d-flex gap-2">
                      <a href="${u(a.trailer||"#")}"
                         class="btn btn-primary flex-fill"

                         target="_blank" rel="noreferrer"
                         ${a.trailer?"":"aria-disabled='true' onclick='return false;'"}>Trailer</a>

                      <a href="${u(a.wiki||"#")}"
                         class="btn btn-secondary flex-fill"
                          id="btn_wiki"
                         target="_blank" rel="noreferrer"
                         ${a.wiki?"":"aria-disabled='true' onclick='return false;'"}>Wiki</a>
                    </div>




                </div>
              </div>
            `}).join("")}
    </section>
  `}function dt(t=""){return`
    <div class="top-rated-page">
      ${w("top-rated",t)}
      <main class="container">
        <h1 class="page-title">Top Rated Movies</h1>
        <p class="top-rated-subtitle">The highest-rated picks from the wizarding world.</p>
        <section id="topRatedSection"></section>
      </main>
      ${y()}
    </div>
  `}const ut="movies-app-db",ft=2,p="favorites",D="ratings";function N(){return new Promise((t,r)=>{const e=indexedDB.open(ut,ft);e.onupgradeneeded=()=>{const n=e.result;n.objectStoreNames.contains(p)||n.createObjectStore(p,{keyPath:"movieKey"}),n.objectStoreNames.contains(D)||n.createObjectStore(D,{keyPath:"movieKey"})},e.onsuccess=()=>t(e.result),e.onerror=()=>r(e.error)})}function _(t){return String(typeof t=="string"||typeof t=="number"?t:t?.movieKey??t?.id??t?.serial??`${t?.title??""}-${t?.release_date??""}`.trim())}function b(t){return _(t)}async function $(){const t=await N();return new Promise((r,e)=>{const i=t.transaction(p,"readonly").objectStore(p).getAll();i.onsuccess=()=>r(i.result||[]),i.onerror=()=>e(i.error)})}async function pt(t){const r=_(t);if(!r)return;const e=await N();return new Promise((n,a)=>{const o=e.transaction(p,"readwrite").objectStore(p).put({...t,movieKey:r});o.onsuccess=()=>n(o.result),o.onerror=()=>a(o.error)})}async function gt(t){const r=_(t);if(!r)return;const e=await N();return new Promise((n,a)=>{const o=e.transaction(p,"readwrite").objectStore(p).delete(r);o.onsuccess=()=>n(),o.onerror=()=>a(o.error)})}const vt="movies-app-db",mt=2,O="favorites",h="ratings";function z(){return new Promise((t,r)=>{const e=indexedDB.open(vt,mt);e.onupgradeneeded=()=>{const n=e.result;n.objectStoreNames.contains(O)||n.createObjectStore(O,{keyPath:"movieKey"}),n.objectStoreNames.contains(h)||n.createObjectStore(h,{keyPath:"movieKey"})},e.onsuccess=()=>t(e.result),e.onerror=()=>r(e.error)})}async function ht(){const t=await z();return new Promise((r,e)=>{const i=t.transaction(h,"readonly").objectStore(h).getAll();i.onsuccess=()=>r(i.result||[]),i.onerror=()=>e(i.error)})}async function V(t,r){const e=String(t||""),n=Number(r||0);if(!e||n<1||n>5)return;const a=await z();return new Promise((i,s)=>{const d=a.transaction(h,"readwrite").objectStore(h).put({movieKey:e,value:n});d.onsuccess=()=>i(d.result),d.onerror=()=>s(d.error)})}const M=document.getElementById("offline-banner-root");function E(){if(!M)return;if(navigator.onLine){M.innerHTML="";return}M.innerHTML=`
    <div role="alert" class="offline-banner">
      ⚠️ Du är offline. Appen kan ha begränsad funktion.
    </div>
  `}E();window.addEventListener("online",E);window.addEventListener("offline",E);const g=document.getElementById("app");let v=null,m=new Set,f=new Map;"serviceWorker"in navigator&&window.addEventListener("load",async()=>{try{const t=await navigator.serviceWorker.register("/Frontend-PWA-/sw.js");console.log("✅ Service Worker registrerad:",t.scope)}catch(t){console.log("❌ Service Worker kunde inte registreras:",t)}});function x(t=""){return String(t).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}async function T(){return v||(v=await tt(),v)}function G(t){return v&&v.find(r=>String(b(r))===String(t))||null}function bt(t){return Array.isArray(t)?t:t&&Array.isArray(t.data)?t.data:t&&Array.isArray(t.results)?t.results:[]}function yt(t){const r=new Set;return t?(t.id!==void 0&&t.id!==null&&r.add(String(t.id)),t.serial!==void 0&&t.serial!==null&&r.add(String(t.serial)),t.movieKey!==void 0&&t.movieKey!==null&&r.add(String(t.movieKey)),t.title&&r.add(String(t.title)),t.title&&t.release_date&&r.add(`${t.title} ${t.release_date}`),Array.from(r).map(e=>e.toLowerCase())):[]}function wt(t){const r=["movie","movies","film","films","appearances","appearsIn","appears_in","movieTitle","movie_title","movieId","movie_id","serial","title"],e=[];return r.forEach(n=>{const a=t?.[n];if(a){if(Array.isArray(a)){a.forEach(i=>e.push(i));return}e.push(a)}}),e}function St(t,r){if(!r.length)return!1;const e=wt(t);return e.length?e.some(n=>n&&typeof n=="object"?[n.title,n.name,n.id,n.movieKey,n.serial].filter(Boolean).some(i=>r.some(s=>String(i).toLowerCase().includes(s))):r.some(a=>String(n).toLowerCase().includes(a))):!1}async function W(t){if(!t)return[];try{const r=await et(),e=bt(r),n=yt(t),a=e.filter(s=>St(s,n));return(a.length?a:e).slice(0,12)}catch{return[]}}function k(t,r){if(!t)return;t.setAttribute("aria-pressed",String(r));const e=String(t.dataset.movieId||""),n=G(e),a=n?.title?String(n.title):"filmen";t.setAttribute("aria-label",r?`Ta bort ${a} från favoriter`:`Lägg till ${a} i favoriter`)}async function $t(){try{const t=await $();m=new Set(t.map(r=>String(r.movieKey??b(r))))}catch{m=new Set}}function P(t,r){t&&(t.classList.toggle("bi-heart-fill",r),t.classList.toggle("bi-heart",!r))}async function H(){await $t(),document.querySelectorAll(".favorite-btn[data-movie-id]").forEach(r=>{const e=String(r.dataset.movieId||""),n=r.querySelector("i"),a=m.has(e);P(n,a),k(r,a)})}async function Y(){try{const t=await ht();f=new Map(t.map(r=>[String(r.movieKey),Number(r.value||0)]))}catch{f=new Map}}function I(t,r){if(!t)return;t.querySelectorAll(".star").forEach(n=>{const a=Number(n.getAttribute("data-value")||"0");n.style.color=a<=r?"#ffd700":"#d7d7d7"})}async function C(){await Y(),document.querySelectorAll(".stars[data-movie-id]").forEach(r=>{const e=String(r.getAttribute("data-movie-id")||""),n=f.get(e)||0;I(r,n)})}function B(t,r){const e=String(r||"").trim().toLowerCase();return e?t.filter(n=>{const a=String(n.title||"").toLowerCase(),i=String(n.summary||"").toLowerCase();return a.includes(e)||i.includes(e)}):t}function U(t){const r=String(t?.rating??"").replace(/[^\d.]/g,""),e=Number.parseFloat(r);return Number.isFinite(e)?e:0}function F(t="Loading..."){return`
    <div class="status-box status-loading" role="status" aria-live="polite">
      <span class="spinner" aria-hidden="true"></span>
      <p>${x(t)}</p>
    </div>
  `}function q(t){return`
    <div class="status-box status-empty">
      <p>${x(t)}</p>
    </div>
  `}function j(t){return`
    <div class="status-box status-error" role="alert">
      <p>${x(t)}</p>
    </div>
  `}async function At(t=""){g.innerHTML=nt();const r=document.getElementById("moviesSection");if(r){r.innerHTML=F("Loading movies...");try{const e=await T(),n=B(e,t);r.innerHTML=n.length?R(n,{allowRating:!0}):q(`No movies found for "${t}".`),await H(),await C()}catch{r.innerHTML=j("Could not load movies right now.")}}}async function Lt(t=""){g.innerHTML=dt(t);const r=document.getElementById("topRatedSection");if(r){r.innerHTML=F("Loading top rated movies...");try{const e=await T();await Y();const i=[...B(e,t).filter(s=>f.has(String(b(s))))].sort((s,o)=>{const l=f.get(String(b(s)))||0,d=f.get(String(b(o)))||0;return d!==l?d-l:U(o)-U(s)});r.innerHTML=i.length?R(i,{allowRating:!1}):q("No rated movies yet. Please rate movies on Home page."),await H(),await C()}catch{r.innerHTML=j("Could not load top rated movies right now.")}}}async function J(t=""){g.innerHTML=at(t);const r=document.getElementById("favoritesSection");if(r){r.innerHTML=F("Loading favorites...");try{const e=await $(),n=B(e,t);r.innerHTML=n.length?R(n,{allowRating:!1}):q(`No favorites found${t?` for "${t}"`:""}.`),await H(),await C()}catch{r.innerHTML=j("Could not load favorites from IndexedDB.")}}}async function Mt(t,r=""){g.innerHTML=S(null,r);try{let n=(await T()).find(i=>String(i.id??i.serial)===String(t));n||(n=(await $()).find(s=>String(s.movieKey??s.id??s.serial)===String(t)));const a=await W(n);g.innerHTML=S(n||null,r,{characters:a})}catch{try{const n=(await $()).find(i=>String(i.movieKey??i.id??i.serial)===String(t)),a=await W(n);g.innerHTML=S(n||null,r,{characters:a})}catch{g.innerHTML=S(null,r)}}}async function A(){const t=new URLSearchParams(window.location.search),r=t.get("id"),e=t.get("page")||"home",n=t.get("q")||"";if(r){await Mt(r,n);return}if(e==="top-rated"){await Lt(n);return}if(e==="favorites"){await J(n);return}await At(n)}function kt(t){const r=t.target.closest(".navbar-toggler");if(!r)return;const e=document.querySelector("#navbarSupportedContent");if(!e)return;e.classList.toggle("show");const n=e.classList.contains("show");r.setAttribute("aria-expanded",String(n))}async function Pt(t){const r=t.target.closest("button.favorite-btn[data-movie-id]");if(!r)return;const e=String(r.dataset.movieId||"");if(!e)return;const n=r.querySelector("i");if(m.has(e))await gt(e),m.delete(e),P(n,!1),k(r,!1);else{const s=G(e);if(!s)return;await pt(s),m.add(e),P(n,!0),k(r,!0)}const i=new URLSearchParams(window.location.search);i.get("page")==="favorites"&&await J(i.get("q")||"")}async function Rt(t){const r=t.target.closest(".rating-input[data-movie-id]");if(!r||!t.target.classList.contains("star"))return;t.stopPropagation();const e=Number(t.target.getAttribute("data-value")||"0");if(!e)return;const n=r.getAttribute("data-movie-id")||"";n&&(await V(n,e),f.set(String(n),e),I(r,e))}function Nt(t){const r=t.target.closest(".star[data-value]");if(!r)return;const e=r.closest(".rating-input[data-movie-id]");if(!e||t.key!=="Enter"&&t.key!==" ")return;t.preventDefault();const n=Number(r.getAttribute("data-value")||"0");if(!n)return;const a=e.getAttribute("data-movie-id")||"";a&&V(a,n).then(()=>{f.set(String(a),n),I(e,n)})}function _t(t){if(t.target.closest("a, button, input, form, .star"))return;const r=t.target.closest(".movie-card[data-movie-id]");if(!r)return;const e=r.dataset.movieId;if(!e)return;const n=new URLSearchParams(window.location.search);n.set("id",e),window.history.pushState({},"",`?${n.toString()}`),A()}function Et(t){const r=t.target.closest("form[data-search-form]");if(!r)return;t.preventDefault();const e=new FormData(r),n=String(e.get("q")||"").trim(),a=new URLSearchParams(window.location.search),i=a.get("page");a.delete("id"),i!=="top-rated"&&i!=="favorites"&&a.set("page","home"),n?a.set("q",n):a.delete("q"),window.history.pushState({},"",`?${a.toString()}`),A()}document.addEventListener("click",kt);document.addEventListener("click",Pt);document.addEventListener("click",Rt);document.addEventListener("keydown",Nt);document.addEventListener("click",_t);document.addEventListener("submit",Et);window.addEventListener("popstate",A);A();
