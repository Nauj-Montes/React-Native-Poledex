import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";
import React from "react";
import { useMemo, useCallback } from "react";
import { SvgUri } from "react-native-svg";
import { POKEMON_TYPES_COLORS } from "../utils/constants";

export default function PokemonCard({ pokemon }) {
  const types = useMemo(
    () => pokemon.types.map((type) => type.type.name),
    [pokemon.types]
  );
  const onPress = useCallback(() => console.log(pokemon.name), [pokemon.name]);

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardNumber}>{pokemon.number}</Text>
          <Text style={styles.cardName}>{pokemon.name}</Text>
        </View>
        <View style={styles.cardBody}>
          {types.map((type, index) => (
            <View
              key={index}
              style={[
                styles.cardBodyType,
                { backgroundColor: POKEMON_TYPES_COLORS[type] },
                index === 1 && { top: 20 },
              ]}
            >
              <Text style={styles.cardBodyTypeText}>{type}</Text>
            </View>
          ))}
          <SvgUri
            uri={pokemon.picture}
            width={100}
            height={100}
            style={styles.cardBodyImage}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "47%",
    height: 200,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginHorizontal: 5,
    marginVertical: 10,
    elevation: Platform.OS === "android" ? 8 : 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#f2f2f2",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardNumber: {
    fontSize: 12,
    color: "#000",
    fontWeight: "bold",
  },
  cardName: {
    fontSize: 12,
    color: "#000",
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  cardBody: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cardBodyType: {
    position: "absolute",
    top: 0,
    left: 0,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  cardBodyTypeText: {
    fontSize: 10,
    color: "#fff",
    textTransform: "uppercase",
  },
  cardBodyImage: {
    aspectRatio: 1,
    width: "100%",
  },
});
