import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import Borda from './components/borda';
import * as Animatable from 'react-native-animatable';
import { useRef, useState } from 'react';

const imagesComum = [
  "example.png",
  "Frog.png",
  "Item__00.png",
  "Item__03.png",
  "Item__08.png",
  "Item__24.png",
  "Item__36.png",
  "Item__38.png",
  "Item__39.png",
  "Item__58.png",
  "Mummy.png",
  "observer.png",
  "Ogre.png",
  "Sentinel.png",
  "slime.png",
  "steel-eagle.png",
  "tree-2.png",
  "wizard.png"
]

const imagesRaras = [
  "Drone.png",
  "Item__19.png",
  "Item__22.png",
  "Item__27.png",
  "Item__43.png",
  "Item__59.png",
  "Item__60.png",
  "Item__68.png",
  "Item__71.png",
  "Metal-Slug.png",
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
      setCartaAleatoria(imagesRaras[index])
    } else {
      let index = Math.floor(Math.random() * imagesComum.length)
      setCartaAleatoria(imagesComum[index])
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
                  <Image style={styles.imgCarta} source={require(`./assets/${cartaAleatoria}`)}/>
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
