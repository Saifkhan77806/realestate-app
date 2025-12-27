import { categories } from "@/constants/data";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity } from "react-native";

const Filters = () => {
  const params = useLocalSearchParams<{ filter?: string }>();
  const [selectCategory, setSelectCategory] = useState(params.filter || "All");

  const handleCategoryPress = (category: string) => {
    if (selectCategory === category) {
      setSelectCategory("All");
      router.setParams({ filter: "All" });
      return;
    }

    setSelectCategory(category);
    router.setParams({ filter: category });
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="mt-3 mb-2"
    >
      {categories.map((item, index) => (
        <TouchableOpacity
          onPress={() => handleCategoryPress(item.category)}
          className={`flex flex-col items-start rounded-full mr-4 px-4 py-2 ${selectCategory === item.category ? "bg-primary-300" : "bg-primary-100 border border-primary-200"}`}
        >
          <Text
            className={`text-sm ${selectCategory === item.category ? "text-white font-rubikBold" : "text-black-300 font-rubik"}`}
          >
            {item.title}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default Filters;
