import PrimaryButton from "@/components/PrimaryButton";
import images from "@/constants/images";
import { router } from "expo-router";
import React from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View className="w-full flex justify-center items-center min-h-screen px-4">
          <View>
            <Image
              source={images.logo}
              className="w-[130px] h-[84px]"
              resizeMode="contain"
            />
          </View>
          <Image
            source={images.card}
            className="max-w-[380px] w-full h-[298px]"
            resizeMode="contain"
          />
          <View className="relative">
            <Text className="text-white font-pbold text-4xl text-center leading-[60px]">
              Discover Endless Possibilities with{" "}
              <Text className="text-secondary">Aora</Text>
            </Text>
            <Image
              source={images.path}
              resizeMode="contain"
              className="w-[136px] h-[15px] absolute -right-7 bottom-1"
            />
          </View>
          <Text className="text-gray-100 font-pregular mt-2 text-center text-base">
            Where Creativity Meets Innovation: Embark on a Journey of Limitless
            Exploration with Aora
          </Text>
          <PrimaryButton
            title="Continue with Email"
            handlePress={() => router.push("/register")}
            containerStyles="w-[90%] mt-5"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
