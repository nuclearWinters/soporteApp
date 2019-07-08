import React, { useState } from "react"
import { View, Text, Button, TextInput } from "react-native"
import { NavigationScreenComponent } from "react-navigation"

const Login: NavigationScreenComponent<{}> = props => {
    const [usuario, setUsuario] = useState<string>("")
    const [contraseña, setContraseña] = useState<string>("")
    return(
        <View>
            <Text>Iniciar sesión</Text>
            <TextInput placeholder="Ingresa usuario" onChangeText={text => setUsuario(text)} value={usuario}/>
            <TextInput placeholder="Ingresa contraseña" onChangeText={text => setContraseña(text)} value={contraseña} secureTextEntry={true}/>
            <Button title="Inicia sesión" onPress={() => props.navigation.navigate("Main")}/>
        </View>

    )
}

export default Login