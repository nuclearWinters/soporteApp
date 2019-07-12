import React, { useEffect, useState } from "react"
import { NavigationScreenComponent, NavigationScreenProps } from "react-navigation"
import { View, Text, TouchableNativeFeedback, ScrollView, Button, AsyncStorage, Image, ActivityIndicator } from "react-native"
import Icon from "react-native-vector-icons/FontAwesome5"
import moment from "moment"
import config from "moment/locale/es"
import axios from "axios"
import { useSelector } from "react-redux"
import PDFView from 'react-native-view-pdf'

interface Respuesta {
    descripcion: string,
    fecha: Date,
    imagen: string
}

const Detalle: NavigationScreenComponent<{}> = ({ navigation }: NavigationScreenProps ) => {
    moment.updateLocale('es', config);
    let id = navigation.getParam("id")
    let asunto = navigation.getParam("asunto")
    let descripcion = navigation.getParam("descripcion")
    let estado = navigation.getParam("estado")
    let sistema = navigation.getParam("sistema")
    let fecha = new Date(navigation.getParam("fecha"))
    let responsable = navigation.getParam("responsable")
    let nombre = navigation.getParam("nombre")
    let username = navigation.getParam("username")
    let telefono = navigation.getParam("telefono")
    let correo = navigation.getParam("correo")
    let sistemaoperativo = navigation.getParam("sistemaoperativo")
    let navegador = navigation.getParam("navegador")

    let [respuestas, setRespuestas] = useState<Respuesta[]>([])

    let token = useSelector((state: any) => state.token)

    let [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get(`http://192.168.1.200:3000/respuestas?id=${id}&token=${token}`)
        .then(resp => {
            let respuestas: Respuesta[] = resp.data.sort((a: any, b: any) => a.fecha>b.fecha ? -1 : a.fecha<b.fecha ? 1 : 0).map((res: Respuesta) => ({descripcion: res.descripcion, fecha: res.fecha, imagen: res.imagen}))
            setRespuestas(respuestas)
            setLoading(false)
        })
        .catch(error => {
            AsyncStorage.removeItem("token")
            .then(bool => {
                navigation.navigate("NotLogged")
            })
        })
    }, [])

    return(
        <ScrollView style={{backgroundColor: "lightgray"}} contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'space-between'
        }}>
            <View>
                <View style={{marginTop: 20, marginHorizontal: 10, borderRadius: 2, elevation: 3, backgroundColor: "white"}}>
                    <Text style={{borderBottomColor: "lightgray", borderBottomWidth: 2, paddingHorizontal: 10, paddingVertical: 5, color: "black"}}>REPORTE</Text>
                    <View style={{paddingHorizontal: 10, paddingVertical: 5}}>
                        <Text>Asunto: {asunto}</Text>
                        <Text>Descripción: {descripcion}</Text>
                        <View style={{flexDirection: "row"}}>
                            <Text>Estado: {estado}</Text>
                            <Icon style={{paddingHorizontal: 5}} name={estado === "FINALIZADO" ? "check" : estado === "ABIERTO" ? "spinner" : "times"} size={16} color={estado === "FINALIZADO" ? "forestgreen" : estado === "ABIERTO" ? "orange" : "crimson"}/>
                        </View>
                        <Text>Sistema: {sistema}</Text>
                        <Text>Responsable: {responsable}</Text>
                        <Text>Fecha de creación: {moment(fecha).format('dddd D').charAt(0).toUpperCase() + moment(fecha).format('dddd D').slice(1) } de {moment(fecha).format('MMMM Y')}</Text>
                    </View>
                </View>
                <View style={{marginTop: 20, marginHorizontal: 10, borderRadius: 2, elevation: 3, backgroundColor: "white"}}>
                    <Text style={{borderBottomColor: "lightgray", borderBottomWidth: 2, paddingHorizontal: 10, paddingVertical: 5, color: "black"}}>INFORMACIÓN EXTRA</Text>
                    <View style={{paddingHorizontal: 10, paddingVertical: 5}}>
                        <Text>Nombre: {nombre}</Text>
                        <Text>Usuario: {username}</Text>
                        <Text>Telefóno: {telefono}</Text>
                        <Text>Correo: {correo}</Text>
                        <Text>Sistema operativo: {sistemaoperativo}</Text>
                        <Text>Navegador: {navegador}</Text>
                    </View>
                </View>
                <View style={{marginVertical: 20, marginHorizontal: 10, borderRadius: 2, elevation: 3, backgroundColor: "white"}}>
                    <Text style={{borderBottomColor: "lightgray", borderBottomWidth: 2, paddingHorizontal: 10, paddingVertical: 5, color: "black"}}>HISTORIAL</Text>
                    <View style={{paddingHorizontal: 10, paddingVertical: 5}}>
                        {loading ? <View style={{justifyContent: "center", alignItems: "center"}}><ActivityIndicator size="large" /></View> : respuestas.map((res, i) => {
                            let fechaRespuesta = new Date(res.fecha)
                            let imagenArray = res.imagen ? res.imagen.split("/") : ":"
                            let typeAndFormat = imagenArray[0].split(":")
                            let type = typeAndFormat[1]
                            return(
                                <View key={i} style={{marginTop: 5, marginHorizontal: 10, borderBottomColor: "rgb(240,240,240)", borderBottomWidth: 1, paddingBottom: 5}}>
                                    <Text>Descripción: {res.descripcion}</Text>
                                    {!res.imagen ? null : type === "application" ?
                                    <View style={{alignItems: "center", justifyContent: "center"}}>
                                        <View style={{height: 250, width: 250}}>
                                            <PDFView
                                                fadeInDuration={250.0}
                                                style={{ flex: 1 }}
                                                resource={res.imagen.replace("data:application/pdf;base64,", "")}
                                                resourceType="base64"
                                                onLoad={() => console.log(`PDF rendered from base64`)}
                                                onError={() => console.log('Cannot render PDF')}
                                            />
                                        </View>
                                    </View>
                                    :
                                    <Image style={{height: 80, marginVertical: 10}} resizeMode="contain" source={{uri: res.imagen}}/>
                                    }
                                    <Text>Fecha: {moment(fechaRespuesta).format('dddd D').charAt(0).toUpperCase() + moment(fechaRespuesta).format('dddd D').slice(1) } de {moment(fechaRespuesta).format('MMMM Y')}</Text>
                                </View>
                                )
                            } 
                        )}
                    </View>
                </View>
            </View>
            <View>
                <View style={{marginHorizontal: 40}}>
                    <Button title="NUEVA OBSERVACIÓN" onPress={() => console.log("")}/>
                </View>
                <View style={{marginVertical: 20, marginHorizontal: 40}}>
                    <Button title="CERRAR BUG"  onPress={() => console.log("")}/>
                </View>
            </View>
        </ScrollView>
    )
}

Detalle.navigationOptions = ({ navigation }: NavigationScreenProps) => {
    return {
        title: "SOPORTE APP",
        headerRight: (
            <View style={{flexDirection: "row", height: "100%", alignItems: "center", justifyContent: "center"}}>
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

export default Detalle