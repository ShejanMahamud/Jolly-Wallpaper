import FormField from "@/components/FormField";
import { uploadImage } from "@/components/ImageUpload";
import Loader from "@/components/Loader";
import PrimaryButton from "@/components/PrimaryButton";
import { useEditUserMutation, useGetUserQuery } from "@/redux/api/authApi";
import { clearUser } from "@/redux/features/auth/authSlice";
import * as ImagePicker from "expo-image-picker";
import { useToast } from "native-base";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Delete from "react-native-vector-icons/AntDesign";
import Edit from "react-native-vector-icons/EvilIcons";
import { useDispatch } from "react-redux";

const Profile = () => {
  const toast = useToast();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [editable, setEditable] = useState(false);
  const {
    data: user,
    isSuccess: userLoading,
    error: userError,
  } = useGetUserQuery();
  const [editUser] = useEditUserMutation();

  const [form, setForm] = useState({
    name: user?.name,
    photo: user?.photo,
  });
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setLoading(true);
      try {
        const url = await uploadImage(result.assets[0].uri);
        setForm({
          ...form,
          photo: url,
        });
      } catch (error) {
        toast.show({
          description: "Error uploading image. Please try again.",
        });
      } finally {
        setLoading(false);
      }
    }
  };
  const UpdateProfile = async () => {
    try {
      setLoading(true);
      const userInfo = { name: form.name, photo: form.photo };
      const res = await editUser({
        user: userInfo,
        email: user?.email,
      }).unwrap();
      if (res?.success) {
        setLoading(false);
        toast.show({
          description: "Successfully Updated!",
        });
        setEditable(false);
      }
    } catch (error) {
      toast.show({
        description: error.message,
      });
    }
  };

  const handleLogout = async () => {
    try {
      dispatch(clearUser());
      toast.show({
        description: "Successfully Logged Out!",
      });
    } catch (error) {
      toast.show({
        description: "Something Went Wrong!",
      });
    }
  };

  if (!userLoading || userError) {
    return <Loader />;
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View className="w-full flex justify-center items-center h-full px-6 my-6">
          <View className="relative">
            {loading && (
              <View className="absolute top-0 left-0 right-0 bottom-0 justify-center items-center bg-black opacity-50">
                <ActivityIndicator size="large" color="#FF9C01" />
              </View>
            )}
            <Image
              source={{ uri: form?.photo ? form?.photo : user?.photoURL }}
              resizeMode="cover"
              className="w-28 h-28 rounded-full object-cover border border-secondary"
            />
            {form?.photo !== user?.photoURL ||
              (!form?.photo && (
                <TouchableOpacity
                  onPress={() =>
                    setForm({
                      ...form,
                      photo: "",
                    })
                  }
                  className="absolute top-2 right-0"
                >
                  <Delete name="delete" size={20} color={"#dc2626"} />
                </TouchableOpacity>
              ))}
            {editable && (
              <TouchableOpacity
                onPress={pickImage}
                className="absolute top-2 right-0"
              >
                <Edit name="pencil" size={35} color={"#FF9C01"} />
              </TouchableOpacity>
            )}
          </View>
          <Text className="text-2xl font-psemibold text-white mt-2">
            {user?.displayName}
          </Text>
          <FormField
            editable={editable ? true : false}
            defaultValue={user?.displayName}
            handleChangeText={(e) =>
              setForm({
                ...form,
                name: e,
              })
            }
          />
          <PrimaryButton
            containerStyles={`${
              editable ? "bg-green-600 " : "bg-blue-600"
            } mt-5 w-full`}
            textStyles={"text-white"}
            title={editable ? "Save Profile" : "Edit Profile"}
            handlePress={() => (editable ? UpdateProfile() : setEditable(true))}
            isLoading={loading}
          />
          {editable && (
            <PrimaryButton
              handlePress={() => setEditable(false)}
              containerStyles={"bg-red-600 mt-5 w-full"}
              textStyles={"text-white"}
              title={"Cancel"}
            />
          )}
          {!editable && (
            <PrimaryButton
              handlePress={() => handleLogout()}
              containerStyles={"bg-red-600 mt-5 w-full"}
              textStyles={"text-white"}
              title={"Logout"}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
