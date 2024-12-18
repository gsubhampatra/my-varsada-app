// ProductDetails.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import ProductHeading from '../ui/ProductDescription/ProductHeading';
import ProductSize from '../ui/ProductDescription/ProductSize';

// Define the color options
const colorOptions = [
    { id: '1', hex: '#FF7F50' },  // Coral
    { id: '2', hex: '#9400D3' },  // Purple
    { id: '3', hex: '#00FFFF' },  // Cyan
];

interface ProductDetailsProps {
    onSizeSelect: (size: string) => void;
    onColorSelect: (colorId: string) => void;
}


const ProductDetails = ({ onSizeSelect, onColorSelect }: ProductDetailsProps) => {
    const [selectedSize, setSelectedSize] = useState<string>('S');
  const [quantity, setQuantity] = useState(1);
  const [pinCode, setPinCode] = useState('');
  const [selectedColor, setSelectedColor] = useState(colorOptions[0].id);

    const handleSizeSelect = (size: string) => {
        setSelectedSize(size);
        onSizeSelect(size)
  };
    const handleColorSelect = (colorId: string) => {
        setSelectedColor(colorId);
        onColorSelect(colorId)
    }
    const handlePinCodeChange = (text: string) => {
        setPinCode(text);
      };

    const handleCheckPinCode = () => {
    // Implement pin code check logic here
    alert(`Checking pin code: ${pinCode}`);
  };

  return (
    <View style={styles.container}>
                <ProductHeading text="Colored Crop Top" />
        
      <Text style={styles.price}>₹230.00</Text>

      <Text style={styles.header}>Size</Text>
      <ProductSize  />

      <Text style={styles.header}>Color</Text>
      <View style={styles.colorContainer}>
          {colorOptions.map((color) => (
           <TouchableOpacity
                key={color.id}
                style={[styles.colorOption,
                         {backgroundColor: color.hex},
                        selectedColor === color.id && styles.colorOptionSelected
                 ]}
                onPress={() => handleColorSelect(color.id)}
                />
          ))}
        </View>

      <Text style={styles.stockAlert}>Only 5 stocks is left for out of delivery</Text>

      <Text style={styles.header}>Quantity</Text>
      <View style={styles.quantityContainer}>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => {
            if (quantity > 1) setQuantity(quantity - 1);
          }}
        >
          <Text style={styles.quantityButtonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantityText}>{quantity}</Text>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => {
            if (quantity < 5) setQuantity(quantity + 1);
          }}
        >
          <Text style={styles.quantityButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.pinCodeContainer}>
          <TextInput
              style={styles.pinCodeInput}
              placeholder="Enter the Pin-code to shop this"
              onChangeText={handlePinCodeChange}
              value={pinCode}
              keyboardType='number-pad'
          />
          <TouchableOpacity style={styles.pinCodeCheckButton} onPress={handleCheckPinCode}>
              <Text style={styles.pinCodeCheckButtonText}>Check</Text>
          </TouchableOpacity>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        width: "100%",
    },
    header: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8
    },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16
  },
    sizeContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 10,
        marginBottom: 16
    },
    sizeButton: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        borderRadius: 5,
    },
    sizeButtonSelected: {
      backgroundColor: '#C473FF',
    },
    sizeText: {
        fontSize: 16,
    },
    colorContainer:{
       flexDirection: 'row',
        marginBottom: 16,
      gap: 10,
    },
  colorOption: {
    width: 30,
    height: 30,
    borderRadius: 15,
      borderWidth: 2,
      borderColor: 'transparent',
  },
  colorOptionSelected:{
      borderColor: '#000'
  },
    stockAlert: {
        color: 'red',
      marginBottom: 16,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
        width: "50%"
    },
    quantityButton: {
        width: 30,
        height: 30,
        backgroundColor: 'rgba(0,0,0,0.05)',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    quantityButtonText: {
        fontSize: 20,
        color: '#000',
    },
    quantityText: {
        fontSize: 18,
        color: '#000',
    },
    pinCodeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      width: "100%"
    },
    pinCodeInput: {
      flex: 1,
        padding: 10,
      borderWidth: 1,
        borderColor: '#ddd',
      borderRadius: 5
    },
    pinCodeCheckButton: {
        backgroundColor: '#C473FF',
        padding: 10,
        borderRadius: 5,
      marginLeft: 10,
    },
    pinCodeCheckButtonText: {
        fontSize: 14,
        color: 'white',
        fontWeight: 'bold',
    },
});

export default ProductDetails;