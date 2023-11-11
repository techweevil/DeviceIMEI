import { Button, StyleSheet, Text, View } from "react-native";

export default function InfoCard({
    info,
    onPress,
    title,
  }: {
    info: string;
    onPress: () => void;
    title: string;
  }) {
    console.log('info', info);
    return (
      <View style={styles.cardContainer}>
        <Text
          style={{
            marginBottom: 10,
            borderColor: 'black',
            borderWidth: 1,
            fontSize: 18,
            padding: 10,
            color: 'black',
          }}>
          {info}
        </Text>
        <Button title={title} onPress={onPress} />
      </View>
    );
  }


  const styles = StyleSheet.create({

    cardContainer: {
      backgroundColor: 'white',
      width: '100%',
      padding: 5,
      borderRadius: 5,
      marginVertical: 10,
    },
  });