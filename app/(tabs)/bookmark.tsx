import { ScrollView } from "native-base";
import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Bookmark = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View>
          <Text>BookMark</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Bookmark;
