import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity,
    FlatList
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import getDirections from 'react-native-google-maps-directions'
import { size } from 'lodash'
//firebase
import { firebaseApp } from "../utils/Firebase"
import firebase from "firebase"
import "firebase/firestore"


const db = firebase.firestore(firebaseApp)

export default function HomeScreen({ navigation }) {
    const [info, setInfo] = useState({});
    const usu = firebase.auth().currentUser.email;

    // useEffect(() => {
    //     const aux=[];
    //     db.collection('CitasPersonales').get().then((res) => {
    //         res.forEach(element => {
    //             if(usu==element.data().email){
    //                aux.push(element.data())    
    //             }
    //             setInfo(aux);
    //         });
    //     })
    // }, [])
    // console.log(info);


    return (

        <View style={styles.container}>
            {size(info) > 0 ? (
                <FlatList
                    data={info}
                    renderItem={(informacion) => <Tarjeta informacion={informacion} />}
                    keyExtractor={(item, index) => index.toString()}
                />

            ) : (
                    <View style={styles.noData}>
                        <Text
                            style={styles.textoSinDatos}
                        >Parece que aun no tienes citas</Text>
                        <TouchableOpacity
                            style={styles.boton2}
                            onPress={() => navigation.navigate('Donar')}>
                            <Text style={styles.textoBoton}>Empecemos!</Text>
                        </TouchableOpacity>
                    </View>
                )}
        </View>
    );
}
const borrar = async () => {
    console.log("Item Eliminado");

}
const handleGetDirections = () => {
    const data = {
        //    source: {
        //     latitude: -33.8356372,
        //     longitude: 18.6947617
        //   },
        destination: {
            latitude: -17.3883176,
            longitude: -66.1514658
        },
        params: [
            {
                key: "travelmode",
                value: "driving"        // may be "walking", "bicycling" or "transit" as well
            },
            {
                key: "dir_action",
                value: "navigate"       // this instantly initializes navigation using the given travel mode
            }
        ],
    }

    getDirections(data)
}
function Tarjeta(props) {
    const { informacion } = props;
    const { id_solicitud, fecha, hora, foto, nombre } = informacion.item;


    return (
        <>
            <View style={styles.contenedorimg}>
                <View style={styles.card}>
                    <View style={{ justifyContent: 'center' }}>
                        <Image
                            style={styles.imageBackground}
                            resizeMode="cover"
                            source={{ uri: foto ? foto : "https://api.adorable.io/avatars/267/abott@adorable.png" }}
                        />
                    </View>
                    <View style={styles.descripcion}>
                        <Text
                            style={styles.texto1}
                        >
                            {nombre}
                        </Text>
                        <Text
                            style={styles.texto2}
                        >
                            ID: {id_solicitud}
                        </Text>
                        <Text
                            style={styles.texto2}
                        >
                            Fecha: {fecha}
                        </Text>
                        <Text
                            style={styles.texto2}
                        >
                            Hora: {hora}
                        </Text>
                    </View>
                    <View style={styles.boton}>

                        <View style={[styles.icono, { borderTopRightRadius: 20 }]}>
                            <Icon
                                name="google-maps"
                                color='#fff'
                                size={26}
                                onPress={() => { handleGetDirections }}
                            />
                        </View>
                        <View style={[styles.icono, { borderBottomRightRadius: 20 }]}>
                            <Icon
                                name="delete"
                                size={26}
                                style={{ color: '#fff' }}
                                onPress={borrar}
                            />
                        </View>

                    </View>
                </View>
            </View>
        </>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fafafa',
    },
    title: {
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center',
    },
    texto: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    contenedorimg: {
        flex: 4,
        paddingTop: 10
    },
    card: {
        justifyContent: 'flex-start',
        alignSelf: 'center',
        flexDirection: 'row',
        width: '90%',
        height: 170,
        backgroundColor: '#fff',
        borderWidth: 0.1,
        paddingHorizontal: 20,
        borderRadius: 20,
    },
    imageBackground: {
        borderColor: 'white',
        width: 80,
        height: 80,
        borderRadius: 100,
    },
    descripcion: {
        paddingHorizontal: '7%',
        justifyContent: 'center',
        width: '63%'
    },
    texto1: {
        fontWeight: 'bold',
        fontSize: 17
    },
    texto2: {
        color: '#888888',
        fontSize: 15
    },
    boton: {
        flex: 1,
        justifyContent: 'space-around',
        marginVertical: '5%',
        marginRight: '15%'
    },
    icono: {
        backgroundColor: '#1196BA',
        width: 70,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noData: {
        paddingVertical: '60%',
        paddingHorizontal: '10%'
    },
    textoSinDatos: {
        textAlign: 'center',
        fontSize: 30,
        color: '#d8d8d8',
    },
    boton2: {
        backgroundColor: '#1196BA',
        paddingVertical: '5%',
        marginVertical: '3%',
        justifyContent: 'center',
        alignContent: 'center',
        borderRadius: 5,
        marginHorizontal: '30%'
    },
    textoBoton: {
        color: '#fff',
        fontSize: 14,
        textAlign: 'center',
        fontWeight: 'bold'
    },
});
