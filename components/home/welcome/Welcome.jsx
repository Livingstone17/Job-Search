import { useState } from 'react'
import React from 'react'
import { View, Text, TextInput, TouchableOpacity, Image, VirtualizedList, FlatList } from 'react-native'

import { useRouter } from 'expo-router';
import { icons, SIZES } from '../../../constants'
import styles from './welcome.style'


const Welcome = ({searchTerm,setsearchTerm, handleClick}) => {
  const router = useRouter();

  const jobTypes = ['Full-time', 'Part-time', 'Contract'];
  const [activeJobType, setactiveJobType] = useState('Full-time');

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.userName}>Hello Zaophos</Text>
        <Text style={styles.welcomeMessage}>Find your Perfect Job</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value={searchTerm}
            onChangeText={(text) => setsearchTerm(text)}
            placeholder="What are you looking for"
          />
        </View>

        <TouchableOpacity style={styles.searchBtn} onPress={handleClick} >
          <Image
            source={icons.search}
            resizeMode='contain'
            style={styles.searchBtnImage} />
        </TouchableOpacity>
      </View>
      <View horizontal={false}

        style={styles.tabsContainer}>

        {/* <FlatList
          data={jobTypes}
          horizontal={false}
          scrollEnabled={true}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.tab(activeJobType, item)}
              onPress={() => {
                // Handle onPress logic here
              }}
            >
              <Text>{item}</Text>
            </TouchableOpacity>
          )}
        /> */}
        <FlatList
          data={jobTypes}
          horizontal={false}
          scrollEnabled={true}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.tab(activeJobType, item)}
              onPress={() => {
                setactiveJobType(item);
                router.push(`/search/${item}`)
              }}
            >
              <Text style={styles.tabText(activeJobType, item)}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={item => item}
          contentContainerStyle={{ columnGap: SIZES.small }}
          horizontal
        />

      </View>
    </View>
  )
}

export default Welcome