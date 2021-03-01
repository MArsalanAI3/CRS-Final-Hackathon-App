import React from 'react'
import { View, StyleSheet, Dimensions, Alert, StatusBar, Image, Modal, TouchableOpacity, ActivityIndicator } from 'react-native'
import { Content, Item, Input, Label, Button, Text, Left, Body, Right, Icon, } from 'native-base';
const { width, height } = Dimensions.get('window');

export default function Main({navigation}) {
    return (
        <View style={styles.container}>
        <StatusBar backgroundColor="#13697d" />

        <View style={{alignItems:'center'}}>
        <Text style={{ color: '#ffff', fontWeight: 'bold', fontSize: 30 ,marginTop: 40}}>Campus Recruitment</Text>
        <Text style={{ color: '#ffff', fontWeight: 'bold', fontSize: 30 }}>System</Text>   

            <Image source={require('./Images/Splash.png')}
                style={{ backgroundColor: '#13697d', resizeMode: 'contain', height: 170, marginTop: 30 }} />
        </View>
        <Content style={{ marginHorizontal: 25, alignContent: 'center' }}>
        
            <TouchableOpacity activeOpacity={0.7}
                style={{ elevation: 3, flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffff', marginTop: 40, margin: 5, height: 50, borderRadius: 10, }}
                onPress={() => { navigation.navigate('Signin', {LoginType: 'Student' }) }}
            >
                    <Text style={{ color: '#13697d', fontWeight: 'bold', fontSize: 20 }}>STUDENT</Text>   
            </TouchableOpacity>


            <TouchableOpacity activeOpacity={0.7}
                style={{ elevation: 3, flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffff', marginTop: 20, margin: 5, height: 50, borderRadius: 10, }}
                onPress={() => { navigation.navigate('Signin', {LoginType: 'Company' }) }}
            >
                    <Text style={{ color: '#13697d', fontWeight: 'bold', fontSize: 20 }}>COMPANY</Text>         
            </TouchableOpacity>


            <TouchableOpacity activeOpacity={0.7}
                style={{ elevation: 3, flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffff', marginTop: 20, margin: 5, height: 50, borderRadius: 10, }}
                onPress={() => { navigation.navigate('Signin', {LoginType: 'Admin' }) }}
            >
                    <Text style={{ color: '#13697d', fontWeight: 'bold', fontSize: 20 }}>ADMIN</Text>   
            </TouchableOpacity>

        </Content>


    </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#13697d',
    },
});