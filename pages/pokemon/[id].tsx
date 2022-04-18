import { Button, Card, Container, Grid, Image, Text } from '@nextui-org/react';
import { GetStaticProps, NextPage } from 'next';
import { GetStaticPaths } from 'next'

import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import { pokeApi } from '../../api';
import { Layout } from '../../components/Layouts/Layout';
import { Pokemon } from '../../interfaces/pokemon-full';

interface props{
  pokemon: Pokemon
}

const PokemonPage: NextPage<props> = ({pokemon}) => {

    const router = useRouter()

    console.log(pokemon.name)
  return (
    <Layout title='Poke'>
        {/* <h1>{pokemon.id} - {pokemon.name}</h1>ç */}
        <Grid.Container css={{
          marginTop: "10px"
        }} gap={2}>
            <Grid xs={12} sm={4}>
              <Card hoverable css={{padding: '30px'}}>
                <Card.Body>
                  <Card.Image src={pokemon.sprites?.other?.dream_world.front_default || "/no-img.png"} width="100%" height={200} />
                </Card.Body>
              </Card>
            </Grid>
            <Grid xs={12} sm={8}>
              <Card>
                <Card.Header css={{display: 'flex',justifyContent:'space-between'}}>
                  <Text>
                    {pokemon.name}
                  </Text>
                  <Button color={'gradient'} ghost>
                    Guardar en favoritos
                  </Button>
                </Card.Header>
                <Card.Body>
                  <Text size={30}>
                    Sprites:
                  </Text>
                  <Container direction='row' display='flex'>
                    <Image src={pokemon.sprites?.front_default || "/no-image.jpg"} width={100} height={100} />
                    <Image src={pokemon.sprites?.front_shiny || "/no-image.jpg"} width={100} height={100} />
                    <Image src={pokemon.sprites?.back_shiny || "/no-image.jpg"} width={100} height={100} />

                  </Container>
                </Card.Body>
              </Card>
            </Grid>
        </Grid.Container>
    </Layout>
  )
}
export const getStaticProps: GetStaticProps = async ({params}) => {
  // const { data } = await  // your fetch function here 
  
  const {id } = params as {id: string}
  
  const {data} = await pokeApi.get<Pokemon>(`/pokemon/${id}`)

  return{
    props: {
     pokemon: data
    }
  }
}



export const getStaticPaths: GetStaticPaths = async (ctx) => {

  const pokemons151 = [...Array(151)].map((value,idx) => `${idx + 1}`)
  return {
    paths: 
      pokemons151.map(id =>({
        params: {id}
      }))
    ,
    fallback: false
  }
}

export default PokemonPage
