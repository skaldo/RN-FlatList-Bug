import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { Constants } from 'expo';

export default class App extends React.Component {
  state = {
    items: [{ key: 'a' }, { key: 'b' }, { key: 'c' }],
    activeItem: 0,
  };

  componentDidMount() {
    setInterval(() => {
      const { items, activeItem: oldActiveItem } = this.state;
      const activeItem = (oldActiveItem < items.length - 1) ? oldActiveItem + 1 : 0;

      this.setState({ activeItem });
    }, 1500);
  }

  render() {
    const { items, activeItem } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.statusBar} />
        <Text>Correct behavior: re-renders with extraData prop</Text>
        <FlatList
          data={items}
          extraData={activeItem}
          renderItem={({ item, index }) => {
            const isActive = index === activeItem;
            const style = isActive ? { backgroundColor: 'red' } : {};
            return <Text style={style}>{item.key}</Text>;
          }}
        />
        <Text>Correct behavior: does not re-render without extraData prop</Text>
        <FlatList
          data={items}
          renderItem={({ item, index }) => {
            const isActive = index === activeItem;
            const style = isActive ? { backgroundColor: 'red' } : {};
            return <Text style={style}>{item.key}</Text>;
          }}
        />
        <Text>Incorrect behavior: re-renders without extraData prop (with style property)</Text>
        <FlatList
          data={items}
          style={styles.styledFlatList}
          renderItem={({ item, index }) => {
            const isActive = index === activeItem;
            const style = isActive ? { backgroundColor: 'red' } : {};
            return <Text style={style}>{item.key}</Text>;
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusBar: {
    backgroundColor: '#C2185B',
    height: Constants.statusBarHeight,
  },
  styledFlatList: {
    margin: 5,
  },
});
