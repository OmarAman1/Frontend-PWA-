# Frontend PWA Project (5-week Scrum Plan)

Detta repository innehåller ett frontend-projekt byggt som en **Progressive Web App (PWA)** med fokus på:
- HTML, CSS, JavaScript
- Service Workers & Web App Manifest
- Offline-stöd
- Tillgänglighet (a11y)
- GitHub Projects, Issues och CI/CD

Projektet är planerat och uppdelat enligt **Scrum i 5 veckor (sprintar)** och är öppet för grupparbete.

---

## 🗓 Projektplan – 5 veckor

Projektet är uppdelat i **5 sprintar (1 vecka per sprint)**.  
Varje vecka har sin egen prioritet, markerad med labels:

| Prioritet | Vecka | Innehåll |
|---------|------|---------|
| `P0` | Vecka 1 | Setup, grundlayout, Git-flöde, CI/CD |
| `P1` | Vecka 2 | API-integration, listvy, sök/filter |
| `P2` | Vecka 3 | Detaljsida, favoriter, lokal lagring |
| `P3` | Vecka 4 | PWA, Service Worker, offline-läge |
| `P4` | Vecka 5 | Tillgänglighet, tester, rapport, video |

👉 **Alla issues är märkta med `P0`–`P4`** för att tydligt visa vilken vecka de tillhör.  
Detta gör att vi inte blandar ihop arbete från olika sprintar.

---

## 📋 Arbetsflöde i GitHub Projects

Vi använder en Kanban-board med följande kolumner:

- **Backlog** – Alla planerade issues
- **Ready** – Prioriterade issues för aktuell vecka
- **In progress** – Pågående arbete
- **In review** – PR skapad, väntar på review
- **Done** – Färdig och mergad funktionalitet

### Varje vecka:
1. Vi prioriterar issues för sprinten (t.ex. alla `P1`)
2. Flyttar dem från **Backlog → Ready**
3. Arbetar igenom dem innan vi går vidare till nästa vecka

---

## 🧩 Issues & Tasks

- **1 Issue = 1 User Story**
- Varje issue innehåller en checklista med tasks
- Issues beskriver *vad* som ska göras, inte bara *hur*

Exempel på issue-titel:
> *Som användare vill jag kunna se en lista med karaktärer så att jag kan bläddra i appen.*

---

## 🌿 Git & Branching

- `main` – stabil, deployad version
- `dev` – samlingsbranch för färdigt arbete
- `feature/issue-<nummer>-kort-beskrivning` – arbete per issue
