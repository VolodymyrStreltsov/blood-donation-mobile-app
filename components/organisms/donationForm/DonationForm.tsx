import { useRouter } from 'expo-router'
import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Dimensions, Platform, StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Appbar, Menu } from 'react-native-paper'
import { DataContext } from '../../../data/DataContext'
import { ControlledTextInput, DatePicker, Text, View } from '../../atoms'


export const DonationForm = ({ nameOfDonation, id }: { nameOfDonation: string, id?: string }) => {
  const { BASE_DONATION_INFO, MORPHOLOGY_INDICATORS, PREVIOUS_DONATIONS_DATA, setPreviousDonationsData } = useContext(DataContext)
  const donation = id ? PREVIOUS_DONATIONS_DATA.find((el: Donation) => el.id === id) : null
  const [editable, setEditable] = useState(false)
  const [activeFields, setActiveFields] = useState(id === '')

  const [visible, setVisible] = useState(false)
  const router = useRouter()

  const switchMenuVisible = () => {
    setVisible(!visible)
  }

  const switchEditable = () => {
    setEditable(!editable)
    setVisible(false)
  }

  useEffect(() => {
    editable && setActiveFields(true)
  }, [editable])

  const defaultValues: AddDonationFormDefaultValues = {
  }

  MORPHOLOGY_INDICATORS.forEach((item: Indicator) =>
    defaultValues[item.id] = donation?.morphology[item.id] || item.initVal)
  BASE_DONATION_INFO.forEach((item: BaseDonationIndicator) => defaultValues[item.id] = donation?.baseDonationInfo[item.id] || item.initVal)

  const { handleSubmit, control, register } = useForm({
    mode: 'onSubmit',
    criteriaMode: 'firstError',
    defaultValues,
  })

  useEffect(() => {
    Object.keys(defaultValues).map((item) => {
      register(item)
    })
  }, [register])

  const onSubmit = (val: any) => {
    console.log(val)
    setPreviousDonationsData([...PREVIOUS_DONATIONS_DATA, {
      id: Math.random().toString(36).toString(),
      baseDonationInfo: {
        type: val.type,
        date: val?.date?.nativeEvent?.timestamp ? new Date(val.date.nativeEvent.timestamp) : new Date(val.date),
        volume: val.volume,
        blood_pressure: val.blood_pressure,
      },
      morphology: {
        Hb: val.Hb,
        Ht: val.Ht,
        MCV: val.NCV,
        MCH: val.MCH,
        MCHC: val.MCHC,
        RDW: val.RDW,
        WBC: val.WBC,
        PLT: val.PLT,
        MPV: val.MPV,
        PCT: val.PCT,
        PDW: val.PDW,
        MO: val.MO,
      },
    }])
    console.log(PREVIOUS_DONATIONS_DATA)
    router.back()
  }

  return (
    <View style={styles.container} >
      <Appbar.Header style={styles.appbarContainer}>
        <Appbar.BackAction onPress={() => router.back()} />
        <Menu
          visible={visible}
          onDismiss={switchMenuVisible}
          anchor={
            <Appbar.Action
              icon={activeFields ? 'check' : 'dots-vertical'}
              onPress={!activeFields ? switchMenuVisible : handleSubmit(onSubmit)}
            />
          }
        >
          <Menu.Item onPress={switchEditable} title='Edit' />
          <Menu.Item onPress={() => null} title='Delete' />
          <Menu.Item onPress={() => null} title='Share' />
        </Menu>
      </Appbar.Header>
      <Text variant='h2' align='flex-start'>{nameOfDonation}</Text>
      <View style={styles.headerWrapper}>
        <View style={styles.formContainer}>
          {BASE_DONATION_INFO.map((item: BaseDonationIndicator) => item.id === 'date' ?
            <DatePicker
              key={item.id}
              control={control}
              name={item.id}
              style={styles.item}
              disabled={!activeFields} /> :
            <ControlledTextInput
              disabled={!activeFields}
              key={item.id}
              name={item.id}
              control={control}
              style={styles.item}
            />
          )}
        </View >
      </View>
      <Text variant='h2' align='flex-start'>Morphology results</Text>
      <ScrollView
        contentContainerStyle={styles.formContainer}
        showsVerticalScrollIndicator={false}>
        {MORPHOLOGY_INDICATORS.map((item: Indicator) => (
          <ControlledTextInput
            disabled={!activeFields}
            key={item.id}
            name={item.id}
            control={control}
            style={styles.item}
          />
        ))}
      </ScrollView >
    </View >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  appbarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: -76,
    marginHorizontal: -26,
    backgroundColor: 'transparent',
  },
  headerWrapper: {
    height: 150,
  },
  formContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    width: Platform.OS === 'web' ? '85vw' : Dimensions.get('window').width * 0.85,
    gap: 16,
  },
  item: {
    minWidth: '47%',
  },
})
