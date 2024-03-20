### McIntosh Casino
#### Capstone Project Documentation

1. **Website:** [McIntosh Casino](link_to_deployed_site)

2. **Description:**
   McIntosh Casino is an online platform offering various casino games such as blackjack, poker, and roulette. Users can play against bots, other users or go solo, providing an engaging and interactive gambling experience!

3. **Features:**
   - **Blackjack:** 
        - Fully functional blackjack game. Get closer to 21 than the dealer without going over 21 to win!
   - **Poker, Roulette:** 
        - Planned for future implementation.
   - **User Authentication:** 
        - Secure registration and login.
   - **Game Statistics:** 
        - Future feature to track user performance.
   - **Trivia Game:** 
        - Accessible when users go bankrupt.

4. **Testing:**
   - Backend testing ensures proper data fetching
        - Run with `npm test`
   - Frontend testing involves verifying rendering and functionality across various devices and browsers.
        - Run with `npm test`

5. **User Flow:**
   1. Registration and login to access games on the website.
   2. Select a game (currently only blackjack is up and running).
   3. Play the chosen game against bots or other users (or solo depending on the game).
   4. Access the profile page to view user information and balance.
   5. Engage in the trivia game if you ever run out of funds!

6. **API:** 
    - Deck of Cards API: https://deckofcardsapi.com/
    - Trivia API: https://opentdb.com/api_config.php

7. **Technology Stack:**
   - **Backend:**
     - Language: JavaScript
     - Runtime Environment: Node.js
     - Framework: Express.js
     - Database: PostgreSQL
     - Authentication: JSON Web Tokens (JWT)
   - **Frontend:**
     - Library: React
     - Routing: React Router
     - HTTP Requests: Axios
   - **Testing:**
     - Testing Framework: Jest

8. **Stretch Goals:**
    - Add more games: 
        - poker
        - roulette
        - slots
   - Enable Multiplayer Functionality
   - Build bots for poker lobbies

