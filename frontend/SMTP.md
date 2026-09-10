# Formularz przez SMTP MyDevil

Formularz obsługuje SMTP. Sama skrzynka na hostingu nie wystarcza — aplikacja
musi znać serwer, login i hasło. SMTP ma pierwszeństwo przed Resend.

W katalogu uruchomionej aplikacji frontendowej na serwerze dopisz do `.env.local`:

```dotenv
SMTP_HOST=mail70.mydevil.net
SMTP_PORT=465
SMTP_USER=kontakt@pixelnawarstwie.pl
SMTP_PASSWORD='HASLO_DO_SKRZYNKI'
CONTACT_FROM_EMAIL=kontakt@pixelnawarstwie.pl
CONTACT_TO_EMAIL=pixelnawarstwie@gmail.com
```

Zastąp hasło prawdziwym hasłem skrzynki bezpośrednio na serwerze. Nie dodawaj go
do repozytorium ani do GitHub Actions. Zachowaj istniejące ustawienia CMS i strony.
Jeśli odbiorcą ma być nowa skrzynka, zmień `CONTACT_TO_EMAIL` na
`kontakt@pixelnawarstwie.pl`.

Po wdrożeniu poprawki i zapisaniu zmiennych zrestartuj aplikację:

```sh
devil www restart pixelnawarstwie.pl
```

Nadawca to Twoja skrzynka; adres odwiedzającego trafia do `Reply-To`.
Port 465 używa TLS od początku; alternatywny 587 wymaga STARTTLS. Weryfikacja
certyfikatu pozostaje włączona. Nie ma automatycznej ponownej wysyłki przez
Resend po błędzie SMTP, co zapobiega duplikatom.

## Diagnoza po wdrożeniu

1. Sprawdź logi aplikacji po wysłaniu formularza. Brak konfiguracji powoduje 503.
2. `EAUTH` / 535: błędny login lub hasło skrzynki; login to pełny adres e-mail.
3. `ETIMEDOUT`, `ECONNECTION`, `ESOCKET`: problem połączenia, TLS lub dostępu do SMTP.
4. `EENVELOPE` / 550: odrzucony nadawca albo odbiorca.
5. Jeśli formularz zgłasza sukces, SMTP przyjął maila. Sprawdź Spam i ewentualne
   zwrotki w skrzynce nadawcy; samo przyjęcie nie gwarantuje dostarczenia do Inbox.

Nie włączaj logowania haseł ani pełnej korespondencji SMTP. Sprawdź MX, SPF i DKIM
w panelu MyDevil, jeśli serwer przyjmuje wiadomości, ale odbiorca ich nie dostaje.

Źródła: [MyDevil — poczta](https://pomoc.mydevil.net/Poczta/),
[Nodemailer — SMTP](https://nodemailer.com/smtp).
