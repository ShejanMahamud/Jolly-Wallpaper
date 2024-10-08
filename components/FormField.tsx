import Icons from "@/constants/Icons";
import React, { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";

const FormField = ({
  title,
  value,
  editable,
  defaultValue,
  placeholder,
  handleChangeText,
  otherStyles,
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      {title !== "Search" && (
        <Text className={"text-base font-pmedium text-gray-100"}>{title}</Text>
      )}
      <View className="w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary flex flex-row items-center">
        <TextInput
          className="flex-1 text-white font-pmedium text-base"
          value={value}
          placeholder={placeholder}
          onChangeText={handleChangeText}
          placeholderTextColor={"#7B7B8B"}
          secureTextEntry={title === "Password" && !showPassword}
          cursorColor={"#FF9C01"}
          editable={editable}
          defaultValue={defaultValue}
          {...(title === "Email" && { keyboardType: "email-address" })}
        />
        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? Icons.eye : Icons.eyeHide}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
        {title === "Search" && (
          <TouchableOpacity>
            <Image
              source={Icons.search}
              resizeMode="contain"
              className="w-6 h-6"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
