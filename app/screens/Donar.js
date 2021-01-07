import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, Alert } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import DateTimePicker from '@react-native-community/datetimepicker';
import Modal from 'react-native-modal'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { firebaseApp } from "../utils/Firebase"
import firebase from "firebase/app"
import "firebase/firestore"

const db = firebase.firestore(firebaseApp)


const { height } = Dimensions.get("screen");
const { width } = Dimensions.get("screen");
const Donar = () => {
    const [Info, setInfo] = useState({})
    useEffect(() => {
        let aux = []
        db.collection('SolicitudSangre')
            .get()
            .then((snap) => {
                snap.forEach(doc => {
                    // if (doc.data().id_usuario == carnet) {
                    //     aux.push(doc.data())
                    // }
                    aux.push(doc.data());
                });
                setInfo(aux);
            })
    }, [])
    console.log(Info);


    const [personas, setpersonas] = useState([
        
        { name: 'Pablo Rojas Mejia', tiposangre: 'A', image: { uri: 'https://firebasestorage.googleapis.com/v0/b/donarsangre-bf5c7.appspot.com/o/SolicitudSangre%2FSolicitudSangre_r85gdp64fjq?alt=media&token=65d05bae-6d76-47e1-8ab1-375450095092' }, telf: 4444444, correo: 'belga123@gmail.com' },
        { name: 'Jose Perez Fuentes', tiposangre: 'O+', image: { uri: 'https://firebasestorage.googleapis.com/v0/b/donarsangre-bf5c7.appspot.com/o/SolicitudSangre%2Fperfil_personas_cuesta_perdonar.jpg?alt=media&token=202bd022-09f7-42b1-ba10-ef38905429e4' }, telf: 4444444, correo: 'belga123@gmail.com' },
        { name: 'Pamela Aranda Lopez', tiposangre: 'O+', image: { uri: 'https://firebasestorage.googleapis.com/v0/b/donarsangre-bf5c7.appspot.com/o/SolicitudSangre%2FSolicitudSangre_vwngirnr8o?alt=media&token=aabaa3ec-02d5-45f8-91bc-d2baf9525c1f' }, telf: 777777, correo: 'clinicalosangeles@gmail.com' },
        { name: 'Alvaro Mejia Fuentes', tiposangre: 'O+', image: { uri: 'https://firebasestorage.googleapis.com/v0/b/donarsangre-bf5c7.appspot.com/o/SolicitudSangre%2FSolicitudSangre_83rpoxa509f?alt=media&token=b9a23ee4-e7a3-4edf-9612-96ab2b57da31' }, telf: 75913669, correo: 'sedescbba@gmail.com' },
        { name: 'Ajhmeth Bahit Dominguez', tiposangre: 'O+', image: { uri: 'https://firebasestorage.googleapis.com/v0/b/donarsangre-bf5c7.appspot.com/o/SolicitudSangre%2FSolicitudSangre_z5tq60hfnu?alt=media&token=47d756d3-056b-4b0e-b627-2375d128cdf5' }, telf: 75913669, correo: 'sedescbba@gmail.com' },
        { name: 'Samanta Fernandez Lopez', tiposangre: 'O+', image: { uri: 'https://firebasestorage.googleapis.com/v0/b/donarsangre-bf5c7.appspot.com/o/SolicitudSangre%2FSolicitudSangre_ruc2gdrpoya?alt=media&token=c04f4d2d-174b-4a4b-ae50-2f2ac7da78e7' }, telf: 75913669, correo: 'sedescbba@gmail.com' },
        { name: 'Alejandra Gonzales Jimenez', tiposangre: 'O+', image: { uri: 'https://firebasestorage.googleapis.com/v0/b/donarsangre-bf5c7.appspot.com/o/SolicitudSangre%2Fdescargar.jpg?alt=media&token=56d0689c-46c4-438b-865b-e1414eea24f5' }, telf: 7222222, correo: 'sedescbba@gmail.com' },

    ])
    
    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);
    const carouselRef = useRef('')

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const showMode = currentMode => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');

    };

    const showTimepicker = () => {
        showMode('time');
    };

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const RegistrarCita = () => {
        db.collection('CitasPersonales')
            .add({
                estado: false,
                start: date,
                title: "Luchito Arevalo",
                id_usuario: 222222,
                id_solicitud: 123456,
                foto: 'https://firebasestorage.googleapis.com/v0/b/donarsangre-bf5c7.appspot.com/o/SolicitudSangre%2Fdescargar.jpg?alt=media&token=56d0689c-46c4-438b-865b-e1414eea24f5',
                nombre: 'Alejandra Gonzales Jimenez',
                email: firebase.auth().currentUser.email,
            })
            .then(function () {
                toggleModal();
                Alert.alert(
                    "Cita creada",
                    "La Cita fue creada correctamente",
                    [
                        { text: "OK" }
                    ],
                    { cancelable: false }
                )


            })
            .catch(function (error) {
                console.log('Error al crear', error);
            });
    }
    const _renderItem = ({ item, index }) => {
        return (
            <View style={styles.cardContainer}>
                <View style={styles.Imagen}>
                    <Image style={styles.cardImage} source={item.image} />
                </View>
                <View style={styles.Texto}>
                    <View style={styles.txt}>
                        <Text style={styles.cardTitle}>{item.name}</Text>
                        <Text style={{ paddingTop: '3%' }}>Contacto: {item.telf}</Text>
                        <Text style={{ paddingTop: '3%' }}>{item.correo}</Text>
                    </View>
                    <View>
                        <TouchableOpacity style={styles.icono} >
                            <Icon
                                name='calendar'
                                size={20}
                                color='#fff'
                                style={{ paddingRight: 10 }}
                                style={styles.boton}
                                onPress={toggleModal}
                            />

                        </TouchableOpacity>
                    </View>


                </View>
            </View>
        );
    }


    return (
        <View style={styles.container}>

            <Carousel
                ref={carouselRef}
                data={personas}
                renderItem={_renderItem}
                sliderWidth={Dimensions.get('window').width}
                itemWidth={300}
                layout={'tinder'}
                layoutCardOffset={9}
            />
            <Modal
                isVisible={isModalVisible}
                deviceWidth={width}
                deviceHeight={height}
            >
                <View style={{ flex: 1, backgroundColor: 'white' }}>
                    <Text>Seleccione la Fecha y hora para registrar la donacion</Text>


                    <View style={{ flex: 4, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: '20%' }}>
                        <TouchableOpacity style={styles.icono2} >
                            <Icon
                                name='calendar'
                                size={30}
                                color='#1196BA'
                                style={styles.boton}
                                onPress={showDatepicker}
                            />

                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.icono2]} >
                            <Icon
                                name='clock'
                                size={30}
                                color='#1196BA'
                                style={styles.boton}
                                onPress={showTimepicker}
                            />

                        </TouchableOpacity>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                        <TouchableOpacity style={styles.icono} onPress={toggleModal} >
                            <Text style={{ color: '#fff', fontWeight: 'bold' }}>Salir</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.icono, {
                            borderColor: '#1196BA', borderWidth: 1, backgroundColor: '#fff',
                            marginHorizontal: '3%'
                        }]} onPress={RegistrarCita} >
                            <Text style={{ color: '#1196BA', fontWeight: 'bold', }}>Registrar</Text>
                        </TouchableOpacity>
                    </View>
                    {show && (
                        <DateTimePicker
                            value={date}
                            mode={mode}
                            is24Hour={true}
                            display="spinner"
                            onChange={onChange}

                        />
                    )}
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        flex: 1,
        justifyContent: 'flex-start',
        paddingTop: '15%',
        paddingBottom: '20%',
        backgroundColor: '#fff',
    },
    carousel: {
        marginBottom: '2%'
    },
    cardContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        backgroundColor: '#fff',
        height: 200,
        width: 310,
        borderRadius: 20,
        borderColor: '#a2a2a2',
        borderWidth: 0.3
    },
    Imagen: {

    },
    cardImage: {
        height: height * 0.5,
        width: 310,
        bottom: 0,
        marginBottom: '5%'
    },
    Texto: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginTop: '10%'

    },
    txt: {
        alignSelf: 'center',
        paddingHorizontal: '5%'
    },
    icono: {
        backgroundColor: '#1196BA',
        width: 60,
        height: 43,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icono2: {
        backgroundColor: '#fff',
        width: 100,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderColor: '#1196BA',
        borderWidth: 1,
        borderRadius: 10
    },
    cardTitle: {
        color: '#05375a',
        fontSize: 18,
        fontWeight: 'bold',
    },

});
export default Donar;