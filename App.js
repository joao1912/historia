import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import Borda from "./components/Borda.js"
import * as Animatable from 'react-native-animatable';
import { useRef, useState } from 'react';
import images from './assets';

const imagesComum = [
  "example",
  "Frog",
  "Item__00",
  "Item__03",
  "Item__08",
  "Item__24",
  "Item__36",
  "Item__38",
  "Item__39",
  "Item__58",
  "Mummy",
  "observer",
  "Ogre",
  "Sentinel",
  "slime",
  "steel_eagle",
  "tree_2",
  "wizard"
]

const imagesRaras = [
  "Drone",
  "Item__19",
  "Item__22",
  "Item__27",
  "Item__43",
  "Item__59",
  "Item__60",
  "Item__68",
  "Item__71",
  "Metal_Slug",
]


export default function App() {

  const animatableRef = useRef(null);
  const cardRef = useRef(null)
  const cardSaidaRef = useRef(null)

  const [isVisible, setIsVisible ] = useState(0)
  const [cartaAleatoria, setCartaAleatoria] = useState(null)
  const [colorCard, setColorCard] = useState("#FAB653")
  const [isReset, setIsReset] = useState(false)

  let opacityNull = 0
  let opacityNullSaida = 0

  function reset() {
    setCartaAleatoria(null)
    setColorCard("#FAB653")
    setIsVisible(0)
    opacityNull = 0
    opacityNullSaida = 0
    setIsReset(true)
   
  }

  function getCardAleatoria() {

    if (isReset) {
      setIsReset(false)
    }

    let numberAleatorio = Math.floor(Math.random() * 50)
    let raridade

    if (numberAleatorio < 43 && numberAleatorio > 39) {
      raridade = "Raro"
      setColorCard('linear-gradient(to bottom, #ff0000, #0000ff)')
    } else {
      raridade = "Comum"
      setColorCard('#F58B5D')
    }

    if (raridade == "Raro") {
      let index = Math.floor(Math.random() * imagesRaras.length)
      setCartaAleatoria(images[imagesRaras[index]])
    } else {
      let index = Math.floor(Math.random() * imagesComum.length)
      setCartaAleatoria(images[imagesComum[index]])
    }
    
  }

  const startAnimation = () => {
    animatableRef.current?.rubberBand();
    
    if (isVisible == 1) {

      opacityNullSaida = 1
      cardSaidaRef.current?.fadeOutLeft()

      setTimeout(() => {
        opacityNullSaida = 0;
        cardSaidaRef.current?.stopAnimation()
      }, 500)
    }
    
    if (isVisible == 0) {
      setIsVisible(1)
    }

    cardRef.current?.animate({
      0: { opacity: 0, translateY: -100 }, 
      0.5: { opacity: 1, translateY: 0, rotateY: '0deg' },  
      1: { translateY: -10, rotateY: '180deg' }, 
    });

    getCardAleatoria()
    
  };

  return (
    <View style={styles.container}>
 
            <Animatable.View ref={cardRef} style={[styles.carta, { opacity: opacityNull, backgroundImage: colorCard.length != 7 ? colorCard : "", backgroundColor: colorCard.length == 7 ? colorCard : "", zIndex: !isReset ? 3 : 0}]} >
              {
                cartaAleatoria == null ? (
                  <View/>
                ) : (
                  <Image style={styles.imgCarta} source={cartaAleatoria}/>
                )
              }
             
            </Animatable.View>

            <Animatable.View ref={cardSaidaRef} style={[styles.carta, { opacity: opacityNullSaida, backgroundImage: colorCard.length != 7 ? colorCard : "", backgroundColor: colorCard.length == 7 ? colorCard : "", zIndex: !isReset ? 3 : 0 }]} />
        
            <Animatable.View  ref={animatableRef} style={styles.boxPacote} easing="ease-out">
              <Borda />
                <View style={styles.pacoteFigurinha}></View>
              <Borda />
            </Animatable.View>

          <TouchableOpacity style={[styles.botao, {position: "absolute", bottom: 20}]}  onPress={startAnimation}>
            <Text style={styles.textBotao}>Proxima carta!</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.botao, {position: "absolute", bottom: 60}]} onPress={reset}>
            <Text style={styles.textBotao}>Resetar</Text>
          </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A1B9CC',
    alignItems: 'center',
    justifyContent: 'space-around',
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
    padding: 7,
    paddingHorizontal: 20,
    backgroundColor: "#F26252",
    marginTop: 20,
    borderRadius: 10,
    fontWeight: "bold",
  },
  carta: {
    width: "60%",
    height: "50%",
    position: "absolute",
    //zIndex: 3,
    top: "28%",
    borderRadius: 3,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#E1FF54"
  },
  boxPacote: {
    width: "100%",
    height: "80%",
    alignItems: "center",
    justifyContent: "center"
  },
  imgCarta: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  textBotao: {
    fontWeight:'bold'
  }
});
