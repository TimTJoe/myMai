//save array of object to the localstorage
export function saveItems(key, value) {
  let savedItem = getItem(key);
  let response;

  //save key-value if key is empty
  if (savedItem == null) {
    response = setItem(key, [value]);
    return {
      massage: key + " created with id: ." + value.id,
      expense: response,
      expenses: null,
    };
  } else {
    //add new value to existing key
    savedItem.push(value);
    response = setItem(key, savedItem);
    //retrieve the recent savedItem
    let item = response.filter((expense) => expense.id === value.id);
    return {
      message: key + " created with id: " + value.id,
      expense: item,
      expenses: response,
    };
  }
}

//save a single key value to localstorage
export function setItem(keyName, value) {
  window.localStorage.setItem(keyName, JSON.stringify(value));
  let savedItem = getItem(keyName);
  if (savedItem == null) {
    return null;
  } else {
    return savedItem;
  }
}

export function getItem(keyName) {
  let item = JSON.parse(window.localStorage.getItem(keyName));
  if (item == null) {
    return null;
  } else {
    return item;
  }
}

export function deleteItem(keyName) {
  window.localStorage.removeItem(keyName);
}

// export function showItem(id)
