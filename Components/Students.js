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
import RNPickerSelect from 'react-native-picker-select';
import { useSelector } from 'react-redux'


export default function PostNewVacancies({ navigation, route }) {

    const datar = useSelector(state => state.user)
    console.log(datar.UserEmail)

    const [data, setData] = useState([])
    useEffect(() => {
        firestore().collection('Student').orderBy('TimeStamp', 'desc').onSnapshot(function (querySnapshot) {
            setData(
                querySnapshot.docs.map((doc) => ({
                    Id: doc.id,
                    fn: doc.data().FirstName,
                    ln: doc.data().LastName,
                    age: doc.data().Age,
                    gender: doc.data().Gender,
                    StudentEmail: doc.data().StudentEmail,
                    skills: doc.data().Skills,
                    qualification: doc.data().Qualification,
                    department: doc.data().Department,
                    DateTime: doc.data().DateTime,
                    pn: doc.data().PhoneNum,
                    type: doc.data().Type,
                }))

            )
        })
    }, [])


    const [search, setSearch] = useState("")
    const filterSearch = data.filter((f) => {
        return f.department.toLowerCase().includes(search.toLowerCase())
    })

    const [searc, setSearc] = useState("")
    const filterSearc = data.filter((f) => {
        return f.skills.toLowerCase().includes(searc.toLowerCase())
    })

const del = (StudentEmail)=>{
    console.log(StudentEmail)
    firestore().collection('Student').doc(StudentEmail).delete()
}

const edit = (StudentEmail)=>{
    // firestore().collection('Student').doc(del).delete()
}
  

    return (<View>

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
            }}>Student's List</Text>
            <Text style={{
                color: 'white', fontWeight: 'bold', marginVertical: 15, fontSize: 20,
                textShadowColor: 'grey', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 5,
            }}></Text>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 12, marginBottom: 1, width: '100%', }}>
            <Text style={{
                color: '#13697d', fontWeight: 'bold', fontSize: 18,
                textShadowColor: 'grey', textShadowOffset: { width: 0.2, height: 0.1 }, textShadowRadius: 1,
            }}>Short List Students By Search</Text>
        </View>


        <TouchableOpacity activeOpacity={0.8} style={{ flexDirection: 'row', justifyContent: 'space-around', backgroundColor: '#ffff', borderRadius: 25, marginTop: 15, marginBottom: 10, marginHorizontal: 25, paddingHorizontal: 15, elevation: 4, alignItems: 'center' }} >
            <RNPickerSelect onValueChange={(text) => { setSearch(text) }}
                placeholder={{ label: "Search by Departments", value: '', }}
                style={{ ...pickerSelectStyles }}
                useNativeAndroidPickerStyle={false}
                items={[
                    { label: 'All Departments', value: '' },
                    { label: 'Computer Science', value: 'Computer Science' },
                    { label: 'Software Engr.', value: 'Software Engr.' },
                    { label: 'Civil Engr.', value: 'Civil Engr.' },
                    { label: 'Electronics Engr.', value: 'Electronics Engr.' },
                ]}
            />
            <Ionicons name="search" size={20} color="#13697d" />
        </TouchableOpacity>


        <ScrollView style={styles.end}>
            {filterSearch.map((d, i) => {
                return <>
                    {/* {filterSearc.map((d, i) => {
                        return  */}
                        <TouchableOpacity activeOpacity={0.8} style={{}} key={i} onPress={() => {
                            // navigation.navigate('Main', {
                            //     key: d.Id,
                            //     // cn: d.cn,
                            // })
                        }} style={styles.data} >

                            <View style={{
                                // justifyContent: 'space-between',
                                // flexDirection: 'row',
                            }}>


                                {(datar.UserEmail) == 'admin@admin.com' ? <View style={{position:'absolute', right:-50}}>

                                    <TouchableOpacity activeOpacity={0.4} onPress={() => {del(d.StudentEmail)}}
                                        style={{ marginVertical: 14, width: 30, borderRadius: 50 }}>
                                        <Text style={{
                                            color: '#13697d', fontWeight: 'bold', fontSize: 27,
                                            textShadowColor: 'grey', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 5,
                                        }}><MaterialCommunityIcons name="delete" size={30} color="#13697d" /></Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity activeOpacity={0.4} onPress={() => { navigation.navigate('ES',{
                                        email: d.StudentEmail
                                    })
                                }
                                
                                }
                                        style={{ marginVertical: 14, width: 30, borderRadius: 50 }}>
                                        <Text style={{
                                            color: '#13697d', fontWeight: 'bold', fontSize: 27,
                                            textShadowColor: 'grey', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 5,
                                        }}><FontAwesome name="edit" size={30} color="#13697d" /></Text>
                                    </TouchableOpacity>
                                </View>
                                    : <></>}

                                <View style={{ alignItems: 'center' }}>
                                    {d.gender == 'Female' ?
                                        <Image source={require('./Images/female.png')}
                                            style={{ width: 90, height: 90, borderRadius: 50, }} />
                                        :
                                        <Image source={require('./Images/male.webp')}
                                            style={{ width: 90, height: 90, borderRadius: 50, }} />
                                    }
                                </View>
                                <View>
                                    <Text style={{ fontSize: 18, paddingTop: 14 }}>   FName:    {d.fn}</Text>
                                    <Text style={{ fontSize: 18, paddingTop: 2 }}>   LName:    {d.ln}</Text>
                                    <Text style={{ fontSize: 18, textTransform: 'capitalize', paddingTop: 2 }}>   Age:          {d.age}</Text>
                                    <Text style={{ fontSize: 18, textTransform: 'capitalize', paddingTop: 2 }}>   Gender:    {d.gender}</Text>
                                    <Text style={{ fontSize: 18, textTransform: 'capitalize', paddingTop: 2 }}>   Depart:     {d.department}</Text>
                                    <Text style={{ fontSize: 18, textTransform: 'capitalize', paddingTop: 2 }}>   Skills:        {d.skills}</Text>
                                    <Text style={{ fontSize: 18, textTransform: 'capitalize', paddingTop: 2 }}>   Qualifi:      {d.qualification}</Text>
                                    <Text style={{ fontSize: 18, textTransform: 'capitalize', paddingTop: 2 }}>   Email:        {d.StudentEmail}</Text>
                                    <Text style={{ fontSize: 18, textTransform: 'capitalize', paddingTop: 2 }}>   Phone:      {d.pn}</Text>
                                    <Text style={{ fontSize: 18, textTransform: 'capitalize', paddingTop: 2 }}>   Reg At:      {d.DateTime}</Text>
                                </View>
                            </View>



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
        margin: 15,
        backgroundColor: "#ffff",
        elevation: 5,
        borderRadius: 15,
        padding: 10,
        // paddingLeft:18
    },

    end:{
        marginBottom:160,
    }

});

const pickerSelectStyles = StyleSheet.create({
    inputAndroid: {
        width: 160,
        fontSize: 14,
        color: "grey",
        paddingVertical: 7,
    },
    placeholder: {
        color: 'grey',
    },
});