import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const CustomAlert = ({ title, message, onDismiss }) => {
    return (
        <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, elevation: 5 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>{title}</Text>
            <Text>{message}</Text>
            <TouchableOpacity onPress={onDismiss} style={{ marginTop: 10 }}>
                <Text style={{ color: 'blue', fontWeight: 'bold' }}>OK</Text>
            </TouchableOpacity>
        </View>
    );
};

export default CustomAlert;
