import React from "react"
import { ScrollView, View, Image, TouchableOpacity, Text, StyleSheet, AsyncStorage, Alert } from "react-native"
import Icon from "react-native-vector-icons/FontAwesome5"
import { DrawerItemsProps } from "react-navigation"

const Drawer: React.FC<DrawerItemsProps> = props => {
    return (
        <ScrollView 
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'space-between'}}
          style={{backgroundColor: 'white'}}>
        <View>
          <View style={{height: 55, justifyContent: "center", backgroundColor: "rgb(35,153,247)"}}>
          </View>
          <TouchableOpacity 
            style={{marginLeft: 10}} 
            activeOpacity={0.5} 
            onPress={
              () => {
                props.navigation.closeDrawer();
                props.navigation.navigate("Main1")
              }
            }
          >
            <View style={{display: "flex", flexDirection: "row", marginTop: 30}}>
              <View style={styles.titleTTF}>
                <Icon name="home" size={30} color={"rgb(110,110,110)"} />
              </View>
              <View style={{marginHorizontal: 10, justifyContent: "center"}}>
                <Text style={styles.titleNav}>Inicio</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity 
            style={{marginLeft: 10}} 
            activeOpacity={0.5} 
            onPress={
              () => {
                AsyncStorage.removeItem("token")
                .then(bool => {
                  props.navigation.closeDrawer();
                  props.navigation.navigate("NotLogged")
                })
                .catch(error => Alert.alert("Error. Intenta otra vez."))
              }
            }
          >
            <View style={{display: "flex", flexDirection: "row", marginTop: 30}}>
              <View style={styles.titleTTF}>
                <Icon name="sign-out-alt" size={30} color={"rgb(110,110,110)"} />
              </View>
              <View style={{marginHorizontal: 10, justifyContent: "center"}}>
                <Text style={styles.titleNav}>Cerrar Sesion</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{marginTop: 10, elevation: 20, borderRadius: 1, borderWidth: 1, borderColor: "rgb(244,244,244)", backgroundColor: "rgb(244,244,244)", borderTopColor: "rgb(230,230,230)", borderTopWidth: 2}}>
          <Text style={{color: "rgb(153,153,153)", paddingHorizontal: 10, paddingVertical: 10, fontSize: 13}}>Todos los derechos reservados. 2019.</Text>
        </View>
      </ScrollView>
    )
}

export default Drawer

const styles = StyleSheet.create({
    titleTTF: {marginHorizontal: 10, width: 35, alignItems: "center"},
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },
    instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
    },
    container: {
      backgroundColor: 'white', 
      borderWidth: 2, 
      borderColor: "green"
    },
    titleNav: {
      color: "rgb(110,110,110)", 
      fontSize: 20
    }
  });