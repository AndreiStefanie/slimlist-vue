import BaseService from './BaseService';

/**
 * Example service responsible for handling the useful links
 */
class LinksService extends BaseService {
  /**
   * Retrieve the available plugins
   * @returns {Promise}
   */
  async getPlugins() {
    // Here you would make API calls using the handler
    // provided by the BaseService class; e.g.:
    // return this._handler.get('/example/plugins')
    return {
      data: [
        {
          name: 'babel',
          link:
            'https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel'
        },
        {
          name: 'eslint',
          link:
            'https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint'
        },
        {
          name: 'unit-jest',
          link:
            'https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-unit-jest'
        },
        {
          name: 'e2e-nightwatch',
          link:
            'https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-e2e-nightwatch'
        }
      ]
    };
  }
  /**
   * Retrieve the essential links
   * @return {Promise}
   */
  async getEssentials() {
    return {
      data: [
        {
          name: 'Core Docs',
          link: 'https://vuejs.org'
        },
        {
          name: 'Forum',
          link: 'https://forum.vuejs.org'
        },
        {
          name: 'Community Chat',
          link: 'https://chat.vuejs.org'
        },
        {
          name: 'Twitter',
          link: 'https://twitter.com/vuejs'
        }
      ]
    };
  }
  /**
   * Retrieve the ecosystem links
   * @return {Promise}
   */
  async getEcosystem() {
    return {
      data: [
        {
          name: 'vue-router',
          link: 'https://router.vuejs.org'
        },
        {
          name: 'vuex',
          link: 'https://vuex.vuejs.org'
        },
        {
          name: 'vue-devtools',
          link: 'https://github.com/vuejs/vue-devtools#vue-devtools'
        },
        {
          name: 'vue-loader',
          link: 'https://vue-loader.vuejs.org'
        },
        {
          name: 'awesome-vue',
          link: 'https://github.com/vuejs/awesome-vue'
        }
      ]
    };
  }
}

// A service is stateless so using a singleton pattern
// should be safe.
const linksService = new LinksService();

export default linksService;
