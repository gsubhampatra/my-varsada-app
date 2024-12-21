import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { GColors } from "@/src/constants/GStyles";

interface ProductHeadingProps {
  text: string;
}
const ProductHeading: React.FC<ProductHeadingProps> = React.memo(({ text }) => (
  <Text style={styles.heading}>{text}</Text>
));

interface ProductSizeProps {
  onSizeSelect?: (size: string) => void;
}

const ProductSize: React.FC<ProductSizeProps> = React.memo(
  ({ onSizeSelect }) => {
    const sizes = ["S", "M", "L", "XL", "XXL"];
    const [selectedSize, setSelectedSize] = useState<string>("S");

    const handleSelectSize = useCallback(
      (size: string) => {
        setSelectedSize(size);
        if (onSizeSelect) {
          onSizeSelect(size);
        }
      },
      [onSizeSelect]
    );

    return (
      <View style={styles.sizeContainer}>
        {sizes.map((size) => (
          <TouchableOpacity
            key={size}
            style={[
              styles.sizeButton,
              selectedSize === size && styles.sizeButtonSelected,
            ]}
            onPress={() => handleSelectSize(size)}
          >
            <Text style={styles.sizeText}>{size}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  }
);

// Define the color options
const colorOptions = [
  { id: "1", hex: "#FF7F50" }, // Coral
  { id: "2", hex: "#9400D3" }, // Purple
  { id: "3", hex: "#00FFFF" }, // Cyan
];

interface PinCodeBoxProps {
  onCheckPinCode: (pinCode: string) => void;
}
const PinCodeBox: React.FC<PinCodeBoxProps> = React.memo(
  ({ onCheckPinCode }) => {
    const [pinCode, setPinCode] = useState<string>("");

    const handlePinCodeChange = useCallback((text: string) => {
      setPinCode(text);
    }, []);

    const handleCheckPinCode = useCallback(() => {
      onCheckPinCode(pinCode);
    }, [onCheckPinCode, pinCode]);

    return (
      <View style={styles.pinCodeContainer}>
        <TextInput
          style={styles.pinCodeInput}
          placeholder="Enter the Pin-code to shop this"
          onChangeText={handlePinCodeChange}
          value={pinCode}
          keyboardType="number-pad"
        />
        <TouchableOpacity
          style={styles.pinCodeCheckButton}
          onPress={handleCheckPinCode}
        >
          <Text style={styles.pinCodeCheckButtonText}>Check</Text>
        </TouchableOpacity>
      </View>
    );
  }
);

interface DeliveryDetailsProps {}

const DeliveryDetails: React.FC<DeliveryDetailsProps> = React.memo(() => {
  return (
    <View style={styles.deliveryContainer}>
      <View style={styles.deliveryOption}>
        <View>
          <MaterialIcons name="local-shipping" size={24} color="black" />
        </View>
        <View>
          <Text style={styles.deliveryText}>Fast Delivery</Text>
          <Text style={styles.deliveryFreeText}>Free Shipping over ₹2,990</Text>
          <Text style={styles.deliveryInfoText}>
            Please select product size/color along with the pin - code to check
            availability of Fast Delivery at your location
          </Text>
        </View>
      </View>
      <View style={styles.deliveryOption}>
        <View>
          <MaterialIcons name="local-shipping" size={24} color="black" />
        </View>
        <View>
          <Text style={styles.deliveryText}>Standard Delivery</Text>
          <Text style={styles.deliveryFreeText}>Free Shipping over ₹2,990</Text>
          <Text style={styles.deliveryInfoText}>
            Please select product size/color along with the pin - code to check
            availability of Fast Delivery at your location
          </Text>
        </View>
      </View>
    </View>
  );
});

interface ProductDetailsProps {
  onSizeSelect: (size: string) => void;
  onColorSelect: (colorId: string) => void;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({
  onSizeSelect,
  onColorSelect,
}) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedColor, setSelectedColor] = useState<string>(
    colorOptions[0].id
  );

  const handleColorSelect = useCallback(
    (colorId: string) => {
      setSelectedColor(colorId);
      onColorSelect(colorId);
    },
    [onColorSelect]
  );

  const handleCheckPinCode = useCallback((pinCode: string) => {
    // Implement pin code check logic here
    alert(`Checking pin code: ${pinCode}`);
  }, []);
  const handleQuantityChange = useCallback((newQuantity: number) => {
    setQuantity(newQuantity);
  }, []);

  return (
    <View style={styles.container}>
      <ProductHeading text="Colored Crop Top" />

      <Text style={styles.price}>₹230.00</Text>

      <Text style={styles.header}>Size</Text>
      <ProductSize onSizeSelect={onSizeSelect} />

      <Text style={styles.header}>Color</Text>
      <View style={styles.colorContainer}>
        {colorOptions.map((color) => (
          <TouchableOpacity
            key={color.id}
            style={[
              styles.colorOption,
              { backgroundColor: color.hex },
              selectedColor === color.id && styles.colorOptionSelected,
            ]}
            onPress={() => handleColorSelect(color.id)}
          />
        ))}
      </View>

      <Text style={styles.stockAlert}>
        Only 5 stocks is left for out of delivery
      </Text>

      <Text style={styles.header}>Quantity</Text>
      <View style={styles.quantityContainer}>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => {
            if (quantity > 1) handleQuantityChange(quantity - 1);
          }}
        >
          <Text style={styles.quantityButtonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantityText}>{quantity}</Text>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => {
            if (quantity < 5) handleQuantityChange(quantity + 1);
          }}
        >
          <Text style={styles.quantityButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      <PinCodeBox onCheckPinCode={handleCheckPinCode} />
      <DeliveryDetails />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    width: "100%",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  header: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  price: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  sizeContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 10,
    marginBottom: 16,
  },
  sizeButton: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 5,
  },
  sizeButtonSelected: {
    backgroundColor: GColors.primary,
  },
  sizeText: {
    fontSize: 16,
  },
  colorContainer: {
    flexDirection: "row",
    marginBottom: 16,
    gap: 10,
  },
  colorOption: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "transparent",
  },
  colorOptionSelected: {
    borderColor: "#000",
  },
  stockAlert: {
    color: "red",
    marginBottom: 16,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
    width: "50%",
  },
  quantityButton: {
    width: 30,
    height: 30,
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  quantityButtonText: {
    fontSize: 20,
    color: "#000",
  },
  quantityText: {
    fontSize: 18,
    color: "#000",
  },
  pinCodeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  pinCodeInput: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
  },
  pinCodeCheckButton: {
    backgroundColor: GColors.primary,
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  pinCodeCheckButtonText: {
    fontSize: 14,
    color: "white",
    fontWeight: "bold",
  },
  deliveryContainer: {
    flexDirection: "column",
    marginBottom: 16,
  },
  deliveryOption: {
    gap: 8,
    flexDirection: "row",
  },

  deliveryText: {},
  deliveryFreeText: {
    color: "green",
  },
  deliveryInfoText: {
    fontSize: 12,
    color: "#777",
  },
});

export default ProductDetails;
