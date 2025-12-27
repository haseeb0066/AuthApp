import React, { useState, useContext } from 'react';
import { Text, View, StyleSheet, TouchableWithoutFeedback, Keyboard, Platform, KeyboardAvoidingView, ActivityIndicator, TextInput, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import ErrorText from '../components/ErrorText';
import { isValidEmail } from '../utils/validation';
import { Ionicons } from '@expo/vector-icons';
import COLORS from '../constants/colors';



export default function SignupScreen({ navigation }) {
    const { signup } = useContext(AuthContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleSignup = async () => {
        const errors = {};

        if (!name?.trim() || name.trim().length < 3)
            errors.name = 'Name must be at least 3 characters';

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
        await signup(name.trim(), email.trim(), password);
    };



    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>

            <View style={styles.container}>
                <View style={styles.card}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Auth Application</Text>
                        <Text style={styles.subtitle}>Assessment  Just For Testing</Text>
                    </View>

                    {/* Only form responds to keyboard */}
                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                        keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
                    >
                        <ScrollView
                            keyboardShouldPersistTaps="handled"
                            showsVerticalScrollIndicator={false}
                        >

                            <View style={styles.formContainer}>
                                <CustomInput
                                    label="Username"
                                    value={name}
                                    onChangeText={(text) => {
                                        setName(text);
                                        setErrors(e => ({ ...e, name: null }));
                                    }}
                                    placeholder="Enter your username"
                                    iconName="person-outline"
                                    keyboardType="default"
                                    error={errors.name}
                                />

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


                                <CustomButton title="Sign Up" isLoading={isLoading} onPress={handleSignup} disabled={!email || !password || !name} />

                                <View style={styles.footer}>
                                    <Text style={styles.footerText}>Already have an account? </Text>
                                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                                        <Text style={styles.link}>Login</Text>
                                    </TouchableOpacity>
                                </View>

                            </View>

                        </ScrollView>
                    </KeyboardAvoidingView>

                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}


const styles = StyleSheet.create({
    scrollViewContent: {
        flexGrow: 1,
        paddingBottom: 100,
    },
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        padding: 20,
        marginTop: '8%',

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
    },
    header: {
        alignItems: "center",
        marginBottom: 32,
    },
    title: {
        fontSize: 32,
        fontWeight: "700",
        fontFamily: "JetBrainsMono-Medium",
        color: COLORS.primary,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: COLORS.textSecondary,
        textAlign: "center",
    },
    formContainer: { marginBottom: 16 },
    inputGroup: { marginBottom: 20 },
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
    inputIcon: { marginRight: 10 },
    input: {
        flex: 1,
        height: 48,
        color: COLORS.textDark,
    },
    eyeIcon: { padding: 8 },
    button: {
        backgroundColor: COLORS.primary,
        borderRadius: 12,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 16,
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    buttonText: {
        color: COLORS.white,
        fontSize: 16,
        fontWeight: "600",
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