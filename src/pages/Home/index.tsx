import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Footer } from "../../components/Footer";
import {
  Container,
  FavoriteButton,
  Header,
  HeaderDownText,
  Scroll,
  HeaderText,
  PokemonBox,
  PokemonContent,
  PokemonImage,
  PokemonName,
  PokemonNumber,
  Types,
  TypeText,
  TypeView,
  TypeViewText,
  DescriptionView,
  DescriptionText,
} from "./styles";
import {
  EvilIcons,
  MaterialCommunityIcons,
  AntDesign,
} from "@expo/vector-icons";
import { PokemonProps } from "../PokeList";
import api from "../../services/api";
import { IconPerType } from "../../components/IconPerType";
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter";
import { Loading } from "../../components/Loading";
import { savePokemon } from "../../libs/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface TypeProps {
  type: {
    name: string;
    url: string;
  };
}

interface FlavorText {
  flavor_text: string;
  language: {
    name: string;
  };
  version: {
    name: string;
  };
}

export function Home() {
  const [pokemon, setPokemon] = useState({} as PokemonProps);
  const [types, setTypes] = useState<TypeProps[]>([]);
  const [randomId, setRandomId] = useState(Math.floor(Math.random() * 800 + 1));
  const [colorType, setColorType] = useState("");
  const [uniqueDescription, setUniqueDescription] = useState("");
  const [isFavButtonClicked, setIsFavButtonClicked] = useState(false);
  const [coachName, setCoachName] = useState("");

  useEffect(() => {
    getPokemonRandomly();
    // getDetail();
  }, [randomId]);
  useEffect(() => {
    AsyncStorage.getItem("coachName").then(
      (e) => e && setCoachName(JSON.parse(e))
    );
  }, []);
  async function getPokemonRandomly() {
    try {
      const { name, types } = (await api.get(`/pokemon/${randomId}`)).data;

      setPokemon({
        name,
        id: randomId,
      });
      setTypes(types);
    } catch (err) {}
  }

  async function getDetail() {
    const response = await api.get(`/pokemon-species/${randomId}`);
    let obj: string[] = [];

    response.data.flavor_text_entries.map((desc: FlavorText) =>
      obj.push(desc.version.name)
    );

    /* Pegando a primeira descrição em inglês */
    for (var i = 0; i < obj.length; i++) {
      if (
        response.data.flavor_text_entries[i].language.name === "en" &&
        response.data.flavor_text_entries[i].version.name === obj[i]
      ) {
        setUniqueDescription(response.data.flavor_text_entries[i].flavor_text);
      }
    }
  }

  function handleChangeColor(color: string) {
    setColorType(color);
  }

  function handleAddPokemonToFavorite() {
    try {
      savePokemon(pokemon);

      setIsFavButtonClicked(true);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <Container>
        <Header>
          <View>
            <HeaderText>{`Olá, ${coachName}`}</HeaderText>

            <HeaderDownText>Seu pokemon do dia</HeaderDownText>
          </View>
        </Header>

        {uniqueDescription && types ? (
          <PokemonContent>
            <Scroll showsVerticalScrollIndicator={false}>
              <PokemonName>
                {capitalizeFirstLetter(pokemon.name ?? "")}
              </PokemonName>

              <PokemonBox background={colorType ? colorType : "#666"}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <MaterialCommunityIcons
                    name="pokeball"
                    size={130}
                    color="#6666"
                    style={{
                      position: "absolute",
                    }}
                  />
                  <PokemonNumber>Nº {randomId}</PokemonNumber>

                  <FavoriteButton onPress={handleAddPokemonToFavorite}>
                    {isFavButtonClicked ? (
                      <AntDesign name="heart" size={35} color="#FFF" />
                    ) : (
                      <EvilIcons name="heart" size={35} color="#fff" />
                    )}
                  </FavoriteButton>
                </View>
                <View style={{ alignItems: "center" }}>
                  {randomId < 10 && (
                    <PokemonImage
                      source={{
                        uri: `https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/00${randomId}.png`,
                      }}
                      resizeMode="contain"
                    />
                  )}
                  {randomId >= 10 && randomId < 100 && (
                    <PokemonImage
                      source={{
                        uri: `https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/0${randomId}.png`,
                      }}
                      resizeMode="contain"
                    />
                  )}
                  {randomId > 100 && (
                    <PokemonImage
                      source={{
                        uri: `https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/${randomId}.png`,
                      }}
                      resizeMode="contain"
                    />
                  )}
                </View>
              </PokemonBox>

              <Types>
                <TypeText>Tipo</TypeText>

                <View style={{ flexDirection: "row" }}>
                  {types.map((type) => (
                    <TypeView key={type.type.name} color={"#666"}>
                      <IconPerType
                        name={type.type.name}
                        color="#000"
                        size={24}
                        handleChangeColor={handleChangeColor}
                      />
                      <TypeViewText color={"#666"}>
                        {capitalizeFirstLetter(type.type.name)}
                      </TypeViewText>
                    </TypeView>
                  ))}
                </View>
              </Types>

              <DescriptionView>
                <DescriptionText>{uniqueDescription}</DescriptionText>
              </DescriptionView>
            </Scroll>
          </PokemonContent>
        ) : (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Loading />
          </View>
        )}
      </Container>
      <Footer currentPage="home" />
    </>
  );
}
