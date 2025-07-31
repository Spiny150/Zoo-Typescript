# Projet Zoo - Backend NestJS & Frontend Angular

Ce projet est une application de gestion de zoo, développée dans le cadre d'un cours de TypeScript, utilisant NestJS pour le backend et Angular pour le frontend. Il intègre une base de données PostgreSQL, l'authentification et la gestion des rôles via Auth0, et une documentation API avec Swagger.

## Table des Matières

1.  [Prérequis](#1-prérequis)
2.  [Configuration et Lancement avec Docker](#2-configuration-et-lancement-avec-docker)
3.  [Configuration Auth0 (Optionnel)](#3-configuration-auth0-optionnel)
4.  [Tests des Fonctionnalités](#4-tests-des-fonctionnalités)
5.  [Comptes de Test](#5-comptes-de-test)

---

## 1. Prérequis

Assurez-vous d'avoir les éléments suivants installés sur votre machine :

*   **Docker**
*   **Docker Compose**
*   Un compte **Auth0** (optionnel, vous pouvez utiliser les comptes de test fournis)

## 2. Configuration et Lancement avec Docker

Avec Docker, la configuration et le lancement du projet sont grandement simplifiés.

1.  **Clonage du Dépôt :**
    ```bash
    git clone <URL_DU_DEPOT>
    cd Zoo-Typescript
    ```

2.  **Configuration des Variables d'Environnement :**
    Créez un fichier `.env` à la racine du projet en copiant le fichier `.env.example` :
    ```bash
    cp .env.example .env
    ```
    Ce fichier contient toutes les variables nécessaires pour lancer l'application, y compris les identifiants pour la base de données et la configuration Auth0. Vous pouvez utiliser les valeurs par défaut pour un premier lancement.

3.  **Lancement :**
    Exécutez la commande suivante à la racine du projet :
    ```bash
    docker-compose up --build
    ```
    Cette commande va automatiquement :
    *   Construire les images Docker pour le backend et le frontend.
    *   Lancer les conteneurs pour la base de données PostgreSQL, le backend et le frontend.
    *   La base de données `zoo` sera créée automatiquement.

4.  **Accès à l'application :**
    *   **Frontend :** [http://localhost:4200](http://localhost:4200)
    *   **Backend (API Swagger) :** [http://localhost:3000/api](http://localhost:3000/api)

## 3. Configuration Auth0 (Optionnel)

Si vous ne souhaitez pas utiliser la configuration Auth0 par défaut (fournie dans le fichier `.env`), vous pouvez créer votre propre application et API sur le tableau de bord Auth0 (`manage.auth0.com`).

### Création de l'Application SPA

1.  Allez dans **Applications** > **Applications**.
2.  Cliquez sur **+ Create Application**.
3.  Choisissez **Single Page Web Applications**.
4.  Nommez-la par exemple "Zoo Frontend" et cliquez sur **Create**.
5.  Dans l'onglet **Settings** de votre nouvelle application :
    *   Notez votre **Domain** et **Client ID**. Si vous souhaitez utiliser votre propre configuration Auth0, vous devrez mettre à jour les variables correspondantes dans le fichier `.env` à la racine du projet.
    *   Dans **Application URIs**, ajoutez `http://localhost:4200` aux champs suivants :
        *   **Allowed Callback URLs**
        *   **Allowed Logout URLs**
        *   **Allowed Web Origins**
    *   **Sauvegardez les changements.**

### Création de l'API

1.  Allez dans **Applications** > **APIs**.
2.  Cliquez sur **+ Create API**.
3.  Remplissez les champs :
    *   **Name:** `Zoo API`
    *   **Identifier:** `http://localhost:3000` (Ceci est crucial et doit correspondre à l'audience de votre backend)
    *   **Signing Algorithm:** `RS256`
4.  Cliquez sur **Create**.

### Configuration des Rôles et Utilisateurs

1.  **Créer les Rôles :**
    *   Allez dans **User Management** > **Roles**.
    *   Cliquez sur **+ Create Role**.
    *   Créez un rôle nommé `gardien`.
    *   Créez un rôle nommé `veterinaire`.
2.  **Assigner les Rôles aux Utilisateurs :**
    *   Allez dans **User Management** > **Users**.
    *   Cliquez sur l'utilisateur avec lequel vous vous connecterez à l'application (vous pouvez vous inscrire via l'application Angular si vous n'en avez pas).
    *   Allez dans l'onglet **Roles**.
    *   Cliquez sur **Assign Roles** et assignez les rôles `gardien` et `veterinaire` à cet utilisateur (ou à des utilisateurs différents pour tester les permissions).

### Création de l'Action Post-Login (Custom Claim pour les Rôles)

Cette action injectera les rôles de l'utilisateur dans le token JWT.

1.  Allez dans **Actions** > **Triggers**.
2.  Sélectionnez `post-login`.
3.  Cliquez sur **+ Add Action** et choisissez **Build Custom**.
4.  Nommez l'action (ex: "Assign Zoo Roles") et cliquez sur **Create**.
5.  Dans l'éditeur de code, collez le code suivant :
    ```typescript
    /**
     * This action adds user roles to the Access Token.
     */
    exports.onExecutePostLogin = async (event, api) => {
      const namespace = 'https://zooapi.com/'; // IMPORTANT : doit ressembler à une URL
      const assignedRoles = event.authorization.roles;

      api.accessToken.setCustomClaim(`${namespace}roles`, assignedRoles);
    };
    ```
6.  Cliquez sur **Deploy**.
7.  Retournez au flux **Login** et **glissez-déposez** votre nouvelle action "Assign Zoo Roles" entre "Start" et "Complete".



## 4. Tests des Fonctionnalités

Une fois l'application lancée avec Docker, vous pouvez tester les fonctionnalités.

### Accès à Swagger

*   Ouvrez `http://localhost:3000/api`.
*   Pour tester les routes protégées, vous aurez besoin d'un `Access Token`.
*   Pour obtenir ce token :
    1.  Connectez-vous à l'application Angular (`http://localhost:4200`).
    2.  Ouvrez la console de votre navigateur (`F12`) et cherchez le token dans les logs réseau ou le stockage local.
*   Dans l'interface Swagger, cliquez sur le bouton **"Authorize"** et entrez `Bearer VOTRE_ACCESS_TOKEN`.
*   **Vérifiez les schémas :** Dans la section "Schemas" de Swagger, assurez-vous que `AnimalDto`, `CreateAnimalDto`, `EnclosDto`, `CreateEnclosDto` sont bien documentés.

### Tests des Routes Animaux

1.  **`GET /animaux/{id}` (Accessible par tout utilisateur authentifié) :**
    *   **Via Frontend :** Connectez-vous à l'application Angular. Allez sur la page "Animaux". Cliquez sur "Détails" pour un animal. La page de détails doit s'afficher sans erreur.
    *   **Via Swagger :** Autorisez-vous avec un token valide. Exécutez `GET /animaux/{id}`. La réponse doit être `200 OK` avec les détails de l'animal.
2.  **`DELETE /animaux/{id}` (Accessible uniquement par les gardiens) :**
    *   **Pré-requis :** Connectez-vous à l'application Angular avec un utilisateur ayant le rôle `gardien`.
    *   **Via Frontend :** Allez sur la page "Animaux". Cliquez sur le bouton "Relâcher" pour un animal. L'animal doit disparaître de la liste.
    *   **Via Swagger :** Autorisez-vous avec un token d'un utilisateur `gardien`. Exécutez `DELETE /animaux/{id}`. La réponse doit être `200 OK`.
    *   **Contre-test (via Swagger) :** Autorisez-vous avec un token d'un utilisateur *sans* le rôle `gardien`. Exécutez `DELETE /animaux/{id}`. La réponse doit être `403 Forbidden`.
3.  **`GET /animaux/soigner/{id}` (Accessible uniquement par les vétérinaires) :**
    *   **Pré-requis :** Connectez-vous à l'application Angular avec un utilisateur ayant le rôle `veterinaire`.
    *   **Via Frontend :** Allez sur la page "Animaux". Cliquez sur le bouton "Soigner" pour un animal. La santé de l'animal doit passer à 100 (vérifiable en rafraîchissant la page ou en allant sur les détails de l'animal).
    *   **Via Swagger :** Autorisez-vous avec un token d'un utilisateur `veterinaire`. Exécutez `GET /animaux/soigner/{id}`. La réponse doit être `200 OK` avec l'animal mis à jour.
    *   **Contre-test (via Swagger) :** Autorisez-vous avec un token d'un utilisateur *sans* le rôle `veterinaire`. Exécutez `GET /animaux/soigner/{id}`. La réponse doit être `403 Forbidden`.

### Tests des Routes Enclos (Nouvelle Entité)

1.  **`POST /enclos` :**
    *   **Via Swagger :** Créez un nouvel enclos. Vérifiez la validation (nom trop court, capacité < 1). La réponse doit être `201 Created`.
2.  **`GET /enclos` :**
    *   **Via Frontend :** Allez sur la page "Enclos". La liste des enclos doit s'afficher.
    *   **Via Swagger :** Exécutez `GET /enclos`. La réponse doit être `200 OK` avec la liste des enclos.
3.  **`GET /enclos/{id}` :**
    *   **Via Swagger :** Exécutez `GET /enclos/{id}` pour un enclos existant. La réponse doit être `200 OK` avec les détails de l'enclos.

---

## 5. Comptes de Test

Voici les comptes que vous pouvez utiliser pour tester les différentes fonctionnalités et rôles :

*   **Compte sans rôle Auth0**
    *   Email: `basique@gmail.com`
    *   Mot de passe: `Basique123!`

*   **Compte avec rôle gardien sur Auth0**
    *   Email: `gardien@gmail.com`
    *   Mot de passe: `Gardien123!`

*   **Compte avec rôle vétérinaire sur Auth0**
    *   Email: `soigneur@gmail.com`
    *   Mot de passe: `Soigneur123!`
