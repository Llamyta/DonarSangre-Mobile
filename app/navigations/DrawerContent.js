import React from 'react';
import { View, StyleSheet} from 'react-native';
import * as firebase from 'firebase';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Avatar, Title, Caption, Paragraph, Drawer, Text, TouchableRipple, Switch } from 'react-native-paper'


import Icon from 'react-native-vector-icons/MaterialIcons'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'


export function DrawerContent(props) {
    const {
        userInfo: { uid, displayName, email, photoURL },
    } = props;
    const {
        info: { foto, nombre , ci}
    } = props;


    const changeAvatar = () => {
        console.log("Cambiar avatar");
    };

    const [isDarkTheme, setIsDarkTheme] = React.useState(false);
    const toggleTheme = () => {
        setIsDarkTheme(!isDarkTheme);
    }

    return (

        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View>
                        <View style={styles.avatar}>
                            <Avatar.Image
                                source={{
                                    uri: foto ? foto : "https://api.adorable.io/avatars/267/abott@adorable.png"
                                }}
                                size={120}
                                onPress={changeAvatar}
                            />
                            <View style={{ flexDirection: 'column' }}>
                                <Title style={[styles.title,{textAlign:'center'}]}>{nombre ? nombre : "Visita"}</Title>
                                <Caption style={styles.caption}>{email ? email : "luchito@gmail.com"}</Caption>
                            </View>
                        </View>

                        <View style={styles.row}>
                            <View style={[styles.section,styles.userInfoSection]}>
                                <Paragraph style={[styles.paragraph, styles.caption]}>5</Paragraph>
                                <Caption style={styles.caption}>Donador de Sangre</Caption>
                            </View>
                        </View>
                    </View>

                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem
                            icon={({ size }) => (
                                <Icon
                                    name="today"
                                    color="#000"
                                    size={size}
                                />
                            )}
                            label="Citas"
                            onPress={() => { props.navigation.navigate('Home') }}
                        />

                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="favorite"
                                    color="#000"
                                    size={size}
                                />
                            )}
                            label="Donar"
                            onPress={() => { props.navigation.navigate('Donar') }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="room"
                                    color="#000"
                                    size={size}
                                />
                            )}
                            label="Puntos de Donacion"
                            onPress={() => { props.navigation.navigate('Donaciones') }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="create"
                                    color="#000"
                                    size={size}
                                />
                            )}
                            label="Solicitar Donaciones"
                            onPress={() => { props.navigation.navigate('Solicita') }}
                        />
                        
                        
                    </Drawer.Section>
                    <Drawer.Section title="Configuracion">
                        {/* <TouchableRipple onPress={() => { toggleTheme() }}>
                            <View style={styles.preference}>
                                <Text>Dark Theme</Text>
                                <View pointerEvents="none">
                                    <Switch value={isDarkTheme} />
                                </View>
                            </View>
                        </TouchableRipple> */}
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icons
                                    name="account-outline"
                                    color="#000"
                                    size={size}
                                />
                            )}
                            label="Perfil"
                            onPress={() => { props.navigation.navigate('Perfil') }}
                        />
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            {/**Cerrar sesion */}
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem
                    icon={({ color, size }) => (
                        <Icon
                            name="exit-to-app"
                            color="#000"
                            size={size}
                        />
                    )}
                    label="Cerrar Sesion"
                    onPress={() => firebase.auth().signOut()}
                />
            </Drawer.Section>
        </View>
    );
}


const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        paddingLeft: 20,
    },
    title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,

    },
    drawerSection: {
        marginTop: 15,

    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#1196BA',
        borderTopWidth: 1
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    avatar:{
        flexDirection: 'column', 
        marginTop: 30, 
        alignItems:'center' 
    }
});