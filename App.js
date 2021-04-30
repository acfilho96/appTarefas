import { StatusBar } from 'expo-status-bar';
import React,{useEffect, useState}from 'react';
import { AntDesign } from '@expo/vector-icons'; 
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity,TouchableHighlight ,Modal ,ScrollView, TextInput, AsyncStorage } from 'react-native';
import { useFonts } from 'expo-font';

export default function App() {
  //imagem de fundo
  const image = require('./resources/bg.jpg');

  console.disableYellowBox = true;
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
    })();

    setData = async() =>{

    try{

      await AsyncStorage.setItem('tarefas',tarefas);

    }catch(error){

    }

    alert('Tarefa deletada com sucesso!')

    }
  },[])

  const [modal,setModal] = useState(false);
  
  //Deletar tarefas
  function deletarTarefa(id){  
   
    let newTarefas = tarefas.filter(function(val){
      return val.id != id;
    });

    setarTarefas(newTarefas);

    
    
    setData();
  }
//
  function addTarefa(){

    setModal(!modal);
    
    let id = 0;
    if(tarefas.length > 0){

      id = tarefas[tarefas.length-1].id + 1;
    }

    let tarefa = {id:id,tarefa:tarefaAtual};

    setarTarefas([...tarefas,tarefa]);

  }

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

//Estilos
const styles = StyleSheet.create({
  image: {
    width:'100%',
    height: 80,
    resizeMode: "cover"
  },
  btnAddTarefa:{
    width:200,
    padding:8,
    backgroundColor:'gray',
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
    fontFamily:'Lato_400Regular'
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
    backgroundColor: "#F194FF",
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
  }

});

