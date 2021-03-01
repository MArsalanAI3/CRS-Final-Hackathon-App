import React, { useState, useEffect } from 'react'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app'
import { StyleSheet, View, Text, ScrollView, Image, ImageBackground, TouchableOpacity, Modal, Dimensions, StatusBar, Alert } from 'react-native'
const { width, height } = Dimensions.get('window');
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { useDispatch } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux'

export default function Vacancies({ navigation }) {

    const datar = useSelector(state => state.user)
    console.log(datar.UserEmail)

    const [data, setData] = useState([])
    useEffect(() => {
        firestore().collection('Job').orderBy('TimeStamp', 'desc').onSnapshot(function (querySnapshot) {
            setData(
                querySnapshot.docs.map((doc) => ({
                    Id: doc.id,
                    cn: doc.data().CompanyName,
                    jn: doc.data().JobName,
                    jd: doc.data().JobDescription,
                    js: doc.data().JobSalary,
                    jc: doc.data().JobCriteria,
                    email: doc.data().Email,
                    vdateTime: doc.data().VacancyDateTime,
                    creg: doc.data().CompanyReg,
                    pn: doc.data().PhoneNum,
                    dateTime: doc.data().DateTime,
                    apply: doc.data().Apply,

                }))

            )
        })
    }, [])



    const del = (CompanyEmail) => {
        console.log(CompanyEmail)
        firestore().collection('Job').doc(CompanyEmail).delete()
    }

    const Appl = (a, Id) => {
        console.log(a,Id)
        if(a=='false'){
        firestore().collection('Job').doc(Id).update({
            Apply: 'true',
        })  
        .then(() => {
                Alert.alert('Apply! ', 'Applied Successfully');
            })
        }
       else {
            firestore().collection('Job').doc(Id).update({
                Apply: 'false',
            })
             .then(() => {
                    Alert.alert('Apply! ', 'Applied Cancelled');
                })
            }
    }


    return (
        <View>

            <StatusBar barStyle="light-content" backgroundColor="#13697d" />

            <View style={{ flexDirection: 'row', justifyContent: 'space-around', backgroundColor: "#13697d", elevation: 8, width: '100%', }}>
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
                }}>Vacancy's List</Text>
                <Text style={{
                    color: 'white', fontWeight: 'bold', marginVertical: 15, fontSize: 20,
                    textShadowColor: 'grey', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 5,
                }}></Text>
            </View>


            <ScrollView style={styles.end}>
                {data.map((d, i) => {
                    return <>
                        <TouchableOpacity activeOpacity={0.8} key={i} onPress={() => {
                            
                        }} style={styles.data} key={i}>

                            <View style={{
                            }}>

                                {(datar.UserEmail) == 'admin@admin.com' ? <View style={{ position: 'absolute', right: -20 }}>
                                    <TouchableOpacity activeOpacity={0.4} onPress={() => { del(d.Id) }}
                                        style={{ marginVertical: 14, width: 30, borderRadius: 50 }}>
                                        <Text style={{
                                            color: 'black', fontWeight: 'bold', fontSize: 27,
                                            textShadowColor: 'grey', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 5,
                                        }}><MaterialCommunityIcons name="delete" size={30} color="black" /></Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity activeOpacity={0.4} onPress={() => { edit(d.Id) }}
                                        style={{ marginVertical: 14, width: 30, borderRadius: 50 }}>
                                        <Text style={{
                                            color: '#ffff', fontWeight: 'bold', fontSize: 27,
                                            textShadowColor: '#ffff', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 5,
                                        }}><FontAwesome name="edit" size={30} color="#ffff" /></Text>
                                    </TouchableOpacity>
                                </View>
                                    : <></>}

                                <View style={{ alignItems: 'center' }}>
                                    <Image source={require('./Images/co1.jpg')}
                                        style={{ width: 110, height: 100, borderRadius: 50, marginVertical: 5 }} />
                                </View>
                                <View>
                                    <Text style={{ fontSize: 20, textTransform: 'capitalize', paddingTop: 2 }}><FontAwesome name="building" size={12} color="#13697d" />  Company:      {d.cn}</Text>
                                    <Text style={{ fontSize: 20, textTransform: 'capitalize', paddingTop: 2 }}><Fontisto name="person" size={11.3} color="#13697d" />  Job Name:    {d.jn}</Text>
                                    <Text style={{ fontSize: 20, textTransform: 'capitalize', paddingTop: 2 }}><FontAwesome name="pencil" size={11.3} color="#13697d" />  Job Descri.:  {d.jd}</Text>
                                    <Text style={{ fontSize: 20, textTransform: 'capitalize', paddingTop: 2 }}><FontAwesome name="money" size={11.3} color="#13697d" />  Job Salary:   {d.js}</Text>
                                    <Text style={{ fontSize: 20, textTransform: 'capitalize', paddingTop: 2 }}><FontAwesome name="mortar-board" size={11.3} color="#13697d" /> Job Criteria:  {d.jc}</Text>
                                    <Text style={{ fontSize: 20, textTransform: 'capitalize', paddingTop: 2 }}><Fontisto name="email" size={11.3} color="#13697d" />  Email:             {d.email}</Text>
                                    <Text style={{ fontSize: 20, textTransform: 'capitalize', paddingTop: 2 }}><MaterialCommunityIcons name="email" size={11.3} color="#13697d" />  Last Date:     {d.vdateTime}</Text>
                                    <Text style={{ fontSize: 20, textTransform: 'capitalize', paddingTop: 2 }}><FontAwesome name="phone" size={12} color="#13697d" />  Phone:            {d.pn}</Text>
                                    {/* <Text style={{ fontSize: 15, textTransform: 'capitalize', paddingTop: 2 }}><Entypo name="back-in-time" size={11.3} color="black" />  Reg At:          {d.dateTime}</Text> */}

                                </View>
                            </View>
                            {d.apply == 'true' ?
                                <TouchableOpacity style={{ backgroundColor: "#13697d", borderRadius: 25, marginVertical: 25 }} onPress={() => { Appl("true", d.Id) }}>
                                    <Text style={{
                                        fontSize: 20, fontWeight: 'bold', color: '#ffff', paddingHorizontal: 20, paddingVertical: 5,
                                    }}>  Applied  </Text>
                                </TouchableOpacity>

                                :

                                    <TouchableOpacity style={{ backgroundColor: "#13697d", borderRadius: 25, marginVertical: 25 }} onPress={() => { Appl("false", d.Id) }}>
                                        <Text style={{
                                            fontSize: 20, fontWeight: 'bold', color: '#ffff', paddingHorizontal: 20, paddingVertical: 5,
                                        }}>  Apply  </Text>
                                    </TouchableOpacity>
                                 
                            }


                        </TouchableOpacity>
                    </>
                })}
            </ScrollView>


        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%'
    },

    data: {
        alignItems: 'center',
        // justifyContent: 'space-between',
        // flexDirection: 'row',
        margin: 10,
        backgroundColor: "#ffff",
        elevation: 5,
        borderRadius: 15,
        padding: 10,
        // paddingLeft:18
    },
    
    end: {
        marginBottom: 60,
        // backgroundColor:"#"
    }




});