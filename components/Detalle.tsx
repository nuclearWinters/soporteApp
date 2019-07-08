import React from "react"
import { NavigationScreenComponent, NavigationScreenProps } from "react-navigation"
import { View, Text, TouchableNativeFeedback, ScrollView, Button } from "react-native"
import Icon from "react-native-vector-icons/FontAwesome5"

const Detalle: NavigationScreenComponent<{}> = ({ navigation }: NavigationScreenProps ) => {
    let titulo = navigation.getParam("titulo")
    let descripcion = navigation.getParam("descripcion")
    return(
        <ScrollView style={{backgroundColor: "lightgray"}} contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'space-between'
        }}>
            <View>
                <View style={{marginTop: 20, marginHorizontal: 10, borderRadius: 2, elevation: 3, backgroundColor: "white"}}>
                    <Text style={{borderBottomColor: "lightgray", borderBottomWidth: 2, paddingHorizontal: 10, paddingVertical: 5, color: "black"}}>REPORTE</Text>
                    <View style={{paddingHorizontal: 10, paddingVertical: 5}}>
                        <Text>{titulo}</Text>
                        <Text>{descripcion}</Text>
                    </View>
                </View>
                <View style={{marginTop: 20, marginHorizontal: 10, borderRadius: 2, elevation: 3, backgroundColor: "white"}}>
                    <Text style={{borderBottomColor: "lightgray", borderBottomWidth: 2, paddingHorizontal: 10, paddingVertical: 5, color: "black"}}>INFORMACIÓN EXTRA</Text>
                    <View style={{paddingHorizontal: 10, paddingVertical: 5}}>
                        <Text>{titulo}</Text>
                        <Text>{descripcion}</Text>
                    </View>
                </View>
                <View style={{marginVertical: 20, marginHorizontal: 10, borderRadius: 2, elevation: 3, backgroundColor: "white"}}>
                    <Text style={{borderBottomColor: "lightgray", borderBottomWidth: 2, paddingHorizontal: 10, paddingVertical: 5, color: "black"}}>HISTORIAL</Text>
                    <View style={{paddingHorizontal: 10, paddingVertical: 5}}>
                        <Text>{titulo}</Text>
                        <Text>{descripcion}</Text>
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
        title: "BUGS APP",
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