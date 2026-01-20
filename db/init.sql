-- =====================================================
-- SUPPRESSION (POUR REDEPLOIEMENT DOCKER)
-- =====================================================

DROP TABLE IF EXISTS historique_signalement CASCADE;
DROP TABLE IF EXISTS signalement CASCADE;
DROP TABLE IF EXISTS session CASCADE;
DROP TABLE IF EXISTS sync_log CASCADE;
DROP TABLE IF EXISTS entreprise CASCADE;
DROP TABLE IF EXISTS utilisateur CASCADE;

DROP TYPE IF EXISTS user_role CASCADE;
DROP TYPE IF EXISTS signalement_status CASCADE;
DROP TYPE IF EXISTS sync_type CASCADE;
DROP TYPE IF EXISTS sync_status CASCADE;

-- =====================================================
-- ENUMS
-- =====================================================

CREATE TYPE user_role AS ENUM (
    'VISITEUR',
    'UTILISATEUR',
    'MANAGER'
);

CREATE TYPE signalement_status AS ENUM (
    'NOUVEAU',
    'EN_COURS',
    'TERMINE'
);

CREATE TYPE sync_type AS ENUM (
    'IMPORT',
    'EXPORT'
);

CREATE TYPE sync_status AS ENUM (
    'SUCCESS',
    'ECHEC'
);

-- =====================================================
-- UTILISATEUR
-- =====================================================

CREATE TABLE utilisateur (
    id_user SERIAL PRIMARY KEY,
    email VARCHAR(150) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    nom VARCHAR(100),
    prenom VARCHAR(100),
    role user_role DEFAULT 'UTILISATEUR',

    tentatives_echec INT DEFAULT 0,
    bloque BOOLEAN DEFAULT FALSE,
    date_blocage TIMESTAMP,

    actif BOOLEAN DEFAULT TRUE,
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Compte manager par défaut
INSERT INTO utilisateur (email, password, role)
VALUES ('manager@admin.com', 'admin123', 'MANAGER');

-- =====================================================
-- SESSION (AUTH API)
-- =====================================================

CREATE TABLE session (
    id_session SERIAL PRIMARY KEY,
    id_user INT NOT NULL
        REFERENCES utilisateur(id_user)
        ON DELETE CASCADE,

    token TEXT UNIQUE NOT NULL,
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    date_expiration TIMESTAMP NOT NULL,
    active BOOLEAN DEFAULT TRUE
);

-- =====================================================
-- ENTREPRISE
-- =====================================================

CREATE TABLE entreprise (
    id_entreprise SERIAL PRIMARY KEY,
    nom VARCHAR(150) NOT NULL,
    contact VARCHAR(150),
    telephone VARCHAR(50),
    email VARCHAR(150),
    actif BOOLEAN DEFAULT TRUE
);

-- =====================================================
-- SIGNALEMENT
-- =====================================================

CREATE TABLE signalement (
    id_signalement SERIAL PRIMARY KEY,

    titre VARCHAR(200),
    description TEXT,

    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,

    surface_m2 DOUBLE PRECISION,
    budget DOUBLE PRECISION,

    statut_actuel signalement_status DEFAULT 'NOUVEAU',

    date_signalement TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    date_maj TIMESTAMP,

    source VARCHAR(50),

    id_user INT
        REFERENCES utilisateur(id_user)
        ON DELETE SET NULL,

    id_entreprise INT
        REFERENCES entreprise(id_entreprise)
        ON DELETE SET NULL
);

-- =====================================================
-- HISTORIQUE DES STATUTS DE SIGNALEMENT
-- =====================================================

CREATE TABLE historique_signalement (
    id_historique SERIAL PRIMARY KEY,

    id_signalement INT NOT NULL
        REFERENCES signalement(id_signalement)
        ON DELETE CASCADE,

    ancien_statut signalement_status,
    nouveau_statut signalement_status NOT NULL,

    date_changement TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    id_user INT
        REFERENCES utilisateur(id_user),

    commentaire TEXT
);

-- =====================================================
-- SYNCHRONISATION (FIREBASE / LOCAL)
-- =====================================================

CREATE TABLE sync_log (
    id_sync SERIAL PRIMARY KEY,

    id_user INT
        REFERENCES utilisateur(id_user),

    type_sync sync_type,
    source VARCHAR(50),

    statut sync_status,
    message TEXT,

    date_sync TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- INDEX (PERFORMANCE)
-- =====================================================

CREATE INDEX idx_signalement_statut
ON signalement(statut_actuel);

CREATE INDEX idx_signalement_geo
ON signalement(latitude, longitude);

CREATE INDEX idx_session_token
ON session(token);

CREATE INDEX idx_historique_signalement
ON historique_signalement(id_signalement);

-- =====================================================
-- FIN DU SCRIPT
-- =====================================================
