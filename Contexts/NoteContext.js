import React, {createContext, Component} from 'react';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export const errorHandler = e => {
  Alert.alert(
    'Notes Error',
    `Sorry about the issue: ${e}`,
    [
      {
        text: 'ok',
      },
    ],
    {cancelable: false},
  );
};

export const NoteContext = createContext();

export class NoteProvider extends Component {
  constructor(props) {
    super(props);
    this.addContextNote = newNote => {
      const {contextNotes} = this.state;
      contextNotes.push(newNote);
      this.setState({contextNotes}, async () => await this.storeData());
    };
    this.getContextNotes = async () => {
      try {
        const storedNotes = await AsyncStorage.getItem('@notes');
        if (storedNotes) {
          this.setState({contextNotes: [...JSON.parse(storedNotes)]});
        }
        return this.state.contextNotes;
      } catch (error) {
        errorHandler(error);
      }
    };
    this.updateContextNote = (note, id) => {
      try {
        const {contextNotes} = this.state;
        const noteIndex = contextNotes.findIndex(item => item.id === id);
        contextNotes[noteIndex].title = note.title;
        contextNotes[noteIndex].content = note.content;
        this.setState({contextNotes}, async () => await this.storeData());
      } catch (error) {
        errorHandler(error);
      }
    };
    this.deleteContextNote = id => {
      try {
        const {contextNotes: oldNotes} = this.state;
        const contextNotes = oldNotes.filter(note => note.id !== id);
        this.setState({contextNotes}, async () => await this.storeData());
      } catch (error) {
        errorHandler(error);
      }
    };
    this.state = {
      addContextNote: this.addContextNote,
      getContextNotes: this.getContextNotes,
      updateContextNote: this.updateContextNote,
      deleteContextNote: this.deleteContextNote,
      contextNotes: [],
    };
  }

  storeData = async () => {
    try {
      await AsyncStorage.setItem(
        '@notes',
        JSON.stringify([...this.state.contextNotes]),
      );
    } catch (error) {
      errorHandler(error);
    }
  };

  render() {
    return (
      <NoteContext.Provider value={this.state}>
        {this.props.children}
      </NoteContext.Provider>
    );
  }
}
