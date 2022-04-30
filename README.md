# CodersCamp2021 - Projekt Node: SERVER

Trzeci projekt. Tworzenie bazy danych.

## Zespół projektowy:

Zespół pracował w ramach kursu CodersCamp. Aplikację wykonali uczestnicy kursu z pomocą mentora. Zachęcamy do odwiedzenia profili członków zespołu, w celu zapoznania się z ich portfolio.

#### Mentor:

[Aleksander Atamańczuk](https://github.com/TenGosc007)

#### Uczestnicy:

- [Małgorzata Bednarczuk](https://github.com/margiebed)

- [Anna Koruc](https://github.com/annakoruc)

- [Marta Probierz](https://github.com/marta-probierz)

- [Weronika Kurek-Pękala](https://github.com/SolWika)

- [Kasia Filip](https://github.com/kasia-filip)

- [Sebastian Michalczyk](https://github.com/WindOfCodes)

[Diagram ERD](https://www.figma.com/file/rKjruMuYjpcQelDVIyJRZy/Projekt-3?node-id=0%3A1)

<img width="686" alt="image" src="https://user-images.githubusercontent.com/84628957/159575697-1fbeabd5-b191-4efa-a6d6-574194a7f326.png">


### [WEJDŹ NA STRONĘ](https://ws-server-2022.herokuapp.com/)

## Cel projektu

Celem projektu było stworzenie własnego API, z którego będziemy korzystać w kolejnych modułach kursu. Za pomocą bazy danych możemy stworzyć użytkownika, zalogować się, edytować swoje hasło, tworzyć i usuwać projekty, a także dodawać opinie.

Aplikacja została wykonana według wymagań dostarczonych przez organizatorów CodersCamp.

## Kod startowy projektu

1. Nasza aplikacja została wdrożona na Heroku.
2. Biorąc pod uwagę fakt, iż nasza aplikacja jest implementowana przez kilku deweloperów, zdecydowaliśmy się na użycie biblioteki Prettier, służącej do formatowania kodu. Niniejsza biblioteka jest świetnym narzędziem, który wyłapuje błędy składni, automatycznie poprawia linie kodu według zdefiniowanej konfiguracji.

## Technologie użyte w projekcie:

1. TypeScript
2. Node.js
3. Express.js
4. Jest
5. MongoDB
6. Joi
7. Nodemailer
8. Mongoose
9. SuperTest

## Narzędzia pomocnicze

- Visual Studio Code
- Yarn
- Nodemon
- Figma
- Trello

Aby uruchomić aplikację na lokalnej maszynie, wykonaj następujące kroki:

1. Sklonuj repozytorium.
2. Otwórz je w ulubionym edytorze.
3. Stwórz plik .env i wklej do niego tą treść:

PORT=5000
MONGO_USER = <you user name>
MONGO_PASSWORD = <your user password>
MONGO_DB_NAME = <your db name>
ADDRESSPORT=localhost:5000 <= Tego nie ruszaj!
EMAIL=<your email>
PASSWORD=<your email's password>
PASSWORDYAHOO=<your password to email>
JWT_PRIVATE_KEY = <some random password>
NODE_ENV=production <= Tego nie ruszaj!

4. Zainstaluj zależności za pomocą komendy: yarn .
5. Wystartuj serwer za pomocą komendy: yarn dev .
6. Aby zobaczyć pokrycie testów w kodzie wpisz komendę: yarn test .

## Dokumentacja

Możesz zobaczyć każdy endpoint w pliku rest.http, natomiast tutaj masz kilka przykładów:

##Rejestracja

POST http://localhost:5000/users/register HTTP/1.1
Content-Type: application/json

{
"username": "samplename",
"firstname":"firstname",
"lastname":"last name",
"email": "sampleName@sample.com",
"password": "12345678"
}

##Logowanie

POST http://localhost:5000/login
Content-Type: application/json

{
"email": "sampleName@sample.com",
"password": "12345678"

}

##Dodawanie projektu

POST http://localhost:5000/project/create
Content-Type: application/json

{
"name": "Name of project",
"userId": "userID",
"mentorId": "mentor ID",
"content": "This is a content of project"
}

##GetAll

GET http://localhost:5000/project/
