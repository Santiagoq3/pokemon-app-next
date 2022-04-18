import { Button, Card, Grid, Row, Text } from '@nextui-org/react'

import type { NextPage } from 'next'
import { GetStaticProps } from 'next'
import { pokeApi } from '../api';
import { Layout } from '../components/Layouts/Layout';
import { PokemonCard } from '../components/pokemon';
import { PokemonListResponse, SmallPokemon } from '../interfaces/pokemon-list';


interface props {
  pokemons: SmallPokemon[]
}

const Home: NextPage<props> = ({pokemons}) => {

  console.log(pokemons)
  return (
    <Layout title="Pokemon App Santiago">

      <Grid.Container gap={2} justify="flex-start">
        {
          pokemons.map((p)=> (
            
            <PokemonCard key={p.id } pokemon={p} />
          ))
         
        }
      </Grid.Container>
    </Layout>
  )
}


export const getStaticProps: GetStaticProps = async (ctx) => {
  // const { data } = await  // your fetch function here 
  const {data} = await pokeApi.get<PokemonListResponse>("/pokemon?limit=151")

  const pokemons: SmallPokemon[] = data.results.map((p,i) => ({
    ...p,
    id: i + 1,
    img:  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${i+1}.svg`
  }))
  return{
    props: {
      pokemons
    }
  }
}

export default Home
