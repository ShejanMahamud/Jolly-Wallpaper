import FormField from "@/components/FormField";
import { uploadImage } from "@/components/ImageUpload";
import PrimaryButton from "@/components/PrimaryButton";
import auth from "@/config/firebase.config";
import images from "@/constants/images";
import useAuth from "@/hooks/useAuth";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { updateProfile } from "firebase/auth";
import { useToast } from "native-base";
import React, { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/AntDesign";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [imageName, setImageName] = useState(null);
  const toast = useToast();
  const { emailPasswordRegister } = useAuth();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    image: "",
  });

  const handleRegister = async () => {
    try {
      const email = form.email;
      const password = form.password;
      const res = await emailPasswordRegister(email, password);
      if (res?.user) {
        updateProfile(auth.currentUser, {
          displayName: form.username,
          photoURL: form.image,
        });
        setTimeout(() => {
          router.push("/home");
        }, 1000);
      }
    } catch (error) {
      toast.show({
        description: "Something Went Wrong!",
      });
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageName(result.assets[0].fileName);
      setLoading(true);
      const url = await uploadImage(result.assets[0].uri);
      setForm({
        ...form,
        image: url,
      });
      setLoading(false);
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
            otherStyles={"mt-5"}
          />
          <FormField
            title={"Password"}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            placeholder={"*******"}
            value={form.password}
            otherStyles={"mt-5"}
          />
          {!form?.image ? (
            <PrimaryButton
              handlePress={pickImage}
              title={"Upload Image"}
              containerStyles={" mt-5 bg-transparent border border-secondary"}
              textStyles={"text-secondary"}
              isLoading={loading}
            />
          ) : (
            <View className="flex-row flex items-center justify-between mt-5">
              <Text className="text-gray-100">{`${imageName.slice(
                0,
                20
              )}....jpg`}</Text>
              <TouchableOpacity
                onPress={() =>
                  setForm({
                    ...form,
                    image: "",
                  })
                }
              >
                <Icon name="delete" size={20} color={"#FF9C01"} />
              </TouchableOpacity>
            </View>
          )}

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
