export const addArrayItem = (target, max) => {
  let el = document.getElementById(target);
  const { name, value } = el;
  let array = values[ target ];
  if(array.indexOf(value) === -1) {
    array.push(value);
  }
  if (array.length > max) {
    array.shift();
  }
  this.setValues({ ...values, [ name ]: array });
  el.value = '';
};

export const removeArrayItem = (name, value) => {
  let array = values[ name ];
  if (array.indexOf(value) !== -1) {
    array.splice(array.indexOf(value), 1);
  }
  this.setValues({ ...values, [ name ]: array });
};
