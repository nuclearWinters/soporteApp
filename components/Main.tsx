import React, { useState, useEffect } from "react"
import { View, ScrollView, Text, TouchableNativeFeedback, TouchableOpacity, TextInput, AsyncStorage } from "react-native"
import { NavigationScreenComponent, NavigationScreenProps } from "react-navigation"
import Icon from "react-native-vector-icons/FontAwesome5"
import axios from "axios"
import { useSelector } from "react-redux"

interface Bugs {
    id: string,
    asunto: string,
    descripcion: string,
    estado: string,
    sistema: string,
    responsable: string,
    fecha: Date,
    username: string,
    nombre: string,
    telefono: string,
    correo: string,
    sistemaoperativo: string,
    navegador: string
}

const Main: NavigationScreenComponent<{}> = ({ navigation }: NavigationScreenProps) => {

    let [detallesFiltered, setDetallesFiltered] = useState<Bugs[]>([])

    let token = useSelector((state: any) => state.token)

    useEffect(() => {
        navigation.setParams({ search: false })
        axios.get(`http://192.168.1.200:3000/bugs?token=${token}`)
        .then(bugs => {
            let bugsasuntoAndDescripcion: Bugs[] = bugs.data.map((bug: any) => ({
                id: bug.id,
                asunto: bug.asunto, 
                descripcion: bug.descripcion, 
                estado: bug.estado, 
                sistema: bug.sistema, 
                responsable: bug.responsable, 
                fecha: bug.fecha, 
                username: bug.username,
                nombre: bug.nombre,
                telefono: bug.telefono,
                correo: bug.correo,
                sistemaoperativo: bug.sistemaoperativo,
                navegador: bug.navegador
            }))
            setDetallesFiltered(bugsasuntoAndDescripcion)
        })
        .catch(err => {
            AsyncStorage.removeItem("token")
            .then(bool => {
                navigation.navigate("NotLogged")
            })
        })
    }, [])

    let text: string = navigation.getParam("text", "")
    
    return(
        <ScrollView>
            {detallesFiltered.filter(det => det.asunto.toLowerCase().includes(text.toLowerCase())).map((det, i) => 
                <TouchableOpacity onPress={() => navigation.navigate("Detalle", {
                        id: det.id,
                        asunto: det.asunto, 
                        descripcion: det.descripcion, 
                        sistema: det.sistema, 
                        estado: det.estado, 
                        responsable: det.responsable, 
                        fecha: det.fecha,
                        username: det.username,
                        nombre: det.nombre,
                        telefono: det.telefono,
                        correo: det.correo,
                        sistemaoperativo: det.sistemaoperativo,
                        navegador: det.navegador
                    })} style={{marginHorizontal: 10, borderBottomColor: "lightgray", borderBottomWidth: 2, paddingVertical: 10, flexDirection: "row"}} key={i}>
                    <View style={{flex: 1}}>
                        <Text style={{color: "black", fontSize: 18}}>{det.asunto}</Text>
                        <Text numberOfLines={1} ellipsizeMode="tail" style={{marginHorizontal: 5, color: "dimgray", fontSize: 16}}>{det.descripcion}</Text>
                    </View>
                    <View style={{width: 20, alignItems: "center", justifyContent: "center"}}>
                        <Icon name="caret-right" color="gray" size={23}/>
                    </View>
                </TouchableOpacity>
            )}
        </ScrollView>
    )
}

Main.navigationOptions = ({ navigation }: NavigationScreenProps) => {
    let search = navigation.getParam("search")
    if (search) {
        return {
            headerLeft: (
                <View style={{height: "100%", alignItems: "center", justifyContent: "center", width: "100%"}}>
                  <TouchableOpacity onPress={() => navigation.setParams({search: false, text: ""})}>
                    <View style={{alignItems: "center", justifyContent: "center", height: 30, width: 30, marginHorizontal: 10}}>
                      <Icon name="times" size={20} />
                    </View>
                  </TouchableOpacity>
                </View>
              ),
              headerStyle: {
                backgroundColor: "white"
              },
              headerTintColor: "rgb(35,153,247)",
              headerTitle: <TextInput
                onChangeText={text => navigation.setParams({text})}
                ref={input => {
                    if (input) {
                        input.focus()
                    }
                }}
                style={{fontSize: 20}}
                value={navigation.getParam("text")}
                placeholder="Buscar un seguimiento..."
              />
        }
    } else {
        return {
            title: "SOPORTE APP",
            headerRight: (
                <View style={{flexDirection: "row", height: "100%", alignItems: "center", justifyContent: "center"}}>
                    <TouchableNativeFeedback onPress={() => navigation.setParams({search: true})} useForeground={true} background={TouchableNativeFeedback.Ripple("rgba(255,255,255,0.4)", true)}>
                        <View style={{alignItems: "center", justifyContent: "center", height: 30, width: 30, marginHorizontal: 10}}>
                            <Icon name="search" size={22} color={navigation.getParam("headerTintColor", "white")}/>
                        </View>
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback onPress={() => navigation.openDrawer()} useForeground={true} background={TouchableNativeFeedback.Ripple("rgba(255,255,255,0.4)", true)}>
                        <View style={{alignItems: "center", justifyContent: "center", height: 30, width: 30, marginHorizontal: 10}}>
                            <Icon name="ellipsis-v" size={16} color={navigation.getParam("headerTintColor", "white")}/>
                        </View>
                    </TouchableNativeFeedback>
                </View>
            ),
            headerTintColor: navigation.getParam("headerTintColor", "white"),
            headerStyle: navigation.getParam("headerStyle", {backgroundColor: "rgb(35,153,247)"})
        }
    }
}

export default Main