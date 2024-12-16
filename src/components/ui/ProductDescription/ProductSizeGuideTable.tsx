import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

type Measurements = {
  measurementType: { measurement_name: string };
  value: number;
  unit: { unit: string };
};

type Size = {
  size: string;
  ProductSizeMeasurement: Measurements[];
};

export default function ProductSizeGuideTable({
  sizedata,
}: {
  sizedata: Size[];
}) {
  if (sizedata) console.log(sizedata);
  const measurementTypes = Array.from(
    new Set(
      sizedata.flatMap((size) =>
        size.ProductSizeMeasurement.map(
          (m) => m.measurementType.measurement_name
        )
      )
    )
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderText}>Size</Text>
          {measurementTypes.map((type) => (
            <Text key={type} style={styles.tableHeaderText}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </Text>
          ))}
        </View>
        {sizedata.map((sizeData) => (
          <View key={sizeData.size} style={styles.tableRow}>
            <Text style={styles.tableCell}>{sizeData.size.toUpperCase()}</Text>
            {measurementTypes.map((type) => {
              const measurement = sizeData.ProductSizeMeasurement.find(
                (m) => m.measurementType.measurement_name === type
              );
              return (
                <Text key={type} style={styles.tableCell}>
                  {measurement
                    ? `${measurement.value} ${measurement.unit.unit}`
                    : '-'}
                </Text>
              );
            })}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  table: {
    borderWidth: 2,
    borderColor: '#6b7280',
    borderRadius: 8,
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#6b7280',
  },
  tableHeaderText: {
    flex: 1,
    padding: 8,
    color: '#fff',
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  tableCell: {
    flex: 1,
    padding: 8,
    textAlign: 'center',
  },
});

