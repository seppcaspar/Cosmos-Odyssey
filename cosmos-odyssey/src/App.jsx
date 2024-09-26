import { useEffect, useState } from 'react'
import '@mantine/core/styles.css';
import { Autocomplete, TextInput, NativeSelect, SimpleGrid, Accordion, ScrollArea, Card, Input, Text, Flex, Grid, Image, Box, Group, Button, List } from '@mantine/core';
import map from './assets/map.png'
import login from "./assets/login.png"


const apiUrl = "https://cosmos-odyssey.azurewebsites.net/api/v1.0/TravelPrices"
const API_URL = import.meta.env.API_URL ?? 'http://localhost:3001'

function App() {


  const [providers, setProviders] = useState([]);
  const [listProviders, setListProviders] = useState([]);
  const [filters, setFilters] = useState([]);
  const [valids, setValids] = useState([]);
  const [pricelists, setPricelists] = useState();
  const [megaList, setMegaList] = useState([]);
  const [validID, setValidID] = useState();

  useEffect(() => {
    fetch(API_URL + '/newdata').then(
      response => response.json()
    ).then(
      data => {
        setMegaList(data.allprovs)
        
        setValids(data.validListes)
        let valides = []
        for (var i = 0, len = data.validListes.length; i < len; i++) {
          var item = data.validListes[i];
          valides.push(item.ValidUntil);
        }
        valides.sort((a, b) => b.localeCompare(a))
        setPricelists(valides)
        for (var i = 0, len = data.validListes.length; i < len; i++) {
          var item = data.validListes[i];
          if (item.ValidUntil == valides[0]) {
            setValidID(item.id)  
          }
        }
        setListProviders(megaList.filter(listProviders => listProviders.validUntilID == validID))
        setFilters(megaList.filter(listProviders => listProviders.validUntilID == validID))
      }
    )
    

  }, [])



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

  const [routes, setRoutes] = useState([
    {
      "id": 1,
      "from": "Earth",
      "to": "Jupiter",
      "distance": "628730000"
    },
    {
      "id": 2,
      "from": "Earth",
      "to": "Uranus",
      "distance": "2723950000"
    },
    {
      "id": 3,
      "from": "Mercury",
      "to": "Venus",
      "distance": "50290000"
    },
    {
      "id": 4,
      "from": "Venus",
      "to": "Mercury",
      "distance": "50290000"
    },
    {
      "id": 5,
      "from": "Venus",
      "to": "Earth",
      "distance": "41400000"
    },
    {
      "id": 6,
      "from": "Mars",
      "to": "Venus",
      "distance": "119740000"
    },
    {
      "id": 7,
      "from": "Jupiter",
      "to": "Mars",
      "distance": "550390000"
    },
    {
      "id": 8,
      "from": "Jupiter",
      "to": "Venus",
      "distance": "670130000"
    },
    {
      "id": 9,
      "from": "Saturn",
      "to": "Earth",
      "distance": "1275000000"
    },
    {
      "id": 10,
      "from": "Saturn",
      "to": "Neptune",
      "distance": "3076400000"
    },
    {
      "id": 11,
      "from": "Uranus",
      "to": "Saturn",
      "distance": "1448950000"
    },
    {
      "id": 12,
      from: "Uranus",
      "to": "Neptune",
      "distance": "1627450000"
    },
    {
      "id": 13,
      "from": "Neptune",
      "to": "Uranus",
      "distance": "1627450000"
    },
    {
      "id": 14,
      "from": "Neptune",
      "to": "Mercury",
      "distance": "4443090000"
    }
  ]
  );
  const [distance, setDistance] = useState('');
  //const [fromValue, setFromValue] = useState('');
  const [fromValue, setFromValue] = useState('');
  const [toValue, setToValue] = useState();
  const [companyValue, setCompanyValue] = useState("");
  const [routeid, setrouteid] = useState();
  const [toFilter, setToFilter] = useState("");



  
 

  const handleAccordionToggle = (id) => {
    const updatedProviders = providers.map((provider) =>
      provider.id === id ? { ...provider, expanded: !provider.expanded } : provider
    );
    setProviders(updatedProviders);
  };
  const handleFrom = (from) => {
    setFromValue(from)
    let updatedTo = [""]
    for (var i = 0, len = routes.length; i < len; i++) {
      var item = routes[i];
      if (item.from == from) {
        updatedTo.push(item.to);
      }
    }
    setToValue(updatedTo)


  };

  const handleTo = async (to) => {
    setToFilter(to)

    for (var i = 0, len = routes.length; i < len; i++) {
      var item = routes[i];
      if (item.from == fromValue && item.to == to) {
        setrouteid(item.id)
        setDistance(item.distance)
        let filtered = listProviders.filter(providers => providers.routeID == item.id)
        if (companyValue != "") {
          setProviders(filtered.filter(providers => providers.company == companyValue))
        }
        if (companyValue == "") {
          setProviders(filtered)
          
        }


      }
    }
    if (to == "") {
      setProviders(listProviders.filter(providers => providers.company == companyValue))
      setDistance(0)
    }
  }
  const handleCompany = (company) => {
        setCompanyValue(company)
        let filtered = listProviders.filter(providers => providers.company == company)
        if (toFilter != "") {
          setProviders(filtered.filter(providers => providers.routeID == routeid))

        }
        if (toFilter == "") {
          setProviders(filtered)
          
        }
        if (company == "") {
          setProviders(listProviders.filter(providers => providers.routeID == routeid))

        }

      
    }
    
    const handleValid = (valid) => {
      for (var i = 0, len = valids.length; i < len; i++) {
        var item = valids[i];
        if (item.ValidUntil == valid) {
          setValidID(item.id)  
        }
      }
      setListProviders(megaList.filter(listProviders => listProviders.validUntilID == validID))
      setFilters(listProviders)
      handleTo("")
      handleFrom("")
      handleCompany("")
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
            <Button fullWidth onClick={() => setProviders(listProviders)}>Show all</Button>
          </Flex>

          <NativeSelect 
          label="Expired pricelists" 
          description="Select an expired pricelist (Valid until)" 
          onChange={(event) => handleValid(event.currentTarget.value)}
          data={pricelists} />

        </SimpleGrid>

        <SimpleGrid cols={3}>
          <NativeSelect
            label="From"
            value={fromValue}
            onChange={(event) => handleFrom(event.currentTarget.value)}
            data={["", "Mercury", "Venus", "Earth", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune"]} />

          <NativeSelect
            //value={selectedTo}
            onChange={(event) => handleTo(event.currentTarget.value)}
            label="To"
            data={toValue} />

          <Flex justify="flex-start" direction="column">
            <Text>Distance:</Text>
            <Card mah={38} shadow="sm" radius="md" pt={6}>
              <Text>{distance}KM</Text>
            </Card>
          </Flex>

        </SimpleGrid>



      </Box>


      <Flex
        mih={50}
        gap="md"
        justify="flex-start"
        align="flex-end"
        direction="row"
        wrap="wrap"
      >

        <Button onClick={() => console.log(listProviders)}>Filter</Button>
        <NativeSelect
          label="Filter by company"
          value={companyValue}
          onChange={(event) => handleCompany(event.currentTarget.value)}
          placeholder="Enter company name"
          data={["",'Space Odyssey', 'Explore Origin', 'Spacelux', 'Galaxy Express', 'Travel Nova', 'Spacegenix', 'Explore Dynamite', 'Space Voyager', 'SpaceX', 'Space Piper']}/>
      </Flex>


      <Group>
        <ScrollArea h={500} w={700}>
          {providers.map(provider => (
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


