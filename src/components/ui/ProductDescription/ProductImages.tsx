// ProductImages.tsx
import React from 'react';
import {
  Image,
  View,
  ScrollView,
  StyleSheet,
} from 'react-native';

const sampleProductImages = [
    {
        id: "1",
        media_type: "image",
        url: "https://i.pinimg.com/736x/b9/05/12/b905126f27c244073a99f9416bf8d5d6.jpg",
    },
    {
        id: "2",
        media_type: "image",
        url: "https://i.pinimg.com/564x/a6/60/b9/a660b96060154e684a1b9c08aa4b33b2.jpg",
    },
    {
        id: "3",
        media_type: "image",
        url: "https://i.pinimg.com/564x/69/8e/54/698e54f2ab2e22613407d41f7bb7f492.jpg",
    }
];

export default function ProductImages() {

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollView}
    >
      {sampleProductImages.map((item) => (
        <View key={item.id} style={styles.imageContainer}>
          <Image source={{ uri: item.url }} style={styles.image} />
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    scrollView: {
        width: '100%',
        height: 200,
    },
    imageContainer: {
        width: 'auto',
        height: 170,
        justifyContent: 'center',
        alignItems: 'center',
        flexShrink: 0,
    },
    image: {
        width:'auto',
        height: 180,
        resizeMode: 'cover',
    },
});

