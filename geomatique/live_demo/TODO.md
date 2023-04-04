## Ce que l'on va faire pendant cette démo :

- Construire le squelette de notre application
- Centrer la vue sur Paris : https://www.gps-coordinates.net/
- Ajouter plusieurs couches de fond de plan et un control de couches
- Ajouter une échelle
- Ajouter des markers pour chaque festival (flux GeoJSON)
- Ajouter une popup détaillée pour chaque marker
- Ajouter d'autres flux pour enrichir la carte + tooltip
- Ajouter un calcul d'itinéraire entre les markers sélectionnés :
  + Mettre en évidence les points d'arrivés et de départ
  + Afficher les infos du trajet
  + https://github.com/iamtekson/Leaflet-Basic/blob/master/routing/index.html

### Jeux de données :
https://www.data.gouv.fr/fr/datasets/panorama-des-festivals/
Panorama des festivals : https://www.data.gouv.fr/fr/datasets/r/9e20dab9-0585-4bb7-aa08-9c86e53f8033

https://www.data.gouv.fr/fr/datasets/zones-de-defense-et-de-securite-2016/  
Poly - départements : https://france-geojson.gregoiredavid.fr/repo/departements.geojson

### Ressources :
googleSat : http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}
maxZoom: 20, subdomains:['mt0','mt1','mt2','mt3']

radius: 8,
fillColor: "#ff7800"|"#e8e337",
color: "#000",
weight: 1,
opacity: 1,
fillOpacity: 0.8

{
  "dept_sk",
  "coordonnees_insee",
  "date_de_fin_ancien",
  "mois_indicatif_en_chiffre_y_compris_double_mois",
  "nom_departement",
  "periodicite",
  "mois_habituel_de_debut",
  "code_postal",
  "complement_domaine",
  "libelle_commune_pour_calcul_cp_insee",
  "domaine",
  "date_debut_ancien",
  "code_insee",
  "commune_principale",
  "region",
  "nom_de_la_manifestation",
  "ndeg_identification",
  "site_web",
  "date_de_creation",
  "check_edition",
  "ndeg_de_l_edition_2018",
  "ndeg_de_l_edition_2019"
}

{
  "nom",
  "code"
}