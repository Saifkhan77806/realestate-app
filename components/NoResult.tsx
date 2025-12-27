import images from "@/constants/images";
import React from "react";
import { Image, Text, View } from "react-native";

const NoResult = () => {
  return (
    <View className="flex itemcen my-5 ">
      <Image
        source={images.noResult}
        className="w-11/12 h-80"
        resizeMode="contain"
      />

      <Text className="text-2xl font-rubikBold text-black-300 mt-5">
        NoResult
      </Text>
      <Text className="text-base text-black-100 mt-2">
        We could not find any results.
      </Text>
    </View>
  );
};

export default NoResult;
