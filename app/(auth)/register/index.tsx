import FormField from "@/components/FormField";
import PrimaryButton from "@/components/PrimaryButton";
import images from "@/constants/images";
import { router } from "expo-router";
import React, { useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Register = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full flex justify-center h-full px-6 my-6">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[34px]"
          />

          <Text className="font-psemibold text-2xl mt-10 text-white">
            Sign Up
          </Text>
          <FormField
            title={"Username"}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            placeholder={"Your unique username"}
            value={form.username}
            otherStyles={"mt-10"}
          />
          <FormField
            title={"Email"}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            placeholder={"Your email address"}
            value={form.email}
            otherStyles={"mt-10"}
            keyboardType={"email-address"}
          />
          <FormField
            title={"Password"}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            placeholder={"*******"}
            value={form.password}
            otherStyles={"mt-10"}
          />

          <PrimaryButton
            title={"Sign Up"}
            containerStyles={"mt-10"}
            handlePress={() => console.log("hi")}
            textStyles={" text-xl"}
          />
          <Text className="text-gray-100 font-pregular text-base mt-5 text-center">
            Already have an account?{" "}
            <Text
              onPress={() => router.push("/login")}
              className="text-secondary font-psemibold focus:underline underline-offset-4 decoration-secondary"
            >
              Login
            </Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Register;
