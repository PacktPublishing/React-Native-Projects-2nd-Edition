import React, {useEffect, useState, Fragment} from 'react';
import {Badge, Text, Card, CardItem, Body} from 'native-base';
import {Col} from 'react-native-easy-grid';
import styles from './Styles/TimelineStyle';

export const Timeline = ({timeline}) => {
  const [right, setRight] = useState([]);
  const [left, setLeft] = useState([]);

  useEffect(() => {
    if (timeline.length) {
      let rightCol = [];
      let leftCol = [];
      timeline.forEach(({name, created_at}, i) => {
        const placement = i + 1;
        if (placement % 2) {
          rightCol.push({
            item: placement + 1,
            name,
            created_at,
          });
        } else {
          leftCol.push({
            item: i,
            name,
            created_at,
          });
        }
      });
      setRight(rightCol);
      setLeft(leftCol);
    }
  }, [timeline]);

  const rightItem = ({name, created_at, item}) => {
    return (
      <Fragment key={`right${item}`}>
        <Card
          style={[
            styles.timeLinePointSpacing,
            styles.roundedRadius,
            styles.oddBackground,
          ]}>
          <CardItem
            bordered
            style={[styles.roundedRadius, styles.oddBackground]}>
            <Body>
              <Text style={[styles.name, styles.whiteText]}>{name}</Text>
              <Text style={styles.whiteText}>{created_at}</Text>
            </Body>
          </CardItem>
        </Card>
        <Badge style={[styles.timeLinePointSpacing, styles.evenBadge]}>
          <Text>{item}</Text>
        </Badge>
      </Fragment>
    );
  };

  const leftItem = ({name, created_at, item}) => {
    return (
      <Fragment key={item}>
        <Badge style={[styles.timeLinePointSpacing, styles.oddBadge]}>
          <Text style={styles.blackText}>{item}</Text>
        </Badge>
        <Card style={[styles.timeLinePointSpacing, styles.roundedRadius]}>
          <CardItem bordered style={styles.roundedRadius}>
            <Body>
              <Text style={[styles.name, styles.blackText]}>{name}</Text>
              <Text style={styles.blackText}>{created_at}</Text>
            </Body>
          </CardItem>
        </Card>
      </Fragment>
    );
  };

  return (
    <>
      <Col style={styles.col}>
        {left.map(({name, created_at, item}) =>
          leftItem({name, created_at, item}),
        )}
      </Col>
      <Col style={styles.colHeight}>
        {right.map(({name, created_at, item}) =>
          rightItem({name, created_at, item}),
        )}
      </Col>
    </>
  );
};
