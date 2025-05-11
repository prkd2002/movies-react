# 🎬 Movies App

Eine moderne Webanwendung zum Durchsuchen, Speichern und Verwalten von Filmen. Entwickelt mit **React**, gestylt mit **TailwindCSS** und unterstützt durch **Appwrite** als Backend-as-a-Service für Authentifizierung und Datenverwaltung.

---

## 🚀 Features

- 🔍 Durchsuchen und Anzeigen von Filmen mit detaillierten Informationen
- ☁️ Echtzeit-Datenbank über Appwrite
- 📱 Responsive Design (mobile friendly)

---

## 🛠️ Tech Stack

| Technologie   | Verwendung                          |
|---------------|-------------------------------------|
| React         | Frontend-Framework                  |
| TailwindCSS   | Styling                             |
| Appwrite      | Backend (Auth, DB, Storage)         |
| Vite (optional)| Development-Server / Build-Tool     |

---

## 📦 Installation

### 🔧 Voraussetzungen

- Node.js >= 18
- Appwrite-Server oder ein aktiver Appwrite Cloud Account
- Optional: Git

### 🔄 Klone das Repository

```bash
git clone  https://github.com/prkd2002/movies-react.git
cd movies-app
```

# Abhängigkeiten installieren
```bash
npm install
```

# ⚙️ Appwrite Konfiguration
1. Stelle sicher, dass dein Appwrite-Projekt läuft (lokal oder in der Cloud).

2. Lege in Appwrite:

- Ein Projekt an

- Eine Datenbank (movies)

- Eine Collection (metrics

- Attribute wie searchTerm, poster_url, count .


3. Erstelle eine .env-Datei mit deinen Appwrite-Daten:
```bash
VITE_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=dein_project_id
VITE_APPWRITE_DATABASE_ID=deine_datenbank_id
VITE_APPWRITE_COLLECTION_ID=deine_collection_id
VITE_APPWRITE_BUCKET_ID=optional_für_poster_uploads
```

# 🧪 Starten der App in Entwicklungsmodus
```bash
npm run dev
```
Die App ist nun erreichbar unter: http://localhost:5173


# 📧 Kontakt
Bei Fragen oder Feedback kannst du mich gerne kontaktieren:

GitHub: @prkd2002



