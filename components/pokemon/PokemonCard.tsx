import React, { FC } from 'react'
import { SmallPokemon } from '../../interfaces'
import { Button, Card, Grid, Row, Text } from '@nextui-org/react'
import { useRouter } from 'next/router'
interface props{
    pokemon: SmallPokemon
}

export const PokemonCard: FC<props> = ({pokemon}) => {
    const {id,img,name} = pokemon;
    const router = useRouter()
    const pokemonClick = ()=>{
        router.push(`/pokemon/${pokemon.id}`)
    }
  return (
    <Grid xs={6} sm={3} md={2} xl={1} key={id}> 
        <Card hoverable clickable onClick={pokemonClick}>
            <Card.Body css={{padding:1}}>
                  <Card.Image src={img} width="100%" height={140} />
            </Card.Body>
            <Card.Footer>
                <Row justify='space-between'>
                    <Text transform='capitalize'>
                      {name}
                    </Text>
                </Row>
            </Card.Footer>
        </Card>
    </Grid>
  )
}
