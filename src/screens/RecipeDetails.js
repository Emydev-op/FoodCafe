import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import {
  Chev,
  ChevronLeftIcon,
  ChevronLeftIconronLeftIcon,
  HeartIcon,
} from "react-native-heroicons/outline";
import Loading from "../components/Loading";

export default function RecipeDetails(props) {
  let item = props?.route.params;
  console.log(item);
  const navigation = useNavigation();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isFavourite, setIsFavourite] = useState(false);

  useEffect(() => {
    getMealData(item?.idMeal);
  }, []);
  const getMealData = async (id) => {
    try {
     await setLoading(true);
    //   const res = await axios.get(
    //     `www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    //   );
    const res = await axios.get(
      `www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    ); 
      console.log(res, "res")
      if (res && res?.data) {
        setMeal(res?.data?.meals[0]);
        setLoading(false);
    }
} catch (error) {
        setLoading(false);
      console.log(error, "Unable to fetch data");
    }
  };
  const ingredientsIndexes = (meal) => {
    if (!meal) return [];
    let indexes = [];
    for (let i = 1; i <= 20; index++) {
      if (meal["strIngredient" + i]) {
        indexes?.push(i);
      }
    }
  };
  return (
    <ScrollView
      className="flex-1"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 50 }}
    >
      <StatusBar style="light" />

      {/* Recipe image */}
      <View className="flex-row justify-center">
        <Image
          source={{ uri: item?.strMealThumb }}
          style={{ width: wp(100), height: hp(45) }}
        />
      </View>
      <View className="w-full absolute flex-row justify-between items-center pt-10">
        <TouchableOpacity
          className="p-2 rounded-full bg-white ml-5 justify-center items-center"
          onPress={() => navigation.goBack()}
        >
          <ChevronLeftIcon size={hp(3.5)} color={"#f64e32"} strokeWidth={3.5} />
        </TouchableOpacity>
        <TouchableOpacity
          className="p-2 rounded-full bg-white ml-5"
          onPress={() => setIsFavourite((prop) => !prop)}
        >
          <HeartIcon
            size={hp(3.5)}
            color={"#f64e32"}
            strokeWidth={2.5}
            fill={isFavourite ? "#f64e32" : "transparent"}
          />
        </TouchableOpacity>
      </View>
      {/* Meal description */}
      {loading ? (
        <Loading size="large" className="mt-16" />
      ) : (
        <View
          className="px-4 justify-between space-y-4 flex mt-[-46]"
          style={{
            borderTopLeftRadius: 50,
            borderTopRightRadius: 50,
            paddingTop: hp(3),
          }}
        >
            <View className="space-y-2 px-4">
                <Text className="font-bold text-neutral-700">{item?.strMeal}</Text>
            </View>
        </View>
      )}
      <Text>RecipeDetails</Text>
    </ScrollView>
  );
}
