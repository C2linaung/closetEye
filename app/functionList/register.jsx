import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput, Alert, ScrollView } from 'react-native';
import { useNavigation, useRouter } from 'expo-router';
import IconPicker from './iconPicker';
import { db } from '../../configs/FirebaseConfig';
import { doc, setDoc } from "firebase/firestore";

const getDocId = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return Array.from({ length: 20 }, () => characters.charAt(Math.floor(Math.random() * characters.length))).join('');
};

export default function Register() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [currentIcon, setCurrentIcon] = useState(require('../../assets/images/icons.png'));
  const [iconPath, setIconPath] = useState('icons.png');
  const [name, setName] = useState('');
  const [key, setKey] = useState('');
  const [description, setDescription] = useState('');
  const descriptionLimit = 120; // Set character limit for description
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: "Register Modules",
      headerStyle: {
        backgroundColor: '#6d5cc4',
      },
      headerTintColor: 'white',
      headerTitleStyle: {
        fontFamily: 'outfit-medium'
      }
    });
  }, []);

  const onIconPick = () => {
    setModalVisible(true);
  };

  const handleIconSelection = (iconUri, iconId) => {
    setCurrentIcon(iconUri);
    setIconPath(iconId);
    setModalVisible(false);
  };

  const handleAdd = async () => {
    if (!name || !iconPath || !key || !description || iconPath === 'icons.png') {
      Alert.alert('Error', 'Please fill all fields and select an icon!');
      return;
    }

    try {
      const newDocId = getDocId();
      await setDoc(doc(db, 'Modules', newDocId), {
        name,
        icon: iconPath,
        key,
        description
      });
      Alert.alert('Success', 'Module added successfully!');
    } catch (error) {
      console.error("Error adding document: ", error);
      Alert.alert('Error', 'Error adding module!');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={{display:'flex', flexDirection:'row',justifyContent: "space-between"}}>
          <View>
            <Text style={styles.title}>Add New Modules</Text>
            <Text style={styles.subtitle}>Fill all the details below to add a new module</Text>
          </View>
          <TouchableOpacity onPress={() => router.push('/clothingList/register_clothing')}>
            <Image
              source={require("./../../assets/images/ClothingIcons/shirt4.png")}
              style={{
                height: 50,
                width: 50,
                marginTop: 2,
                marginRight: 3,
                borderRadius: 10,
                borderColor: 'grey',
                borderWidth: 1,
              }}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={onIconPick}>
          <Image source={currentIcon} style={styles.icon} />
        </TouchableOpacity>
        <IconPicker visible={modalVisible} onIconSelected={handleIconSelection} onClose={() => setModalVisible(false)} />
        <Text style={styles.iconText}>Pick an Icon!</Text>
        <TextInput placeholder='Name' style={styles.textInput} onChangeText={setName}/>
        <TextInput placeholder='Activation Key' style={styles.textInput} onChangeText={setKey}/>
        <TextInput
          placeholder='Description'
          style={[styles.textInput, styles.descriptionInput]} 
          multiline={true}
          numberOfLines={3}
          onChangeText={setDescription}
          maxLength={descriptionLimit}
        />
        <Text style={styles.counterText}>{description.length}/{descriptionLimit}</Text>
        <TouchableOpacity style={styles.addContainer} onPress={handleAdd}>
          <Text style={styles.addText}>Add New Module</Text>
        </TouchableOpacity>
      </ScrollView>
      <TouchableOpacity style={styles.inventoryButton} onPress={() => navigation.navigate('inventory')}>
        <Text style={styles.inventoryButtonText}>Go to Inventory</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  scrollViewContainer: {
    flexGrow: 1
  },
  title: {
    fontFamily: 'outfit-bold',
    fontSize: 25
  },
  subtitle: {
    fontFamily: 'outfit',
    color: 'grey'
  },
  icon: {
    width: 100,
    height: 100,
    marginTop: 20,
    borderRadius: 10,
    borderColor: 'grey',
    borderWidth: 2
  },
  iconText: {
    fontFamily: 'outfit-medium',
    marginLeft: 13
  },
  textInput: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 15,
    backgroundColor: 'white',
    marginTop: 10,
    fontFamily: 'outfit'
  },
  descriptionInput: {
    height: 100
  },
  counterText: {
    alignSelf: 'flex-end',
    fontFamily: 'outfit',
    marginVertical: 5
  },
  addContainer: {
    padding: 15,
    backgroundColor: '#6d5cc4',
    borderRadius: 10,
    marginTop: 20
  },
  addText: {
    textAlign: 'center',
    fontFamily: 'outfit-medium',
    color: 'white'
  },
  inventoryButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#6d5cc4',
    padding: 15,
    borderRadius: 10
  },
  inventoryButtonText: {
    color: 'white',
    fontFamily: 'outfit-medium'
  }
});
