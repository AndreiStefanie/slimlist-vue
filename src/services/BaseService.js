import axios from 'axios';

/**
 * Class providing base functionality for services
 */
export default class BaseService {
  constructor() {
    /**
     * Wrapper for transport layer functionality (e.g. axios)
     * @property {Object}
     * @protected
     */
    this._handler = axios.create({
      baseURL: ``,
      withCredentials: false,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    });
  }
}
