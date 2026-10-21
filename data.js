/* Vérif Débat 2027 : données.
   Pour mettre à jour un chiffre ou une proposition, modifiez ce fichier puis changez DATA_DATE.
   Les candidats sont classés par ordre alphabétique et traités de la même façon. */
const DATA_DATE = "20 octobre 2026";

/* ---------- Candidats (ordre alphabétique) ---------- */
const CANDS = [
  {id:"glucksmann", nom:"Raphaël Glucksmann", court:"Glucksmann", parti:"Place publique · vainqueur de la primaire sociale-démocrate", init:"RG"},
  {id:"lepen",      nom:"Marine Le Pen",      court:"Le Pen",     parti:"Rassemblement national", init:"MLP"},
  {id:"lisnard",    nom:"David Lisnard",      court:"Lisnard",    parti:"Nouvelle Énergie", init:"DL"},
  {id:"melenchon",  nom:"Jean-Luc Mélenchon", court:"Mélenchon",  parti:"La France insoumise", init:"JLM"},
  {id:"philippe",   nom:"Édouard Philippe",   court:"Philippe",   parti:"Horizons", init:"ÉP"},
  {id:"tondelier",  nom:"Marine Tondelier",   court:"Tondelier",  parti:"Les Écologistes", init:"MT"},
];

/* ---------- Sources des propositions ---------- */
const S = {
  gluPS:  ["Public Sénat", "https://www.publicsenat.fr/actualites/politique/fiscalite-ecole-immigration-ce-que-propose-raphael-glucksmann"],
  gluLCP: ["LCP, 26 mai 2026", "https://lcp.fr/actualites/presidentielle-raphael-glucksmann-devoile-les-premieres-lignes-de-son-possible-programme"],
  gluEco: ["L'Info Durable, 12 oct. 2026", "https://www.linfodurable.fr/politique/apres-la-primaire-quelles-ambitions-ecologiques-pour-raphael-glucksmann-59331"],
  gluPP:  ["Programme Place publique (via Votons-2027)", "https://votons-2027.fr/candidats/glucksmann/programme"],
  debat:  ["Débat du Medef, The Connexion, 28 août 2026", "https://www.connexionfrance.com/news/france-2027-election-key-points-from-the-first-presidential-debate/811109"],
  carbu:  ["AFP, 22 sept. 2026", "https://www.connaissancedesenergies.org/afp/la-campagne-dattal-et-de-philippe-percutee-par-la-crise-des-carburants-260922"],
  lpRef:  ["Harici, 19 août 2026", "https://harici.com.tr/en/marine-le-pen-plans-french-constitutional-referendum-on-immigration/"],
  rnRet:  ["LCP, proposition de loi RN, sept. 2024", "https://lcp.fr/actualites/retraites-que-contient-la-proposition-de-loi-presentee-par-le-rassemblement-national"],
  rn22:   ["Programme RN de 2022, toujours affiché (via Votons-2027)", "https://votons-2027.fr/candidats/le-pen/programme"],
  lisV:   ["Programme Nouvelle Énergie (via Votons-2027)", "https://votons-2027.fr/candidats/lisnard/programme"],
  lisRet: ["Programme Nouvelle Énergie, retraites", "https://votons-2027.fr/candidats/lisnard/programme/retraite"],
  lisEco: ["Programme Nouvelle Énergie, économie", "https://votons-2027.fr/candidats/lisnard/programme/economie"],
  melV:   ["Programme L'Avenir en commun (via Votons-2027)", "https://votons-2027.fr/candidats/melenchon/programme"],
  phiEN:  ["Euronews, 9 oct. 2026", "https://fr.euronews.com/2026/10/09/presidentielle-2027-edouard-philippe-mise-sur-le-travail-et-la-reduction-des-depenses-publ"],
  phiJDN: ["Journal du Net, 9 oct. 2026", "https://www.journaldunet.com/business/action-publique/1556123-edouard-philippe-presente-ses-principales-mesures-pour-la-presidentielle-de-2027/"],
  phiSec: ["Programme edouardphilippe.fr (via Votons-2027)", "https://votons-2027.fr/candidats/philippe/programme/securite"],
  tonV:   ["Projet 2027 des Écologistes (via Votons-2027)", "https://votons-2027.fr/candidats/tondelier/programme"],
  tonTN:  ["Terre-net, 30 mai 2026", "https://www.terre-net.fr/politique/article/899196/tondelier-devoile-ses-mesures-pour-la-sante-environnementale"],
};

/* ---------- Thèmes : chiffres + propositions ---------- */
const THEMES = [
{id:"economie", nom:"Pouvoir d'achat", question:"Prix, salaires, croissance : où en est l'économie et comment chacun veut soutenir les revenus.",
 stats:[
  {id:"inflation", t:"Inflation sur un an", v:"+3,1", u:"%", per:"Sept. 2026", c:"Tirée par l'énergie (+21,3 %). Hors énergie et produits volatils : +1,5 %.", p:"IPC 3,1 %, IPCH européen 3,4 %, sous-jacente 1,5 % : trois mesures différentes.", s:"Insee, 15 oct. 2026", u2:"https://www.insee.fr/fr/statistiques/9080209", k:"prix carburant énergie vie chère"},
  {id:"pouvoir", t:"Pouvoir d'achat par ménage", v:"−0,6", u:"%", per:"T2 2026", c:"Recul net au 2ᵉ trimestre, par unité de consommation.", p:"Chiffre trimestriel, pas annuel.", s:"Insee, 28 août 2026", u2:"https://www.insee.fr/fr/statistiques/9039499", k:"revenus ménages"},
  {id:"pib", t:"Croissance du PIB", v:"0,0", u:"%", per:"T2 2026", c:"Stable après −0,2 % au 1ᵉʳ trimestre. Sur 2025 : +0,9 %.", p:"Première estimation à +0,2 %, révisée à 0,0 %.", s:"Insee, 28 août 2026", u2:"https://www.insee.fr/fr/statistiques/9039499", k:"croissance récession activité"},
  {id:"smic", t:"SMIC net, temps plein", v:"1 477,93", u:"€/mois", per:"Depuis juin 2026", c:"1 867,02 € brut, après +2,41 % en juin et +1,18 % en janvier.", p:"Toujours préciser brut ou net.", s:"Gouvernement, mai 2026", u2:"https://www.info.gouv.fr/index.php/actualite/le-smic-revalorise-le-1er-juin-2026", k:"salaire minimum salaires"},
  {id:"commerce", t:"Solde commercial (biens)", v:"−69,2", u:"Md€", per:"2025", c:"Déficit réduit de 10 milliards sur un an.", p:"Biens seulement ; les services sont excédentaires.", s:"Douanes, fév. 2026", u2:"https://www.douane.gouv.fr/actualites/resultats-du-commerce-exterieur-de-la-france-pour-le-mois-de-decembre-et-pour-lannee", k:"industrie exportations importations"},
 ],
 props:{
  glucksmann:[["Porter le SMIC à 1 600 € net dans les deux ans suivant l'élection.","gluPP"],["Taxer le 1 % des plus gros héritages pour transférer 15 milliards d'euros sur les salaires nets.","gluPS"],["Réindustrialiser (« ramener les usines ») et orienter la commande publique vers l'achat local.","debat"]],
  lepen:[["Baisser la TVA sur les carburants, le gaz et l'électricité de 20 % à 5,5 %.","carbu"],["Renationaliser les autoroutes pour baisser les péages de 15 % (programme 2022).","rn22"]],
  lisnard:[["Supprimer la C3S et, le cas échéant, la CVAE (11,5 Md€) pour ramener les impôts de production de 2 % à 1 % du PIB.","lisEco"],["Créer un contrat de travail unique fusionnant CDI et CDD.","lisV"]],
  melenchon:[["Porter le SMIC à 1 600 € net et indexer les salaires sur l'inflation.","melV"],["Face à la hausse des carburants, bloquer les prix ou baisser les taxes.","carbu"]],
  philippe:[["Exonérer de cotisations deux heures supplémentaires par semaine : environ +1 000 € par an au SMIC selon lui.","phiEN"],["Carburants : aides ciblées plutôt que baisse générale des taxes, possible doublement financé par des économies.","carbu"]],
  tondelier:[["Salaire minimum à 2 000 € brut par mois dès 2027.","tonV"],["Encadrer les prix d'un panier de biens essentiels et généraliser l'encadrement des loyers.","tonV"]],
 }},
{id:"dette", nom:"Dette et impôts", question:"La dette dépasse 3 595 milliards d'euros. Qui veut réduire les dépenses, qui veut augmenter les recettes ?",
 stats:[
  {id:"dette", t:"Dette publique", v:"3 595,5", u:"Md€", per:"Fin juin 2026", c:"119,0 % du PIB, après 117,5 % fin mars. Fin 2025 : 115,6 %.", p:"Dette brute ≠ dette nette (111,4 % du PIB).", s:"Insee, 29 sept. 2026", u2:"https://www.insee.fr/fr/statistiques/9053525", k:"endettement milliards"},
  {id:"deficit", t:"Déficit public", v:"5,1", u:"% du PIB", per:"2025", c:"152,5 Md€, après 5,8 % en 2024. Toujours 5,1 % au 2ᵉ trimestre 2026.", p:"Le déficit est un flux annuel, la dette un stock.", s:"Insee, 27 mars 2026", u2:"https://www.insee.fr/fr/statistiques/8956575", k:"budget 3% maastricht"},
  {id:"po", t:"Prélèvements obligatoires", v:"43,6", u:"% du PIB", per:"2025", c:"Après 42,8 % en 2024.", p:"Impôts et cotisations sociales réunis.", s:"Insee, 27 mars 2026", u2:"https://www.insee.fr/fr/statistiques/8956575", k:"impôts taxes fiscalité"},
  {id:"depenses", t:"Dépenses publiques", v:"57,3", u:"% du PIB", per:"2025", c:"+2,5 % en 2025, un peu plus vite que le PIB en valeur.", p:"Le ratio monte aussi quand le PIB stagne.", s:"Insee Première, 2026", u2:"https://www.insee.fr/fr/statistiques/8997691", k:"dépenses état"},
  {id:"interets", t:"Charge d'intérêts", v:"2,2", u:"% du PIB", per:"2025", c:"+6,5 Md€ sur un an.", p:"Payer les intérêts n'est pas rembourser la dette.", s:"Insee, 27 mars 2026", u2:"https://www.insee.fr/fr/statistiques/8956575", k:"intérêts taux"},
 ],
 props:{
  glucksmann:[["Taxer davantage les très hauts patrimoines, les superprofits et les très grandes successions.","gluEco"],["Rééquilibrer la fiscalité entre travail, capital, retraite et héritage ; chiffrage global annoncé mais pas encore publié.","gluLCP"]],
  lepen:[["Réaliser d'importantes économies et baisser certains impôts.","debat"],["Plafonner la contribution nette de la France au budget européen (5 Md€ selon le RN).","debat"],["Exonérer d'impôt sur le revenu les actifs de moins de 30 ans (programme 2022).","rn22"]],
  lisnard:[["Appliquer une « règle d'or » aux dépenses de fonctionnement, sans objectif de dette chiffré.","lisEco"],["Baisser les impôts de production de 2 % à 1 % du PIB.","lisEco"]],
  melenchon:[["Refuser une réponse fondée sur la baisse des dépenses ; plan de 200 Md€ d'investissements écologiques et sociaux.","melV"],["Impôt sur le revenu à 14 tranches et impôt plancher de 2 % sur le patrimoine des milliardaires.","melV"]],
  philippe:[["Faire de la baisse des dépenses la priorité, dont la moitié sur les dépenses sociales.","phiEN"],["Ne remplacer que deux départs à la retraite sur trois dans la fonction publique, soit environ 250 000 postes en cinq ans.","phiEN"],["Une vingtaine d'ordonnances en juillet 2027.","phiJDN"]],
  tondelier:[["Rétablir un impôt sur la grande fortune.","tonV"],["Créer une « TVA verte ».","tonTN"]],
 }},
{id:"travail", nom:"Travail et retraites", question:"Le chômage est au plus haut depuis 2020. Âge de départ, durée de travail, assurance chômage : les options divergent.",
 stats:[
  {id:"chomage", t:"Taux de chômage (BIT)", v:"8,3", u:"%", per:"T2 2026", c:"2,7 millions de chômeurs, +0,7 point sur un an. 15-24 ans : 21,6 %.", p:"≠ inscrits à France Travail. Mayotte incluse depuis ce trimestre.", s:"Insee, août 2026", u2:"https://www.insee.fr/fr/statistiques/9032359", k:"chômeurs emploi jeunes plein emploi"},
  {id:"emploi", t:"Taux d'emploi des 15-64 ans", v:"69,0", u:"%", per:"T2 2026", c:"−0,3 point sur le trimestre ; emploi salarié −0,3 % sur un an.", p:"Peut baisser à nombre d'emplois constant.", s:"Insee, août 2026", u2:"https://www.insee.fr/fr/statistiques/9032359", k:"actifs emplois"},
  {id:"retraites", t:"Dépenses de retraite", v:"14,1", u:"% du PIB", per:"2025", c:"24,3 % des dépenses publiques. La réforme de 2023 est suspendue jusqu'à la présidentielle.", p:"La DREES publie 13,1 % (2023) sur un périmètre plus étroit.", s:"COR, juin 2026", u2:"https://www.cor-retraites.fr/sites/default/files/2026-06/RA_Part2_Chap1.pdf", k:"pensions âge de départ réforme"},
 ],
 props:{
  glucksmann:[["Abroger la réforme de 2023 et en voter une nouvelle tenant compte de la pénibilité et de l'espérance de vie en bonne santé ; pas de retour à 60 ans.","gluPS"],["Abroger la réforme de l'assurance chômage et généraliser « Territoires zéro chômeur ».","gluPP"]],
  lepen:[["Abroger la réforme de 2023 : départ à 62 ans et 42 annuités (proposition de loi RN de 2024).","rnRet"],["Retraite à 60 ans pour ceux qui ont commencé avant 20 ans avec 40 annuités (programme 2022).","rn22"]],
  lisnard:[["Âge légal à 65 ans, présenté comme « impératif » avant une réforme plus large.","lisRet"],["Socle par répartition et passage progressif à la capitalisation.","lisV"],["Charges patronales négatives pour l'embauche de bénéficiaires du RSA depuis plus de deux ans.","lisV"]],
  melenchon:[["Abroger la réforme de 2023, revenir à 62 ans puis viser 60 ans.","debat"],["Rétablir les 35 heures effectives ; 32 heures dans les métiers pénibles ou de nuit.","melV"]],
  philippe:[["Porter progressivement l'âge de départ à 65 ans et la durée de cotisation à 45 ans ; un tiers des salariés exemptés.","phiEN"],["Ramener l'indemnisation chômage de 18 à 12 mois pour les moins de 50 ans.","phiEN"]],
  tondelier:[["Abroger la réforme de 2023 ; la retraite doit tenir compte des conditions de travail et de l'espérance de vie.","debat"]],
 }},
{id:"social", nom:"Pauvreté et protection sociale", question:"15,4 % de la population vit sous le seuil de pauvreté. Allocations, logement, santé : ce qui est proposé.",
 stats:[
  {id:"pauvrete", t:"Taux de pauvreté", v:"15,4", u:"%", per:"2024", c:"Plus haut niveau depuis 1996. Seuil : 1 337 € par mois pour une personne seule. Moins de 18 ans : 22,4 %.", p:"Pauvreté relative, métropole. Le chiffre 2025 n'est pas publié.", s:"Insee, juillet 2026", u2:"https://www.insee.fr/fr/statistiques/9019316", k:"pauvres inégalités enfants niveau de vie"},
  {id:"population", t:"Population", v:"69,1", u:"millions", per:"1ᵉʳ janv. 2026", c:"Solde naturel négatif (−6 000), une première depuis 1945. Fécondité : 1,56 enfant par femme.", p:"Estimation provisoire.", s:"Insee, janv. 2026", u2:"https://www.insee.fr/fr/statistiques/8719824", k:"natalité naissances fécondité démographie famille"},
 ],
 props:{
  glucksmann:[["Fonds national pour aider les communes à acheter du foncier et objectifs de logements sociaux relevés.","gluPP"],["Service civique obligatoire de 10 mois pour les jeunes.","gluLCP"]],
  lepen:[["« Priorité nationale » pour l'emploi, le logement et les aides sociales, par référendum.","lpRef"],["Minimum vieillesse à 1 000 € par mois et AAH déconjugalisée (programme 2022).","rn22"]],
  lisnard:[["Pension minimale de 1 000 € par mois dès 65 ans (répartition et minimum vieillesse).","lisRet"],["Supprimer l'obligation de 20 à 25 % de logements sociaux par commune (article 55 de la loi SRU).","lisV"],["Remplacer l'aide médicale d'État par une aide d'urgence (700 M€ d'économies annoncées).","lisV"]],
  melenchon:[["« 100 % Sécu » : soins prescrits remboursés à 100 %, mutuelles intégrées à la Sécurité sociale.","melV"],["200 000 logements publics par an et 500 000 places de crèche en cinq ans.","melV"]],
  philippe:[["Allocation familiale unique de 350 € par mois dès le premier enfant, dégressive selon l'impôt.","phiEN"],["Réduction d'impôt d'environ 3 000 € pour les familles qui travaillent ; prêt à taux zéro pour un logement plus grand.","phiEN"]],
  tondelier:[["Hausse de 250 € de l'allocation aux adultes handicapés.","tonV"],["Garantie d'autonomie pour les jeunes dès 18 ans.","tonV"]],
 }},
{id:"immigration", nom:"Immigration", question:"Un des sujets où les écarts entre candidats sont les plus nets, et où les chiffres sont le plus souvent confondus.",
 stats:[
  {id:"immigres", t:"Immigrés vivant en France", v:"7,97", u:"millions", per:"2025 (prov.)", c:"11,6 % de la population, dont 2,6 millions devenus français. Étrangers : 6,3 millions (9,1 %).", p:"Immigré ≠ étranger. Rupture de série en 2024.", s:"Insee", u2:"https://www.insee.fr/fr/statistiques/2865118", k:"étrangers part population nationalité"},
  {id:"titres", t:"Premiers titres de séjour", v:"384 230", u:"", per:"2025", c:"+11,2 %. Étudiants 118 000 ; humanitaire 92 600 (+65 %) ; économique 51 190 (−13 %). Régularisations : 28 610. Éloignements : 24 985.", p:"Niveau quasi identique en 2021 (382 726).", s:"Ministère de l'Intérieur (DGEF)", u2:"https://www.immigration.interieur.gouv.fr/sites/dgef/files/medias/documents/2026-10/INTV2623196X_Rapport%20au_Parlement_2025_28sept2026.pdf", k:"séjour régularisations expulsions éloignements étudiants"},
  {id:"asile", t:"Demandes d'asile", v:"151 665", u:"", per:"2025", c:"−3,7 %, deuxième année de baisse. Ukraine, RDC, Afghanistan en tête.", p:"Une demande n'est pas une protection accordée.", s:"DGEF, via Public Sénat", u2:"https://www.publicsenat.fr/actualites/societe/immigration-titres-de-sejour-en-nette-hausse-et-regularisations-en-baisse-sur-lannee-2025", k:"réfugiés ofpra"},
  {id:"solde", t:"Solde migratoire", v:"+176 000", u:"", per:"2025 (prov.)", c:"Entrées moins sorties, Français compris.", p:"≠ titres délivrés ≠ nombre d'immigrés.", s:"Insee, janv. 2026", u2:"https://www.insee.fr/fr/statistiques/8719824", k:"migration entrées sorties"},
 ],
 props:{
  glucksmann:[["Convention citoyenne sur l'immigration, dont les propositions seraient votées au Parlement.","gluPS"],["Voies légales de migration de travail, carte de séjour pluriannuelle, abrogation de la loi de 2024.","gluPP"]],
  lepen:[["Référendum constitutionnel (article 11) : restreindre ou supprimer le droit du sol, primauté du droit français sur le droit européen.","lpRef"],["Demandes d'asile déposées uniquement à l'étranger (programme 2022).","rn22"]],
  lisnard:[["Diviser par huit la délivrance des titres de séjour.","lisV"],["Fin de l'automaticité du droit du sol, remise en cause de l'accord franco-algérien de 1968, rétention administrative portée à 24 mois.","lisV"]],
  melenchon:[["Droit du sol intégral et droit de vote des étrangers aux élections locales.","melV"],["Carte de séjour de dix ans comme titre de référence et régularisation de certaines catégories.","melV"]],
  philippe:[["Diviser par deux l'immigration légale, sous les 200 000 titres par an, en visant le regroupement familial.","phiJDN"],["Liste européenne de pays sûrs, dénonciation de l'accord de 1968 ; référendum non exclu.","phiJDN"]],
  tondelier:[["Garantir le droit du sol et l'accès à l'aide médicale d'État.","tonV"],["Voies légales et sécurisées de migration ; l'économie aura besoin de 3,6 millions de travailleurs étrangers en 2050 selon elle.","debat"]],
 }},
{id:"securite", nom:"Sécurité et justice", question:"Homicides stables, violences enregistrées en hausse, prisons pleines : des réponses opposées.",
 stats:[
  {id:"homicides", t:"Victimes d'homicide", v:"975", u:"", per:"2025", c:"Stable sur un an. Tentatives : 4 501 (+5 %, bilan provisoire).", p:"« Homicides et tentatives » donne un total bien plus élevé.", s:"SSMSI, bilan 2025", u2:"https://www.interieur.gouv.fr/Interstats/Actualites/Insecurite-et-delinquance-en-2025-bilan-statistique-et-atlas-departemental", k:"meurtres insécurité violence"},
  {id:"violences", t:"Violences physiques enregistrées", v:"473 000", u:"victimes", per:"2025", c:"Violences sexuelles : 132 300 (+8 %). Cambriolages : −3 %. Refus d'obtempérer : +11 %.", p:"Faits déclarés : une hausse peut aussi refléter plus de plaintes.", s:"SSMSI, Interstats", u2:"https://www.interieur.gouv.fr/Interstats/Infractions-et-sentiment-d-insecurite/Violences-physiques-ou-sexuelles/Conjugales", k:"agressions délinquance cambriolages violences sexuelles"},
  {id:"prisons", t:"Personnes détenues", v:"90 020", u:"", per:"1ᵉʳ sept. 2026", c:"Record. Sur-occupation : 142,1 % ; 176,1 % en maisons d'arrêt. Environ 63 300 places.", p:"Change chaque mois.", s:"Ministère de la Justice, via AFP", u2:"https://www.sudradio.fr/societe/prisons-90-020-detenus-en-france-au-1er-septembre-un-nouveau-record", k:"prisons surpopulation carcérale places"},
 ],
 props:{
  glucksmann:[["Police de proximité et service national de renseignement criminel contre le narcotrafic.","gluPP"],["Un milliard d'euros contre les violences sexistes et sexuelles.","gluPP"]],
  lepen:[["Peines planchers et suppression des réductions de peine (programme 2022).","rn22"],["Présomption de légitime défense pour les forces de l'ordre et 85 000 places de prison (programme 2022).","rn22"]],
  lisnard:[["Majorité pénale à 16 ans et peines planchers pour les récidivistes.","lisV"],["Doubler les effectifs des juridictions correctionnelles.","lisV"]],
  melenchon:[["Rétablir la police de proximité, dissoudre les BAC et BRAV-M, interdire LBD et grenades de désencerclement.","melV"],["Mécanisme contraignant de régulation carcérale contre la surpopulation.","melV"]],
  philippe:[["Courtes peines dès la première infraction et peines planchers pour les infractions graves.","phiSec"],["« État d'urgence narco » limité, avec reconnaissance faciale ciblée.","phiSec"]],
  tondelier:[["Police de proximité, contrôles d'identité aléatoires interdits, cannabis légalisé et encadré.","tonV"],["9 000 magistrats en dix ans et numerus clausus carcéral.","tonV"]],
 }},
{id:"energie", nom:"Énergie et climat", question:"Électricité à 95 % bas carbone, émissions en baisse trop lente : nucléaire, renouvelables et adaptation partagent les candidats.",
 stats:[
  {id:"elec", t:"Production d'électricité", v:"547,5", u:"TWh", per:"2025", c:"95,2 % bas carbone. Nucléaire : 373 TWh (68 %). Exportations nettes record : 92,3 TWh.", p:"Électricité ≠ énergie : carburants et gaz restent fossiles.", s:"RTE, bilan 2025", u2:"https://assets.rte-france.com/analyse-et-donnees/2026-03/BE2025%20-%20Rapport%20Complet.pdf", k:"nucléaire renouvelables éolien solaire exportations edf"},
  {id:"ges", t:"Émissions de gaz à effet de serre", v:"363,7", u:"Mt CO₂e", per:"2025 (estim.)", c:"−1,5 % sur un an, plus bas depuis 1990. Rythme visé : environ −5 % par an.", p:"Hors émissions importées et puits de carbone.", s:"Citepa, avril 2026", u2:"https://www.citepa.org/wp-content/uploads/2026/04/CP-Citepa_Barometre_avril2026.pdf", k:"climat co2 carbone réchauffement écologie"},
 ],
 props:{
  glucksmann:[["Sortir du gaz et du pétrole en priorité, avec renouvelables et nouveaux réacteurs nucléaires.","gluEco"],["Objectif −90 % d'émissions en 2040, leasing social pour les voitures électriques, plan rail.","gluPP"]],
  lepen:[["Baisser la TVA sur l'énergie à 5,5 %.","carbu"],["Relancer nucléaire et hydraulique, sortir du marché européen de l'électricité, arrêter l'éolien (programme 2022).","rn22"]],
  lisnard:[["Prolonger les réacteurs jusqu'à 60 ans, construire des EPR et des petits réacteurs.","lisV"],["Fiscalité environnementale à prélèvement total constant, redistribuée aux ménages pénalisés.","lisV"]],
  melenchon:[["Sortir du nucléaire : abandon des projets d'EPR.","melV"],["−65 % d'émissions en 2030 et rénovation d'au moins 700 000 logements par an.","melV"]],
  philippe:[["Fonds unique d'adaptation au changement climatique de 2 Md€ par an.","phiEN"],["Décarboner « au maximum » la vie quotidienne.","phiJDN"]],
  tondelier:[["7 Md€ par an pour l'adaptation d'ici 2032 et 110 km/h sur autoroute pour les voitures thermiques.","tonV"],["Congé climatique de cinq jours par an et sortie des pesticides d'ici 2050.","tonTN"],["Position sur le parc nucléaire : non détaillée dans les sources consultées.",null]],
 }},
];

const PIEGES = [
  ["Chômeurs BIT ou inscrits à France Travail ?","Le taux de 8,3 % compte les personnes sans emploi, qui cherchent et sont disponibles. Les inscrits à France Travail sont bien plus nombreux."],
  ["Immigré ou étranger ?","Un immigré est né étranger à l'étranger et peut être devenu français. Un étranger n'a pas la nationalité française et peut être né en France."],
  ["Titres de séjour, solde migratoire, stock","384 230 premiers titres (entrées autorisées), +176 000 de solde (entrées moins sorties), 7,97 millions d'immigrés (stock). Trois réalités distinctes."],
  ["Dette ou déficit ?","Le déficit est ce qui manque chaque année, la dette le cumul. Tant qu'il y a un déficit, la dette augmente."],
  ["Record en euros ou en % du PIB ?","Presque tous les montants battent des records en euros courants. Le ratio au PIB permet de comparer dans le temps."],
  ["Quelle inflation ?","En septembre 2026 : 3,1 % (IPC), 3,4 % (IPCH) et 1,5 % (sous-jacente)."],
  ["Homicides ou homicides et tentatives ?","975 victimes d'homicide en 2025. Avec les tentatives, le total change d'ordre de grandeur."],
  ["Délinquance enregistrée ou subie ?","Le ministère compte les faits déclarés. La délinquance subie se mesure par les enquêtes de victimation."],
  ["Proposition ou promesse chiffrée ?","« Baisser l'immigration » et « moins de 200 000 titres par an » ne s'évaluent pas de la même façon. Cherchez le chiffre et l'échéance."],
  ["Provisoire ou définitif ?","PIB, inflation, démographie et délinquance sont publiés puis révisés. Un chiffre juste en août peut être dépassé en octobre."],
];
const SRC_OFF = [
  ["Insee","https://www.insee.fr/fr/accueil","Chômage, prix, PIB, dette, démographie, pauvreté"],
  ["Interstats (SSMSI)","https://www.interieur.gouv.fr/Interstats","Délinquance enregistrée et victimation"],
  ["DGEF, ministère de l'Intérieur","https://www.immigration.interieur.gouv.fr","Titres de séjour, asile, éloignements"],
  ["Cour des comptes","https://www.ccomptes.fr","Finances publiques"],
  ["Conseil d'orientation des retraites","https://www.cor-retraites.fr","Projections des retraites"],
  ["Eurostat","https://ec.europa.eu/eurostat","Comparaisons européennes"],
];
const SRC_PROG = [
  ["Glucksmann · Place publique","https://votons-2027.fr/candidats/glucksmann/programme","Programme relayé par Votons-2027"],
  ["Le Pen · Rassemblement national","https://votons-2027.fr/candidats/le-pen/programme","Mesures affichées par le RN"],
  ["Lisnard · Nouvelle Énergie","https://votons-2027.fr/candidats/lisnard/programme","117 mesures"],
  ["Mélenchon · L'Avenir en commun","https://votons-2027.fr/candidats/melenchon/programme","Programme de LFI"],
  ["Philippe · Horizons","https://votons-2027.fr/candidats/philippe/programme/securite","Programme sur edouardphilippe.fr"],
  ["Tondelier · Les Écologistes","https://lesecologistes.fr/pages/6ImK65GKUnvibm33WGkjkj/projet-2027","Projet 2027, 557 mesures"],
];
const SRC_FC = [
  ["AFP Factuel","https://factuel.afp.com","Agence France-Presse"],
  ["Les Décodeurs","https://www.lemonde.fr/les-decodeurs/","Le Monde"],
  ["CheckNews","https://www.liberation.fr/checknews/","Libération"],
  ["Vrai ou faux","https://www.francetvinfo.fr/vrai-ou-fake/","franceinfo"],
];
const EXEMPLES = [
  "La dette a dépassé les 3 600 milliards d'euros.",
  "Le chômage n'a jamais été aussi haut.",
  "Un habitant sur cinq en France est immigré.",
  "Philippe veut diviser par deux l'immigration légale.",
  "Mélenchon veut la retraite à 60 ans tout de suite.",
  "Les homicides explosent.",
];
