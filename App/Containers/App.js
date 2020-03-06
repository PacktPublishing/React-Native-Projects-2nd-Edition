import React, {useState} from 'react';
import {
  Button,
  Container,
  Footer,
  FooterTab,
  Form,
  Header,
  Input,
  Item,
  Label,
  Root,
  Text,
  Title,
  Toast,
} from 'native-base';
import {Grid} from 'react-native-easy-grid';
import {ScrollView} from 'react-native';
import {Timeline} from '../Components/Timeline';

// Styles
import styles from './Styles/LaunchScreenStyles';

const App = () => {
  const [user, setUser] = useState('');
  const [timeline, setTimeline] = useState([]);

  const getTimeline = async () => {
    try {
      const requestOptions = {
        method: 'GET',
        redirect: 'follow',
      };

      const gbData = await fetch(
        `https://api.github.com/users/${user}/repos`,
        requestOptions,
      );
      const gbResponse = await gbData.json();

      const timelineData = gbResponse
        .map(({name, created_at}) => {
          return {
            name,
            created_at: new Date(created_at).toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
            }),
          };
        })
        .sort((a, b) => {
          a = new Date(a.created_at);
          b = new Date(b.created_at);
          return a > b ? -1 : a < b ? 1 : 0;
        });
      setTimeline(timelineData);
    } catch (error) {
      console.info(error);
      Toast.show({
        text: 'Error',
        buttonText: 'invalid entry',
        duration: 3000,
        type: 'danger',
      });
    }
  };

  return (
    <Root>
      <Container>
        <Header style={styles.header}>
          <Title style={styles.title}>Github Timeline</Title>
        </Header>
        <ScrollView>
          <Form>
            <Item floatingLabel>
              <Label>Username</Label>
              <Input
                autoCapitalize="none"
                onChangeText={text => setUser(text)}
                value={user}
              />
            </Item>
          </Form>
          <Grid style={styles.grid}>
            <Timeline timeline={timeline} />
          </Grid>
        </ScrollView>
        <Footer style={styles.footer}>
          <FooterTab>
            <Button onPress={getTimeline}>
              <Text style={styles.title}>Get Timeline</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    </Root>
  );
};

export default App;
