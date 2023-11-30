import { View, Text, SafeAreaView, ScrollView, ActivityIndicator, RefreshControl } from 'react-native'

import { Stack, useRouter, useGlobalSearchParams } from 'expo-router'
import { useCallback, useState } from 'react';

import { Company, JobAbout, JobFooter, JobTabs, ScreenHeaderBtn, Specifics } from '../../components'
import { COLORS, icons, SIZES } from '../../constants';
import useFetch from '../../hook/useFetch';
import { TouchableOpacity } from 'react-native-gesture-handler';




const tabs = ['About', 'Qualifications', 'Responsibilities'];



export default function JobDetails() {

  const params = useGlobalSearchParams();
  const router = useRouter();
  const [refreshing, setrefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const onRefresh = useCallback(() => {
    setrefreshing(true);
    refetch();
    setrefreshing(false);
  },[] )

  const displayTabContent = () => {
    switch (activeTab) {
      case "Qualifications":
        return <Specifics
          title='Qualifications'
          points={data[0].job_highlights?.Qualifications ?? ['N/A']}
        />
      case "About":
        return <JobAbout 
        info={data[0].job_description ?? "No data provided"  } /> 
      case "Responsibilities":
        return <Specifics
        title='Responsibilities'
        points={data[0].job_highlights?.Responsibilities ?? ['N/A']}
      />

      default:
        break;
    }
  }

  const { data, isLoading, error, refetch } = useFetch('job-details', {
    job_id: params.id
  })
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: COLORS.lightWhite }}
    >
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerTitle:'',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}>
              <ScreenHeaderBtn 
            iconUrl = {icons.left}
            dimension = "60%"
            handlePress = {() => router.back}
            />
            </TouchableOpacity>
            
          ),
          headerRight: () => (
            <TouchableOpacity
            // onPress = {() => router.back()}
            >
               <ScreenHeaderBtn 
            iconUrl = {icons.share}
            dimension = "60%"
            handlePress = {() => {}}
            />
            </TouchableOpacity>
          )
        }}
      />
      <>
        <ScrollView showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl
            refreshing={refreshing} onRefresh={onRefresh}

          />}
        >
          {isLoading ? (
            <ActivityIndicator size="large" color={COLORS.primary} />
          ) : error ? (
            <Text>Something went wrong</Text>
          ) : data.length === 0 ? (
            <Text>No data</Text>
          ) : (
            <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
              <Company
                companyLogo={data[0].employer_logo}
                jobTitle={data[0].job_title}
                companyName={data[0].employer_name}
                location={data[0].job_country}

              />
              <JobTabs
                tabs={tabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />

              {displayTabContent()}
            </View>
          )}
        </ScrollView>
        <JobFooter url={data[0]?.job_google_link ?? 'https://careers.google.com/jobs/results'}  />
      </>

    </SafeAreaView>
  )
}