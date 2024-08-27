import FormField from "@/components/FormField";
import PrimaryButton from "@/components/PrimaryButton";
import images from "@/constants/images";
import { useLoginUserMutation } from "@/redux/api/authApi";
import { setUser } from "@/redux/features/auth/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useToast } from "native-base";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";

const Login = () => {
  const [token, setToken] = useState(null);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const [loginUser] = useLoginUserMutation();

  const toast = useToast();

  const handleLogin = async () => {
    console.log(process.env.EXPO_PUBLIC_SERVER_URL);
    try {
      const email = form.email;
      const password = form.password;
      const credentials = { email, password };
      const res = await loginUser(credentials).unwrap();
      console.log("Login response:", res); // Debugging line
      if (res?.success) {
        dispatch(setUser({ user: res.data, token: res.token }));
        toast.show({
          description: "Successfully Logged In!",
        });
        setTimeout(() => {
          router.push("/home");
        }, 1000);
      }
    } catch (error) {
      console.error("Login error:", error); // Debugging line
      toast.show({
        description: error.message || "An error occurred during login.",
      });
    }
  };

  useEffect(() => {
    const getToken = async () => {
      const token = await AsyncStorage.getItem("access-token");
      setToken(token);
    };
    getToken();
  }, []);

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
