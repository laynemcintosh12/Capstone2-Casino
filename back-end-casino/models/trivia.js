const db = require("../db");
const axios = require("axios");
const { Pool } = require("pg");
const { NotFoundError } = require("../expressError");
const BASE_URL = "https://opentdb.com/api.php?amount=10&category=9"
const triviaSchema = require("../schemas/triviaSchema.json");


class Trivia {
    /* Gets a list of 10 trivia questions from the trivia API.
    *
    * Requires difficulty to be passed in as a query parameter.
    * 
    * Makes an API request and saves that data to the database.
    * 
    * returns { category, type, difficulty, question_text, correct_answer }
    *
    */
   static async getTen(query) {
    const url = `${BASE_URL}&difficulty=${query.difficulty}`
    try {
        // Make API request
        const response = await fetch(url);
        const data = await response.json();

        // expand data to get category, difficulty, question_text and correct_answer
        const questions = data.results.map(question => ({
            category: question.category,
            type: question.type,
            difficulty: question.difficulty,
            question: question.question,
            correct_answer: question.correct_answer
        }))

        // pass category, difficulty, question_text and correct_answer into function to save to database
        await this.saveTriviaToDatabase(data);
        
        // Extract and return required information
        const triviaQuestions = data.map(question => ({
          category: question.category,
          type: question.type,
          difficulty: question.difficulty,
          question: question.question,
          correct_answer: question.correct_answer
        }));
        
        return triviaQuestions;
      } catch (error) {
        console.error('Error fetching trivia questions:', error);
        throw error;
      }
   }



    /** Saves data passed in to the trivia database
     * 
     *  requires data to be passed in as a parameter
     * 
     *  data needed: category, difficulty, question_text, correct_answer
     */

   static async saveTriviaToDatabase(questions) {
    const pool = new Pool({
      user: 'laynemcintosh12',
      host: 'https://localhost/3001',
      database: 'casino',
      password: 'password',
      port: 5432, 
    });

    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      for (const question of questions) {
        const queryText = `INSERT INTO trivia_questions (question_text, correct_answer, category, difficulty) 
                           VALUES ($1, $2, $3, $4)`;
        const values = [
          question.question,
          question.correct_answer,
          question.category || null,
          question.difficulty
        ];
        await client.query(queryText, values);
      }
      await client.query('COMMIT');
      console.log('Data saved to database successfully');
    } catch (error) {
      await client.query('ROLLBACK');
      console.error('Error saving data to database:', error);
      throw error;
    } finally {
      client.release();
    }
  }
}