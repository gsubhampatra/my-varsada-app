// CategoryList.tsx
import { useCategoryTypeStore } from "@/src/store/useStore";
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";



interface categoryTypeProductData {
  status: string;
  categoryType: {
    id: number;
    type_name: string;
    categories: {
      id: number;
      category_name: string;
      products: {
        id: number;
        product_name: string;
        price: number;
        ProductColor: {
          medias: {
            url: string;
          }[];
        }[];
      }[];
    }[];
  }[];
}


const { height } = Dimensions.get("window");

const CategoryList = ({
  seletctedCategorytypeId,
  categoryType,
}: {
  seletctedCategorytypeId: number | null;
  categoryType: {
    id: number;
    type_name: string;
    categories: {
      id: number;
      category_name: string;
    }[];
  }[];
}) => {
  const [selectedCategoryTypeId, setSelectedCategoryTypeId] = useState<
    number | null
  >(seletctedCategorytypeId);

  // const { setProductForCategoryType, setIsLoading } = useCategoryTypeStore();


 

  return (
    <View style={styles.container}>
      {categoryType.map((category) => (
       <TouchableOpacity
       onPress={() => {
         setSelectedCategoryTypeId(category.id);
       }}
        key={category.id}
       style={[styles.category , selectedCategoryTypeId === category.id && styles.selectedCategory]}
     >
       <Text
         style={[styles.categoryText && styles.selectedCategoryText]}
       >
         {category.type_name}
       </Text>
     </TouchableOpacity>
      ))}
    </View>
  );
};

export default CategoryList;

const styles = StyleSheet.create({
  container: {
    width: 110,
    height: height - 80,
    backgroundColor: "rgba(248, 237, 235, 1)",
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  category: {
    paddingVertical: 10,
    paddingHorizontal: 4,
  },
  selectedCategory: {
    backgroundColor: "rgba(196, 115, 255, 0.2)",
  },
  categoryText: {
    fontSize: 16,
    color: "black",
    fontFamily: "Arial", // or your preferred font
  },
  selectedCategoryText: {
    fontWeight: "bold", // Add other styles for selection here
  },
});
