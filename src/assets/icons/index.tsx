import React from "react";
import { View } from "react-native";
import {
  MaterialIcons,
  Feather,
  FontAwesome,
  AntDesign,
} from "@expo/vector-icons";

export function Bag() {
  return (
    <View>
      <Feather name="shopping-bag" size={24} color="black" />
    </View>
  );
}

export function Search() {
  return (
    <View>
      <Feather name="search" size={24} color="black" />
    </View>
  );
}

export function Heart({ fill }: { fill: boolean }) {
  return (
    <View>
      <FontAwesome
        name={fill ? "heart" : "heart-o"}
        size={24}
        color={fill ? "#C473FF" : "black"}
      />
    </View>
  );
}

export function Profile() {
  return (
    <View>
      <Feather name="user" size={24} color="black" />
    </View>
  );
}

export function FilterIcon() {
  return (
    <View>
      <Feather name="filter" size={24} color="black" />
    </View>
  );
}

export const PurpleHeartIcon = ({ fill }: { fill: boolean }) => (
  <View>
    <FontAwesome
      name={fill ? "heart" : "heart-o"}
      size={24}
      color={fill ? "#C473FF" : "black"}
    />
  </View>
);

export const PurpleShareIcon = () => (
  <View>
    <Feather name="share" size={24} color="#C473FF" />
  </View>
);

export const CoinIcon = () => (
  <View>
    <MaterialIcons name="attach-money" size={24} color="#FFD100" />
  </View>
);

export const BusIcon = () => (
  <View>
    <MaterialIcons name="directions-bus" size={24} color="#1C1B1F" />
  </View>
);

export const AllInboxIcon = () => (
  <View>
    <MaterialIcons name="all-inbox" size={24} color="#1C1B1F" />
  </View>
);

export function GoogleIcon() {
  return (
    <View>
      <AntDesign name="google" size={24} color="black" />
    </View>
  );
}

export function Hamburger() {
  return (
    <View>
      <Feather name="menu" size={24} color="black" />
    </View>
  );
}

export const Category = () => (
  <View>
    <Feather name="grid" size={24} color="#484C52" />
  </View>
);
