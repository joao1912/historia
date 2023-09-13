import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import Borda from './components/borda';
import * as Animatable from 'react-native-animatable';
import { useRef } from 'react';

const imagesComum = [
  "balaclava.png",
  "bau.png",
  "bixu.png",
  "bomba.png",
  "column.png",
  "draga.png",
  "espada.png",
  "golen.png",
  "gosmaVerde.png",
  "homiAbobora.png",
  "homiAmarelo.png",
  "homiVerde.png",
  "mago.png",
  "miniDemo.png",
  "ogro.png",
]

const imagesRaras = [
  "pocao.png",
  "porta.png",
  "morte.png",
  "coracao.png",
  "demo.png",
]


export default function App() {

  function vibrar() {
    const pacote = document.getElementById("")
  }

  const animatableRef = useRef(null);
  const cardRef = useRef(null)
  const opacityNull = 0


  const startAnimation = () => {
    animatableRef.current?.rubberBand();

    animatableRef.current?.animate({
      translateY: -100, // Altura máxima que a animação "bounce" vai pular
    }, {
      duration: 500,
      useNativeDriver: true,
    });

    
      cardRef.current?.bounce()
      

  };

  return (
    <View style={styles.container}>

          <Animatable.View ref={cardRef} style={[styles.carta, { opacity: 1 }]} >
            
          </Animatable.View>
          

            <Animatable.View ref={animatableRef} style={styles.boxPacote} easing="ease-out">
              <Borda />
              <View style={styles.pacoteFigurinha}>
              
              </View>
              <Borda />
            </Animatable.View>

          <TouchableOpacity style={styles.botao}  onPress={startAnimation}>
            <Text>Proxima carta!</Text>
          </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pacoteFigurinha: {
    width: "70%",
    height: "60%",
    backgroundColor: "#F26252",
    alignItems: "center",
    justifyContent: "center",
    
  },
  bordaPacote: {
    width: "70%",
    height: 30,
    backgroundColor: "#B3483D"
  },
  botao: {
    padding: 8,
    paddingHorizontal: 25,
    backgroundColor: "#F26252",
    marginTop: 20,
    borderRadius: 10,
    fontWeight: "bold"
  },
  carta: {
    width: "60%",
    height: "50%",
    // backgroundColor: "#FC6656",
    backgroundColor: "black",
    position: "absolute",
    zIndex: 3,
    top: "20%",
    borderRadius: 3,
  },
  boxPacote: {
    width: "100%",
    height: "80%",
    alignItems: "center",
    justifyContent: "center"
  }
});
