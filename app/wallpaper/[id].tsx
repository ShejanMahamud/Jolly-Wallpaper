import Loader from "@/components/Loader";
import PrimaryButton from "@/components/PrimaryButton";
import { useGetWallpaperQuery } from "@/redux/api/wallpaperApi";
import { BlurView } from "expo-blur";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Modal from "react-native-modal";
import { SafeAreaView } from "react-native-safe-area-context";
import WallPaperManager from "react-native-set-wallpaper";
import {
  default as Download,
  default as Heart,
} from "react-native-vector-icons/AntDesign";

const Wallpaper = () => {
  const { id } = useLocalSearchParams();
  const [open, setOpen] = useState(false);
  const [screen, setScreen] = useState(null);

  const {
    data: wallpaper,
    isSuccess: wallpaperLoading,
    error: wallpaperError,
  } = useGetWallpaperQuery({ id });

  const handleSetWallpaper = async (screenName) => {
    try {
      WallPaperManager.({
        uri: "https://example.com/wallpaper.jpg",
      })
        .then(() => console.log("Wallpaper set successfully"))
        .catch((error) => console.error("Failed to set wallpaper", error));
    } catch (error) {
      console.log(error);
    }
  };

  if (!wallpaperLoading || wallpaperError) {
    return <Loader />;
  }

  return (
    <SafeAreaView className={`h-full`}>
      <GestureHandlerRootView>
        <ImageBackground source={{ uri: wallpaper.data.wallpaper_url }}>
          <BlurView intensity={60} tint="dark">
            <ScrollView contentContainerStyle={{ height: "100%" }}>
              <View className="my-10 px-10 space-y-6 flex-1 justify-start relative">
                <Image
                  source={{ uri: wallpaper.data.wallpaper_url }}
                  resizeMode="cover"
                  className="w-full h-full rounded-3xl shadow-2xl"
                />
              </View>
              <View className="flex flex-row items-center justify-between w-full mb-5 px-5 relative">
                <TouchableOpacity className="bg-secondary p-3 rounded-full">
                  <Heart size={20} name="hearto" color={"#161622"} />
                </TouchableOpacity>
                <PrimaryButton
                  title={"Set as Wallpaper"}
                  containerStyles={"rounded-full px-10"}
                  handlePress={() => setOpen(!open)}
                />
                <Modal
                  isVisible={open}
                  onBackdropPress={() => setOpen(false)}
                  onBackButtonPress={() => setOpen(false)}
                  animationIn={"slideInUp"}
                  style={{ justifyContent: "flex-end" }}
                >
                  <View className=" bg-primary h-[200px] relative rounded-3xl justify-end px-4">
                    <TouchableOpacity
                      onPress={() => handleSetWallpaper("home")}
                      className="border border-secondary rounded-lg px-4 py-3 flex justify-center items-center w-full mb-3"
                    >
                      <Text className="text-secondary font-pmedium">
                        Home Scren
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleSetWallpaper("lock")}
                      className="border border-secondary rounded-lg px-4 py-3 flex justify-center items-center w-full mb-3"
                    >
                      <Text className="text-secondary font-pmedium">
                        Lock Scren
                      </Text>
                    </TouchableOpacity>
                    <PrimaryButton
                      title={"Cancel"}
                      handlePress={() => setOpen(false)}
                    />
                  </View>
                </Modal>
                <TouchableOpacity className="bg-secondary p-3 rounded-full">
                  <Download size={20} name="download" color={"#161622"} />
                </TouchableOpacity>
              </View>
            </ScrollView>
          </BlurView>
        </ImageBackground>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

export default Wallpaper;
