import React from 'react';
import { View, Image, Text, StyleSheet, Pressable } from 'react-native';

export default function ProductCheckOutCard({
  img = '',
  selectedSize = 'S',
  title = 'title',
  quantity = 1,
  color = 'Black',
  price = 1950,
  sizes = ['S', 'M', 'L'],
}) {
  const [stateQuantity, setStateQuantity] = React.useState(quantity);
  const [sizeState, setSizeState] = React.useState(selectedSize);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: img }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.imageOverlay}>
          <Text style={styles.imageOverlayText}>4.5 (19)</Text>
        </View>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{title}</Text>

        <Text style={styles.color}>Color: {color}</Text>

        <Text style={styles.price}>${price}</Text>

        <Text style={styles.size}>Size</Text>
        <View style={styles.sizeButtonContainer}>
          {sizes.map((size) => (
            <Pressable
              key={size}
              style={{
                ...styles.sizeButton,
                backgroundColor: sizeState === size ? '#1E293B' : '#D1D5DB',
              }}
              onPress={() => setSizeState(size)}
            >
              <Text style={styles.sizeButtonText}>{size}</Text>
            </Pressable>
          ))}
        </View>

        <Text style={styles.quantity}>
          Quantity:
          <Text style={styles.quantityText}>{stateQuantity}</Text>
        </Text>
        {/* <View style={styles.quantityButtonContainer}>
          <Pressable
            style={styles.quantityButton}
            onPress={() => {
              if (stateQuantity > 1) setStateQuantity(stateQuantity - 1);
            }}
          >
            <Text style={styles.quantityButtonText}>-</Text>
          </Pressable>
          <Text style={styles.quantityText}>{stateQuantity}</Text>
          <Pressable
            style={styles.quantityButton}
            onPress={() => {
              if (stateQuantity < 5) setStateQuantity(stateQuantity + 1);
            }}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </Pressable>
        </View> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  imageOverlayText: {
    color: '#fff',
    fontSize: 16,
  },
  infoContainer: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  color: {
    fontSize: 14,
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
    marginBottom: 8,
  },
  size: {
    fontSize: 14,
    marginBottom: 8,
  },
  sizeButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sizeButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#1E293B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sizeButtonText: {
    fontSize: 14,
    color: '#fff',
  },
  quantity: {
    fontSize: 14,
    marginBottom: 8,
  },
  quantityText: {
    fontSize: 16,
  },
  quantityButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quantityButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#D1D5DB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    fontSize: 16,
    color: '#1E293B',
  },
});

