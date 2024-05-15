import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React from "react";
import { categoryData } from "../constants";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

export default function Categories({
  activeCategory,
  handleCategoryChange,
  category,
}) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="space-x-4"
      contentContainerStyle={{ paddingHorizontal: 15 }}
    >
      {category?.map((cat, index) => {
        let isActive = cat.strCategory === activeCategory;
        let activeBtn = isActive ? "bg-[#f64e32]" : "bg-black/10";
        return (
          <TouchableOpacity
            key={index}
            className="flex-1 items-center space-y-1"
            onPress={() => handleCategoryChange(cat?.strCategory)}
          >
            <View className={"rounded-xl p-[6px] " + activeBtn}>
              <Image
                source={{ uri: cat.strCategoryThumb }}
                style={{ width: hp(6), height: hp(6) }}
                className="rounded-full"
              />
            </View>
              <Text className="text-neutral-800" style={{ fontSize: hp(1.6) }}>
                {cat?.strCategory}
              </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}
