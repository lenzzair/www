# README : Application mobile de Supervision de Serveurs ( Saé Développer des applications communicantes )

## Auteur

- **Nom** : Lambert
- **Prénom** : Lenny

---
## Version

- **Version** : 1.0
- **Date** : Date de sortie: 23/01/2025
## Sommaire

1. [Contexte et Objectif](#contexte-et-objectif)
2. [Cahier des Charges](#cahier-des-charges)
3. [Technologies et Méthodes](#technologies-et-méthodes)
4. [Principe de Fonctionnement](#principe-de-fonctionnement)
5. [Langages Utilisés](#langages-utilisés)
6. [Défis et Résolutions](#défis-et-résolutions)
7. [Bilan et Perspectives d'Amélioration](#bilan-et-perspectives-damélioration)
8. [Annexes](#annexes)

---

## Contexte et Objectif

### Contexte

Les administrateurs réseau des petites entreprises doivent gérer une charge de travail croissante. Ce projet vise à développer une **application mobile** centralisant les informations critiques des serveurs pour une supervision efficace.
Par exemple, un administrateur peut surveiller à distance les performances des serveurs pendant ses déplacements, éviter une surcharge CPU, ou détecter rapidement une tentative de connexion suspecte.

L'application permet de :

- Surveiller les métriques systèmes (CPU, mémoire, espace disque).
- Accéder à des données réseau (connexion, sockets).
- Visualiser les journaux d'activité (logs API et Apache).

### Objectif

Offrir une solution simple et accessible permettant aux administrateurs réseau de surveiller en temps réel l’état de leurs serveurs, même en déplacement sur leurs appareils mobile.

L'application inclut :

- Une API pour structurer les informations provenant des serveurs.
- Une interface utilisateur intuitive pour analyser les données en temps réel.
- Une sécurisation des données sensibles via des jetons JWT.
- Faciliter l'échange d'informations serveur entre collaborateurs via email.
- Gestion des contacts via le plugin Cordova.
- Lecture et gestion des cartes NFC pour l'authentification et la gestion des droits.
- Visualisation des données sous forme de graphiques interactifs avec Chart.js.

---

## Cahier des Charges

- **Framework** : Cordova.
- **Fonctionnalités libres** mais doivent inclure au moins un plugin asynchrone.
- **Librairies graphiques** :
  - Bootstrap.
  - Chart.js.
- **Persistance des données**.
- Utilisation de **librairies externes**.

---

## Technologies et Méthodes

### Technologies Utilisées

- **Cordova** : Pour développer une application mobile multi-plateforme.
- **Visual Studio Code** avec Git pour le versionnement.
- **Librairies graphiques** :
  - **Bootstrap** pour créer des interfaces réactives.
  - **Chart.js** pour des graphiques interactifs.
- **Plugins** :
  - **cordova-plugin-email-composer** : Envoi d'emails.
  - **cordova-plugin-contacts-x** : Gestion des contacts.
  - **cordova-plugin-network-information** : Fournit des informations sur la connexion cellulaire et Wi-Fi.
  - **cordova-plugin-dialogs** : Affichage de dialogues natifs.
  - **cordova-plugin-nfc** : Gestion des interactions NFC.
  - **cordova-plugin-splashscreen** : Gestion du logo lors du chargement de l'application

- **API** :
  - **L2zCore API** : API personnelle hébèreger sur le serveur même et qui récupère plusieurs données lier aux serveur

  ## Endpoints de l'API

| Méthode | Endpoint                        | Description                                                                                         | Authentification | Paramètres                |
|---------|----------------------------------|-----------------------------------------------------------------------------------------------------|------------------|---------------------------|
| POST    | `/token`                         | Crée un token d'authentification en envoyant un `username` et un `password`.                         | Oui              | `username`, `password`    |
| GET     | `/system/cpu`                    | Récupère les informations CPU du serveur.                                                          | Non              | Aucun                     |
| GET     | `/system/memory`                 | Récupère les informations de mémoire du serveur.                                                   | Non              | Aucun                     |
| GET     | `/system/disk`                   | Récupère les informations d'espace disque du serveur.                                              | Non              | Aucun                     |
| GET     | `/system/uptime`                 | Récupère les informations du nombre de temps que le serveur est allumé                             | Non              | Aucun                     |
| GET     | `/network/connections`           | Récupère les informations sur les connexions réseau du serveur (sockets, ports, etc.).             | Oui              | Token JWT                 |
| GET     | `/log/api/today_ip`              | Récupère les adresses IP des requêtes API du jour.                                                  | Oui              | Aucun                     |
| GET     | `/log/apache/connexion_web/today`| Récupère les logs Apache des connexions du jour.                                                   | Oui              | Aucun                     |
| POST    | `/nfc/verify`                    | Vérifie une carte NFC scannée en envoyant son `id` et récupère les informations associées.          | Oui              | `nfc_id`                  |
| POST    | `/nfc/account`                   | Crée un compte associé à une nouvelle carte NFC.                                                   | Oui              | `nfc_id`, `user_info`     |



---

## Principe de Fonctionnement

### Intégration des Plugins

- Le plugin **cordova-plugin-email-composer** permet a un administrateur d'envoyer un rapport détaillé à un collegue avec les métrique de la journé où celle qui ont été archiver
- Le plugin **cordova-plugin-contacts-x** facilite l'accès aux contacts pour les communications, permet de récupèré l'adresse mail et le numéro a l'aide du nom.
- Le plugin **cordova-plugin-nfc** permet la lecture des cartes NFC pour l'authentification et la gestion des droits.
- Le plugin **cordova-plugin-network-information** fournit des informations sur l'état de la connexion réseau.
- Le plugin **cordova-plugin-dialogs** permet d'afficher des alertes et des dialogues natifs.

### Communication avec l’API

L'API L2zCore structure et renvoie les informations du serveur Apache, intégrant:

- Les métriques systèmes.
- Les journaux d'activité.
- Les données réseau.
- La base de donnée liées aux cartes NFC

### Visualisation des Données

- **Chart.js** : Pour des graphiques clairs et interactifs (courbes, barres).

---

## Langages Utilisés

- **HTML et CSS** : Structure et style de l'application.
- **JavaScript** : Fonctionnalités dynamiques.
- **Python** : Intégration et gestion de l’API.

---

## Défis et Résolutions

### Défis

- **Sécurisation** des données sensibles via JWT.
- **Intégration** fluide des plugins et librairies.
- **Visualisation** efficace des données en temps réel.

### Résolutions

- Mise en place d’un système d’authentification robuste.
- Documentation précise des plugins utilisés.
- Tests continus pour optimiser la performance.
- Nouvelle fonctionnalité.
- Permettre l'integration de l'API sur un nouveau serveur

---

## Bilan et Perspectives d'Amélioration

### Projet en cours de développement 

---

## Annexes

### Liens Utiles

- Bootstrap:  [https://getbootstrap.com/](https://getbootstrap.com/)
- Chart.js : [https://www.chartjs.org/](https://www.chartjs.org/)
- **cordova-plugin-email-composer** : [https://www.npmjs.com/package/cordova-plugin-email-composer](https://www.npmjs.com/package/cordova-plugin-email-composer)
- **cordova-plugin-contacts-x** : [https://www.npmjs.com/package/cordova-plugin-contacts-x](https://www.npmjs.com/package/cordova-plugin-contacts-x)
- **cordova-plugin-dialogs** : [https://www.npmjs.com/package/cordova-plugin-dialogs](https://www.npmjs.com/package/cordova-plugin-dialogs)
- **cordova-plugin-network-information** : [https://www.npmjs.com/package/cordova-plugin-network-information](https://www.npmjs.com/package/cordova-plugin-network-information)
- **cordova-plugin-nfc** : [https://www.npmjs.com/package/cordova-plugin-nfc](https://www.npmjs.com/package/cordova-plugin-nfc)
- IP-API : [https://ip-api.com/](https://ip-api.com/)

---

Merci d'avoir consulté cette documentation. N'hésitez pas à contribuer ou poser des questions via [mon GitHub](https://github.com/lenzzair).