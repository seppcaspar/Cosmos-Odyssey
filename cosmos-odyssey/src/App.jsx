import { useEffect, useState } from 'react'
import '@mantine/core/styles.css';
import { TextInput, NativeSelect, SimpleGrid, Accordion, ScrollArea, Card, Input, Text, Flex, Grid, Image, Box, Group, Button } from '@mantine/core';
import map from './assets/map.png'
import login from "./assets/login.png"
import { useForm } from '@mantine/form';


const apiUrl = "https://cosmos-odyssey.azurewebsites.net/api/v1.0/TravelPrices"
const API_URL = import.meta.env.API_URL ?? 'http://localhost:3001'

function App() {


  const [valid, setValid] = useState([]);

  useEffect(() => {
    fetch(API_URL + '/valid').then(
      response => response.json()
    ).then(
      data => {
        setValid(data)
      }
    )
    
  }, [])
  console.log(valid)



  const responsee = (valid) => {

    fetch(API_URL + '/DbUpdater', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(valid),
    });
  }
console.log(responsee)

  const [testProviders, setTestProviders] = useState([
    {
      id: 12,
      company: "fabbb",
      price: "1000",
      flightStart: "3:60",
      flightEnd: "4:00",
    },
    {
      id: 22,
      company: "fabbb",
      price: "2000",
      flightStart: "3:60",
      flightEnd: "4:00",
    },
    {
      id: 32,
      company: "fabbb",
      price: "3000",
      flightStart: "3:60",
      flightEnd: "4:00",
    },
    {
      id: 42,
      company: "fabbb",
      price: "4000",
      flightStart: "3:60",
      flightEnd: "4:00",
    }
  ]);

  const [customers, setCustomers] = useState([
    {
      id: 1,
      firstName: "john",
      lastName: "doe",
      Routes: "earth",
      totalQuotedPrice: "55",
      totalQuotedTravelTime: "44",
      transportationCompanyNames: "elon",
    },
    {
      id: 2,
      firstName: "caspar",
      lastName: "sepp",
      Routes: "mars",
      totalQuotedPrice: "552",
      totalQuotedTravelTime: "442",
      transportationCompanyNames: "elonmusk",
    }

  ]);


  const handleAccordionToggle = (id) => {
    const updatedProviders = testProviders.map((provider) =>
      provider.id === id ? { ...provider, expanded: !provider.expanded } : provider
    );
    setTestProviders(updatedProviders);
  };

  const handleSignIn = 0;

  return (

    <Box p="xl">
      <Group justify='space-between' align='top' wrap='wrap'>
        <Flex mah={350} direction="column" align="flex-start">
          <Text size="50px" fw={500}>Cosmos Odyssey</Text>


          <Group>

            <Image src={login} h={100} w="auto" fit='contain' />
            <Group>
              <TextInput size='md' placeholder="First name"></TextInput>
              <TextInput size="md" placeholder="Last name"></TextInput>
            </Group>

            <Button
              size='md'>Sign In</Button>

          </Group>
        </Flex>


        <Image
          radius="md"
          src={map}
          fit='contain'
          mah={340}
          maw="auto"
        />

      </Group>
      <Box maw={700} pb={50}>

        <SimpleGrid cols={3} pb={10}>
          <Flex align="flex-end">
            <Button fullWidth>Show all</Button>
          </Flex>

          <NativeSelect label="Expired pricelists" description="Select an expired pricelist (Valid until)" data={['React', 'Angular', 'Vue']} />

        </SimpleGrid>
        <SimpleGrid cols={3}>
          <NativeSelect label="From" data={['React', 'Angular', 'Vue']} />
          <NativeSelect label="To" data={['React', 'Angular', 'Vue']} />
          <Flex justify="flex-start" direction="column">
            <Text>Distance:</Text>
            <Card mah={38} shadow="sm" radius="md" pt={6}>
              <Text>23094900KM</Text>
            </Card>
          </Flex>

        </SimpleGrid>



      </Box>



      <Button>Filter</Button>


      <Group>
        <ScrollArea h={500} w={700}>
          {testProviders.map(provider => (
            <Accordion
              key={provider.id}
              label={provider.company}
              onToggle={() => handleAccordionToggle(provider.id)}
              opened={provider.expanded ? 'true' : 'false'}
            >
              <Card shadow="sm" padding="md" radius="md" style={{ marginTop: '10px' }}>
                <Group justify='space-between' align='top'>
                  <Text weight={700} size="lg">
                    <Text>Company: {provider.company}</Text>
                    <Text>Price: {provider.price}</Text>
                    <Text>Flight start: {provider.flightStart}</Text>
                    <Text>Flight end: {provider.flightEnd}</Text>
                  </Text>
                  <Button
                    size="sm"
                    style={{ marginTop: '8px', width: '120px' }}
                    onClick={() => handleAccordionToggle(provider.id)}>
                    {provider.expanded ? 'Hide Details' : 'Show Details'}
                  </Button>
                </Group>

                {provider.expanded && (
                  <div>
                    <Grid pt={10}>
                      <Grid.Col span={4}>
                        <Input size="md" placeholder="First name"></Input>
                      </Grid.Col>
                      <Grid.Col span={4}>
                        <Input size="md" placeholder="Last name"></Input>
                      </Grid.Col>
                      <Grid.Col span={4}>
                        <Flex justify="flex-end">
                          <Button>Reserve</Button>
                        </Flex>

                      </Grid.Col>
                    </Grid>

                  </div>
                )}
              </Card>
            </Accordion>
          ))}
        </ScrollArea>
      </Group>

    </Box>
  );
}

export default App


