import React from "react";
import { TouchableOpacity, Image, StyleSheet } from "react-native";

interface HeaderMenuProps {
  onMenuPress: () => void;
  imageStyle?: {
    width: number;
    height: number;
    marginRight?: number;
  };
}

const HeaderMenu: React.FC<HeaderMenuProps> = ({ onMenuPress, imageStyle }) => {
  return (
    <TouchableOpacity onPress={onMenuPress}>
      <Image
        source={require("./../assets/3-pontos.png")}
        style={[styles.image, imageStyle]}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
});

export default HeaderMenu;
