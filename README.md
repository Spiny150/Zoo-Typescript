# Projet Zoo - Backend NestJS & Frontend Angular

Ce projet est une application de gestion de zoo, développée dans le cadre d'un cours de TypeScript, utilisant NestJS pour le backend et Angular pour le frontend. Il intègre une base de données PostgreSQL, l'authentification et la gestion des rôles via Auth0, et une documentation API avec Swagger.

## Table des Matières

1.  [Prérequis](#1-prérequis)
2.  [Configuration du Projet](#2-configuration-du-projet)
    *   [Clonage du Dépôt](#clonage-du-dépôt)
    *   [Configuration du Backend (NestJS)](#configuration-du-backend-nestjs)
    *   [Configuration du Frontend (Angular)](#configuration-du-frontend-angular)
3.  [Configuration Auth0 (Étapes Manuelles Cruciales)](#3-configuration-auth0-étapes-manuelles-cruciales)
    *   [Création de l'Application SPA](#création-de-lapplication-spa)
    *   [Création de l'API](#création-de-lapi)
    *   [Configuration des Rôles et Utilisateurs](#configuration-des-rôles-et-utilisateurs)
    *   [Création de l'Action Post-Login (Custom Claim pour les Rôles)](#création-de-laction-post-login-custom-claim-pour-les-rôles)
4.  [Lancement de l'Application](#4-lancement-de-lapplication)
    *   [Lancer le Backend](#lancer-le-backend)
    *   [Lancer le Frontend](#lancer-le-frontend)
5.  [Tests des Fonctionnalités (Critères d'Évaluation)](#5-tests-des-fonctionnalités-critères-dévaluation)
    *   [Accès à Swagger](#accès-à-swagger)
    *   [Tests des Routes Animaux](#tests-des-routes-animaux)
    *   [Tests des Routes Enclos (Nouvelle Entité)](#tests-des-routes-enclos-nouvelle-entité)

---

## 1. Prérequis

Assurez-vous d'avoir les éléments suivants installés sur votre machine :

*   **Node.js** (version 18 ou supérieure)
*   **npm** (généralement inclus avec Node.js)
*   **Angular CLI** (`npm install -g @angular/cli`)
*   **Docker** (pour PostgreSQL)
*   **DBeaver** (ou tout autre client PostgreSQL pour vérifier la BDD)
*   Un compte **Auth0**

## 2. Configuration du Projet

### Clonage du Dépôt

```bash
# Si vous n'avez pas encore cloné le projet
git clone <URL_DU_DEPOT>
cd zoo-typescript
```

### Configuration du Backend (NestJS)

1.  **Navigation :**
    ```bash
    cd zoo-typescript/zoo-backend # Assurez-vous d'être dans le dossier du backend
    ```
2.  **Installation des Dépendances :**
    ```bash
    npm install
    ```
3.  **Configuration de la Base de Données (PostgreSQL via Docker) :**
    *   Lancez un conteneur PostgreSQL :
        ```bash
        docker run --name postgres-container -e POSTGRES_PASSWORD=postgres -e POSTGRES_USER=postgres -e POSTGRES_DB=zoo -p 5432:5432 -d postgres:16
        ```
        (Le nom de la base de données est `zoo`, utilisateur `postgres`, mot de passe `postgres`).
    *   Vérifiez que le conteneur est en cours d'exécution (`docker ps`).
4.  **Variables d'Environnement :**
    *   Créez un fichier `.env` à la racine du dossier `zoo-typescript` (au même niveau que `package.json`).
        ```
        # Database Configuration
        DB_HOST=localhost
        DB_PORT=5432
        DB_USERNAME=postgres
        DB_PASSWORD=postgres
        DB_DATABASE=zoo

        # Auth0 Configuration
        AUTH0_ISSUER_BASE_URL=https://dev-xvrd00dllx0ahsel.us.auth0.com// # <-- C'est le miens, vous pouvez l'utiliser pour ne pas tout reconfigurer
        ```

### Configuration du Frontend (Angular)

1.  **Navigation :**
    ```bash
    cd ../zoo-frontend # Retournez au dossier parent, puis allez dans le frontend
    ```
2.  **Installation des Dépendances :**
    ```bash
    npm install
    ```

## 3. Configuration Auth0 (Étapes Manuelles Cruciales)

Ces étapes doivent être effectuées sur le tableau de bord de votre compte Auth0 (`manage.auth0.com`).
L'ayant déjà fais, si vous décidez d'utiliser mon URL Auth0, vous n'avez pas besoin de ces étapes et sont juste une liste de ce que j'ai fais.

### Création de l'Application SPA

1.  Allez dans **Applications** > **Applications**.
2.  Cliquez sur **+ Create Application**.
3.  Choisissez **Single Page Web Applications**.
4.  Nommez-la par exemple "Zoo Frontend" et cliquez sur **Create**.
5.  Dans l'onglet **Settings** de votre nouvelle application :
    *   Notez votre **Domain** et **Client ID**. Vous en aurez besoin pour le fichier `.env` du backend et `src/main.ts` du frontend.
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

## 4. Lancement de l'Application

### Lancer le Backend

1.  Ouvrez un terminal.
2.  Naviguez vers le dossier `zoo-typescript/zoo-backend`.
3.  Exécutez :
    ```bash
    npm run start:dev
    ```
    Le backend devrait démarrer sur `http://localhost:3000`.

### Lancer le Frontend

1.  Ouvrez un **deuxième** terminal.
2.  Naviguez vers le dossier `zoo-typescript/zoo-frontend`.
3.  Exécutez :
    ```bash
    ng serve
    ```
    Le frontend devrait démarrer sur `http://localhost:4200`.

## 5. Tests des Fonctionnalités

### Accès à Swagger

*   Ouvrez `http://localhost:3000/api`.
*   Pour tester les routes protégées, cliquez sur le bouton **"Authorize"** en haut à droite
(il faut savoir que je n'ai pas réussi à le faire, mais c'est quand même sensé fonctionner de cette manière. De plus toutes les fonctionnalitées sont quand même fonctionnelles dans le front faisant que ce problème n'est pas majeur).
*   Dans le champ "Value", entrez `Bearer VOTRE_ACCESS_TOKEN`.
    *   Pour obtenir `VOTRE_ACCESS_TOKEN` :
        1.  Connectez-vous à votre application Angular (`http://localhost:4200`).
        2.  Cliquez sur le bouton "TEST API".
        3.  Ouvrez la console de votre navigateur (`F12`).
        4.  Copiez le token affiché après "Access Token:".
*   **Vérifiez les schémas :** Dans la section "Schemas" de Swagger, assurez-vous que `AnimalDto`, `CreateAnimalDto`, `EnclosDto`, `CreateEnclosDto` sont bien documentés avec leurs propriétés et exemples.

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

## 6. Comptes de Test

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