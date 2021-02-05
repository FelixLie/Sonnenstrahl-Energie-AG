Projekt Webprogrammierung "Sonnenstrahl-Energie-AG"

Schritt-für-Schritt Anleitung:

1. Benötigte Software installieren
- Node.js (14.15.4): https://nodejs.org/en/
- MariaDB Server (10.5.8): https://mariadb.org/download/ (user: root, password: SonnenstrahlAG)

2. Repository klonen und mit <npm install> dependencies installieren

3. MariaDB Server starten (wenn nicht schon automatisch passiert) und mit <npm start> Anwendung ausführen
- Webseite & REST API über localhost:3000 erreichbar


HTTP-Abfragen (z.B. via Postman):
- Alle Tarife abfragen: GET http://localhost:3000/allrates
- Tarife & Preis unter Angabe von PLZ & Verbrauch abfragen: GET http://localhost:3000/rates?zipCode=TODO&consumption=TODO -> zipCode und consumption angeben
- Neue Bestellung anlegen: POST http://localhost:3000/orders
body:
```
{
    "firstName": "<<Vorname>>",
    "lastName": "<<Nachname>>",
    "street": "<<Straße>>",
    "streetNumber": "<<Hausnummer>>",
    "zipCode": "<<PLZ>>",
    "city": "<<Stadt>>",
    "rateId": 1,
    "consumption": <<Verbrauch>>,
    "agent": "<<Vergleichsportal>>"
}
```

Funktionen/Features:
- Webseite Sonnenstrahl-Energie-AG
- Grafischer Tarifrechner
- Bootstrap Frontend + Logo
- Passwortgeschützter Adminbereich (-> Passwort: admin123) 
- Manuelles Ändern/Aktualisieren der Tarifdaten im Adminbereich


Wichtig:
Beim Tarifrechner wird die Angabe des Verbrauchs den Personen bevorzugt. Soll der Preis nach den Personen
berechnet werden, muss der Verbauch aus dem Eingabefeld entfernt werden.

Die Tarifdaten können im Adminbereich aktualisiert werden. Hierfür einfach die Datei "sources.csv" im Verzeichnis "CSV" durch eine gleichnamige Datei ersetzen und mit "Daten aktualisieren" bestätigen.