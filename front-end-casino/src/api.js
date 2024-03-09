import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";



class CasinoApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${CasinoApi.token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get all games */

  static async getGames() {
    let res = await this.request(`games`);
    return res.games;
  }

  /** Get a game by its ID. */

  static async getGame(id) {
    const res = await this.request(`games/${id}`);
    return res.game;
  }

  /** Get account balance */

  static async fetchBalance(username) {
    if (!username) {
      return;
    }
    else {
      const res = await this.request(`user/balance/${username}`);
      return res.user.balance;
    }
  }


  /** Place a bet on a game. */

  static async placeBet(username, amount) {
    const res = await this.request(`user/bet/${username}`, { amount: -amount }, "put");
    console.log(res);
    return res;
  }

  /** Log out a user */

  static async logout() {
    this.token = null;
  }

  /** Log a user in */

  static async login(data){
    const res = await this.request('auth/login', data, "post");
    this.token = res.token;
    return res.token
  }

  /** Sign up a new user */

  static async signup(data){
    const res = await this.request('auth/register', data, "post");
    this.token = res.token;
    return res.token
  }

  /** Edit a user */

  static async editUser(data){
    // sends data to /users/:username
    let email = data.email;
    let password = data.password;
    let update = { email, password };
    const res = await this.request(`users/${data.username}`, update, "patch");
    return res.user;
  }

  /** Get a user by username */

  static async getUser(username){
    const res = await this.request(`users/${username}`);
    console.log("GetUser, JOBLYAPI", res);
    return res.user;
  }

 
}




export default CasinoApi;