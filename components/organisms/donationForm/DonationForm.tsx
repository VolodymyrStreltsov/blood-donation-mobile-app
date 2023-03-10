import { useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Dimensions, Platform, ScrollView, StyleSheet } from 'react-native'
import { Appbar, Menu } from 'react-native-paper'
import { BASE_DONATION_INFO, MORPHOLOGY_INDICATORS, PREVIOUS_DONATIONS_DATA } from '../../../assets/data/dataArrays'
import { ControlledTextInput, DatePicker, Text, View } from '../../atoms'


export const DonationForm = ({ nameOfDonation, id }: { nameOfDonation: string, id?: string }) => {
  const donation = PREVIOUS_DONATIONS_DATA.find((el: Donation) => el.id === id)
  const [editable, setEditable] = useState(false)
  const [activeFields, setActiveFields] = useState(id === '')

  console.log('editable', editable, 'activeFields', activeFields, 'id', id)

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
    console.log('onSubmit', val)
    setEditable(false)
    setActiveFields(false)
    console.log('editable', editable, 'activeFields', activeFields)
  }

  return (
    <View style={styles.container}>
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
        <ScrollView
          contentContainerStyle={styles.headFormContainer}
          showsVerticalScrollIndicator={false}>
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
        </ScrollView >
      </View>
      <View style={styles.formWrapper}>
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
      </View>
    </View >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
  },
  appbarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: -76,
    marginHorizontal: -26,
    backgroundColor: 'transparent',
  },
  headerWrapper: {
    flex: 1
  },
  formWrapper: {
    flex: 3
  },
  headFormContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    width: Platform.OS === 'web' ? '80vw' : Dimensions.get('window').width * 0.85,
    gap: 16,
  },
  formContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    width: Platform.OS === 'web' ? '80vw' : Dimensions.get('window').width * 0.85,
    gap: 16,
  },
  item: {
    minWidth: '47%',
  },
})
