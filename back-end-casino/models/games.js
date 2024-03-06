const db = require("../db");
const { NotFoundError } = require("../expressError");

class Game {

  /** Get all games from the database 
   * 
   *  returns { game_id, game_type, game_name, description }
   * 
   * Throws NotFoundError if no games found.
  */

  static async getAll() {
    const gamesRes = await db.query(
      `SELECT game_id AS "gameId",
              game_type AS "gameType",
              game_name AS "gameName",
              description
       FROM games`
    );

    const games = gamesRes.rows;
    if (!games) throw new NotFoundError("No games found");

    return games;
  }

  /** Get a single game from the database
   * 
   * returns { game_id, game_type, game_name, description }
   * 
   * Throws NotFoundError if game not found.
   * 
  */

  static async findOne(id) {
    const gameRes = await db.query(
      `SELECT game_id AS "gameId",
              game_type AS "gameType",
              game_name AS "gameName",
              description
       FROM games
       WHERE game_id = $1`,
      [id]
    );

    const game = gameRes.rows[0];

    if (!game) throw new NotFoundError(`No game found with id ${id}`);

    return game;
  }


  /** Update a single game from the database
   * 
   * Returns { game_id, game_type, game_name, description }
   * 
   * Throws NotFoundError if game not found.
   */

  static async update(id, gameData) {
    const result = await db.query(
      `UPDATE games
       SET game_type = $1,
           game_name = $2,
           description = $3
       WHERE game_id = $4
       RETURNING game_id AS "gameId",
               game_type AS "gameType",
               game_name AS "gameName",
               description`,
      [gameData.gameType, gameData.gameName, gameData.description, id]
    );

    const game = result.rows[0];

    if (!game) throw new NotFoundError(`No game found with id ${id}`);

    return game;
  }

  
}

module.exports = Game;
