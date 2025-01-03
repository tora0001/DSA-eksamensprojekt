PSEUDOCODE

1. initApp med start knap

2. Load spillet når man trykker på start (initGame)

   function loadGame () {
   Fjern start knap
   Bestem størrelse af spillebræt
   Indlæs spillebræt
   Kald funktion som tilfældigt placerer bomber
   Kald funktion som afgør tal
   }

3. Randomize bomber i vores grid/bane ved brug fisher algoritmen

   function placeBombs () {
   Bestem antal bomber der skal bruges i spillet
   placer bomber tilfældigt på spillebrættet
   }

4. Afgør tal omkring bomberne(Algoritme for at bestemme tallene omrking bomberne) (neighbor Algoritme)

   function allocateNumbers () {
   Udregn hvilke tal der skal stå på felterne baseret på hvor bomberne er placeret
   }

5. Registrer når der bliver trykket på et felt

   function registerClick () {

   kald funktion der tjekker om man har vundet

   derefter tjek hvilket felt der er blevet trykket på

   IF (der bliver trykket på en bombe)
   kald funktion der slutter spillet
   ELSE (der bliver trykker på et tal eller et tomt felt)
   kald funktion der afslører hvad der er bag feltet
   }

6. Funktion der afslører hvad der er bag feltet

   function revealTile () {
   IF (der bliver trykket på et tomt felt)
   afslør alle de tomme felter der er omkring dette felt, indtil de rammer de omkringliggende tal
   ELSE (der bliver trykket på et tal)
   Afslør tal der fortæller hvor mange omkringliggende bomber der er
   }

7. Funktion der slutter spillet når der trykkes på en bombe

   function gameOver () {
   Afslør hvor alle bomberne er placeret
   slut spillet og giv muligheden for at restarte spillet
   }

8. Funktion der tjekker om man har vundet

   function winCheck () {
   IF (resterende uafslørede felter = antallet af bomber)
   Kald funktion der fortæller at brugeren har vundet spillet
   ELSE (resterende uafslørede felter > antallet af bomber)
   gør ingenting
   }

Algorithms:

1. Neighbor counting
2. Randomizer (bomb placement)
3. Flood fill(DFS or BFS) for empty cells
4. Right or wrong condition check

Datastructures:

1. Grid / 2D array
2. Scoreboard
3. Queue/Stack
4. Hash Table
5. Graph

Randomizer algorithms:
https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
https://en.wikipedia.org/wiki/Reservoir_sampling
https://stackoverflow.com/questions/47005560/difference-between-fisher-yates-shuffle-and-reservoir-sampling

Flood filling:
https://en.wikipedia.org/wiki/Flood_fill#:~:text=The%20traditional%20flood%2Dfill%20algorithm,them%20to%20the%20replacement%20color.

OM EKSAMEN
Til selve eksamen vil du få lov til at demonstrere produktet ganske kort - 3-4
minutter - hvorefter du bliver eksamineret i opbygningen af produktet såvel som
de anvendte algoritmer. Fokus vil især være på hvordan du har kodet
algoritmen, og sammenhængen mellem algoritme-beskrivelsen (fx din
pseudokode) og den konkrete implementation.
Der vil også være nogle (få) spørgsmål til resten af pensum uafhængigt af det
afleverede produkt.
Du bliver givet en samlet karakter, der ikke er vægtet i forhold til produkt,
projekt eller præsentation.
