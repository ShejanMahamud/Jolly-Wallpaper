import Icons from "@/constants/Icons";
import { Tabs } from "expo-router";
import React from "react";
import { Image, Text, View } from "react-native";

const TabIcon = ({ icon, color, focused, title }) => {
  return (
    <View className="flex items-center gap-2 justify-center">
      <Image
        source={icon}
        resizeMode="contain"
        className="w-6 h-6"
        tintColor={color}
      />
      <Text
        className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`}
        style={{
          color: color,
        }}
      >
        {title}
      </Text>
    </View>
  );
};

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#FFA001",
        tabBarInactiveTintColor: "#CDCDE0",
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: "#232533",
          height: 64,
          backgroundColor: "#161622",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,

          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              title={"Home"}
              icon={Icons.home}
              focused={focused}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="create"
        options={{
          headerShown: false,
          title: "Create",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              title={"Create"}
              icon={Icons.plus}
              focused={focused}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="bookmark"
        options={{
          headerShown: false,
          title: "Bookmark",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              title={"Bookmark"}
              icon={Icons.bookmark}
              focused={focused}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              title={"Profile"}
              icon={Icons.profile}
              focused={focused}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
