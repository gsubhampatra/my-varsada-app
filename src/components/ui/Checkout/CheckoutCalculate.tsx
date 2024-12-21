import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CheckoutCalculate } from '../../../types/ResponceTypes'; // Make sure path is correct

export default function CheckoutCalculated({
    checkoutCalculate,
}: {
    checkoutCalculate: CheckoutCalculate;
}) {
    const {
        subTotal,
        shipping,
        discount,
        coinsRedeemed,
        membershipDiscount,
        coupon,
        total,
    } = checkoutCalculate;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Varsada Bag Summary</Text>

            <View style={styles.row}>
                <Text style={styles.body2}>Subtotal</Text>
                <Text style={[styles.body2, styles.grayText]}>
                    ${subTotal.toFixed(2)}
                </Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.body2}>Shipping</Text>
                <Text style={[styles.body2, styles.grayText]}>
                    ${shipping.toFixed(2)}
                </Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.body2}>Discount</Text>
                <Text style={[styles.body2, styles.redText]}>
                    -${discount.toFixed(2)}
                </Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.body2}>Coins Redeemed</Text>
                <Text style={[styles.body2, styles.redText]}>
                    -${coinsRedeemed.toFixed(2)}
                </Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.body2}>Membership Discount</Text>
                <Text style={[styles.body2, styles.redText]}>
                    -${membershipDiscount.toFixed(2)}
                </Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.body2}>Coupon</Text>
                <Text style={[styles.body2, styles.redText]}>
                    -${coupon.toFixed(2)}
                </Text>
            </View>
            <View style={[styles.row, styles.totalRow]}>
                <Text style={styles.body2Bold}>Total</Text>
                <Text style={styles.body2Bold}>${total.toFixed(2)}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 16,
        gap: 12,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    body2: {
        fontSize: 16,
    },
    grayText: {
        color: 'gray',
    },
    redText: {
        color: 'red',
    },
    totalRow: {
        marginTop: 16,
    },
    body2Bold: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});