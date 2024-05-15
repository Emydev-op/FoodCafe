import { View, Text } from "react-native";
import React from "react";
import RecipesCard from "./RecipesCard";
import { useNavigation } from "@react-navigation/native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import MasonryList from "@react-native-seoul/masonry-list";
import Loading from "./Loading";

export default function Recipes({ meals, category }) {
  const navigation = useNavigation();
  return (
    <View className="mx-4 space-y-4">
      <Text
        style={{ fontSize: hp(2) }}
        className="font-semibold text-neutral-600"
      >
        {meals?.length} Recipes
      </Text>
      <View>
        {meals?.length === 0 || category?.length === 0 ? (
          <Loading size="large" className="mt-20" />
        ) : (
          <MasonryList
            data={meals}
            keyExtractor={(item) => item?.idMeal}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, i }) => (
              <RecipesCard items={item} index={i} navigation={navigation} />
            )}
            onEndReachedThreshold={0.1}
          />
        )}
      </View>
    </View>
  );
}
