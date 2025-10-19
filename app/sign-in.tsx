import icons from "@/constants/icons";
import images from "@/constants/images";
import { login } from "@/lib/appwrite";
import { useGlobalContext } from "@/lib/global-provider";
import { Redirect } from "expo-router";
import React from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const signIn = () => {
  const { refetch, isLogged, loading, user } = useGlobalContext();

  // if (!loading && !isLogged) {
  //   return <Redirect href={"/"} />;
  // }
  const handleLogin = async () => {
    const result = await login();
    if (result) {
      refetch();
      console.log("login sucessfull");
    } else {
      console.log("login failed");
      Alert.alert("failted to login");
    }
  };

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView contentContainerClassName="h-full">
        <Image
          source={images.onboarding}
          className="w-full h-4/6"
          resizeMode="contain"
        />
        <View className="px-10">
          <Text className="text-base text-center uppercase font-rubik text-black-200">
            Welcome To ReState
          </Text>
          <Text className="text-3xl font-rubikBold text-black-300 text-center mt-2">
            Let's Get You Closer to {"\n"}
            <Text className="text-primary-300">Your Ideal Home</Text>
            {"\n"}
            <Text className="text-lg font-rubik text-black-200 text-center mt-12">
              Login to ReState with Google
            </Text>
          </Text>

          <TouchableOpacity
            onPress={handleLogin}
            className="bg-white shadow-md shadow-zinc-300 rounded-full w-full py-4 mt-5"
          >
            <View className="flex flex-row items-center justify-center">
              <Image
                source={icons.google}
                className="w-5 h-5"
                resizeMode="contain"
              />
              <Text className="text-lg font-rubikMedium text-black-300 ml-2">
                Continue with Google
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default signIn;
