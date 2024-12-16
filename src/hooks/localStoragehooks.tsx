import { useState, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type StorageListName = "dreamList" | "cart";

const useAsyncStorageList = (name: StorageListName) => {
  // Fetch the list directly from AsyncStorage
  const getList = useCallback(async () => {
    try {
      const storedList = await AsyncStorage.getItem(name);
      return storedList ? (JSON.parse(storedList) as string[]) : [];
    } catch (error) {
      console.error("Error getting list from AsyncStorage:", error);
      return [];
    }
  }, [name]);

  // Initialize state with the current list
  const [list, setList] = useState<string[]>([]);

  // useEffect to update state from the AsyncStorage on component mount
  useState(() => {
    const fetchList = async () => {
      const storedList = await getList();
      setList(storedList);
    };
    fetchList();
  }, [getList]);

  // Add a product to the list and update AsyncStorage
  const addProduct = async (productId: string) => {
    try {
      const updatedList = [...(await getList()), productId];
      await AsyncStorage.setItem(name, JSON.stringify(updatedList));
      setList(updatedList);
    } catch (error) {
      console.error("Error adding product to AsyncStorage:", error);
    }
  };

  // Remove a product from the list and update AsyncStorage
  const removeProduct = async (productId: string) => {
    try {
      const updatedList = (await getList()).filter((id) => id !== productId);
      await AsyncStorage.setItem(name, JSON.stringify(updatedList));
      setList(updatedList);
    } catch (error) {
      console.error("Error removing product from AsyncStorage:", error);
    }
  };

  return { list, addProduct, removeProduct };
};

export default useAsyncStorageList;
