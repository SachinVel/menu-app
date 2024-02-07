import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import styles from './styles';
import { getMenu, writeDataToSheet } from '../../data/MockDataAPI';
import { useGlobalContext } from '../../components/GlobalContext/GlobalContext';
import { Select } from "native-base";



const AddScreen = (props) => {
    const { navigation } = props;

    const { state, dispatch } = useGlobalContext();

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [photoUrl, setPhotoUrl] = useState('');
    const [calorie, setCalorie] = useState('');
    const [description, setDescription] = useState('');

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'Base', value: 'base' },
        { label: 'Banana', value: 'banana' }
    ]);

    const handleSubmit = async () => {
        // Validate the photo URL format (you can customize this validation)
        const isPhotoUrlValid = isValidUrl(photoUrl);

        if (!title || !category || !photoUrl || !calorie || !description) {
            console.error('Please fill in all fields');
            return;
        }

        if (isPhotoUrlValid) {
            // Log the entered data
            let newData = {
                Name: title,
                Category: category,
                PhotoUrl: photoUrl,
                Description: description,
                Calories: calorie,
            };

            await writeDataToSheet(newData);

            getMenu().then((menuItems) => {

                dispatch({
                    type: 'setMenuItems',
                    payload: menuItems
                });

                navigation.navigate('Home');

            });
        } else {
            console.error('Invalid Photo URL');
        }
    };

    // useEffect(() => {
    //     console.log('globalState : ', state);
    // }, [state.menuItems]);

    const isValidUrl = (url) => {
        // Basic URL validation, you may need to enhance it based on your requirements
        const urlPattern = /^(http|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/;
        return urlPattern.test(url);
    };



    const onSelected = (selected) => {
        setCategory(selected);
        return selected;
    }

    return (
        <View style={styles.container}>
            <Text>Title:</Text>
            <TextInput
                style={styles.input}
                value={title}
                onChangeText={(text) => setTitle(text)}
            />


            <Text>Category:</Text>
            <View style={styles.pickerContainer}>
                {/* <Picker
                    style={styles.input}
                    selectedValue={category}
                    onValueChange={(itemValue) => setCategory(itemValue)}
                >
                    <Picker.Item label="Select Category" value="" />
                    <Picker.Item label="Base" value="Base" />
                    <Picker.Item label="Protein" value="Protein" />
                    <Picker.Item label="Veggies" value="Veggies" />
                    <Picker.Item label="Sauces" value="Sauces" />
                    <Picker.Item label="Toppings" value="Toppings" />
                </Picker> */}
                {/* <PickerModal
                    renderSelectView={(disabled, selected, showModal) =>
                    	<Button disabled={disabled} title={'Show me!'} onPress={showModal} />
                    }
                    onSelected={onSelected.bind(this)}
                    items={['Base', 'Protien']}
                    showToTopButton={true}
                    selected={category}
                    showAlphabeticalIndex={true}
                    autoGenerateAlphabeticalIndex={true}
                    selectPlaceholderText={'Select Category'}
                    requireSelection={true}
                /> */}

                {/* <DropDownPicker
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                /> */}
                <Select selectedValue={category} placeholder="Choose category" onValueChange={itemValue => setCategory(itemValue)}>
                    <Select.Item label="Select Category" value="" />
                    <Select.Item label="Base" value="Base" />
                    <Select.Item label="Protein" value="Protein" />
                    <Select.Item label="Veggies" value="Veggies" />
                    <Select.Item label="Sauces" value="Sauces" />
                    <Select.Item label="Toppings" value="Toppings" />
                </Select>
            </View>


            <Text>Photo URL:</Text>
            <TextInput
                style={styles.input}
                value={photoUrl}
                onChangeText={(text) => setPhotoUrl(text)}
            />

            <Text>Calorie(cal):</Text>
            <TextInput
                style={styles.input}
                value={calorie}
                onChangeText={(text) => setCalorie(text)}
                keyboardType="numeric"
            />

            <Text>Description:</Text>
            <TextInput
                style={[styles.input, styles.multilineInput]}
                value={description}
                onChangeText={(text) => setDescription(text)}
                multiline
            />

            <Button title="Submit" onPress={handleSubmit} />

        </View >
    );
};

export default AddScreen;
