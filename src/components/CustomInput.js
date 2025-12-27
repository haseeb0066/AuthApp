import { TextInput, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import COLORS from '../constants/colors';
import { Ionicons } from '@expo/vector-icons';

export default function CustomInput({
    label,
    value,
    onChangeText,
    placeholder,
    iconName = 'mail-outline',
    keyboardType = 'default',
    secureTextEntry = false,
    rightIcon,
    rightIconPress,
    rightIconState,
    error, // ✅ NEW
}) {
    return (
        <View style={styles.inputGroup}>

            {label && <Text style={styles.label}>{label}</Text>}

            <View
                style={[
                    styles.inputContainer,
                    error && styles.errorBorder, // ✅ red border
                ]}
            >
                <Ionicons
                    name={iconName}
                    size={20}
                    color={error ? COLORS.error : COLORS.primary}
                    style={styles.inputIcon}
                />

                <TextInput
                    style={styles.input}
                    placeholder={placeholder}
                    placeholderTextColor={COLORS.placeholderText}
                    value={value}
                    onChangeText={onChangeText}
                    keyboardType={keyboardType}
                    autoCapitalize="none"
                    secureTextEntry={secureTextEntry}
                />

                {rightIcon && (
                    <TouchableOpacity onPress={rightIconPress}>
                        <Ionicons
                            name={rightIconState ? 'eye-off-outline' : 'eye-outline'}
                            size={24}
                            color={error ? COLORS.error : COLORS.primary}
                        />
                    </TouchableOpacity>
                )}
            </View>

            {/* ✅ Error message under field */}
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>
    );
}


const styles = StyleSheet.create({
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        marginBottom: 8,
        color: COLORS.textPrimary,
        fontWeight: '500',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.inputBackground,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: COLORS.border,
        paddingHorizontal: 12,
    },
    errorBorder: {
        borderColor: COLORS.feildError,
    },
    inputIcon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: 48,
        color: COLORS.textDark,
    },
    errorText: {
        color: COLORS.feildError,
        fontSize: 12,
        marginTop: 4,
    },
});
