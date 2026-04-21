import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import InventoryScreen from "../screen/inventory";
import WishlistScreen from "../screen/wishlist";
import { useThemeContext } from "../theme/Theme";

export type RootTabParamList = {
  Inventory: undefined;
  Wishlist: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function MainStackNavigator() {
  const insets = useSafeAreaInsets();
  const bottomSpace = Math.max(insets.bottom, 10);
  const { theme } = useThemeContext();

  return (
    <Tab.Navigator
      initialRouteName="Inventory"
      screenOptions={{
        // Shared style for header and tab bar.
        headerStyle: { backgroundColor: theme.card },
        headerTintColor: theme.primaryText,
        headerTitleStyle: { fontWeight: "700" },
        headerTitleAlign: "center",
        tabBarActiveTintColor: theme.buttonBg,
        tabBarInactiveTintColor: theme.secondaryText,
        tabBarStyle: {
          backgroundColor: theme.card,
          borderTopColor: theme.border,
          height: 56 + bottomSpace,
          paddingBottom: bottomSpace,
          paddingTop: 6,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
      }}
    >
      <Tab.Screen
        name="Inventory"
        component={InventoryScreen}
        options={{
          title: "Yarn Inventory",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cube-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Wishlist"
        component={WishlistScreen}
        options={{
          title: "Project Wishlist",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
