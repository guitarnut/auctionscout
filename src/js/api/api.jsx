import client from 'request';

const endpoint = 'http://localhost:8080';
const GET = 'GET';
const POST = 'POST';
const PUT = 'PUT';
const DELETE = 'DELETE';
const PATCH = 'PATCH';
const ID_MACRO = '@__ID__@';

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

const executeGET = (p) => {
  return new Promise((success, fail) => {
    client.get(endpoint + p,
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

const executeDELETE = (p) => {
  return new Promise((success, fail) => {
    client.del(endpoint + p,
      (e, resp, body) => {
        if (e) {
          fail();
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
    }
  },

  display: {
    save: {
      method: POST,
      path: '/api/display/save'
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
