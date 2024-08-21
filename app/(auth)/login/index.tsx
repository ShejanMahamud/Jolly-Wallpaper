import FormField from "@/components/FormField";
import PrimaryButton from "@/components/PrimaryButton";
import images from "@/constants/images";
import useAuth from "@/hooks/useAuth";
import { router } from "expo-router";
import { useToast } from "native-base";
import React, { useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const toast = useToast();
  const { emailPasswordLogin } = useAuth();

  const handleLogin = async () => {
    try {
      const email = form.email;
      const password = form.password;
      const res = await emailPasswordLogin(email, password);
      if (res?.user) {
        toast.show({
          description: "Successfully Logged In!",
        });
        setTimeout(() => {
          router.push("/home");
        }, 1000);
      }
    } catch (error) {
      toast.show({
        description: error.message,
      });
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full flex-1 justify-center px-6 my-6">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[34px]"
          />
          <Text className="font-psemibold text-2xl mt-10 text-white">
            Sign In
          </Text>

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
            placeholder={"*********"}
            value={form.password}
            otherStyles={"mt-10"}
          />

          <PrimaryButton
            title={"Sign In"}
            textStyles={"text-xl"}
            containerStyles={"mt-10"}
            handlePress={handleLogin}
          />

          <Text className="text-gray-100 font-pregular text-base mt-5 text-center">
            Not Registered?{" "}
            <Text
              onPress={() => router.push("/register")}
              className="text-secondary font-psemibold focus:underline underline-offset-4 decoration-secondary"
            >
              Sign Up
            </Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
