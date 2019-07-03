import client from 'request';

const endpoint = 'http://localhost:8080';
const GET = 'GET';
const POST = 'POST';
const PUT = 'PUT';
const DELETE = 'DELETE';
const PATCH = 'PATCH';

const executePOST = (p, data) => {
  return new Promise((success, fail) => {
    client.post(
      {
        url: endpoint + p,
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      },
      (e, resp, body) => {
        if (e) {
          fail();
        } else {
          success(JSON.parse(body));
        }
      }
    )
  });
};

const executeGET = (p, data) => {
  console.log(endpoint + p, data);
};

const executeDELETE = (p, data) => {
  console.log(endpoint + p, data);
};


export const request = (id, config, data) => {
  console.log(id);
  let path = (id === undefined || id === null) ? config.path : config.path.replace('@__ID__@', id);

  if (config.method === GET) {
    if (data !== undefined) {
      path += "?";
      Object.keys(data).map(k => {
        path += k + '=' + data[ k ] + '&';
      });
      path = path.substr(0, path.length - 2);
    }
    return executeGET(path);
  } else if (config.method === POST) {
    return executePOST(path, data);
  } else if (config.method === DELETE) {
    return executeDELETE(path);
  }
};

export const api = {
  creative: {
    all: {
      method: GET,
      path: '/api/creative/all'
    },
    get: {
      method: GET,
      path: '/api/creative/view'
    },
    save: {
      method: POST,
      path: '/api/creative/save'
    },
    remove: {
      method: DELETE,
      path: '/api/creative/delete'
    }
  },

  campaign: {
    all: {
      method: GET,
      path: '/api/campaign/all'
    },
    get: {
      method: GET,
      path: '/api/campaign/view'
    },
    save: {
      method: POST,
      path: `/api/campaign/@__ID__@/save`
    },
    create: {
      method: POST,
      path: '/api/campaign/create'
    },
    remove: {
      method: DELETE,
      path: '/api/campaign/delete'
    }
  },

  display: {
    save: {
      method: POST,
      path: '/api/display/save'
    }
  },

  pacing: {
    get: {
      method: GET,
      path: '/api/pacing/view'
    },
    save: {
      method: POST,
      path: '/api/pacing/save'
    }
  },

  statistics: {
    get: {
      method: GET,
      path: '/api/statistics/view'
    },
    save: {
      method: POST,
      path: '/api/statistics/save'
    }
  },

  targeting: {
    get: {
      method: GET,
      path: '/api/targeting/view'
    },
    save: {
      method: POST,
      path: '/api/targeting/save'
    }
  },

  auctionrecord: {
    get: {
      method: GET,
      path: '/api/targeting/view'
    },
    remove: {
      method: DELETE,
      path: '/api/targeting/save'
    }
  },

  vastrecord: {
    get: {
      method: GET,
      path: '/api/targeting/view'
    },
    remove: {
      method: DELETE,
      path: '/api/targeting/save'
    }
  }
};
