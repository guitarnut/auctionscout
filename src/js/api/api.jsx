const endpoint = 'http://foo.com/api';
const GET = 'GET';
const POST = 'POST';
const PUT = 'PUT';
const DELETE = 'DELETE';
const PATCH = 'PATCH';

const execute = (p, data) => {
  console.log(endpoint + p, data);
};

export const request = (id, config, data) => {
  let path = id === undefined ? config.path : config.path + `/${id}`;

  if (config.method === GET) {
    if (data !== undefined) {
      path += "?";
      Object.keys(data).map(k => {
        path += k + '=' + data[ k ] + '&';
      });
      path = path.substr(0, path.length - 2);
    }
    execute(path);
  } else if (config.method === POST) {
    execute(path, data);
  } else if (config.method === DELETE) {
    execute(path);
  }
};

export const api = {
  creative: {
    all: {
      method: GET,
      path: '/creative/all'
    },
    get: {
      method: GET,
      path: '/creative/view'
    },
    save: {
      method: POST,
      path: '/creative/save'
    },
    remove: {
      method: DELETE,
      path: '/creative/delete'
    }
  },

  campaign: {
    all: {
      method: GET,
      path: '/campaign/all'
    },
    get: {
      method: GET,
      path: '/campaign/view'
    },
    save: {
      method: POST,
      path: '/campaign/save'
    },
    remove: {
      method: DELETE,
      path: '/campaign/delete'
    }
  },

  display: {
    save: {
      method: POST,
      path: '/display/save'
    }
  },

  pacing: {
    get: {
      method: GET,
      path: '/pacing/view'
    },
    save: {
      method: POST,
      path: '/pacing/save'
    }
  },

  statistics: {
    get: {
      method: GET,
      path: '/statistics/view'
    },
    save: {
      method: POST,
      path: '/statistics/save'
    }
  },

  targeting: {
    get: {
      method: GET,
      path: '/targeting/view'
    },
    save: {
      method: POST,
      path: '/targeting/save'
    }
  },

  auctionrecord: {
    get: {
      method: GET,
      path: '/targeting/view'
    },
    remove: {
      method: DELETE,
      path: '/targeting/save'
    }
  },

  vastrecord: {
    get: {
      method: GET,
      path: '/targeting/view'
    },
    remove: {
      method: DELETE,
      path: '/targeting/save'
    }
  }
};
