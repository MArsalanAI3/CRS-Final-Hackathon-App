  
import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Dimensions, Alert, StatusBar, Image, Modal, TouchableOpacity, ActivityIndicator, PermissionsAndroid } from 'react-native'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app'
import { Content, Item, Input, Label, Button, Text, Left, Body, Right, Icon, } from 'native-base';
import RNPickerSelect from 'react-native-picker-select';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Signup from './Signup';
const { width, height } = Dimensions.get('window');

export default function Company({navigation}) {
 
    const [su, setsu] = useState(false)
    setTimeout(() => {
        setsu(false)
    }, 6000);

    // Date Time
    var today = new Date();
    var dateTime = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear() + "    " +
        today.getHours() + ":" + today.getMinutes();

    const [cn, setCn] = useState('')
    const [es, setEs] = useState('')
    const [hr, setHr] = useState('')    
    const [pn, setPn] = useState('')
    const [signupemail, setSignupemail] = useState('')
    const [signuppassword, setSignuppassword] = useState('')

    const userSignUp = () => {
        if (cn.length == '' || es.length == '' || hr.length == '' || pn.length == '') {
            Alert.alert("User Information", "Text Field Can Not Be Empty")
        }
        else if (pn.length < 11) {
            Alert.alert("Phone Number", "Please Enter 11 Digits Phone Number")
        }
        else if (signupemail.length == '') {
            Alert.alert("Email", "Please Enter Email")
        }
        else if (signuppassword.length == '') {
            Alert.alert("Password", "Please Enter Password")
        }
        else if (signuppassword.length < 6) {
            Alert.alert("Password", "Minimum 6 Character Or Digits")
        }
        else {
            setsu(true)
            auth().createUserWithEmailAndPassword(signupemail, signuppassword)
                .then(() => {
                    firestore().collection('Company').doc(signupemail).set({
                        CompanyName: cn,
                        Established: es,
                        HR: hr,
                        PhoneNum: pn,
                        Type:'Company',
                        Apply: 'false',
                        CompanyEmail: signupemail,
                        DateTime: dateTime,
                        TimeStamp: firebase.firestore.FieldValue.serverTimestamp()
                    }).then(() => {
                        setCn("")
                        setEs("")
                        setHr("")
                        setPn("")
                        setSignupemail("")
                        setSignuppassword("")
                        // navigation.replace('Signin')
                        navigation.goBack()
                        Alert.alert('Congratulations! ' +cn , 'You Are Successfully Registered As a Company! Proceed To LogIn');
                    })
                })
                .catch(error => {
                    if (error.code === 'auth/email-already-in-use') {
                        Alert.alert('This email address is already in use!');
                    }
                    if (error.code === 'auth/invalid-email') {
                        Alert.alert('This email address is invalid!');
                    }
                    if (error.code === 'auth/weak-password') {
                        Alert.alert('Weak Password!');
                    }

                })
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: "#13697d", width: '100%', height: '100%', justifyContent: 'center' }}>

            <Content style={{ marginHorizontal: 25, marginTop: 5 }}>

                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-evenly' }}>
                    <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack()}
                        style={{ marginLeft: -20, marginVertical: 14, width: 30 }}>
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 27, }}>
                            <Ionicons name="md-chevron-back" size={30} color="#ffff" />
                        </Text>
                    </TouchableOpacity>
                    <Text style={{ color: 'white', fontWeight: 'bold', marginVertical: 18, fontSize: 25 }}>CREATE COMPANY ACCOUNT</Text>
                    <Text></Text>
                </View>



                <Item floatingLabel style={{ marginBottom: 15, marginTop: 4, color: '#ffff' }}>
                    <Label style={{ color: '#ffff' }}>Company Name</Label>
                    <Input
                        maxLength={20}
                        keyboardType='default'
                        style={{ color: '#ffff' }}
                        onChangeText={text => setCn(text)}
                        value={cn} />
                </Item>

                <Item floatingLabel style={{ marginBottom: 22, color: '#ffff' }}>
                    <Label style={{ color: '#ffff' }}>Established</Label>
                    <Input
                        maxLength={20}
                        keyboardType='default'
                        style={{ color: '#ffff' }}
                        onChangeText={text => setEs(text)}
                        value={es} />
                </Item>

                    
                <Item floatingLabel style={{ marginBottom: 14, color: '#ffff' }}>
                    <Label style={{ color: '#ffff' }}>HR Name</Label>
                    <Input
                        maxLength={20}
                        keyboardType='default'
                        style={{ color: '#ffff' }}
                        onChangeText={text => setHr(text)}
                        value={hr} />
                </Item>


                <Item floatingLabel style={{ marginBottom: 14, color: '#ffff' }}>
                    <Label style={{ color: '#ffff' }}>Phone Number</Label>
                    <Input
                        maxLength={11}
                        keyboardType='number-pad'
                        style={{ color: '#ffff' }}
                        onChangeText={text => setPn(text)}
                        value={pn} />
                </Item>

                <Item floatingLabel style={{ marginBottom: 13, color: '#ffff' }}>
                    <Label style={{ color: '#ffff' }}>Email</Label>
                    <Input
                        maxLength={20}
                        keyboardType="email-address"
                        style={{ color: '#ffff' }}
                        onChangeText={text => setSignupemail(text)}
                        value={signupemail} />
                </Item>

                <Item floatingLabel style={{ marginBottom: 15, color: '#ffff' }}>
                    <Label style={{ color: '#ffff' }}>Password</Label>
                    <Input
                        maxLength={15}
                        secureTextEntry={true}
                        style={{ color: '#ffff' }}
                        onChangeText={text => setSignuppassword(text)}
                        value={signuppassword} />
                </Item>


                <TouchableOpacity activeOpacity={0.7}
                    style={{ elevation: 3, flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffff', marginTop: 5, margin: 5, height: 50, borderRadius: 50, }}
                    onPress={() => { userSignUp() }}>
                    {su ?
                        <ActivityIndicator size="small" color="black" />
                        :
                        <Text style={{ color: '#13697d', fontWeight: 'bold', fontSize: 20 }}>CREATE</Text>
                    }
                </TouchableOpacity>

            </Content>
        </View>


    )
}



const pickerSelectStyles = StyleSheet.create({
    inputAndroid: {
        fontSize: 17,
        paddingTop: 7,
        paddingBottom: 4.5,
        borderBottomColor: '#E9DCDC',
        borderBottomWidth: 1,
        color: "white"
    },
    placeholder: {
        color: 'white',
    },
});