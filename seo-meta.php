<?php
// 046
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
    'description' => "Počitniška hiša Iža na brejgi ⭐⭐⭐, Moravske Toplice, Prekmurje, Slovenija. Apartma za 1-4 osebe sredi vinogradov, 5 min od term 3000. Popolna oprema, kamin, WiFi, terasa, brezplačno parkirišče. Idealno za kopanje, kolesarjenje in pohode.",
    'keywords' => "apartma Moravske Toplice, počitniška hiša, počitnice, terme, kolesarjenje, mtb, gravel, pohod, nastanitev, družinsk apartma"
  ],
  'apartmaji.php' => [
    'description' => "Počitniška hiša Iža na brejgi v Moravskih Toplicah. Apartma za 1-4 osebe s teraso, kaminom in razgledom na panonsko nižino. Bližina Terme 3000, Terme Vivat, golf, kolesarske poti, gostilne. Popolna oprema, WiFi, TV.",
    'keywords' => "apartma Moravske Toplice, cena, apartma za družino, romantični apartma, počitnice v naravi, mirna lokacija"
  ],
  'rezervacije.php' => [
    'description' => "Rezervirajte počitniško hišo Iža na brejgi v Moravskih Toplicah. Direktna spletna rezervacija brez provizije, takojšnja potrditev. Najboljše cene za apartma v Prekmurju. Plačilo s kreditno kartico.Prihod brez najave recepciji.",
    'keywords' => "rezervacija apartma Moravske Toplice, booking Moravske Toplice, spletna rezervacija, najem apartmaja, počitniška hiša, brez provizije, takojšnja potrditev"
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
<meta property="og:image" content="https://izanabrejgi.si/images/sceste-srcek.jpg">
<meta property="og:url" content="https://izanabrejgi.si">
<meta property="og:type" content="website">
<meta property="og:locale" content="sl_SI">

<!-- TWITTER -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Iža na brejgi">
<meta name="twitter:description" content="<?php echo htmlspecialchars($data['description']); ?>">
<meta name="twitter:image" content="https://izanabrejgi.si/images/sceste-srcek.jpg">

<!-- CANONICAL URL -->
<link rel="canonical" href="https://izanabrejgi.si/<?php echo $current_page; ?>">

<!-- SCHEMA.ORG STRUCTURED DATA -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  "name": "Iža na brejgi",
  "description": "<?php echo addslashes($data['description']); ?>",
  "image": "https://www.izanabrejgi.si/images/sceste-srcek.jpg",
  "starRating": {
    "@type": "Rating",
    "ratingValue": "3",
    "bestRating": "5",
    "ratingDescription": "počitniška hiša ***"
  },
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
  "checkinTime": "14:00",
  "checkoutTime": "11:00",
  "petsAllowed": "false",
  "smokingAllowed": "false",
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
    { "@type": "LocationFeatureSpecification", "name": "celotna nastanitev" },
    { "@type": "LocationFeatureSpecification", "name": "ločena spalnica" },
    { "@type": "LocationFeatureSpecification", "name": "dodatno ležišče v dnevnem prostoru" },
    { "@type": "LocationFeatureSpecification", "name": "jedilnica" },
    { "@type": "LocationFeatureSpecification", "name": "celotna opremljena kuhinja" },
    { "@type": "LocationFeatureSpecification", "name": "kopalnica s tušem" },
    { "@type": "LocationFeatureSpecification", "name": "dodatno stranišče" },
    { "@type": "LocationFeatureSpecification", "name": "pokrita terasa in balkon" },
    { "@type": "LocationFeatureSpecification", "name": "kamin, klima v sobah, ogrevano" },
    { "@type": "LocationFeatureSpecification", "name": "prostor za shranjevanje koles" },
    { "@type": "LocationFeatureSpecification", "name": "brezplačen WiFi" },
    { "@type": "LocationFeatureSpecification", "name": "TV" },
    { "@type": "LocationFeatureSpecification", "name": "dve brezplačni parkirni mesti" }
  ],
  "priceRange": "€€"
}
</script>
