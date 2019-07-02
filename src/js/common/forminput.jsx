import { api, request } from "../api/api";

export const handleSwitchChange = (state, setter, name) => {
  setter({ ...state, [ name ]: !state[ name ] });
};

export const save = (id, endpoint, data) => {
  request(id, endpoint, data);
};
