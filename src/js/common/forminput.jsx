import { api, request } from "../api/api";

export const handleSwitchChange = (state, setter, name) => {
  setter({ ...state, [ name ]: !state[ name ] });
};

export const save = (id, endpoint, data) => {
  return request(id, endpoint, data);
};
