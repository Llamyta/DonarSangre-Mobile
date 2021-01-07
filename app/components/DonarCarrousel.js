import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Button, Dimensions } from 'react-native';

import Carousel from 'react-native-snap-carousel';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


export default function DonarCarrousel(personas) {



    onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };
    showMode = currentMode => {
        setShow(true);
        setMode(currentMode);
    };
    calendario = () => {
        console.log("Me apretaste we :v");
        showMode('date');

    }
    _renderItem = ({ item, index }) => {
        return (
            <View style={styles.cardContainer}>
                <View style={styles.Imagen}>
                    <Image style={styles.cardImage} source={item.image} />
                </View>
                <View style={styles.Texto}>
                    <View style={styles.txt}>
                        <Text style={styles.cardTitle}>{item.name}</Text>
                        <Text style={{ paddingTop: '10%' }}>Contacto: {item.telf}</Text>
                        <Text style={{ paddingTop: '3%' }}>{item.correo}</Text>
                    </View>
                    <View style={styles.icono} >
                        <Icon
                            name='calendar'
                            size={20}
                            color='#fff'
                            style={{ paddingRight: 10 }}
                            style={styles.boton}
                            onPress={() => this.calendario()}
                        />
                    </View>
                    {this.show && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode={mode}
                            is24Hour={true}
                            display="default"
                            onChange={onChange}
                        />
                    )}
                </View>
            </View>
        );
    }


        return (
            <View style={styles.container}>

                <Carousel
                    ref={(c) => { this._carousel = c; }}
                    data={this.state.personas}
                    renderItem={this._renderItem}
                    sliderWidth={Dimensions.get('window').width}
                    itemWidth={300}
                    layout={'tinder'}
                    layoutCardOffset={'9'}
                />
            </View>
        );
}
const { height } = Dimensions.get("screen");
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
        borderRadius: 10,
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
        height: 40,
        borderTopLeftRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',

    },
    cardTitle: {
        color: '#05375a',
        fontSize: 18,
        fontWeight: 'bold',
    },

});

