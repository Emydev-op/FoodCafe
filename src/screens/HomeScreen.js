import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Image,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
} from "react-native-heroicons/outline";
import { StatusBar } from "expo-status-bar";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import Categories from "../components/Categories";
import axios from "axios";
import Recipes from "../components/Recipes";

export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState("Beef");
  const [category, setCategory] = useState([]);
  const [meals, setMeals] = useState([]);

  const getCategories = async () => {
    try {
      const res = await axios.get(
        "https://www.themealdb.com/api/json/v1/1/categories.php"
      );
      if (res.data && res) {
        setCategory(res.data.categories);
      }
    } catch (error) {
      console.log(error, "Unable to fetch category data");
    }
  };

  const getRecipes = async (category = "Beef") => {
    try {
      const res = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
      );
      if (res && res?.data) {
        setMeals(res?.data?.meals);    
      }
    } catch (error) {
      console.log(error?.message, "Unable to fetch recipes data");
    }
  };

  useEffect(() => {
    getRecipes();
    getCategories();
  }, []);

  const handleCategoryChange = (category) => {
    getRecipes(category);
    setActiveCategory(category);
    setMeals([]);
  };

  return (
    <View className="flex-1 bg-white">
      <StatusBar style="dark" />
      <SafeAreaView>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 50 }}
          className="pt-14 space-y-6"
        >
          <View className="mx-4 flex-row justify-between items-center">
            <AdjustmentsHorizontalIcon size={hp(4)} color="gray" />
            <Image
              source={require("../../assets/images/User.png")}
              style={{ width: hp(5), height: hp(5) }}
              resizeMode="cover"
            />
          </View>

          {/* Headlines */}
          <View className="mx-4 space-y-1 mb-2">
            <View>
              <Text
                style={{ fontSize: hp(3.5) }}
                className="font-bold text-neutral-800"
              >
                Fast & Delicious
              </Text>
            </View>
            <Text
              style={{ fontSize: hp(3.5) }}
              className="font-extrabold text-neutral-800"
            >
              Food You <Text className="text-[#f64e32]">Love</Text>
            </Text>
          </View>
          {/* Search Bar */}
          <View className="mx-4 flex-row items-center border rounded-xl border-black p-[6px]">
            <View className="bg-white rounded-full p-2">
              <MagnifyingGlassIcon
                size={hp(2.5)}
                color="gray"
                strokeWidth={3}
              />
            </View>
            <TextInput
              placeholder="Search Your favourite Food"
              placeholderTextColor={"gray"}
              style={{ fontSize: hp(1.7) }}
              className="flex-1 text-base mb-1 pl-1 tracking-widest"
            />
          </View>

          {/* Categories */}
          <View>
            {category?.length > 0 && (
              <Categories
                activeCategory={activeCategory}
                category={category}
                handleCategoryChange={handleCategoryChange}
              />
            )}
          </View>

          {/* Recipes */}
          <View>
            <Recipes meals={meals} category={category} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
