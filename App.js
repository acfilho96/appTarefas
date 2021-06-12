import * as React from 'react';
import {useEffect,useState} from 'react';
import { View, AsyncStorage, Modal,Picker, ImageBackground, TouchableHighlight, Text,StyleSheet, Image,Dimensions, TextInput, ScrollView, TouchableOpacity  } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StatusBar } from 'expo-status-bar';
import { createStackNavigator } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';
import Contador from './Contador';
import { AntDesign } from '@expo/vector-icons'; 


function HomeScreen({navigation}) {
  console.disableYellowBox = true;
  return (
    <View style={{padding:15,flex:1}}>
        <ScrollView style={{flex:1}}>
        <Text style={styles.textHeaderr}>Olá!                                                      Qual a meta para hoje?</Text>


        <TouchableOpacity onPress={()=>navigation.navigate('Pomodoro')} style={styles.btnNavigation}>
          <Ionicons name="ios-information-circle" size={29} color='white' />
          <Text style={{color:'white',marginTop:8,marginLeft:8}}>Pomodoro</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>navigation.navigate('Tarefas')} style={styles.btnNavigation}>
          <Ionicons name="ios-list-box" size={29} color='white' />
          <Text style={{color:'white',marginTop:8,marginLeft:8}}>Tarefas</Text>
        </TouchableOpacity>



        </ScrollView>


    </View>
  );
}

function PomodoroScreen ({navigation}) {

  const [estado,setarEstado] = useState('selecionar');
  const [segundos,setarSegundos] = useState(0);
  const [minutos,setarMinutos] = useState(0);
  const [horas,setarHoras] = useState(0);
  const [alarmeSound,setarAlarmeSound] = useState([
    {
      id:1,
      selecionado: true,
      som:'som curto',
      file: require('./assets/alarme1.mp3')
    },
    {
      id:2,
      selecionado: false,
      som:'som medio',
      file: require('./assets/alarme2.mp3')
    },
    {
      id:3,
      selecionado: false,
      som:'som longo',
      file: require('./assets/alarme3.mp3')
    }
  ]);
 
    var numeros = [];
    for(var i = 1; i<=60; i++){
        numeros.push(i);
    }

    


    function setarAlarme(id){
        let alarmesTemp = alarmeSound.map(function(val){
              if(id != val.id)
                val.selecionado = false;
              else
                val.selecionado = true;
              return val;
        })

        setarAlarmeSound(alarmesTemp);
    }


  if(estado == 'selecionar'){
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <LinearGradient
          // Background Linear Gradient
          colors={['rgba(59, 29, 105,1)', 'rgba(59, 29, 105,0.8)']}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            height:'100%'
          }}
        />
      <Text style={{color:'white',fontSize:30}}>Selecione o seu Tempo:</Text>
      <View style={{flexDirection:'row'}}>

      <Text style={{color:'white',paddingTop:16}}>Hor: </Text>
      <Picker
              selectedValue={horas}
              onValueChange={(itemValue, itemIndex) => setarHoras(itemValue)}
        style={{ height: 50, width: 100,color:'white' }}
        >
          <Picker.Item label='0' value='0' />
         {
        numeros.map(function(val){
            return(
            <Picker.Item label={val.toString()} value={val.toString()} />
            );
          })
        
        }
      </Picker>

        <Text style={{color:'white',paddingTop:16}}>Min: </Text>
      <Picker
        selectedValue={minutos}
        onValueChange={(itemValue, itemIndex) => setarMinutos(itemValue)}
        style={{ height: 50, width: 100,color:'white' }}
        >
        <Picker.Item label='0' value='0' />
        {
        numeros.map(function(val){
            return(<Picker.Item label={val.toString()} value={val.toString()} />);
        })
        
        }
        
        
      </Picker>
      <Text style={{color:'white',paddingTop:16}}>Seg: </Text>
      <Picker
              selectedValue={segundos}
              onValueChange={(itemValue, itemIndex) => setarSegundos(itemValue)}
        style={{ height: 50, width: 100,color:'white' }}
        >
          <Picker.Item label='0' value='0' />
         {
        numeros.map(function(val){
            return(
            <Picker.Item label={val.toString()} value={val.toString()} />
            );
          })
        
        }
      </Picker>
      
      
      </View>

      <View style={{flexDirection:'row'}}>
          {
          alarmeSound.map(function(val){
              if(val.selecionado){
              
              return ( 
              
              <TouchableOpacity onPress={()=>setarAlarme(val.id)} style={styles.btnEscolherSelecionado}>
                <Text style={{color:'white'}}>{val.som}</Text>
              </TouchableOpacity>);
              }else{
                return ( 
              
                  <TouchableOpacity onPress={()=>setarAlarme(val.id)} style={styles.btnEscolher}>
                    <Text style={{color:'white'}}>{val.som}</Text>
                  </TouchableOpacity>);
              }
              
          })
         
          }
      </View>
          <TouchableOpacity onPress={()=>setarEstado('iniciar')} style={styles.btnIniciar}><Text style={{textAlign:'center',paddingTop:30,color:'white',fontSize:20}}>Iniciar</Text></TouchableOpacity>
    </View>
    
  );
  }else if(estado == 'iniciar'){
     
      return(
          <Contador alarmes={alarmeSound} setarHoras={setarHoras} setarMinutos={setarMinutos} setarSegundos={setarSegundos} setarEstado={setarEstado} horas={horas}  minutos={minutos} segundos={segundos}></Contador>
      );
  }
}


function TarefasScreen ({navigation,route}) {

  const image = require('./resources/bg.jpg');

  //identificando as tarefas
  const [tarefas, setarTarefas] = useState([
   
    {
      id:1,
      tarefa:'Minha tarefa 1.'
    },
    {
      id:2,
      tarefa: 'Outra tarefa...'
    },
    {
      id:3,
      tarefa: 'Mais uma tarefa...'
    }


  ]);

  const [tarefaAtual,setTarefaAtual] = useState('');

  //Salvando com async
  useEffect(()=>{
    //alert('app carregado...');
    
    (async () => {
      try {
        let tarefasAtual = await AsyncStorage.getItem('tarefas');
        if(tarefasAtual == null)
          setarTarefas([]);
        else
          setarTarefas(JSON.parse(tarefasAtual));
      } catch (error) {
        // Error saving data
      }
    })()

 
  },[])

  const [modal,setModal] = useState(false);
  
  //Deletar tarefas
  function deletarTarefa(id){  
   
    let newTarefas = tarefas.filter(function(val){
      return val.id != id;
    });

    setarTarefas(newTarefas);

    
    
 
  }
//adicionando tarefas
  function addTarefa(){

    setModal(!modal);
    
    let id = 0;
    if(tarefas.length > 0){

      id = tarefas[tarefas.length-1].id + 1;
    }

    let tarefa = {id:id,tarefa:tarefaAtual};

    setarTarefas([...tarefas,tarefa]);

  }
//parte visual
  return (
  
    <ScrollView style={{flex:1}}>

      <StatusBar hidden/>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modal}
        onRequestClose={() => {
          Alert.alert("Modal foi fechado")
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <TextInput onChangeText={text => setTarefaAtual(text)} autoFocus={true}></TextInput>

            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#2196f3"}}
              onPress={() => addTarefa()}
            >
              <Text style={styles.textStyle}>Adicionar Tarefa</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
     
      <ImageBackground source={image} style={styles.image}>

          <View style={styles.coverView}>

             <Text style={styles.textHeader}>Lista de Tarefas!</Text>
        
          </View>

      </ImageBackground>

      {
        tarefas.map(function(val){
          return (<View style={styles.tarefaSingle}>
          
            <View style={{flex:1, width:'100%', padding:10}}>
          
              <Text>{val.tarefa}</Text>

            </View>

            <View style={{alignItems:'flex-end',flex:1,padding:10}}>

              <TouchableOpacity onPress={()=> deletarTarefa(val.id)}><AntDesign name="minuscircleo" size={24} color="black"></AntDesign></TouchableOpacity>

            </View>
        
           </View>);
          
        })
      }  

      <TouchableOpacity style={styles.btnAddTarefa}onPress={()=>setModal(true)}>
      <Text style={{textAlign:'center',color:'white'}}>Adicionar Tarefa!</Text>
      </TouchableOpacity>

    </ScrollView>
       
  );
  
}


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
function App() {


  return (
    <NavigationContainer>
    
    <StatusBar hidden />
 
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused
              ? 'ios-home'
              : 'ios-home';
          } else if (route.name == 'Tarefas') {
            iconName = focused ? 'ios-list-box' : 'ios-list';
          }else if(route.name == 'Pomodoro'){
              iconName = focused ? 'ios-information-circle' : 'ios-information-circle';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#5f5380',
        inactiveTintColor: 'gray',
      }} 

      
      >

      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Pomodoro" component={PomodoroScreen} />
      <Tab.Screen name="Tarefas" component={TarefasScreen} />
    </Tab.Navigator>
  </NavigationContainer>
  );
}

export default App;


const styles = StyleSheet.create({
  container:{
    backgroundColor:'white'
  },
  textHeaderr:{
    color:'#5f5380',
    fontSize:24
  },
  btnNavigation:{
    backgroundColor:'#5f5380',
    padding:20,
    marginTop:15,
    flexDirection:'row'
  },
 
  parentImage:{
    marginTop:30
  },
  botaoAbrirNavegador:{
    padding:10,
    backgroundColor:'#5f5380',
  },
  modalParent:{
    position:'absolute',
    left:0,
    top:0,
    width:'100%',
    height:'100%',
    backgroundColor:'rgba(0,0,0,0.6)',
    zIndex:1
  },
  boxModal:{
    backgroundColor:'white',
    height:370,
    width:'100%',
    position:'absolute',
    left:0,
    top:'50%',
    marginTop:-185,
    padding:10
  },
  image: {
    width:'100%',
    height: 80,
    resizeMode: "cover"
  },
  btnAddTarefa:{
    width:200,
    padding:8,
    backgroundColor:'#5f5380',
    marginTop:20
  },
  coverView:{
    width:'100%',
    height:80,
    backgroundColor:'rgba(0,0,0,0.5)'
  },
  textHeader:{
    textAlign:'center',
    color:'white',
    fontSize:20,
    marginTop:30,
    fontFamily:'Arial'
  },
  tarefaSingle:{
      marginTop:30,
      width:'100%',
      borderBottomWidth:1,
      borderBottomColor:'black',
      flexDirection:'row',
      paddingBottom:10
  },
  //Estilos para modal
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:'rgba(0,0,0,0.5)'
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex:5
  },
  openButton: {
    backgroundColor: '#5f5380',
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  btnIniciar:{
    backgroundColor:'rgb(116, 67, 191)',
    width:100,
    height:100,
    borderRadius:50,
    marginTop:30,
    borderColor:'white',
    borderWidth:2
  },
  container: {
    flex: 1,
    //backgroundColor: 'rgb(80, 50, 168)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnEscolher:{
      marginRight:10,
      padding:8,
      backgroundColor:'rgb(116, 67, 191)'
  },
  btnEscolherSelecionado:{
    marginRight:10,
    padding:8,
    backgroundColor:'rgba(116, 67, 191,0.3)',
    borderColor:'white',
    borderWidth:1
},
});

