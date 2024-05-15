import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useRef } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { StatusBar } from "expo-status-bar";
import LottieView from "lottie-react-native";
import Animated from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";

export default function WelcomeScreen() {
  const animation = useRef(null);
  const navigation = useNavigation();
  return (
    <View className="bg-[#f64e32] flex-1 justify-center items-center space-y-10 relative">
      <Image
        source={require("../../assets/images/bg1.png")}
        style={{
          position: "absolute",
          width: wp(100),
          height: hp(100),
          opacity: 0.1,
        }}
      />
      <LottieView
        autoPlay
        // ref={animation}
        loop
        style={{ width: 300, height: 300 }}
        source={require("../../assets/lottie/food2.json")}
      />
      {/* Title and SUbtitle */}
      <View className="flex items-center space-y-2">
        <Text
          className="text-white font-extrabold tracking-widest"
          style={{ fontSize: hp(5) }}
        >
          Food Cafe
        </Text>
        <Text
          className="text-white tracking-widest font-medium"
          style={{ fontSize: hp(2.5) }}
        >
          Explore some delicious food
        </Text>
      </View>
      <View>
        <TouchableOpacity
          className=""
          style={{
            backgroundColor: "#fff",
            paddingVertical: hp(1.5),
            paddingHorizontal: hp(5),
            borderRadius: hp(1.5),
          }}
          onPress={() => navigation.navigate("Home")}
        >
          <Text
            style={{ color: "#f64e32", fontSize: hp(2.2), fontWeight: "medium" }}
          >
            Get Started
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
