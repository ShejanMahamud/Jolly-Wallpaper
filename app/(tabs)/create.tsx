import FormField from "@/components/FormField";
import Icons from "@/constants/Icons";
import { Picker } from "@react-native-picker/picker";
import { ScrollView } from "native-base";
import React from "react";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Create = () => {
  const categories = ["Nature", "Beauty", "Water"];

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View className="my-6 px-4 space-y-6 flex-1 justify-start">
          <Text className="text-white font-psemibold text-2xl">
            Upload Wallpaper
          </Text>

          <FormField
            title={"Wallpaper Title"}
            placeholder={"Wallpaper name"}
            otherStyles={"mt-10"}
          />
          <View className="mt-7 space-y-2">
            <Text className="text-base text-gray-100 font-pmedium">
              Wallpaper Category
            </Text>
            <View className="w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 flex justify-center items-center flex-row space-x-2">
              <Picker
                selectionColor={"#FF9C01"}
                style={{ flex: 1, color: "white" }}
              >
                {categories.map((category) => (
                  <Picker.Item label={category} value={category} />
                ))}
              </Picker>
            </View>
          </View>
          <View className="mt-7 space-y-2">
            <Text className="text-base text-gray-100 font-pmedium">
              Thumbnail Image
            </Text>
            <View className="w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 flex justify-center items-center flex-row space-x-2">
              <Image
                source={Icons.upload}
                resizeMode="contain"
                className="w-5 h-5"
              />
              <Text className="text-sm text-gray-100 font-pmedium">
                Choose a file
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
