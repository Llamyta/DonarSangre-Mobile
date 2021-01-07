import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Alert} from 'react-native';

import CTextField from '../../Components/CTextField';
import Button from '../../Components/login/Button';
import FirebasePlugin, {firestore} from '../../Plugins/firebase/Firebase';

import Constants from '../../Config/Constants';
import Utils from '../../utils/utils';

const SettingScreen = () => {
  const [colec, setColec] = useState('');
  const [subCol, setSubCol] = useState('');
  const [nombreApp, setNombreApp] = useState('')
  const [isLoading, setIsLoading] = useState(false);

  

  const onPressAdd = () => {
   
    if(!colec || !subCol || !nombreApp){
      Alert.alert("Error debe llenar todos los campos");
    }
    else{
      addColtoFirebase();      
    }
  }

  const addGroupCol = (subCol, nombreApp, userID,colec) => {
    const inforcol = firestore
      .collection('Bernies_Collections').doc('GitHub_Apps')
      .collection(colec).doc(subCol);

    inforcol.set({
      appID: subCol,
      NameApp: nombreApp,
      userID: userID,
    })
      .then(function () {
        setIsLoading(false);
        Alert.alert('creado:');
      })
      .catch(function (error) {
        Alert.alert('Error al crear', error.message);
        setIsLoading(false);
      });
  }

  const addColtoFirebase = () => {
    setIsLoading(true);

    const info = firestore.collection('GitHub_Apps').doc();
    const userID = FirebasePlugin.auth().currentUser.uid;

    info.set({      
      appID: subCol,
      NameApp: nombreApp,
      userID: userID,
    })
      .then(function () {
        setIsLoading(false);
        addGroupCol(subCol, nombreApp, userID,colec);
      })
      .catch(function (error) {
        Alert.alert('Error al crear', error.message);
        setIsLoading(false);
      });
  };

  return (
    <View style={styles.container}>
      <CTextField
        value={colec}
        autoCorrect={false}
        placeholder={Constants.STRING.TEXT1}
        onChange={(newcolection) => {
          setColec(newcolection);
        }}
      />
      <CTextField
        value={subCol}
        autoCorrect={false}
        placeholder={Constants.STRING.TEXT2}
        onChange={(newsub) => {
          setSubCol(newsub);
        }}
      />
      <CTextField
        value={nombreApp}
        autoCorrect={false}
        placeholder={Constants.STRING.TEXT3}
        onChange={(newApp) => {
          setNombreApp(newApp);
        }}
      />
      <Button
        titleButton={Constants.STRING.ADD_EMAIL_BUTTON}
        onPress={onPressAdd}
        isLoading={isLoading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SettingScreen;