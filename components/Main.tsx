import React, { useState, useEffect } from "react"
import { View, Text, TouchableNativeFeedback, TouchableOpacity, TextInput } from "react-native"
import { NavigationScreenComponent, NavigationScreenProps } from "react-navigation"
import Icon from "react-native-vector-icons/FontAwesome5"

interface Bugs {
    titulo: string,
    descripcion: string
}

const Main: NavigationScreenComponent<{}> = ({ navigation }: NavigationScreenProps) => {

    let [detalles, setDetalles] = useState<Bugs[]>([{titulo: "hola", descripcion: "sdlk gna dgkasfhs fsjlvalvn ldjva adadb advbdjavboadjbaj ajdvaodfvboajdv jd v "}, {titulo: "alo", descripcion: "dljkkfgj fjgpwj kfb"}, {titulo: "hello", descripcion: "jksrnj nwrigw oehf"}, {titulo: "hi", descripcion: "lñfkvns fkpekb rkgpkfbn rkg"}])
    let [detallesFiltered, setDetallesFiltered] = useState<Bugs[]>([])

    useEffect(() => {
        navigation.setParams({ search: false })
        setDetallesFiltered(detalles)
    }, [])

    let text = navigation.getParam("text", "")
    
    return(
        <View>
            {detallesFiltered.filter(det => det.titulo.toLowerCase().includes(text.toLowerCase())).map((det, i) => 
                <TouchableOpacity onPress={() => navigation.navigate("Detalle", {titulo: det.titulo, descripcion: det.descripcion})} style={{marginHorizontal: 10, borderBottomColor: "lightgray", borderBottomWidth: 2, paddingVertical: 10, flexDirection: "row"}} key={i}>
                    <View style={{flex: 1}}>
                        <Text style={{color: "black", fontSize: 18}}>{det.titulo}</Text>
                        <Text numberOfLines={1} ellipsizeMode="tail" style={{marginHorizontal: 5, color: "dimgray", fontSize: 16}}>{det.descripcion}</Text>
                    </View>
                    <View style={{width: 20, alignItems: "center", justifyContent: "center"}}>
                        <Icon name="caret-right" color="gray" size={23}/>
                    </View>
                </TouchableOpacity>
            )}
        </View>
    )
}

Main.navigationOptions = ({ navigation }: NavigationScreenProps) => {
    let search = navigation.getParam("search")
    if (search) {
        return {
            headerLeft: (
                <View style={{height: "100%", alignItems: "center", justifyContent: "center", width: "100%"}}>
                  <TouchableOpacity onPress={() => navigation.setParams({search: false})}>
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
            title: "BUGS APP",
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