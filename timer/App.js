import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import moment from 'moment'

const Button = ({action, text}) => {
  return (
    <TouchableOpacity onPress={action} style={styles.button}>
      <Text style={[styles.title, styles.buttonText]}>{text}</Text>
    </TouchableOpacity>    
  )
}

const App = () => {

  const [timer, setTimer] = useState(false)
  const [seconds, setSeconds] = useState(0)

  useEffect(()=> {
    let clock = timer ? setInterval(() => setSeconds(seconds+1),1000): null;
    return () => timer ? clearInterval(clock): null;
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Track the time</Text>
      <View style={styles.buttonContainer}>
        <Button text={'Start'} action={()=> setTimer(true)}/>
        <Button text={'Stop'} action={()=> setTimer(false)}/>
        <Button text={'Clear'} action={()=> setSeconds(0)}/>
      </View>

      <Text style={styles.title}>{moment().hour(0).minute(0).second(seconds).format('HH : mm : ss')}</Text>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center'
  },
  title: {
    fontSize: 28,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 5,    
  },
  button: {
    backgroundColor: 'lightblue',
    borderRadius: 5,
    borderWidth: 1,
    width: 80,
    marginBottom: 10,
    borderColor: 'white'
  },
  buttonText: {
    color: 'black',
  },
  buttonContainer: {
    paddingTop: 15,
    paddingBottom: 15,
    alignContent: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row'
  }  
});


export default App;
