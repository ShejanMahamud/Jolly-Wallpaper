import Loader from "@/components/Loader";
import Icons from "@/constants/Icons";
import images from "@/constants/images";
import useAuth from "@/hooks/useAuth";
import { router } from "expo-router";
import { useToast } from "native-base";
import React from "react";
import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  const toast = useToast();
  const { user, loading, logOut } = useAuth();
  const handleLogout = async () => {
    try {
      await logOut();
      toast.show({
        description: "Successfully Logged Out!",
      });
    } catch (error) {
      toast.show({
        description: "Something Went Wrong!",
      });
    }
  };
  if (!user) {
    return router.replace("/login");
  }

  if (loading) {
    return <Loader />;
  }
  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
        keyExtractor={(item) => item}
        numColumns={2}
        renderItem={({ item }) => (
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              margin: 10,
              height: 300,
              borderRadius: 20,
              overflow: "hidden",
              backgroundColor: "white",
            }}
          >
            <Image
              source={images.image2}
              resizeMode="cover"
              className="w-full h-full object-cover"
            />
          </View>
        )}
        ListHeaderComponent={() => (
          <View className="flex my-6 px-4 space-y-6">
            <View className="flex justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome Back!
                </Text>
                <Text className="text-2xl font-psemibold text-white">
                  {user?.displayName}
                </Text>
              </View>
              <TouchableOpacity onPress={handleLogout}>
                <Image
                  source={Icons.logout}
                  resizeMode="contain"
                  className="w-6 h-6"
                />
              </TouchableOpacity>
            </View>
            <View className="w-full h-14 px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary flex flex-row items-center mb-5">
              <TextInput
                placeholder="Search Wallpaper..."
                className="flex-1 font-psemibold text-white"
                placeholderTextColor={"#7B7B8B"}
                cursorColor={"#FF9C01"}
              />
              <Image
                source={Icons.search}
                resizeMode="contain"
                className="w-5 h-5"
              />
            </View>
            <View>
              <Carousel
                width={Dimensions.get("window").width}
                height={Dimensions.get("window").width / 2}
                loop
                autoPlay={true}
                data={[...new Array(6).keys()]}
                scrollAnimationDuration={2000}
                snapEnabled={true}
                // mode="parallax"
                // modeConfig={{
                //   parallaxScrollingScale: 0.9,
                //   parallaxScrollingOffset: 50,
                // }}
                renderItem={({ item }) => (
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      marginRight: 10,
                      paddingRight: 25,
                    }}
                  >
                    <Image
                      source={images.image1}
                      resizeMode="cover"
                      className="w-full h-full object-cover rounded-2xl"
                    />
                  </View>
                )}
              />
            </View>
            <View className="flex flex-row justify-between mt-6">
              <Text className="text-gray-100 text-xl font-psemibold">
                Trending Category
              </Text>
              <Text className="text-sm font-pmedium text-secondary">
                See all
              </Text>
            </View>

            <ScrollView
              horizontal
              scrollEnabled
              contentContainerStyle={{
                justifyContent: "center",
                flexDirection: "row",
                gap: 30,
              }}
            >
              <View className="relative border-2 border-secondary/20 rounded-lg">
                <Image
                  source={images.cat1}
                  resizeMode="cover"
                  className="h-16 w-20 rounded-lg object-cover"
                />
                <View className="bg-black/30 h-16 w-20 rounded-lg absolute flex-1 items-center justify-center">
                  <Text className="text-white font-pmedium text-lg">
                    Abstract
                  </Text>
                </View>
              </View>
              <View className="relative border-2 border-secondary/20 rounded-lg">
                <Image
                  source={images.cat1}
                  resizeMode="cover"
                  className="h-16 w-20 rounded-lg object-cover"
                />
                <View className="bg-black/30 h-16 w-20 rounded-lg absolute flex-1 items-center justify-center">
                  <Text className="text-white font-pmedium text-lg">
                    Abstract
                  </Text>
                </View>
              </View>
              <View className="relative border-2 border-secondary/20 rounded-lg">
                <Image
                  source={images.cat1}
                  resizeMode="cover"
                  className="h-16 w-20 rounded-lg object-cover"
                />
                <View className="bg-black/30 h-16 w-20 rounded-lg absolute flex-1 items-center justify-center">
                  <Text className="text-white font-pmedium text-lg">
                    Abstract
                  </Text>
                </View>
              </View>
              <View className="relative border-2 border-secondary/20 rounded-lg">
                <Image
                  source={images.cat1}
                  resizeMode="cover"
                  className="h-16 w-20 rounded-lg object-cover"
                />
                <View className="bg-black/30 h-16 w-20 rounded-lg absolute flex-1 items-center justify-center">
                  <Text className="text-white font-pmedium text-lg">
                    Abstract
                  </Text>
                </View>
              </View>
            </ScrollView>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Home;
