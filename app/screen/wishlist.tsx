import React from "react";
import {
  FlatList,
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { ThemeColors, useThemeContext } from "../theme/Theme";

type WishlistItem = {
  id: string;
  name: string;
  image: ImageSourcePropType;
};

const wishlist: WishlistItem[] = [
  {
    id: "1",
    name: "Jellyfish",
    image: require("../../assets/images/1.jpg"),
  },
  {
    id: "2",
    name: "Messenger Bag",
    image: require("../../assets/images/2.jpg"),
  },
  {
    id: "3",
    name: "Miffy keychain",
    image: require("../../assets/images/3.jpg"),
  },
  {
    id: "4",
    name: "Pouch",
    image: require("../../assets/images/4.jpg"),
  },
  {
    id: "5",
    name: "Leg Warmer",
    image: require("../../assets/images/5.jpg"),
  },
  {
    id: "6",
    name: "Waist Bandana",
    image: require("../../assets/images/6.jpg"),
  },
];

export default function Wishlist() {
  const { theme } = useThemeContext();
  const { width } = useWindowDimensions();
  const isWide = width >= 600;
  const columns = isWide ? 3 : 2;
  const styles = createStyles(theme);

  return (
    <View style={styles.screen}>
      <FlatList
        key={`wishlist-${columns}`}
        data={wishlist}
        numColumns={columns}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.content}
        columnWrapperStyle={columns > 1 ? styles.gridRow : undefined}
        ListHeaderComponent={
          <View style={styles.headerCard}>
            <Text style={styles.kicker}>CROCHET PLANS</Text>
            <Text style={styles.title}>Project Wishlist</Text>
            <Text style={styles.subtitle}>Simple project idea board.</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={[styles.projectTile, { width: isWide ? "31%" : "48%" }]}>
            <View style={styles.placeholderBox}>
              <Image
                source={item.image}
                style={styles.projectImage}
                resizeMode="cover"
              />
            </View>
            <Text style={styles.projectName}>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
}

function createStyles(theme: ThemeColors) {
  return StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: theme.background,
    },
    content: {
      padding: 12,
      paddingBottom: 20,
    },
    headerCard: {
      backgroundColor: theme.headerCard,
      borderRadius: 12,
      padding: 12,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: theme.border,
    },
    kicker: {
      color: theme.secondaryText,
      fontSize: 10,
      fontWeight: "700",
      marginBottom: 4,
    },
    title: {
      color: theme.primaryText,
      fontSize: 32,
      fontWeight: "700",
    },
    subtitle: {
      color: theme.secondaryText,
      marginTop: 6,
      fontSize: 13,
    },
    gridRow: {
      justifyContent: "space-between",
      marginBottom: 10,
    },
    projectTile: {
      backgroundColor: theme.card,
      borderRadius: 12,
      padding: 10,
      borderWidth: 1,
      borderColor: theme.border,
    },
    placeholderBox: {
      height: 140,
      borderRadius: 12,
      backgroundColor: theme.placeholder,
      overflow: "hidden",
      marginBottom: 8,
    },
    projectImage: {
      width: "100%",
      height: "100%",
    },
    projectName: {
      fontSize: 18,
      lineHeight: 20,
      fontWeight: "600",
      color: theme.primaryText,
    },
  });
}
