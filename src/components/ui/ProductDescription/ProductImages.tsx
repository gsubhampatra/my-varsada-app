import { useQuery } from "@tanstack/react-query";
import {
  Image,
  ActivityIndicator,
  View,
  Text,
  ScrollView,
  StyleSheet,
} from "react-native";
import api from "../../../http/axiosconfig";
import { API_ROUTES } from "../../../kv";
import { useProductStore } from "../../../store/useStore";

type ProductMedia = {
  id: string;
  media_type: string;
  url: string;
  productColorId: number;
};

type ProductColorData = {
  medai: ProductMedia[];
};

async function fetchProductColor(
  productColorId: string
): Promise<ProductColorData> {
  const res = await api.get(API_ROUTES.MEDIA.GET_BY_ID + productColorId);
  return res.data;
}

export default function ProductImages() {
  const { selectedColorId } = useProductStore();
  const { data, isLoading, isError } = useQuery<ProductColorData>({
    queryKey: ["product_color_image", selectedColorId],
    queryFn: () => fetchProductColor(selectedColorId),
    enabled: !!selectedColorId,
  });

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Error fetching data</Text>
      </View>
    );
  }

  if (data?.medai.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No images found</Text>
      </View>
    );
  }

  if (data) {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}
      >
        {data.medai.map((item) => (
          <View key={item.id} style={styles.imageContainer}>
            <Image source={{ uri: item.url }} style={styles.image} />
          </View>
        ))}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    width: "100%",
    height: 570,
  },
  imageContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});
