import React from "react";
import {
  ScrollView,
  Text,
  View,
  Image,
  TouchableHighlight,
} from "react-native";
import styles from "./styles";
import BackButton from "../../components/BackButton/BackButton";

export default function MenuItemScreen(props) {
  const { navigation, route } = props;

  const item = route.params?.item;
  const category = item.category;
  const title = item.title;

  return (
    <ScrollView style={styles.container}>
      <BackButton
        style={styles.backButton}
        onPress={() => {
          navigation.goBack();
        }}
      />
      <View style={styles.carouselContainer}>
        <View style={styles.carousel}>
          <Image style={styles.image} source={{ uri: item.photoUrl }} />
        </View>
      </View>
      <View style={styles.infoRecipeContainer}>
        <Text style={styles.infoRecipeName}>{item.title}</Text>
        <View style={styles.infoContainer}>
          <TouchableHighlight
            onPress={() =>
              navigation.navigate("RecipesList", { category, title })
            }
          >
            <Text style={styles.category}>
              {item.category.toUpperCase()}
            </Text>
          </TouchableHighlight>
        </View>

        <View style={styles.infoContainer}>
          <Image
            style={styles.infoPhoto}
            source={require("../../../assets/icons/time.png")}
          />
          <Text style={styles.infoRecipe}>{item.calorie} cal </Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoDescriptionRecipe}>{item.description}</Text>
        </View>
      </View>
    </ScrollView>
  );
}
