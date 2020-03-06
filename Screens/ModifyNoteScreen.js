import React, {Fragment, useState, useContext} from 'react';
import {Text, StyleSheet} from 'react-native';
import {Button, Textarea, Form, Item, Input, Label} from 'native-base';
import {Layout} from '../Components/Layout';
import {NoteContext} from '../Contexts/NoteContext';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export const ModifyNoteScreen = props => {
  const [note, setNote] = useState({title: '', content: '', id: ''});
  const {contextNotes, updateContextNote, deleteContextNote} = useContext(
    NoteContext,
  );

  useEffect(() => {
    let noteIndex = contextNotes.findIndex(
      item => item.id === props.navigation.state.params.id,
    );

    if (noteIndex > -1) {
      setNewNote({
        title: contextNotes[noteIndex].title,
        content: contextNotes[noteIndex].content,
      });
    }
  }, [contextNotes, props.navigation.state.params.id]);

  const updateNote = () => {
    updateContextNote(note, props.navigation.state.params.id);
    props.navigation.navigate('Home');
  };

  const deleteNote = () => {
    deleteContextNote(props.navigation.state.params.id);
    props.navigation.navigate('Home');
  };

  return (
    <Layout
      title="Modify Note"
      footer={
        <Fragment>
          <Button full onPress={() => props.navigation.navigate('Home')}>
            <Text>Cancel</Text>
          </Button>
          <Button full onPress={updateNote}>
            <Text> Update Note </Text>
          </Button>
          <Button full onPress={deleteNote}>
            <Text> Delete Note </Text>
          </Button>
        </Fragment>
      }>
      <Form style={styles.container}>
        <Item>
          <Label>Title:</Label>
          <Input
            value={note.title}
            onChangeText={title =>
              setNote({
                title,
                content: note.content,
              })
            }
          />
        </Item>
        <Textarea
          style={styles.container}
          value={note.content}
          onChangeText={content =>
            setNote({
              title: note.title,
              content,
            })
          }
          bordered
          placeholder="Welcome to the new note"
        />
      </Form>
    </Layout>
  );
};
