### McIntosh Casino
## Capstone 2 Project Proposal
## Layne McIntosh

1. What tech stack will you use for your final project? 
React, Node/Express and PostgreSQL

2. Is the front-end UI or the back-end going to be the focus of your project? Or are you going to make an evenly focused full-stack application? 
I would like it to be evenly focused, however leaning towards the front-end.

3. Will this be a website? A mobile app? Something else? 
A website that supports mobile viewing

4. What goal will your project be designed to achieve? 
Create an engaging online casino platform where users can play blackjack, poker, and roulette against bots and other users.

5. What kind of users will visit your app? In other words, what is the demographic of your users? 
Gamblers 

6. What data do you plan on using? How are you planning on collecting your data? You may have not picked your actual API yet, which is fine, just outline what kind of data you would like it to contain. You are welcome to create your own API and populate it with data. If you are using a Python/Flask stack are required to create your own API. 
Utilize a deck of cards API for game-related data
User data: username, email, password (hashed and securely stored)
Game-related data: player statistics, game history
user authentication and authorization
Trivia API for when users go bankrupt

7. In brief, outline your approach to creating your project (knowing that you may not know everything in advance and that these details might change later). Answer questions like the ones below, but feel free to add more information: 
a. What does your database schema look like? 
Users Table: user_id (PK), username, email, password_hash
Games Table: game_id (PK), user_id (FK), game_type
Blackjack Table: blackjack_id (PK), user_id (FK), bets, result 
Poker Table: poker_id (PK), user_id (FK), bets, result 
Roulette Table: roulette_id (PK), user_id (FK), bets, result 


b. What kinds of issues might you run into with your API? This is especially important if you are creating your own API, web scraping produces notoriously messy data. 
I don’t think I will run into very many issues with the deck of cards api, however, the Trivia API might prove tricky being I have never used it.

c. Is there any sensitive information you need to secure? 
Secure user passwords using encryption (hashing and salting).

d. What functionality will your app include? 
User account creation and authentication.
Blackjack, poker, and roulette game interfaces.
Bots with varying levels of difficulty for users to play against.
User profiles with game statistics.
Trivia Game when users go bankrupt 

e. What will the user flow look like?
Registration and login.
Game selection and playing against bots.
Viewing game history and statistics.
Account management and settings.
Trivia Game in order to gain more money

f. What features make your site more than a CRUD app? What are your stretch goals? 
Real-time gameplay with interactive interfaces make this more than a CRUD app. I would like to implement live multiplayer functionality, leaderboards, and an in-app currency system




Issues Still Needing Fixed:

1. Need to Add in Trivia for when a user goes bankrupt

2. Hit button is working, however it does not render the card
---- I think the game prop in my parent BlackjackGame file needs to be rerendered on changes of the game, however, i cant let this create a new instance of the game

3. Stand button needs some work

4. Betting feature is running properly, except when doubleBet or TripleBet runs, the navbar balance and the current bet doesnt update the first time and lags one click behind

5. Havent been able to work on end game component yet. 

6. when stand is pressed, the card component must refresh to flip over