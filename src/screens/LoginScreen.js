import React, { useState, useContext, useEffect } from 'react';
import { Text, View, TouchableOpacity, KeyboardAvoidingView, Platform, StyleSheet, Dimensions, Alert } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import ErrorText from '../components/ErrorText';
import { isValidEmail } from '../utils/validation';
import COLORS from '../constants/colors';
import { Image } from 'expo-image';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
const { width } = Dimensions.get("window");



export default function LoginScreen({ navigation }) {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const checkUser = async () => {
            const savedUser = await AsyncStorage.getItem('user');
            if (savedUser) setUser(JSON.parse(savedUser));
        };
        checkUser();
    }, []);

    const handleLogin = async () => {
        const errors = {};
        if (!email?.trim())
            errors.email = 'Email is required';
        else if (!isValidEmail(email))
            errors.email = 'Invalid email address';
        if (!password)
            errors.password = 'Password is required';
        else if (password.length < 6)
            errors.password = 'Password must be at least 6 characters';

        if (Object.keys(errors).length) return setErrors(errors);
        setErrors({});
        await login(email.trim(), password);
    };


    return (
        <SafeAreaProvider>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}
                keyboardVerticalOffset={0}
            >
                <View style={{ flex: 1 }}>
                    <View style={styles.topIllustration}>
                        <Image source={require("../assets/images/ReadingBook.png")}
                            style={styles.illustrationImage}
                        />
                    </View>
                    <View style={styles.card}>
                        <View style={styles.formContainer}>
                            {/* TextInput Feilds */}
                            <CustomInput
                                label="Email"
                                value={email}
                                onChangeText={(text) => {
                                    setEmail(text);
                                    setErrors(prev => ({ ...prev, email: null }));
                                }}
                                placeholder="Enter your email"
                                iconName="mail-outline"
                                keyboardType="email-address"
                                error={errors.email}
                            />


                            <CustomInput
                                label="Password"
                                value={password}
                                onChangeText={(text) => {
                                    setPassword(text);
                                    setErrors(e => ({ ...e, password: null }));
                                }}
                                placeholder="Enter your password"
                                iconName="lock-closed-outline"
                                secureTextEntry={!showPassword}
                                rightIcon
                                rightIconPress={() => setShowPassword(!showPassword)}
                                rightIconState={showPassword}
                                error={errors.password}
                            />
                            {/* Button */}
                            <CustomButton title="Login" isLoading={isLoading} onPress={handleLogin} disabled={!email || !password} />

                            {/* Footer */}
                            <View style={styles.footer}>
                                <Text style={styles.footerText}>Don't have an account? </Text>
                                <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                                    <Text style={styles.link}>Sign Up</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaProvider>
    );
}


const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: COLORS.background,
        padding: 20,
        justifyContent: "center",
    },
    scrollViewStyle: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    topIllustration: {
        alignItems: "center",
        width: "100%",
    },
    illustrationImage: {
        width: width * 0.75,
        height: width * 0.75,
    },
    card: {
        backgroundColor: COLORS.cardBackground,
        borderRadius: 16,
        padding: 24,
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
        borderWidth: 2,
        borderColor: COLORS.border,
        marginTop: -24,
    },
    header: {
        alignItems: "center",
        marginBottom: 24,
    },
    title: {
        fontSize: 32,
        fontWeight: "700",
        color: COLORS.textPrimary,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: COLORS.textSecondary,
        textAlign: "center",
    },
    formContainer: {
        marginBottom: 16,
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        marginBottom: 8,
        color: COLORS.textPrimary,
        fontWeight: "500",
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: COLORS.inputBackground,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: COLORS.border,
        paddingHorizontal: 12,
    },
    inputIcon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: 48,
        color: COLORS.textDark,
    },
    eyeIcon: {
        padding: 8,
    },
    footer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 24,
    },
    footerText: {
        color: COLORS.textSecondary,
        marginRight: 5,
    },
    link: {
        color: COLORS.primary,
        fontWeight: "600",
    },
});
