// ProductDescription.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';


interface ProductDescriptionProps {
  details: {
    label: string;
    value: string;
  }[];
}


const ProductDescription: React.FC<ProductDescriptionProps> = ({ details }) => {
  const [expanded, setExpanded] = React.useState(false);

  return (
      <View style={styles.container}>
        <TouchableOpacity
              onPress={() => setExpanded(!expanded)}
              style={styles.headerContainer}
            >
          <Text style={styles.header}>Product Details</Text>
          <AntDesign name={expanded ? 'caretup' : 'caretdown'} size={16} color="black" />
        </TouchableOpacity>

          {expanded && <View style={styles.detailContainer}>
             {details.map((detail, index) => (
          <View key={index} style={styles.detailItem}>
            <Text style={styles.label}>{detail.label}:</Text>
            <Text style={styles.value}>{detail.value}</Text>
          </View>
        ))}
              </View>}


      </View>
  );
};


const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
      paddingVertical: 10,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    header: {
        fontSize: 16,
      fontWeight: 'bold',
        marginBottom: 10,
    },
    detailContainer:{
        marginTop: 10,
    },
  detailItem: {
    flexDirection: 'row',
      marginBottom: 8
  },
  label: {
    fontSize: 14,
      fontWeight: 'bold',
    marginRight: 5
  },
  value: {
    fontSize: 14,
  },
});

export default ProductDescription;