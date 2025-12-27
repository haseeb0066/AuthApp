import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import COLORS from '../constants/colors';

export default function CustomButton({ title, onPress, isLoading, disabled }) {
    return (
        <TouchableOpacity style={[styles.button, disabled && { backgroundColor: COLORS.disabledButton }]} onPress={onPress} disabled={disabled}>
            {isLoading ? (
                <ActivityIndicator size="small" color={COLORS.white} />
            ) : (
                <Text style={styles.buttonText}>{title}</Text>
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
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

});
