import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

const Loader = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#FF9F43" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#161622",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Loader;
