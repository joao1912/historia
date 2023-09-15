import React from 'react';
import { StyleSheet, View } from 'react-native';

function Borda() {

  return(
    <View style={styles.bordaPacote}>
        <View style={styles.linha}/>
        <View style={styles.linha}/>
        <View style={styles.linha}/>
        <View style={styles.linha}/>
        <View style={styles.linha}/>
        <View style={styles.linhaFinal}/>
    </View>
  );
}

const styles = StyleSheet.create({
    bordaPacote: {
        width: "70%",
        height: 30,
        backgroundColor: "#B3483D",
        flexDirection: "row",
       
    },
    linha: {
        width: "20%",
        height: 30,
        borderColor: "#80342B",
        borderLeftWidth: 1,
    },
    linhaFinal: {
        width: "20%",
        height: 30,
        borderColor: "#80342B",
        borderLeftWidth: 1,
    }
    
})

export default Borda;