import { GColors } from "@/src/constants/GStyles";
import { useProductDescriptionContext } from "@/src/context/ProductDescriptionContext";
import { useToast } from "@/src/hooks/AntdMessageHooks";
import { postVarsadaBag } from "@/src/hooks/mutations";
import { useBagStore } from "@/src/store/useStore";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

interface ProductCheckOutCardProps {
  img: string;
  selectedSize: string;
  title: string;
  quantity?: number;
  color: string;
  price: number;
  sizes: string[];
  productId: number;
  colorId: string;
}

const ProductCheckOutCard: React.FC<ProductCheckOutCardProps> = ({
  img,
  selectedSize,
  title,
  color,
  price,
  sizes,
  productId,
  colorId,
}) => {
  const { setSelectedSize, setSelectedColorId } =
    useProductDescriptionContext();
  const { success, error, warning } = useToast();
  const { selectedBagIdsStore, setSelectedBagIdsStore } = useBagStore();
  const [isAddTBagLoading, setIsAddTBagLoading] = useState(false);

  //mutation for adding to bag
  const { mutate: addTObag } = useMutation({
    mutationFn: postVarsadaBag,
    onSuccess: () => {
      success("Added to bag");
      setIsAddTBagLoading(false);
    },
    onError: () => {
      error("Failed to add in bag.");
      setIsAddTBagLoading(false);
    },
  });

  const addToBagHandler = async () => {
    setIsAddTBagLoading(true);
    addTObag({
      productId: `${productId}`,
      selectedSizeId: selectedSize,
      selectedColorId: colorId,
      quantity: 1,
    });
    if (productId) {
      setSelectedBagIdsStore([...selectedBagIdsStore, `${productId}`]);
    }
  };

  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity
        style={styles.checkboxContainer}
        onPress={addToBagHandler}
      >
        <View>
          <View
            style={[
              styles.checkboxBase,
              // selectedBagIdsStore.includes(`${productId}`)
            ]}
          >
            {selectedBagIdsStore.includes(`${productId}`) && (
              <View style={styles.checkboxInner} />
            )}
          </View>
        </View>
      </TouchableOpacity>
      <View style={styles.imageContainer}>
        <Image source={{ uri: img }} style={styles.image} resizeMode="cover" />
        {/* Offer Badge */}
        <View style={styles.offerBadge}>
          <Text style={styles.offerText}>45% OFF</Text>
        </View>
        {/* Heart Icon (replace with your heart icon component) */}
        <TouchableOpacity style={styles.heartIconContainer}>
          <Text style={styles.heartIcon}>♥</Text>
        </TouchableOpacity>
      </View>

      {/* Product details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.sizeText}>Size: {selectedSize}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.originalPrice}>₹{price * 2.2}</Text>
          <Text style={styles.discountedPrice}>₹{price}</Text>
        </View>

        {/* Color and size indicators */}
        <View style={styles.colorSizeIndicators}>
          {/* Color indicator (replace with actual color logic) */}
          {/* Color indicator (replace with actual color logic) */}
          <TouchableOpacity
            style={[styles.colorIndicator, { backgroundColor: color }]}
            onPress={() => {
              setSelectedColorId(colorId);
            }}
          ></TouchableOpacity>
          <TouchableOpacity
            style={[styles.colorIndicator, { backgroundColor: color }]}
            onPress={() => {
              setSelectedColorId(colorId);
            }}
          ></TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    width: "100%",
  },
  imageContainer: {
    position: "relative",
  },
  offerBadge: {
    position: "absolute",
    top: 8,
    left: 8,
    backgroundColor: GColors.primary,
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 5,
  },
  offerText: {
    color: "white",
    fontSize: 10,
  },
  heartIconContainer: {
    position: "absolute",
    top: 8,
    right: 8,
    padding: 5,
    borderRadius: 20,
  },
  heartIcon: {
    fontSize: 15,
    color: "black",
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 8,
  },
  detailsContainer: {
    marginLeft: 12,
    flex: 1,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: GColors.grey,
  },
  sizeText: {
    color: GColors.grey,
    fontSize: 12,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  originalPrice: {
    fontSize: 12,
    color: "#555",
    textDecorationLine: "line-through",
    marginRight: 4,
  },
  discountedPrice: {
    fontSize: 14,
    fontWeight: "bold",
    color: GColors.white,
  },

  colorSizeIndicators: {
    flexDirection: "row",
    alignItems: "center",
  },
  colorIndicator: {
    width: 20,
    height: 20,
    borderRadius: 5,
    marginRight: 5,
    borderColor: GColors.white,
    borderWidth: 1,
  },
  sizeIndicator: {
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 5,
    marginRight: 5,
    borderColor: GColors.grey,
    borderWidth: 1,
  },
  selectedSizeIndicator: {
    backgroundColor: GColors.grey,
  },
  selectedSizeText: {
    color: GColors.white,
  },

  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxBase: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderColor: GColors.primary,
    borderWidth: 1,
    marginRight: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxChecked: {
    backgroundColor: GColors.primary,
  },
  checkboxInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: GColors.white,
  },
});

export default ProductCheckOutCard;
