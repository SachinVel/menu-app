import React, { useEffect, useLayoutEffect, useState } from "react";
import { FlatList, Text, View, Image, TouchableHighlight, Pressable } from "react-native";
import styles from "./styles";
import { getMenu } from "../../data/MockDataAPI";
import { GestureHandlerRootView, TextInput } from "react-native-gesture-handler";
import { useGlobalContext } from "../../components/GlobalContext/GlobalContext";

export default function SearchScreen(props) {
  const { navigation } = props;

  const [value, setValue] = useState("");
  const [data, setData] = useState([]);
  const [menuItems, setMenuItems] = useState(false);
  const { state, dispatch } = useGlobalContext();

  
  const getRecipesByMenuName = (menuName) => {
    const nameUpper = menuName.toUpperCase();
    const menuArr = [];
    menuItems.map(data => {
      if (data.title.toUpperCase().includes(nameUpper)) {
        menuArr.push(data);
      }
    });
    return menuArr;
  }

  const getRecipesByCategoryName = (categoryName) => {
    const nameUpper = categoryName.toUpperCase();
    const menuArr = [];
    menuItems.map(data => {
      if (data.category.toUpperCase().includes(nameUpper)) {
        menuArr.push(data);
      }
    });
    return menuArr;
  }

  useLayoutEffect(() => {
    getMenu().then((menuItems) => {
      setMenuItems(menuItems);
    });
  }, []);

  useEffect(() => {
    setMenuItems(state.menuItems);
  },[state]);

  useEffect(() => { }, [value]);

  const handleSearch = (text) => {
    setValue(text);
    var recipeArray1 = getRecipesByMenuName(text);
    var recipeArray2 = getRecipesByCategoryName(text);
    var aux = recipeArray1.concat(recipeArray2);
    var recipeArray = [...new Set(aux)];

    if (text == "") {
      setData([]);
    } else {
      setData(recipeArray);
    }
  };

  const onPressRecipe = (item) => {
    navigation.navigate("Recipe", { item });
  };

  const renderRecipes = ({ item }) => (
    <View style={styles.container}>
      <TouchableHighlight underlayColor="#fff" onPress={() => onPressRecipe(item)}>
        <>
          <Image style={styles.photo} source={{ uri: item.photoUrl }} />
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.category}>{item.category}</Text>
        </>
      </TouchableHighlight>
    </View >
  );

  return (
    <View>
      <GestureHandlerRootView>
        <View style={styles.searchContainer}>
          <Image style={styles.searchIcon} source={require("../../../assets/icons/search.png")} />
          <TextInput
            style={styles.searchInput}
            onChangeText={handleSearch}
            value={value}
          />
          <Pressable onPress={() => handleSearch("")}>
            <Image style={styles.searchIcon} source={require("../../../assets/icons/close.png")} />
          </Pressable>
        </View>
      </GestureHandlerRootView>

      <FlatList vertical showsVerticalScrollIndicator={false} numColumns={2} data={data} renderItem={renderRecipes} keyExtractor={(item) => `${item.id}`} />
    </View>
  );
}
