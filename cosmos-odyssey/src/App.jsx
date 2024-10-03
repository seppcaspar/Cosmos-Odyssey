import { useEffect, useState } from 'react'
import '@mantine/core/styles.css';
import { TextInput, NativeSelect, SimpleGrid, Accordion, ScrollArea, Card, Input, Text, Flex, Grid, Image, Box, Group, Button, Menu } from '@mantine/core';
import { useForm } from '@mantine/form';
import map from './assets/map.png'
import login from "./assets/login.png"
import { notifications } from '@mantine/notifications';
import '@mantine/notifications/styles.css';

const API_URL = import.meta.env.API_URL ?? 'http://localhost:3001'
const notEmpty = (value) => value?.trim().length == 0 ? "This field is required" : null;

function App() {

  const form = useForm({
    initialValues: {
      firstName: "",
      lastName: "",
      validUntilID: "",
    },

    validate: {
      firstName: notEmpty,
      lastName: notEmpty,
    },
  });

  const reserveForm = useForm({
    initialValues: {
      providerID: "",
      firstName: "",
      lastName: "",
      validUntilID: "",
    },

    validate: {
      firstName: notEmpty,
      lastName: notEmpty,
    },
  });




  const [providers, setProviders] = useState([]);
  const [listProviders, setListProviders] = useState([]);
  const [filters, setFilters] = useState([]);
  const [valids, setValids] = useState([]);
  const [pricelists, setPricelists] = useState();
  const [megaList, setMegaList] = useState([]);
  const [validID, setValidID] = useState();
  const [sign, setSign] = useState("");
  const [name, setName] = useState();
  const [sorter, setSorter] = useState("10");

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
            form.setValues({
              validUntilID: item.id
            })
            setListProviders(data.allprovs.filter(listProviders => listProviders.validUntilID == item.id))
            setFilters(data.allprovs.filter(listProviders => listProviders.validUntilID == item.id))
            setProviders(data.allprovs.filter(listProviders => listProviders.validUntilID == item.id))
          }
        }

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
  const [reservations, setReservations] = useState([]);
  const [priceTotal, setPriceTotal] = useState();
  const [timeTotal, setTimeTotal] = useState();
  const [seeReserv, setSeeReserv] = useState("hidden");



  const handleReservationsToggle = () => {
    if (seeReserv == "hidden") {
      setSeeReserv("shown")
    } else {
      setSeeReserv("hidden")

    }
    console.log(seeReserv)

  }


  const handleAccordionToggle = (id) => {
    const updatedProviders = providers.map((provider) =>
      provider.id === id ? { ...provider, expanded: !provider.expanded } : provider
    );
    setProviders(updatedProviders);
  };
  const handleFrom = (from) => {
    setSorter("0")
    setFromValue(from)
    let updatedTo = [""]
    for (var i = 0, len = routes.length; i < len; i++) {
      var item = routes[i];
      if (item.from == from) {
        updatedTo.push(item.to);
      }
    }
    setToValue(updatedTo)
    if (from == "") {
      if (companyValue == "") {
        setProviders(listProviders)
      } else {
        setProviders(listProviders.filter(providers => providers.company == companyValue))
      }
      setDistance(0)
      setToFilter("")
    }

  };

  const handleTo = async (to) => {
    setToFilter(to)
    setSorter("0")
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
      if (companyValue == "") {
        setProviders(listProviders)
      } else {
        setProviders(listProviders.filter(providers => providers.company == companyValue))
      }
      setDistance(0)
    }
  }
  const handleCompany = (company) => {
    setSorter("0")
    setCompanyValue(company)
    let filtered = listProviders.filter(providers => providers.company == company)
    if (toFilter != "") {
      setProviders(filtered.filter(providers => providers.routeID == routeid))

    }
    if (toFilter == "") {
      setProviders(filtered)

    }
    if (company == "") {
      if (toFilter == "") {
        setProviders(listProviders)
      } else {
        setProviders(listProviders.filter(providers => providers.routeID == routeid))
      }


    }


  }

  const handleValid = (valid) => {
    setSorter("0")
    handleTo("")
    handleFrom("")
    handleCompany("")
    for (var i = 0, len = valids.length; i < len; i++) {
      var item = valids[i];
      if (item.ValidUntil == valid) {
        setValidID(item.id)
        setListProviders(megaList.filter(listProviders => listProviders.validUntilID == item.id))
        setFilters(megaList.filter(listProviders => listProviders.validUntilID == item.id))
        setProviders(megaList.filter(listProviders => listProviders.validUntilID == item.id))
        console.log(item.id)
      }
    }


  };
  const handleShowAll = () => {
    handleTo("")
    handleFrom("")
    handleCompany("")
    setSorter("0")
    setProviders(listProviders);
  };
  const handleNotification = (data) => {
    if (data.status == "already exists")
      notifications.show({
        title: "Reservation failed",
        message: "Reservation already exists!",


      })
    if (data.status == "outdated")
      notifications.show({
        title: "Reservation failed",
        message: "Selected pricelist is expired!"
      })
  };

  const handleSign = (reservations) => {
    //"reservations" contains provider ids
    setSign("signed")
    let priceTotal = 0
    let timeTotal = 0
    let list = []
    let idCounter = 50

    //for each providerID
    for (var i = 0, len = reservations.length; i < len; i++) {
      let current = reservations[i]
      //look through all providers
      for (var j = 0, len2 = megaList.length; j < len2; j++) {
        let item = megaList[j]
        //search for the "reservations"ID
        if (item.id == current) {
          for (var k = 0, len3 = routes.length; k < len3; k++) {
            let route = routes[k]
            //search the route of the provider
            if (route.id == item.routeID) {
              let valid = valids.filter(valids => valids.id == item.validUntilID)
              let router = `From ${route.from} To ${route.to}`
              priceTotal += item.price
              var eventStartTime = new Date(item.flightStart);
              var eventEndTime = new Date(item.flightEnd);
              var duration = Math.floor((((eventEndTime.valueOf() - eventStartTime.valueOf()) / 1000) / 60) / 60);
              timeTotal += duration
              list.push({
                id: idCounter++,
                route: router,
                company: item.company,
                price: item.price,
                flightStart: item.flightStart,
                flightEnd: item.flightEnd,
                validUntil: valid[0].ValidUntil
              })
            }
          }
        }
      }
    }
    list.sort((a, b) => b.validUntil.localeCompare(a.validUntil) || b.company - a.company);
    setPriceTotal(priceTotal)
    setTimeTotal(timeTotal)
    setReservations(list)

  };
  const handleSort = (sort) => {
    try {

      if (sort == "des") {
        setProviders(providers.sort((a, b) => (a.price > b.price ? -1 : 1)))
        setSorter("1")
      }
      if (sort == "asc") {
        setProviders(providers.sort((a, b) => (a.price < b.price ? -1 : 1)))
        setSorter("2")
      }
    } catch (error) {
      console.log(error)
    }
  }
  const handleSignIn = 0;

  return (

    <Box p="xl">
      <Group justify='space-between' align='top' wrap='wrap'>
        <Flex mah={350} direction="column" align="flex-start">
          <Text size="50px" fw={500}>Cosmos Odyssey</Text>

          <form onSubmit={form.onSubmit(async (values) => {
            try {
              const response = await fetch(API_URL + "/getRes/" + values.firstName + "/" + values.lastName);
              setName(values.firstName + " " + values.lastName)
              const data = await response.json()
              let reservations = []
              for (var i = 0, len = data.length; i < len; i++) {
                var item = data[i];
                reservations.push(item.providerID);
              }
              handleSign(reservations)
              console.log(reservations)

            } catch (error) {

              console.error(error);
            }
          })}>

            <Group>

              <Image src={login} h={100} w="auto" fit='contain' />
              {sign === "" &&
                <Group>
                  <TextInput size='md' placeholder="First name" {...form.getInputProps('firstName')}></TextInput>
                  <TextInput size="md" placeholder="Last name" {...form.getInputProps('lastName')}></TextInput>
                </Group>
              }
              {sign === "" &&
                <Button type="submit"
                  size='md'>Sign In</Button>
              }
              {sign === "signed" &&


                <Text size='xl'>
                  {name}
                </Text>


              }

            </Group>
            {sign === "signed" &&
              <div>
                <Text>Total quoted price: {priceTotal}</Text>
                <Text>Total quoted travel time: {timeTotal}h</Text>

                <Button onClick={() => handleReservationsToggle()} size="md">
                  {seeReserv === "hidden" &&
                    "Show reservations"
                  }
                  {seeReserv === "shown" &&
                    "Hide reservations"
                  }
                </Button>
              </div>

            }
          </form>
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
            <Button fullWidth onClick={() => handleShowAll()}>Show all</Button>
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

        <Menu shadow="md" width={200}>
          <Menu.Target>
            <Button>Sort by</Button>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item onClick={() => handleSort("des")}>
              Price (descending)
            </Menu.Item>
            <Menu.Item onClick={() => handleSort("asc")}>
              price (ascending)
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
        <NativeSelect
          label="Filter by company"
          value={companyValue}
          onChange={(event) => handleCompany(event.currentTarget.value)}
          placeholder="Enter company name"
          data={["", 'Space Odyssey', 'Explore Origin', 'Spacelux', 'Galaxy Express', 'Travel Nova', 'Spacegenix', 'Explore Dynamite', 'Space Voyager', 'SpaceX', 'Space Piper']} />
        <Text>Results: {providers.length}</Text>
      </Flex>


      <Group justify='space-between'>
        {/* visible providers list */}
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
                    <form onSubmit={reserveForm.onSubmit(async (values) => {
                      try {
                        const response = await fetch(API_URL + "/setRes/" + provider.id + "/" + values.firstName + "/" + values.lastName + "/" + provider.validUntilID)
                        const data = await response.json()
                        console.log(data)
                        if (data.status == "outdated" || data.status == "already exists") {

                          handleNotification(data)

                        } else {
                          setName(values.firstName + " " + values.lastName)
                          let reservations = []
                          for (var i = 0, len = data.length; i < len; i++) {
                            var item = data[i];
                            reservations.push(item.providerID);
                          }
                          handleSign(reservations)
                          notifications.show({
                            title: "Reservation created",
                            message: "A new reservation has been created under your name!"
                          })
                        }

                      } catch (error) {
                        console.log(error)
                      }
                    })}>

                      <Grid pt={10}>
                        <Grid.Col span={4}>
                          <Input size="md" placeholder="First name" {...reserveForm.getInputProps('firstName')}></Input>
                        </Grid.Col>
                        <Grid.Col span={4}>
                          <Input size="md" placeholder="Last name" {...reserveForm.getInputProps('lastName')}></Input>
                        </Grid.Col>
                        <Grid.Col span={4}>
                          <Flex justify="flex-end">
                            <Button type='submit'>Reserve</Button>
                          </Flex>

                        </Grid.Col>
                      </Grid>

                    </form>
                  </div>
                )}
              </Card>
            </Accordion>
          ))}
        </ScrollArea>

        {/* show reservations for signed in user */}

        {seeReserv === "shown" &&
          <div>

            <Text size="30px" fw={500}>Reservations</Text>
            <ScrollArea h={500} w={700}>
              {reservations.map(provider => (
                <Card shadow="sm" padding="md" radius="md" style={{ marginTop: '10px' }}>
                  <Group justify='space-between' align='top'>
                    <Text weight={700} size="lg">
                      <Text>Route: {provider.route}</Text>
                      <Text>Company: {provider.company}</Text>
                      <Text>Price: {provider.price}</Text>
                      <Text>Flight start: {provider.flightStart}</Text>
                      <Text>Flight end: {provider.flightEnd}</Text>
                      <Text>Valid until: {provider.validUntil}</Text>
                    </Text>
                  </Group>
                </Card>
              ))}
            </ScrollArea>
          </div>
        }
      </Group>

    </Box >
  );
}

export default App


