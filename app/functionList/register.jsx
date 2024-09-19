import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { useNavigation } from 'expo-router';
import IconPicker from './iconPicker';

export default function Register() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [currentIcon, setCurrentIcon] = useState(require('../../assets/images/icons.png'));
  const [iconPath,setIconPath] = useState('icons.png');
  const [name,setName] = useState();
  const [key,setKey] = useState();
  const [description,setDescription] = useState();

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

  const handleIconSelection = (iconUri, id) => {
    setCurrentIcon(iconUri);
    setIconPath(id)
    setModalVisible(false);
  };

  const handleAdd = () => {
    console.log("Icon Path is:", iconPath)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Modules</Text>
      <Text style={styles.subtitle}>Fill all the details below to add a new module</Text>
      <TouchableOpacity onPress={onIconPick}>
        <Image source={currentIcon} style={styles.icon} />
      </TouchableOpacity>
      <IconPicker visible={modalVisible} onIconSelected={handleIconSelection} onClose={() => setModalVisible(false)} />
      <Text style={styles.iconText}>Pick an Icon!</Text>
      <View>
        <TextInput placeholder='Name' style={styles.textInput} onChangeText={(v)=> setName(v)}/>
        <TextInput placeholder='Activation Key' style={styles.textInput} onChangeText={(v)=> setKey(v)}/>
        <TextInput
          placeholder='Description'
          style={[styles.textInput, styles.descriptionInput]} 
          multiline={true}
          numberOfLines={3}
          onChangeText={(v)=> setDescription(v)}
        />
      </View>
      <TouchableOpacity style={styles.addContainer} onPress={handleAdd}>
        <Text style={styles.addText}>Add New Module</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  title: {
    fontFamily: 'outfit-bold',
    fontSize: 25,
  },
  subtitle: {
    fontFamily: 'outfit',
    color: 'grey'
  },
  icon: {
    width: 100,
    height: 100,
    marginTop: 20,
    borderRadius:10,
    borderColor:'grey',
    borderWidth:2,
  },
  iconText:{
    fontFamily:'outfit-medium',
    marginLeft:13
  },
  textInput:{
    padding:15,
    borderWidth:1,
    borderRadius:10,
    fontSize:15,
    backgroundColor:'white',
    marginTop:10,
    fontFamily:'outfit'
  },
  descriptionInput: {
    height: 100 
  },
  addContainer:{
    padding:15,
    backgroundColor:'#6d5cc4',
    borderRadius:10,
    marginTop:20
  },
  addText:{
    textAlign:'center',
    fontFamily:'outfit-medium',
    color:'white'
  }
});
