import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AddressCheckBoxList from './AddressCheckBoxList'; // Import the React Native Version
import AddAddressBox from './AddAddressBox'; // Import the React Native Version


export default function SwitchAddress() {
    const [switchAddress, setSwitchAddress] = useState(true);

    return (
        <View style={styles.container}>
             <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => setSwitchAddress(false)}>
                <Text style={styles.addAddressButton}>Add Address</Text>
                 </TouchableOpacity>
              </View>
            {switchAddress ? (
                <AddressCheckBoxList />
            ) : (
              <AddAddressBox  isVisible={!switchAddress} onClose={()=> setSwitchAddress(true)}/>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
         paddingHorizontal: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingBottom: 16,

    },
    addAddressButton: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#007bff',
    },
});