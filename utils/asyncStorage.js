import { AsyncStorage } from "react-native";

const storeItem = async (storage) => {
  try {
      //we want to wait for the Promise returned by AsyncStorage.setItem()
      //to be resolved to the actual value before returning the value
      await AsyncStorage.multiSet(storage);
  } catch (error) {
    console.log(error.message);
  }
}

const retrieveItem = async (key) => {
  try {
    let res = []
    await AsyncStorage.getItem(key).then(data => {
      data.map((val, index) => {
        res.push([key[index], val[1]])
      })
    })

    return JSON.parse(res)
  } catch (error) {
    console.log(error.message);
  }
  return
}

const clearItem = async (key) => {
  try {
    await AsyncStorage.multiRemove(key, (err) => {
      console.log('local storage is removed')
    })
  } catch (error) {
    console.log(error)
  }
}

export { storeItem, retrieveItem, clearItem }