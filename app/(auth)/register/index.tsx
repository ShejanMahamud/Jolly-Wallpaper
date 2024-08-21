import FormField from "@/components/FormField";
import PrimaryButton from "@/components/PrimaryButton";
import auth from "@/config/firebase.config";
import images from "@/constants/images";
import useAuth from "@/hooks/useAuth";
import { router } from "expo-router";
import { updateProfile } from "firebase/auth";
import { useToast } from "native-base";
import React, { useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Register = () => {
  const toast = useToast();
  const { emailPasswordRegister } = useAuth();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleRegister = async () => {
    try {
      const email = form.email;
      const password = form.password;
      const res = await emailPasswordRegister(email, password);
      if (res?.user) {
        updateProfile(auth.currentUser, {
          displayName: form.username,
        });
        setTimeout(() => {
          router.push("/home");
        }, 1000);
      }
    } catch (error) {
      // console.log(error);
      toast.show({
        description: "Something Went Wrong!",
      });
    }
  };

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
            handlePress={handleRegister}
            textStyles={" text-xl"}
          />
          <Text className="text-gray-100 font-pregular text-base mt-5 text-center">
            Already have an account?{" "}
            <Text
              onPress={() => router.push("/home")}
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
