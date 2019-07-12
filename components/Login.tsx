import React, { useState, useEffect } from "react"
import { View, Text, Button, TextInput, Alert, AsyncStorage, ScrollView, ActivityIndicator } from "react-native"
import { NavigationScreenComponent } from "react-navigation"
import { useDispatch } from "react-redux"
import axios from "axios"

const Login: NavigationScreenComponent<{}> = props => {

    const dispatch = useDispatch()

    const [loading, setLoading] = useState(true)

    const setToken = (token: string) => {
        dispatch({
            type: "SET_TOKEN",
            payload: token
        })
    }

    const [usuario, setUsuario] = useState<string>("")
    const [contraseña, setContraseña] = useState<string>("")

    useEffect(() => {
        AsyncStorage.getItem("token")
        .then(token => {
            if (token) {
                axios.get(`http://192.168.1.200:3000/loginWithToken?token=${token}`)
                .then(response => {
                    setToken(token)
                    setLoading(false)
                    props.navigation.navigate("Main")
                })
                .catch(error => {
                    if (error.response !== undefined) {
                        if (error.response.status === 403) {
                            setLoading(false)
                            Alert.alert("Su sesión expiró. Inicie normalmente.")
                        } else {
                            setLoading(false)
                            Alert.alert("Error desconocido.")
                        }
                    } else {
                        setLoading(false)
                        Alert.alert("Error de conexión.")
                    }
                })
            } else {
                setLoading(false)
            }
        })
    }, [])

    return(
        <ScrollView contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'space-between'
        }}>
            <View style={{}}>
                <Text style={{fontSize: 24, fontWeight: "bold", textAlign: "center", paddingVertical: 15}}>Iniciar sesión</Text>
                <TextInput style={{fontSize: 20, marginHorizontal: 20, borderBottomColor: "gray", borderBottomWidth: 2}} placeholder="Ingresa usuario..." onChangeText={text => setUsuario(text)} value={usuario}/>
                <TextInput style={{fontSize: 20, marginHorizontal: 20, borderBottomColor: "gray", borderBottomWidth: 2}} placeholder="Ingresa contraseña..." onChangeText={text => setContraseña(text)} value={contraseña} secureTextEntry={true}/>
            </View>
            <View style={{paddingVertical: 80, marginHorizontal: 40}}>
                <Button title="Inicia sesión" onPress={() => {
                    if (usuario === "") {
                        Alert.alert("Falta ingresar usuario.")
                    } else if (contraseña === "") {
                        Alert.alert("Falta ingresar contraseña.")
                    } else {
                        setLoading(true)
                        axios.get(`http://192.168.1.200:3000/login?username=${usuario}&password=${contraseña}`)
                        .then(acceso => {
                            AsyncStorage.setItem("token", acceso.data)
                            .then(token => {
                                setLoading(false)
                                setToken(acceso.data)
                                props.navigation.navigate("Main")
                            })
                            .catch(error => {
                                setLoading(false)
                                Alert.alert("Error. Intenta de nuevo.")
                            })
                        })
                        .catch(error => {
                            if (error.response !== undefined) {
                                if (error.response.status === 403) {
                                    setLoading(false)
                                    Alert.alert("Datos incorrectos.")
                                    
                                } else {
                                    setLoading(false)
                                    Alert.alert("Error desconocido.")
                                    
                                }
                            } else {
                                setLoading(false)
                                Alert.alert("Error de conexión.")
                            }
                        })
                    }}}
                />
            </View>
            {loading && <View style={{position: "absolute", top: 0, bottom: 0, right: 0, left: 0, alignItems: "center", justifyContent: "center"}}>
                <ActivityIndicator size="large" />
            </View>}
        </ScrollView>

    )
}

export default Login