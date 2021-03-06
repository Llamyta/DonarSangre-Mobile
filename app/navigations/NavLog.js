import * as React from 'react';
import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContent } from './DrawerContent';
import { Alert } from 'react-native'
//vistas
import MainTabScreen from './MainTabScreen';
import Perfil from '../screens/DetailsScreen';
import { firebaseApp } from "../utils/Firebase"
import firebase from "firebase/app"
import "firebase/firestore"
//Modal
import Modals from '../components/Modals';

const db = firebase.firestore(firebaseApp)


const Drawer = createDrawerNavigator();
function App() {
    const [userInfo, setUserInfo] = useState({})
    const [info, setInfo] = useState([])
    const usu = firebase.auth().currentUser.email
    const verified = firebase.auth().currentUser.emailVerified;
    //modal
    const [modalState, setModalState] = useState(true);

    useEffect(() => {
        (async () => {
            const user = await firebase.auth().currentUser;
            setUserInfo(user.providerData[0]);
        })();
    }, [])

    useEffect(() => {
        db.collection('Usuario')
            .get()
            .then((snap) => {
                snap.forEach(doc => {
                    if (doc.data().email == usu) {
                        setInfo(doc.data())
                    }
                });
            })
    }, []);
    const mensajeCambio = () => {
         firebase
            .auth()
            .currentUser
            .sendEmailVerification()
            .then(() => {
                Alert.alert(
                    "Mensaje enviado",
                    "Se ha enviado un mensaje de verificacion a "+usu,
                    [
                        { text: "Ok", onPress: () => navigation.navigate('SignUpScreen') }

                    ],
                    { cancelable: false }
                )

            })
            .catch(() => {
                Alert.alert(
                    "Error",
                    "El mensaje no se ha podido enviar, intentelo nuevamente",
                    [
                        { text: "Intentar de nuevo", style: 'cancel' }

                    ],
                    { cancelable: false }
                )
            })

    }
    const volver =()=>{
        setModalState(!modalState)
    }


    if (verified === true) {
        return (
            <NavigationContainer>
                <Drawer.Navigator drawerContent={props => <DrawerContent {...props} userInfo={userInfo} info={info} />}>
                    <Drawer.Screen name="HomeDrawer" component={MainTabScreen} />
                    <Drawer.Screen name="Perfil" component={Perfil} />
                </Drawer.Navigator>
            </NavigationContainer>
        );
    }
    return (
        <Modals
            visible={modalState}
            text="Debe verificar la direccion de correo delectronico"
            textoboton="Enviar verificacion"
            onPress={mensajeCambio}
            textoboton2="Volver"
            onPress2={volver}
        />
    );

}

export default App;