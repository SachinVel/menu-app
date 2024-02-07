import React, { useEffect, useLayoutEffect, useState } from "react";
import { FlatList, Text, View, TouchableHighlight, Image } from "react-native";
import styles from "./styles";
import { getMenu } from "../../data/MockDataAPI";
import { useGlobalContext } from "../../components/GlobalContext/GlobalContext";

export default function HomeScreen(props) {
  
  const [isDataAvailable, setIsDataAvailable] = useState(false);
  const [menuItems, setMenuItems] = useState(false);
  const { state, dispatch } = useGlobalContext();

  useLayoutEffect(() => {
    getMenu().then((menuItems) => {
      setIsDataAvailable(true);
      setMenuItems(menuItems);
      dispatch({menuItems:menuItems});
    });
  },[]);

  useEffect(() => {
    setMenuItems(state.menuItems);
  },[state]);

  const onPressRecipe = (item) => {
    navigation.navigate("Recipe", { item });
  };

  const renderRecipes = ({ item }) => (

    <View style={styles.container} key={item.id}>
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
      {
        isDataAvailable && <FlatList vertical showsVerticalScrollIndicator={false} numColumns={2} data={menuItems} renderItem={renderRecipes} keyExtractor={(item) => `${item.id}`} />
      }

    </View>
  );
}
