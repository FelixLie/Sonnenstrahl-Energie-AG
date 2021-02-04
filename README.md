Projekt Webprogrammierung "Sonnenstrahl-Energie-AG"

Schritt-für-Schritt Anleitung:

1. Benötigte Software installieren
- Node.js (14.15.4): https://nodejs.org/en/
- MariaDB Server (10.5.8): https://mariadb.org/download/ (user: root, password: SonnenstrahlAG)

2. Repository klonen und mit <npm install> dependencies installieren

3. MariaDB Server starten (wenn nicht schon automatisch passiert) und mit <npm start> Anwendung ausführen
- über localhost:3000 erreichbar


HTTP-Abfragen:
- Alle Tarife abfragen: GET http://localhost:3000/rates?zipCode=TODO&consumption=TODO -> zipCode und consumption angeben
- Neue Bestellung anlegen: POST http://localhost:3000/orders -> Body gemäß API Definition


Funktionen/Features:
- Webseite Sonnenstrahl-Energie-AG
- Grafischer Tarifrechner
- Bootstrap Frontend + Logo
- //Admin Login (-> CSV hochladen)
- //Tarife Buchen

Wichtig:
Beim Tarifrechner wird die Angabe des Verbrauchs der Angabe der Personen bevorzugt! Soll der Preis nach den Personen
berechnet werden, muss der Verbauch aus dem Eingabefeld entfernt werden.