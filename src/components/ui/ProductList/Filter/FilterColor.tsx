import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from 'react-native';


interface ColorData {
  status: boolean;
  colors: {
    color_name: string;
    hex_value: string;
  }[];
}

interface Filter {
  color?: string;
}

const sampleData: ColorData = {
  status: true,
  colors: [
    { color_name: 'Red', hex_value: '#FF0000' },
    { color_name: 'Green', hex_value: '#00FF00' },
    { color_name: 'Blue', hex_value: '#0000FF' },
    { color_name: 'Yellow', hex_value: '#FFFF00' },
    { color_name: 'Orange', hex_value: '#FFA500' },
    { color_name: 'Purple', hex_value: '#800080' },
      { color_name: 'Pink', hex_value: '#FFC0CB' },
    { color_name: 'Brown', hex_value: '#A52A2A' },
    { color_name: 'Gray', hex_value: '#808080' },
    { color_name: 'Cyan', hex_value: '#00FFFF' },
  ],
};

export default function FilterColor({
  setFilters,
  ColorFilter,
}: {
  setFilters: React.Dispatch<React.SetStateAction<Filter | undefined>>;
  ColorFilter?: string;
}) {
  const [isLoading, setIsLoading] = useState(false); // Simulate loading
    const [data, setData] = useState<ColorData | null>(sampleData); // Sample data

  // const { data, isLoading } = useQuery<ColorData>({
  //   queryKey: ['colors'],
  //   queryFn: fetchColors,
  // });
   

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }
  

  if (data)
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Colors</Text>
        <View style={styles.colorGrid}>
          <FlatList
             data={data.colors}
                numColumns={5}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => (
                    <TouchableOpacity
                    style={[styles.colorButton,
                    { backgroundColor: item.hex_value,
                    borderColor: ColorFilter && item.hex_value === ColorFilter ?  item.hex_value : 'transparent',
                    borderWidth:  ColorFilter && item.hex_value === ColorFilter ? 2 : 0,
                    }]}
                       onPress={() => setFilters((prev) => ({ ...prev, color: item.hex_value }) as Filter)}
                    >
                    </TouchableOpacity>
                )}
            />
        </View>
      </View>
    );
    return null;
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    gap: 10,
  },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
      marginLeft: 5,
  },
  colorGrid: {
    flexDirection: 'row',
        maxWidth: 300,
    paddingHorizontal: 2,
      alignItems: 'center',
  },
    colorButton: {
    height: 30,
    width: 30,
    borderRadius: 15,
    margin: 4,
  },
});