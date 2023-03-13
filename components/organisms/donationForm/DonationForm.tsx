import { useRouter } from 'expo-router'
import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Dimensions, Platform, StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Appbar, Menu } from 'react-native-paper'
import { DataContext } from '../../../data/DataContext'
import { ControlledDropDown, ControlledTextInput, DatePicker, Text, View } from '../../atoms'


export const DonationForm = ({ nameOfDonation, id }: { nameOfDonation: string, id?: string }) => {
  const { BASE_DONATION_INFO, MORPHOLOGY_INDICATORS, PREVIOUS_DONATIONS_DATA, DONATION_TYPES, setPreviousDonationsData } = useContext(DataContext)
  const disqualified = nameOfDonation === 'Disqualification'

  const dropdownActive = ['Whole_blood', 'Plasma', 'Platelets', 'Disqualification'].includes(nameOfDonation) ? false : true

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
    type: dropdownActive ? DONATION_TYPES[0].value : nameOfDonation,
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
    setPreviousDonationsData([{
      id: Math.random().toString(36).toString(),
      baseDonationInfo: {
        type: val.type,
        date: val.date,
        volume: val.volume,
        blood_pressure: val.blood_pressure,
        duration: val.duration,
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
    }, ...PREVIOUS_DONATIONS_DATA])
    // set disqualification (disqualification_duration: val?.disqualification_duration)
    router.back()
  }

  return (
    <>
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
      <Text variant='h2' align='flex-start' style={{ marginBottom: 40 }}>{nameOfDonation}</Text>
      {dropdownActive && <ControlledDropDown style={styles.dropDownItem} control={control} name='type' list={DONATION_TYPES} />}
      <View style={styles.headerWrapper}>
        {BASE_DONATION_INFO.map((item: BaseDonationIndicator) => {
          if (item.id === 'date') {
            return <DatePicker
              key={item.id}
              control={control}
              name={item.id}
              style={styles.item}
              disabled={!activeFields} />
          }
          else if (item.id === 'duration' && disqualified) {
            return <ControlledTextInput
              disabled={!activeFields}
              key={item.id}
              name={item.id}
              control={control}
              style={styles.item}
            />
          }
          else if (item.id === 'duration' && !disqualified) return null
          else {
            return <ControlledTextInput
              disabled={!activeFields}
              key={item.id}
              name={item.id}
              control={control}
              style={styles.item}
            />
          }
        })}
      </View >
      <Text variant='h4' bold align='flex-start' style={{ marginBottom: 20 }}>Morphology results</Text>
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
    </ >
  )
}

const styles = StyleSheet.create({
  appbarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: 'transparent',
    width: Platform.OS === 'web' ? '100vw' : Dimensions.get('window').width,
    marginTop: Platform.OS === 'web' ? 0 : -25,
  },
  headerWrapper: {
    height: 160,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    width: '100%',
    rowGap: 16,
  },
  formContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    width: '100%',
    rowGap: 16,
  },
  item: {
    minWidth: '47%',
  },
  dropDownItem: {
    width: '100%',
    marginBottom: 16,
  },
})