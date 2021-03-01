
import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Dimensions, Alert, StatusBar, Image, Modal, TouchableOpacity, ActivityIndicator, PermissionsAndroid } from 'react-native'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app'
import { Content, Item, Input, Label, Button, Text, Left, Body, Right, Icon, } from 'native-base';
import RNPickerSelect from 'react-native-picker-select';
import Ionicons from 'react-native-vector-icons/Ionicons';
const { width, height } = Dimensions.get('window');
import { useSelector } from 'react-redux'


export default function Signup({ navigation }) {
    const data = useSelector(state => state.user)
    console.log(data.UserEmail)

    const [su, setsu] = useState(false)
    setTimeout(() => {
        setsu(false)
    }, 6000);

    // Date Time
    var today = new Date();
    var dateTime = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear() + "    " +
        today.getHours() + ":" + today.getMinutes();
        
    const [dd, setDd] = useState('')
        useEffect(() => {
            firestore().collection('Company').doc(data.UserEmail).get()
                .then(function (doc) {
                    setDd(doc.data())
                })
                .then(() => {
                    console.log('✅ Search Successfull')
                })
                .catch((error) => {
                    console.log(error.message);
                    console.log('⚠️ This Key Is Not Present In Database', error.message)
                });
        }, [])

console.log(dd)
    const [jn, setJn] = useState('')
    const [jd, setJd] = useState('')
    const [js, setJs] = useState('')
    const [jc, setJc] = useState('')

    const userSignUp = () => {
        if (jn.length == '' || js.length == '' || jd.length == '' || jc.length == '') {
            Alert.alert("User Information", "Text Field Can Not Be Empty")
        }
        else {
            setsu(true)
                    firestore().collection('Job').doc().set({
                        JobName: jn,
                        JobDescription: jd,
                        JobSalary: js,
                        JobCriteria: jc,
                        CompanyName: dd.CompanyName,
                        HR: dd.HR,
                        Established: dd.Established,
                        PhoneNum: dd.PhoneNum,
                        Email: data.UserEmail,
                        VacancyDateTime: dateTime,
                        CompanyReg: dd.DateTime,
                        TimeStamp: firebase.firestore.FieldValue.serverTimestamp(),
                        Apply: 'false'
                    })
                    .then(() => {
                        setJn("")
                        setJd("")
                        setJs("")
                        setJc("")
                        Alert.alert('Congratulations! ' +  'Job Has Been Posted');
                    })
            
        }
    }





    return (
        <View style={{ flex: 1, backgroundColor: "#13697d", width: '100%', height: '100%', justifyContent: 'center' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', backgroundColor: "#13697d", elevation: 5, width: '100%', }}>
                <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack()}
                    style={{ marginLeft: -20, marginVertical: 14, width: 30, }}>
                    <Text style={{
                        color: 'white', fontWeight: 'bold', fontSize: 27,
                        textShadowColor: 'grey', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 5,
                    }}><Ionicons name="md-chevron-back" size={30} color="#ffff" /></Text>
                </TouchableOpacity>
                <Text style={{
                    color: 'white', fontWeight: 'bold', marginVertical: 15, fontSize: 25,
                    textShadowColor: 'grey', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 5,
                }}>Post New Vacancy</Text>
                <Text style={{
                    color: 'white', fontWeight: 'bold', marginVertical: 15, fontSize: 20,
                    textShadowColor: 'grey', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 5,
                }}></Text>
            </View>


            <Content style={{ marginHorizontal: 25, marginTop: 5 }}>

                <Item floatingLabel style={{ marginBottom: 15, marginTop: 24, color: '#ffff' }}>
                    <Label style={{ color: '#ffff' }}>Job Name</Label>
                    <Input
                        maxLength={20}
                        keyboardType='default'
                        style={{ color: '#ffff' }}
                        onChangeText={text => setJn(text)}
                        value={jn} />
                </Item>

                <Item floatingLabel style={{ marginBottom: 15, color: '#ffff' }}>
                    <Label style={{ color: '#ffff' }}>Job Description</Label>
                    <Input
                        maxLength={30}
                        keyboardType='default'
                        style={{ color: '#ffff' }}
                        onChangeText={text => setJd(text)}
                        value={jd} />
                </Item>

 

                <Item floatingLabel style={{ marginBottom: 14, color: '#ffff' }}>
                    <Label style={{ color: '#ffff' }}>Job Salary</Label>
                    <Input
                        maxLength={6}
                        keyboardType='number-pad'
                        style={{ color: '#ffff' }}
                        onChangeText={text => setJs(text)}
                        value={js} />
                </Item>


                <Item floatingLabel style={{ marginBottom: 16, color: '#ffff' }}>
                    <Label style={{ color: '#ffff' }}>Enligible Criteria</Label>
                    <Input
                        maxLength={20}
                        style={{ color: '#ffff' }}
                        onChangeText={text => setJc(text)}
                        value={jc} />
                </Item>



                <TouchableOpacity activeOpacity={0.7}
                    style={{ elevation: 3, flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffff', marginTop: 15, margin: 5, height: 50, borderRadius: 50, }}
                    onPress={() => { userSignUp() }}>
                    {su ?
                        <ActivityIndicator size="medium" color="#fff" />
                        :
                        <Text style={{ color: '#13697d', fontWeight: 'bold', fontSize: 25 }}>POST JOB</Text>
                    }
                </TouchableOpacity>

            </Content>
        </View>


    )
}


const pickerSelectStyles = StyleSheet.create({
    inputAndroid: {
        fontSize: 17,
        paddingBottom: 5,
        borderBottomColor: '#E9DCDC',
        borderBottomWidth: 1,
        color: "#ffff"
    },
    placeholder: {
        color: 'white',
    },
});