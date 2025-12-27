import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import CustomButton from '../components/CustomButton';
import COLORS from '../constants/colors';

export default function HomeScreen() {
    const { user, logout } = useContext(AuthContext);

    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            <View style={styles.footer}>
                <Text style={{ fontSize: 22 }}>Welcome</Text>
            </View>
            <View style={styles.footer}>
                <Text>Name: {user.name}</Text>
            </View>
            <View style={styles.footer}>
                <Text>Email: {user.email}</Text>
            </View>

            <View style={styles.button}>
                <CustomButton title="Logout" onPress={logout} />
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    footer: {
        // flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
    },
    button: {
        padding: 20
    },
});
