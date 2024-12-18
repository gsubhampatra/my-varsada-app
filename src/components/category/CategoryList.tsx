// CategoryList.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

interface CategoryProps {
  text: string;
  isSelected: boolean;
  onPress: () => void;
}
const Category: React.FC<CategoryProps> = ({ text, isSelected, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.category, isSelected && styles.selectedCategory]}>
      <Text style={[styles.categoryText, isSelected && styles.selectedCategoryText]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};


const categoriesData = [
  'New In',
  'Best Sellers',
  'Denim',
  'Crop Top',
  'Bodycon',
  'Formal Wear',
  'Winter wear',
  'Jumpsuit',
  'Blazers',
  'Dress',
];

const { height } = Dimensions.get('window')
const styles = StyleSheet.create({
  container: {
    width: 110,
    height: height - 80,
    backgroundColor: 'rgba(248, 237, 235, 1)',
      paddingVertical: 8,
    paddingHorizontal: 4,
  },
  category: {
      paddingVertical: 10,
      paddingHorizontal: 4,
  },
  selectedCategory: {
    backgroundColor: 'rgba(196, 115, 255, 0.2)',
  },
  categoryText: {
    fontSize: 16,
    color: 'black',
    fontFamily: 'Arial', // or your preferred font
  },
    selectedCategoryText: {
    fontWeight: 'bold', // Add other styles for selection here
  },
});

const CategoryList: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>('New In');

  const handleCategoryPress = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <View style={styles.container}>
      {categoriesData.map((category) => (
        <Category
          key={category}
          text={category}
          isSelected={selectedCategory === category}
          onPress={() => handleCategoryPress(category)}
        />
      ))}
    </View>
  );
};

export default CategoryList;