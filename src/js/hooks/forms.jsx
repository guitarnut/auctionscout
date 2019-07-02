export const useAddArrayItem = (target, max) => {
  let el = document.getElementById(target);
  const { name, value } = el;
  let array = values[ target ];
  if(array.indexOf(value) === -1) {
    array.push(value);
  }
  if (array.length > max) {
    array.shift();
  }
  setValues({ ...values, [ name ]: array });
  el.value = '';
};

export const useRemoveArrayItem = (name, value) => {
  let array = values[ name ];
  if (array.indexOf(value) !== -1) {
    array.splice(array.indexOf(value), 1);
  }
  setValues({ ...values, [ name ]: array });
};

export const useHandleInputChange = e => {
  const { name, value } = e.target;
  setValues({ ...values, [ name ]: value });
};

