import { View, Text, StyleSheet } from "react-native";
import Orders from "../ui/Profile/Orders";
import PersonalInformation from "../ui/Profile/PersonalInformation";
import { SafeAreaView } from "react-native-safe-area-context";
import TabsLayout from "../ui/Layout/Tabs";
import NavBarMobile from "../ui/Layout/mobile/NavBarMobile";

const tabs = [
  {
    label: "Personal Infromation",
    key: "1",
    children: (
      <PersonalInformation
        dark={true}
        required={{ email: "false", phone: "false" }}
      />
    ),
  },
  {
    label: "Order History",
    key: "2",
    children: <Orders />,
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabContainer: {
    paddingHorizontal: 16,
  },
});

export default function Profile({ select = 0 }) {
  return (
    <SafeAreaView style={styles.container}>
      <NavBarMobile />
      <View style={styles.tabContainer}>
        <TabsLayout />
      </View>
    </SafeAreaView>
  );
}
