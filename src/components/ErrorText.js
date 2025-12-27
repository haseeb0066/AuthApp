import { Alert, Text } from 'react-native';

export default function ErrorText({ message }) {
    if (!message) return null;
    Alert.alert('Alert', message);
}
