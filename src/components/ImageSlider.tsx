import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface CarouselItem {
    id: string;
    title: string;
    subtitle: string;
    discount: string;
    imageUrl: string;
    buttonText:string;
}

const { width } = Dimensions.get('window');


const Carousel: React.FC<{ items: CarouselItem[] }> = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
    const flatListRef = useRef<FlatList<CarouselItem>>(null);


  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / width);
      setCurrentIndex(index);
  };


    const handleDotPress = (index: number) => {
      setCurrentIndex(index);
       flatListRef.current?.scrollToOffset({ offset: index * width });
    };

  const renderItem = ({ item }: {item: CarouselItem}) => (
    <View style={[styles.itemContainer, { width }]}>
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
        <View style={styles.textContainer}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.subtitle}>{item.subtitle}</Text>
            <Text style={styles.discount}>{item.discount}</Text>
            <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>{item.buttonText}</Text>
            </TouchableOpacity>

        </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
          ref={flatListRef}
        data={items}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        onMomentumScrollEnd={handleScroll}
        keyExtractor={(item) => item.id}
      />
      <View style={styles.dotsContainer}>
        {items.map((_, index) => (
          <TouchableOpacity
            key={index.toString()}
            style={[
              styles.dot,
              currentIndex === index ? styles.activeDot : styles.inactiveDot,
            ]}
             onPress={() => handleDotPress(index)}
          />
        ))}
          <TouchableOpacity style={styles.navigation} >
              <Ionicons name="chevron-forward-outline" size={32} color="white" />
          </TouchableOpacity>

      </View>


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      paddingVertical:20,
      marginVertical:20,
    overflow: 'hidden',
  },
  itemContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
      position:"relative"
  },
  image: {
    width: '100%',
    height: 400,
    resizeMode: 'cover',
  },
    textContainer:{
        position:"absolute",
        zIndex:1,
        padding:20,
        justifyContent:"flex-start",
        alignItems:"flex-start",
        top:20
    },
    title:{
        fontSize: 30,
        color: "white",
        fontWeight:"500"
    },
    subtitle:{
        fontSize: 22,
        color: "white",
    },
    discount:{
        fontSize: 18,
        color: "white",
    },
    button:{
        backgroundColor:"#ce93d8",
        paddingHorizontal:20,
        paddingVertical:10,
        borderRadius:5,
        marginTop:10
    },
    buttonText:{
      color:"white",
        fontSize:16,
        fontWeight:"bold"
    },
  dotsContainer: {
    flexDirection: 'row',
      alignItems:"center",
      justifyContent:"center",
    padding: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#ce93d8', // Active dot color
  },
  inactiveDot: {
    backgroundColor: 'gray', // Inactive dot color
  },
    navigation:{
        position:"absolute",
        right:10,
        bottom: 0,
    }
});


export default Carousel;