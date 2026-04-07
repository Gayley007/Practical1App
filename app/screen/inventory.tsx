import React from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { ThemeColors, useThemeContext } from "../theme/Theme";

type YarnItem = {
  id: string;
  type: string;
  color: string;
  quantity: number;
};

const starterItems: YarnItem[] = [
  { id: "1", type: "Cotton", color: "Sage Green", quantity: 2 },
  { id: "2", type: "Acrylic", color: "Mustard", quantity: 3 },
  { id: "3", type: "Wool", color: "Cream", quantity: 1 },
];

const extraItems: YarnItem[] = [
  { id: "x1", type: "Wool", color: "Dusty Pink", quantity: 2 },
  { id: "x2", type: "Cotton", color: "Sky Blue", quantity: 2 },
  { id: "x3", type: "Acrylic", color: "Charcoal", quantity: 3 },
];

export default function Inventory() {
  const { isDark, theme, toggleTheme } = useThemeContext();
  const [inventory, setInventory] = React.useState<YarnItem[]>(starterItems);
  const [extraIndex, setExtraIndex] = React.useState(0);

  const totalSkeins = inventory.reduce((sum, item) => sum + item.quantity, 0);

  // Adds one sample item so the FlatList can be tested quickly.
  const addSampleYarn = () => {
    const nextItem = extraItems[extraIndex % extraItems.length];

    setInventory((prev) => [
      { ...nextItem, id: `${nextItem.id}-${Date.now()}` },
      ...prev,
    ]);
    setExtraIndex((prev) => prev + 1);
  };

  const styles = createStyles(theme);

  return (
    <View style={styles.screen}>
      <FlatList
        data={inventory}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.content}
        // Top section shown before the list items.
        ListHeaderComponent={
          <>
            <View style={styles.headerCard}>
              <Text style={styles.kicker}>YARN STASH</Text>
              <Text style={styles.title}>Yarn Inventory</Text>
              <Text style={styles.subtitle}>Simple yarn tracking.</Text>
            </View>

            <View style={styles.statsRow}>
              <View style={styles.statCard}>
                <Text style={styles.statLabel}>Yarn Types</Text>
                <Text style={styles.statValue}>{inventory.length}</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statLabel}>Total Skeins</Text>
                <Text style={styles.statValue}>{totalSkeins}</Text>
              </View>
            </View>

            <View style={styles.buttonRow}>
              <Pressable style={styles.button} onPress={addSampleYarn}>
                <Text style={styles.buttonText}>Add Sample Yarn</Text>
              </Pressable>
              <Pressable style={styles.button} onPress={toggleTheme}>
                <Text style={styles.buttonText}>
                  {isDark ? "Switch to Light Theme" : "Switch to Dark Theme"}
                </Text>
              </Pressable>
            </View>

            <Text style={styles.sectionTitle}>Current Stock</Text>
          </>
        }
        renderItem={({ item }) => (
          // One yarn card per item.
          <View style={styles.itemCard}>
            <Text style={styles.itemTitle}>{item.type}</Text>
            <Text style={styles.itemText}>Color: {item.color}</Text>
            <Text style={styles.itemText}>
              Quantity: {item.quantity} skeins
            </Text>
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
      marginBottom: 10,
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
      fontSize: 30,
      fontWeight: "700",
    },
    subtitle: {
      color: theme.secondaryText,
      marginTop: 6,
      fontSize: 13,
    },
    statsRow: {
      flexDirection: "row",
      gap: 8,
      marginBottom: 10,
    },
    statCard: {
      flex: 1,
      backgroundColor: theme.card,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: theme.border,
      padding: 10,
    },
    statLabel: {
      color: theme.secondaryText,
      fontSize: 12,
    },
    statValue: {
      color: theme.primaryText,
      fontWeight: "700",
      fontSize: 22,
      marginTop: 4,
    },
    buttonRow: {
      gap: 8,
      marginBottom: 10,
    },
    button: {
      backgroundColor: theme.buttonBg,
      borderRadius: 10,
      paddingVertical: 10,
      alignItems: "center",
    },
    buttonText: {
      color: theme.buttonText,
      fontWeight: "700",
      fontSize: 13,
    },
    sectionTitle: {
      color: theme.primaryText,
      fontWeight: "700",
      fontSize: 18,
      marginBottom: 8,
      marginTop: 4,
    },
    itemCard: {
      backgroundColor: theme.card,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: theme.border,
      padding: 10,
      marginBottom: 8,
    },
    itemTitle: {
      color: theme.primaryText,
      fontSize: 16,
      fontWeight: "700",
      marginBottom: 2,
    },
    itemText: {
      color: theme.secondaryText,
      fontSize: 13,
    },
  });
}
