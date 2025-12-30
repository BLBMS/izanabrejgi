<?php
// 028
// seo-meta.php
// SEO meta podatki za iskalnike

// Določite stran (lahko prilagodite glede na URL)
$current_page = basename($_SERVER['PHP_SELF']);

// Osnovni meta podatki za vse strani
$site_name = "Iža na brejgi";
$base_description = "Počitniška hiša 'Iža na brejgi' ponuja nastanitev za 1-4 osebe na mirni lokaciji v naravi med vinogradi. En apartma zajema celotno hišo.";

// Specifični podatki za različne strani
$meta_data = [
    'index.php' => [
        'description' => "Počitniška hiša 'Iža na brejgi' - apartma v bližini Moravskih Toplic v naravi z razgledom okoliške hribe in panonsko nižino. Bližina term. Romantični vikendi za dva ali celotno družino (4 osebe) v naravnem okolju.",
        'keywords' => "apartmaj Moravske Toplice, počitniška hiša, počitnice, terme, kolesarjenje, pohodi, nastanitev, družinsk apartma"
    ],
    'apartmaji.php' => [
        'description' => "Naš apartma zajema celotno počitniško hišo 'Iža na brejgi': prostori za 2-4 osebe, popolna oprema, razgled na okoliške griče in panonsko nižino, bližina term.",
        'keywords' => "apartmaj Moravske Toplice cena, apartma za družino, romantični apartma, počitnice v naravi"
    ],
    'rezervacije.php' => [
        'description' => "Rezervirajte apartma v počitniški hiši 'Iža na brejgi'. Enostavna spletna rezervacija, najboljše cene, takojšnja potrditev.",
        'keywords' => "rezervacija apartma Moravske Toplice, booking Moravske Toplice, spletna rezervacija, najem apartmaja, počitniška hiša"
    ]
];

// Pridobi podatke za trenutno stran ali uporabi privzete
$data = $meta_data[$current_page] ?? $meta_data['index.php'];
?>

<!-- SEO META TAGS -->
<meta name="description" content="<?php echo htmlspecialchars($data['description']); ?>">
<meta name="keywords" content="<?php echo htmlspecialchars($data['keywords']); ?>">

<!-- OPEN GRAPH (Facebook, LinkedIn) -->
<meta property="og:site_name" content="<?php echo htmlspecialchars($site_name); ?>">
<meta property="og:title" content="Iža na brejgi | <?php echo htmlspecialchars($data['description']); ?>">
<meta property="og:description" content="<?php echo htmlspecialchars($data['description']); ?>">
<meta property="og:image" content="https://izanabrejgi.si/images/dvor-poletje.jpg">
<meta property="og:url" content="https://izanabrejgi.si">
<meta property="og:type" content="website">
<meta property="og:locale" content="sl_SI">

<!-- TWITTER -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Iža na brejgi">
<meta name="twitter:description" content="<?php echo htmlspecialchars($data['description']); ?>">
<meta name="twitter:image" content="https://izanabrejgi.si/images/dvor-poletje.jpg">

<!-- CANONICAL URL -->
<link rel="canonical" href="https://izanabrejgi.si/<?php echo $current_page; ?>">

<!-- SCHEMA.ORG STRUCTURED DATA -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  "name": "Iža na brejgi",
  "description": "<?php echo addslashes($data['description']); ?>",
  "image": "https://www.izanabrejgi.si/images/dvor-poletje.jpg",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Moravske Toplice",
    "postalCode": "9226",
    "addressRegion": "Prekmurje",
    "addressCountry": "Slovenija"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "46.7089622",
    "longitude": "16.2464013"
  },
  "telephone": "+386 41 563 873",
  "email": "izanabrejgi@gmail.com",
  "url": "https://izanabrejgi.si",
  "areaServed": {
    "@type": "GeoCircle",
    "geoMidpoint": {
      "@type": "GeoCoordinates",
      "latitude": "46.7089622",
      "longitude": "16.2464013"
    },
    "geoRadius": "50000"
  },
  "amenityFeature": [
    "ločena palnica",
    "dodatno ležišče v dnevnem prostoru",
    "jedilnica",
    "celotno opremljena kuhinja",
    "kopalnica s tušem",
    "dodatno stranišče",
    "pokrita terasa in balkon",
    "kamin, klima v sobah, ogrevano",
    "prostor za shranjevanje koles",
    "Free WiFi, TV, ...",
    "brezplačno parkirišče"
  ],
  "priceRange": "€€"
}
</script>