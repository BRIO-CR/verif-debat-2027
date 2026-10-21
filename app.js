/* Vérif Débat 2027 : interface. Les données sont dans data.js. */

const $ = s => document.querySelector(s);
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const norm = s => String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[’']/g, " ");
const allStats = THEMES.flatMap(t => t.stats.map(s => ({...s, theme: t.id, themeNom: t.nom})));
const store = {
  get(k){ try { return JSON.parse(localStorage.getItem(k)); } catch { return null; } },
  set(k, v){ try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
};
const reduceMotion = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
let shown = new Set(store.get("vd27-cands") || CANDS.map(c => c.id));

function toast(msg){
  const t = $("#toast"); t.textContent = msg; t.hidden = false;
  clearTimeout(toast._t); toast._t = setTimeout(() => { t.hidden = true; }, 2600);
}

/* ---------- Rendu ---------- */
$("#dataDate").textContent = DATA_DATE;
$("#candsRow").innerHTML = CANDS.map(c => `<span>${esc(c.nom)}</span>`).join("");
$("#tabs").innerHTML = THEMES.map(t => `<a href="#t-${t.id}" data-t="${t.id}">${esc(t.nom)}</a>`).join("");

function renderToggles(){
  $("#ctog").innerHTML = CANDS.map(c => `<button type="button" aria-pressed="${shown.has(c.id)}" data-c="${c.id}"><span class="mono">${esc(c.init)}</span>${esc(c.court)}</button>`).join("");
  $("#ctog").querySelectorAll("button").forEach(b => b.onclick = () => {
    const id = b.dataset.c;
    if (shown.has(id)) { if (shown.size > 1) shown.delete(id); } else shown.add(id);
    store.set("vd27-cands", [...shown]); renderToggles(); applyFilters();
  });
}
function statHTML(s){
  return `<article class="stat" id="c-${s.id}" data-k="${esc(norm([s.t, s.c, s.p, s.k].join(" ")))}">
    <div class="k"><h3>${esc(s.t)}</h3><span class="per">${esc(s.per)}</span></div>
    <div class="val">${esc(s.v)}${s.u ? `<small>${esc(s.u)}</small>` : ""}</div>
    <p class="c">${esc(s.c)}</p>
    <p class="p"><b>À ne pas confondre :</b> ${esc(s.p)}</p>
    <div class="s"><a href="${esc(s.u2)}" target="_blank" rel="noopener">${esc(s.s)}</a></div>
  </article>`;
}
function srcLink(src){
  const so = src && S[src];
  return so ? ` <a class="src" href="${esc(so[1])}" target="_blank" rel="noopener">${esc(so[0])}</a>` : "";
}
function candHTML(t, c){
  const items = t.props[c.id] || [];
  const lis = items.length
    ? items.map(([txt, src]) => `<li data-k="${esc(norm(txt + " " + c.nom))}">${esc(txt)}${srcLink(src)}</li>`).join("")
    : `<li class="none">Pas de mesure précise trouvée dans les sources consultées.</li>`;
  return `<div class="cand" data-c="${c.id}">
    <div class="who"><span class="mono">${esc(c.init)}</span><div><b>${esc(c.nom)}</b><span>${esc(c.parti)}</span></div></div>
    <ul>${lis}</ul>
  </div>`;
}
$("#themes").innerHTML = THEMES.map(t => `<section class="theme" id="t-${t.id}" aria-labelledby="h-${t.id}">
  <div class="t-head"><h2 id="h-${t.id}">${esc(t.nom)}</h2><p>${esc(t.question)}</p></div>
  <p class="lab">Les chiffres</p>
  <div class="stats">${t.stats.map(statHTML).join("")}</div>
  <p class="lab">Ce que proposent les candidats</p>
  <div class="props">${CANDS.map(c => candHTML(t, c)).join("")}</div>
</section>`).join("");

$("#traps").innerHTML = PIEGES.map(([a, b]) => `<li><h3>${esc(a)}</h3><p>${esc(b)}</p></li>`).join("");
const li3 = ([n, u, w]) => `<li><a href="${esc(u)}" target="_blank" rel="noopener">${esc(n)}</a><span>${esc(w)}</span></li>`;
$("#srcOff").innerHTML = SRC_OFF.map(li3).join("");
$("#srcProg").innerHTML = SRC_PROG.map(li3).join("");
$("#srcFc").innerHTML = SRC_FC.map(li3).join("");

/* ---------- Filtres : candidats + recherche ---------- */
function applyFilters(){
  const words = norm($("#q").value.trim()).split(/\s+/).filter(Boolean);
  const hit = el => words.every(w => el.dataset.k.includes(w) || norm(el.closest(".theme")?.querySelector("h2")?.textContent || "").includes(w));
  let any = false;
  document.querySelectorAll(".theme").forEach(sec => {
    let n = 0;
    sec.querySelectorAll(".stat").forEach(st => { const ok = !words.length || hit(st); st.hidden = !ok; if (ok) n++; });
    sec.querySelectorAll(".cand").forEach(cd => {
      let m = 0;
      cd.querySelectorAll("li[data-k]").forEach(li => { const ok = !words.length || hit(li); li.hidden = !ok; if (ok) m++; });
      const none = cd.querySelector("li.none");
      if (none) none.hidden = words.length > 0;
      cd.hidden = !shown.has(cd.dataset.c) || (words.length > 0 && m === 0);
      if (!cd.hidden) n++;
    });
    sec.querySelector(".stats").hidden = ![...sec.querySelectorAll(".stat")].some(x => !x.hidden);
    sec.hidden = n === 0;
    if (n) any = true;
  });
  $("#noHit").hidden = any;
}
$("#q").addEventListener("input", applyFilters);

/* ---------- Onglet actif ---------- */
const tabs = [...document.querySelectorAll(".tabs a")];
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    tabs.forEach(a => {
      const on = a.dataset.t === e.target.id.slice(2);
      a.classList.toggle("on", on);
      if (on) a.scrollIntoView({block: "nearest", inline: "nearest"});
    });
  }), {rootMargin: "-30% 0px -60% 0px"});
  document.querySelectorAll(".theme").forEach(s => io.observe(s));
}

function focusStat(id){
  $("#q").value = ""; applyFilters();
  const el = document.getElementById("c-" + id); if (!el) return;
  el.scrollIntoView({behavior: reduceMotion() ? "auto" : "smooth", block: "center"});
  el.classList.add("flash"); setTimeout(() => el.classList.remove("flash"), 2200);
}
function focusCand(themeId, candId){
  $("#q").value = ""; shown.add(candId); store.set("vd27-cands", [...shown]); renderToggles(); applyFilters();
  const el = document.querySelector(`#t-${themeId} .cand[data-c="${candId}"]`); if (!el) return;
  el.scrollIntoView({behavior: reduceMotion() ? "auto" : "smooth", block: "center"});
}

/* ==========================================================
   Comparateur hors ligne
   Repère le sujet, les candidats cités et les nombres de la phrase,
   puis les rapproche des chiffres et des mesures de data.js.
   ========================================================== */
const STOP = new Set("avec dans pour plus moins sont etre fait faire tout tous toute toutes elle elles nous vous leur leurs cette ces depuis deja jamais aussi tres comme mais donc alors entre sans sous chez vers notre votre quand dont veut veulent propose proposer france francais francaise deux trois quatre cinq cent mille".split(" "));
const ALIASES = {
  glucksmann: ["glucksmann", "glucksman", "place publique"],
  lepen: ["le pen", "lepen", "rassemblement national", "marine le pen"],
  lisnard: ["lisnard", "nouvelle energie"],
  melenchon: ["melenchon", "insoumis", "lfi"],
  philippe: ["philippe", "horizons"],
  tondelier: ["tondelier", "ecologistes"],
};
const FRACTIONS = [
  [/\b(un|une)\s+(\w+\s+)?sur\s+deux\b/, 50], [/\b(un|une)\s+(\w+\s+)?sur\s+trois\b/, 33.3],
  [/\b(un|une)\s+(\w+\s+)?sur\s+quatre\b/, 25], [/\b(un|une)\s+(\w+\s+)?sur\s+cinq\b/, 20],
  [/\b(un|une)\s+(\w+\s+)?sur\s+dix\b/, 10], [/\bla\s+moitie\b/, 50], [/\bun\s+tiers\b/, 33.3], [/\bun\s+quart\b/, 25],
];
const RECORD = /\bjamais\b|\brecord|\bhistorique|\bexplos|\bflamb|\bsans precedent|\bplus haut|\bplus bas/;
const ABOVE = /depass|plus de|au-dela|au dela|au-dessus|au dessus|superieur|franchi|excede/;
const BELOW = /moins de|en dessous|en-dessous|inferieur|sous la barre/;

const stem = w => w.length > 6 ? w.slice(0, w.length - 2) : w;
const words = s => norm(s).split(/[^a-z0-9]+/).filter(w => w.length > 3 && !STOP.has(w)).map(stem);

function family(u){
  if (u === "%") return "%";
  if (u === "md" || u.startsWith("milliard")) return "md";
  if (u.startsWith("million")) return "million";
  if (u === "€" || u.startsWith("euro")) return "eur";
  return u;
}
function numbersIn(text){
  const out = [];
  const re = /(\d{1,3}(?:[   ]\d{3})+|\d+)(?:[,.](\d+))?\s*(%|md|milliards?|millions?|mt|twh|€|euros?)?/gi;
  let m;
  while ((m = re.exec(text))) {
    const raw = m[1].replace(/[   ]/g, "");
    const val = parseFloat(raw + (m[2] ? "." + m[2] : ""));
    const unit = family((m[3] || "").toLowerCase());
    if (!m[2] && !unit && val >= 1950 && val <= 2100) continue; /* une année */
    out.push({val, txt: m[0].trim(), unit});
  }
  return out;
}
function claimNumbers(text){
  const n = norm(text);
  const nums = numbersIn(n);
  FRACTIONS.forEach(([re, v]) => { const m = n.match(re); if (m) nums.push({val: v, txt: m[0], unit: "%", frac: true}); });
  return nums;
}
const fmt = v => v.toLocaleString("fr-FR", {maximumFractionDigits: 2});

function scoreStat(s, ws){
  const title = norm(s.t + " " + s.k), theme = norm(s.themeNom), body = norm(s.c);
  return ws.reduce((n, w) => n + (title.includes(w) ? 3 : body.includes(w) ? 1 : 0) + (theme.includes(w) ? 1 : 0), 0);
}
function compareNumbers(claimNums, s, dir){
  const off = numbersIn(norm(s.v + " " + s.u + " ; " + s.c));
  if (!claimNums.length || !off.length) return null;
  let best = null;
  claimNums.forEach(cn => {
    /* Avec une unité (%, milliards…) : on compare aux chiffres officiels de même unité.
       Sans unité : seulement à la valeur principale, et seulement si l'ordre de grandeur colle
       (sinon le nombre désigne autre chose, par exemple un âge). */
    const pool = cn.unit ? off.filter(o => o.unit === cn.unit) : off.slice(0, 1);
    const cands = [cn.val];
    if (cn.val >= 1e5) cands.push(cn.val / 1e3, cn.val / 1e6, cn.val / 1e9);
    cands.forEach(cv => pool.forEach(o => {
      if (!o.val) return;
      const rel = Math.abs(cv - o.val) / o.val;
      if (!cn.unit && rel > 0.5) return;
      if (!best || rel < best.rel) best = {rel, claim: cn, claimVal: cv, off: o};
    }));
  });
  if (!best) return null;
  const {rel, claim, claimVal, off: o} = best;
  let cls, label, note;
  if (rel <= 0.02) { cls = "i-ok"; label = "Concorde"; note = `Le chiffre cité (${claim.txt}) correspond au chiffre officiel (${o.txt}).`; }
  else if (rel <= 0.12) { cls = "i-near"; label = "Proche"; note = `Le chiffre cité (${claim.txt}) est proche du chiffre officiel (${o.txt}) : arrondi, date ou périmètre à préciser.`; }
  else { cls = "i-gap"; label = "Écart notable"; note = `Le chiffre cité (${claim.txt}) s'écarte du chiffre officiel le plus proche (${o.txt}), soit environ ${Math.round(rel * 100)} % d'écart.`; }
  if (rel <= 0.12 && dir === ">" && o.val < claimVal) { cls = "i-near"; label = "Presque"; note = `La phrase parle d'un seuil dépassé, mais le chiffre officiel (${o.txt}) est encore en dessous de ${claim.txt}.`; }
  if (rel <= 0.12 && dir === "<" && o.val > claimVal) { cls = "i-near"; label = "Presque"; note = `La phrase parle d'un niveau inférieur à ${claim.txt}, mais le chiffre officiel (${o.txt}) est au-dessus.`; }
  if (claim.frac) note += ` (« ${claim.txt} » ≈ ${fmt(claimVal)} %.)`;
  return {cls, label, note};
}

function analyse(text){
  const n = norm(text), ws = words(text);
  const cands = CANDS.filter(c => ALIASES[c.id].some(a => n.includes(a)));
  const dir = ABOVE.test(n) ? ">" : BELOW.test(n) ? "<" : null;
  const nums = claimNumbers(text);

  const ranked = allStats.map(s => ({s, sc: scoreStat(s, ws)})).filter(x => x.sc >= 2).sort((a, b) => b.sc - a.sc);
  let stats = ranked.filter((x, i) => i === 0 || (i === 1 && x.sc >= ranked[0].sc * 0.75));
  /* Un seul mot commun ne suffit pas : si le chiffre trouvé couvre moins d'un tiers
     des mots de la phrase, le sujet est probablement hors des données de l'app. */
  const uniq = [...new Set(ws)];
  if (stats.length && uniq.length) {
    const s0 = stats[0].s, hay = norm([s0.t, s0.k, s0.themeNom, s0.c].join(" "));
    if (uniq.filter(w => hay.includes(w)).length / uniq.length < 0.34) stats = [];
  }
  const themeIds = new Set(stats.map(x => x.s.theme));

  const measures = [];
  cands.forEach(c => {
    const found = THEMES.flatMap(t => {
      const tt = norm(t.nom + " " + t.stats.map(s => s.t + " " + s.k).join(" "));
      const themeHit = themeIds.has(t.id) || ws.some(w => tt.includes(w));
      return (t.props[c.id] || []).map(([m, src]) => {
        const mn = norm(m);
        let sc = ws.reduce((k, w) => k + (mn.includes(w) ? 2 : 0), 0);
        nums.forEach(x => { if (new RegExp("(^|[^0-9])" + String(x.val).replace(".", ",") + "([^0-9]|$)").test(mn)) sc += 2; });
        if (themeHit) sc += 2;
        return {c, t, m, src, sc};
      });
    }).filter(x => x.sc >= 2).sort((a, b) => b.sc - a.sc).slice(0, 3);
    measures.push({c, found});
  });
  return {cands, stats, measures, nums, dir, record: RECORD.test(n)};
}

function renderAnalysis(a){
  const r = $("#result"); r.hidden = false;
  const parts = [];

  a.measures.forEach(({c, found}) => {
    parts.push(`<div class="r-sec"><h3>Ce que propose ${esc(c.nom)}</h3>${found.length
      ? `<ul class="mlist">${found.map(x => `<li><b>${esc(x.t.nom)}</b>${esc(x.m)}${srcLink(x.src)}</li>`).join("")}</ul>
         <p class="disc">Comparez la phrase à ces mesures : un ajout, une échéance ou un chiffre absent du programme est un signal d'alerte.</p>`
      : `<p class="small">Aucune mesure de ${esc(c.court)} sur ce sujet dans l'app. Consultez son programme dans « Où vérifier soi-même ».</p>`}</div>`);
  });

  if (a.stats.length) {
    parts.push(`<div class="r-sec"><h3>Chiffres officiels liés</h3>${a.stats.map(({s}) => {
      const cmp = compareNumbers(a.nums, s, a.dir);
      return `<div class="cmp">
        <div class="top"><span class="ttl"><a href="#c-${s.id}" data-s="${s.id}">${esc(s.t)}</a> · <span class="small">${esc(s.per)}</span></span><span class="off">${esc(s.v)} ${esc(s.u)}</span></div>
        ${cmp ? `<span class="ind ${cmp.cls}"><i></i>${esc(cmp.label)}</span><p>${esc(cmp.note)}</p>` : ""}
        <p>${esc(s.c)}</p>
        <p class="small"><b>À ne pas confondre :</b> ${esc(s.p)}</p>
      </div>`;
    }).join("")}</div>`);
  }

  if (a.record && a.stats.length) {
    parts.push(`<p class="note"><b>Formule de record.</b> « Jamais », « record » ou « explose » se vérifient sur une période précise : regardez depuis quand le niveau est atteint et en euros ou en pourcentage.</p>`);
  }
  if (!parts.length) {
    const q = $("#claim").value.trim();
    const fc = "https://www.google.com/search?q=" + encodeURIComponent(q + " (site:factuel.afp.com OR site:lemonde.fr/les-decodeurs OR site:liberation.fr/checknews OR site:francetvinfo.fr/vrai-ou-fake)");
    const ai = "https://claude.ai/new?q=" + encodeURIComponent("Vérifie cette affirmation entendue dans un débat politique. Dis si elle est exacte, imprécise ou fausse, d'où vient le chiffre, et donne tes sources : « " + q + " »");
    parts.push(`<div class="r-sec"><h3>Hors des données de l'app</h3>
      <p class="small">Ce sujet ne fait pas partie des sept thèmes de l'app (${esc(THEMES.map(t => t.nom.toLowerCase()).join(", "))}). Pour le vérifier ailleurs :</p>
      <div class="refs"><a class="ref" href="${esc(fc)}" target="_blank" rel="noopener">Chercher chez les fact-checkeurs</a><a class="ref" id="askAi" href="${esc(ai)}" target="_blank" rel="noopener">Demander à Claude</a></div></div>`);
  } else {
    parts.push(`<p class="disc">Comparaison automatique à partir des données de l'app, mises à jour le ${esc(DATA_DATE)}. Ouvrez la source avant de reprendre un chiffre.</p>`);
  }
  r.innerHTML = parts.join("");
  r.querySelectorAll("[data-s]").forEach(el => el.onclick = ev => { ev.preventDefault(); focusStat(el.dataset.s); });
  const ask = r.querySelector("#askAi");
  if (ask) ask.addEventListener("click", () => { navigator.clipboard?.writeText($("#claim").value.trim()).catch(() => {}); });
}

function check(){
  const text = $("#claim").value.trim();
  if (!text) { const r = $("#result"); r.hidden = false; r.innerHTML = `<p class="small">Saisissez d'abord une affirmation.</p>`; return; }
  renderAnalysis(analyse(text));
}
$("#go").onclick = check;
$("#claim").addEventListener("keydown", e => { if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) check(); });
$("#examples").innerHTML = EXEMPLES.map((e, i) => `<button type="button" data-i="${i}">${esc(e)}</button>`).join("");
$("#examples").querySelectorAll("button").forEach(b => b.onclick = () => { $("#claim").value = EXEMPLES[+b.dataset.i]; check(); });

/* ---------- Installer et partager ---------- */
const standalone = matchMedia("(display-mode: standalone)").matches || navigator.standalone === true;
const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
let deferredPrompt = null;
const installBtn = $("#installBtn");

window.addEventListener("beforeinstallprompt", e => { e.preventDefault(); deferredPrompt = e; if (!standalone) installBtn.hidden = false; });
window.addEventListener("appinstalled", () => { installBtn.hidden = true; $("#iosHelp").hidden = true; toast("App installée sur l'écran d'accueil"); });
if (isIOS && !standalone) installBtn.hidden = false;

installBtn.onclick = async () => {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    const {outcome} = await deferredPrompt.userChoice.catch(() => ({}));
    deferredPrompt = null;
    if (outcome === "accepted") installBtn.hidden = true;
  } else {
    $("#iosHelp").hidden = !$("#iosHelp").hidden;
  }
};

$("#shareBtn").onclick = async () => {
  const url = location.href.split("#")[0];
  const data = {title: "Vérif Débat 2027", text: "Les chiffres officiels et ce que proposent les candidats, thème par thème :", url};
  if (navigator.share) {
    try { await navigator.share(data); return; } catch (e) { if (e && e.name === "AbortError") return; }
  }
  try { await navigator.clipboard.writeText(url); toast("Lien copié : collez-le dans un message"); }
  catch { prompt("Copiez ce lien :", url); }
};

/* ---------- Démarrage ---------- */
renderToggles(); applyFilters();
const h = location.hash.slice(1);
if (h.startsWith("c-")) setTimeout(() => focusStat(h.slice(2)), 60);

if ("serviceWorker" in navigator && location.protocol !== "file:") {
  window.addEventListener("load", () => navigator.serviceWorker.register("sw.js").catch(() => {}));
}
