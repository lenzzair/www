# README : Application mobile de Supervision de Serveurs ( Saé Développer des applications communicantes )

## Auteur

- **Nom** : Lambert
- **Prénom** : Lenny

---

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

---

## Cahier des Charges

- **Framework** : Cordova.
- **Fonctionnalités libres** mais doivent inclure au moins un plugin asynchrone.
- **Librairies graphiques** :
  - Bootstrap.
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
  - **Leaflet** pour la cartographie interactive.
- **Plugins** :
  - **cordova-plugin-email-composer** : Envoi d'emails.
  - **cordova-plugin-contacts-x** : Gestion des contacts.
  - **cordova-plugin-network-information:** fournit des informations sur la connexion cellulaire et Wi-Fi
- **API** :
  - API personnelle pour les informations de serveurs Apache.
  - **IP-API** : Données géographiques basées sur une adresse IP.

### Gestion de Projet

- **Notion** : Organisation et suivi des tâches.
- **GitHub Projects** : Suivi de l'avancement du code.

---

## Principe de Fonctionnement

### Intégration des Plugins

- Le plugin **cordova-plugin-email-composer** permet d'envoyer des rapports journaliers ou des alertes.
- Le plugin **cordova-plugin-contacts-x** facilite l'accès aux contacts pour les communications.

### Communication avec l’API

L'API personnelle structure et renvoie les informations des serveurs Apache, intégrant :

- Les métriques systèmes.
- Les journaux d'activité.
- Les données réseau.

### Visualisation des Données

- **Chart.js** : Pour des graphiques clairs et interactifs (courbes, barres).
- **Leaflet** : Pour une cartographie intuitive des serveurs.

---

## Langages Utilisés

- **HTML et CSS** : Structure et style de l'application.
- **JavaScript** : Fonctionnalités dynamiques.
- **Python** : Intégration et gestion de l’API.

---

## Défis et Résolutions

### Défis

- **Sécurisation** des données sensibles via JWT.
- Intégration fluide des plugins et librairies.
- Visualisation efficace des données en temps réel.

### Résolutions

- Mise en place d’un système d’authentification robuste.
- Documentation précise des plugins utilisés.
- Tests continus pour optimiser la performance.

---

## Bilan et Perspectives d'Amélioration

### Projet en cours de développement 

---

## Annexes

### Liens Utiles

- Bootstrap:  [https://getbootstrap.com/\*\*](https://getbootstrap.com/)
-  Leaflet: [https://leafletjs.com/](https://leafletjs.com/)
- Chart.js : [https://www.chartjs.org/](https://www.chartjs.org/)
- \*\*cordova-plugin-email-composer : \*\***[https://www.npmjs.com/package/cordova-plugin-email-composer?activeTab=readme](https://www.npmjs.com/package/cordova-plugin-email-composer?activeTab=readme)**
- \*\*cordova-plugin-contacts-x : \*\***[https://www.npmjs.com/package/cordova-plugin-contacts-x](https://www.npmjs.com/package/cordova-plugin-contacts-x)**
- \*\*cordova-plugin-dialogs : \*\* **[https://www.npmjs.com/package/cordova-plugin-dialogs](https://www.npmjs.com/package/cordova-plugin-dialogs)**
- IP-API :  https\://ip-api.com/

---

Merci d'avoir consulté cette documentation. N'hésitez pas à contribuer ou poser des [questions ](https://github.com/)[via ](https://github.com/)[mon GitHub]([https://github.com/](https://github.com/lenzzair)).

