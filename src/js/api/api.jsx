import client from 'request';
import { getAuth, isAuthorized } from "../common/authentication";

export const endpoint = 'http://localhost:8080';
const GET = 'GET';
const POST = 'POST';
const PUT = 'PUT';
const DELETE = 'DELETE';
const PATCH = 'PATCH';
const ID_MACRO = '@__ID__@';

const error = (resp) => {
  return resp.statusCode !== 200 && resp.statusCode !== 204;
};

const executePOST = (p, data) => {
  return new Promise((success, fail) => {
    client.post(
      {
        url: endpoint + p,
        body: JSON.stringify(data),
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Authorization': getAuth()
        }
      },
      (e, resp, body) => {
        if (e || error(resp)) {
          fail(e);
        } else {
          if (body !== null && body !== '') {
            success(JSON.parse(body));
          } else {
            success();
          }
        }
      }
    )
  });
};

const executeGET = (p) => {
  return new Promise((success, fail) => {
    client.get({
        url: endpoint + p,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Authorization': getAuth()
        }
      },
      (e, resp, body) => {
        if (e || error(resp)) {
          fail(e);
        } else {
          if (body !== '') {
            success(JSON.parse(body));
          } else {
            success(null);
          }
        }
      }
    )
  });
};

const executeDELETE = (p) => {
  return new Promise((success, fail) => {
    client.del({
        url: endpoint + p,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Authorization': getAuth()
        }
      },
      (e, resp, body) => {
        if (e || error(resp)) {
          fail(e);
        } else {
          success();
        }
      }
    )
  });
};


export const request = (id, config, data) => {
  let path = (id === undefined || id === null) ? config.path : config.path.replace(ID_MACRO, id);

  if (config.method === GET) {
    if (data !== undefined && data !== null) {
      path += "?";
      Object.keys(data).map(k => {
        path += k + '=' + data[ k ] + '&';
      });
      path = path.substr(0, path.length - 1);
    }
    return executeGET(path);
  } else if (config.method === POST) {
    return executePOST(path, data);
  } else if (config.method === DELETE) {
    return executeDELETE(path);
  }
};

export const api = {
  user: {
    login: {
      method: POST,
      path: '/user/login'
    },
    create: {
      method: POST,
      path: '/user/create'
    },
    get: {
      method: POST,
      path: '/account/get/'
    },
    update: {
      method: POST,
      path: '/account/update/'
    },
    remove: {
      method: POST,
      path: '/account/delete/'
    }
  },
  creative: {
    all: {
      method: GET,
      path: '/api/creative/all'
    },
    get: {
      method: GET,
      path: '/api/creative/' + ID_MACRO + '/view'
    },
    save: {
      method: POST,
      path: '/api/creative/' + ID_MACRO + '/save'
    },
    create: {
      method: POST,
      path: '/api/creative/create'
    },
    remove: {
      method: DELETE,
      path: '/api/creative/' + ID_MACRO + '/delete'
    },
    statistics: {
      reset: {
        method: GET,
        path: '/api/creative/' + ID_MACRO + '/statistics/reset'
      }
    }
  },

  campaign: {
    all: {
      method: GET,
      path: '/api/campaign/all'
    },
    get: {
      method: GET,
      path: '/api/campaign/' + ID_MACRO + '/view'
    },
    save: {
      method: POST,
      path: '/api/campaign/' + ID_MACRO + '/save'
    },
    create: {
      method: POST,
      path: '/api/campaign/create'
    },
    remove: {
      method: DELETE,
      path: '/api/campaign/' + ID_MACRO + '/delete'
    },
    creative: {
      add: {
        method: GET,
        path: '/api/campaign/' + ID_MACRO + '/creative/add'
      },
      remove: {
        method: GET,
        path: '/api/campaign/' + ID_MACRO + '/creative/remove'
      }
    },
    statistics: {
      reset: {
        method: GET,
        path: '/api/campaign/' + ID_MACRO + '/statistics/reset'
      }
    }
  },

  display: {
    get: {
      method: GET,
      path: '/api/display/' + ID_MACRO + '/view'
    },
    save: {
      method: POST,
      path: '/api/display/' + ID_MACRO + '/save'
    }
  },

  video: {
    get: {
      method: GET,
      path: '/api/video/' + ID_MACRO + '/view'
    },
    save: {
      method: POST,
      path: '/api/video/' + ID_MACRO + '/save'
    }
  },

  pacing: {
    campaign: {
      get: {
        method: GET,
        path: '/api/campaign/' + ID_MACRO + '/pacing/view'
      },
      save: {
        method: POST,
        path: '/api/campaign/' + ID_MACRO + '/pacing/save'
      }
    },
    creative: {
      get: {
        method: GET,
        path: '/api/creative/' + ID_MACRO + '/pacing/view'
      },
      save: {
        method: POST,
        path: '/api/creative/' + ID_MACRO + '/pacing/save'
      }
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
    campaign: {
      get: {
        method: GET,
        path: '/api/campaign/' + ID_MACRO + '/targeting/view'
      },
      save: {
        method: POST,
        path: '/api/campaign/' + ID_MACRO + '/targeting/save'
      }
    },
    creative: {
      get: {
        method: GET,
        path: '/api/creative/' + ID_MACRO + '/targeting/view'
      },
      save: {
        method: POST,
        path: '/api/creative/' + ID_MACRO + '/targeting/save'
      }
    }
  },

  auctionrecord: {
    all: {
      method: GET,
      path: '/api/auctionrecord/all'
    },
    get: {
      method: GET,
      path: '/api/auctionrecord/' + ID_MACRO + '/view'
    },
    remove: {
      method: DELETE,
      path: '/api/auctionrecord/' + ID_MACRO + '/delete'
    },
    clear: {
      method: DELETE,
      path: '/api/auctionrecord/clear'
    }
  },

  vastrecord: {
    all: {
      method: GET,
      path: '/api/vasttagrecord/all'
    },
    get: {
      method: GET,
      path: '/api/vasttagrecord/' + ID_MACRO + '/view'
    },
    remove: {
      method: DELETE,
      path: '/api/vasttagrecord/' + ID_MACRO + '/delete'
    }
  },

  account: {
    statistics: {
      get: {
        method: GET,
        path: '/api/account/statistics/view'
      }
    }
  }
};
