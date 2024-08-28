import FormField from "@/components/FormField";
import { uploadImage } from "@/components/ImageUpload";
import PrimaryButton from "@/components/PrimaryButton";
import Icons from "@/constants/Icons";
import images from "@/constants/images";
import { useRegisterUserMutation } from "@/redux/api/authApi";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { useToast } from "native-base";
import React, { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/AntDesign";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [imageName, setImageName] = useState(null);
  const toast = useToast();
  const [registerUser] = useRegisterUserMutation();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    photo: "",
  });

  const handleRegister = async () => {
    try {
      const email = form.email;
      const password = form.password;
      const name = form.name;
      const photo = form.photo;
      const user = { email, password, name, photo };
      const res = await registerUser(user).unwrap();
      if (res?.success) {
        toast.show({
          description: "Successfully Registered!",
        });
        setTimeout(() => {
          router.push("/login");
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
        photo: url,
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
            handleChangeText={(e) => setForm({ ...form, name: e })}
            placeholder={"Your unique username"}
            value={form.name}
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
          {!form?.photo ? (
            <TouchableOpacity
              onPress={pickImage}
              className="w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 flex justify-center items-center flex-row space-x-2 mt-5"
            >
              <Image
                source={Icons.upload}
                resizeMode="contain"
                className="w-5 h-5"
              />
              <Text className="text-sm text-gray-100 font-pmedium">
                Choose a file
              </Text>
            </TouchableOpacity>
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
                    photo: "",
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
