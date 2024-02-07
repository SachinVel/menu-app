import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    pickerContainer: {
        marginTop: 5,
        marginBottom: 15,
        paddingHorizontal: 10,
    },
    multilineInput: {
        height: 100,
        textAlignVertical: 'top', // Ensures the text starts from the top
    },
});

export default styles;
