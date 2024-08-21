import Loader from "@/components/Loader";
import PrimaryButton from "@/components/PrimaryButton";
import useAuth from "@/hooks/useAuth";
import { router } from "expo-router";
import { useToast } from "native-base";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  const toast = useToast();
  const { user, loading, logOut } = useAuth();
  const handleLogout = async () => {
    try {
      await logOut();
      toast.show({
        description: "Successfully Logged Out!",
      });
    } catch (error) {
      //    setTimeout(() => {
      //     router.push("/home");
      //   }, 1000);

      toast.show({
        description: "Something Went Wrong!",
      });
    }
  };
  if (!user) {
    return router.replace("/login");
  }

  if (loading) {
    return <Loader />;
  }
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View className="flex items-center justify-center flex-1">
          <Text className="font-psemibold text-3xl text-white">
            Hi, {user?.displayName}
          </Text>

          <PrimaryButton
            title={"Log Out"}
            containerStyles={"w-[90%] mt-5"}
            handlePress={handleLogout}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
