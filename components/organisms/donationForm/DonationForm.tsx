import { useRouter } from 'expo-router'
import { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Dimensions, Platform, StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Appbar, Menu } from 'react-native-paper'
import { DataContext } from '../../../data/DataContext'
import { ControlledDropDown, ControlledTextInput, DatePicker, Text, View } from '../../atoms'
import { donationHelper, getBaseValue, getMorphologyValue, getVolume } from './donationHelper'

export const DonationForm = ({ nameOfDonation, id }: { nameOfDonation: DonationName; id?: string }) => {
  const {
    BASE_DONATION_INDICATORS,
    MORPHOLOGY_INDICATORS,
    PREVIOUS_DONATIONS_DATA,
    BASE_DONATION_NAMES,
    EXTENDED_DONATION_NAMES,
    setPreviousDonationsData,
  } = useContext(DataContext)
  const disqualified = nameOfDonation === 'Disqualification'

  const DONATION_TYPES = EXTENDED_DONATION_NAMES.map((el: string) => ({ label: el, value: el }))

  const dropdownActive = BASE_DONATION_NAMES.includes(
    nameOfDonation,
  )
    ? false
    : true

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
    type: dropdownActive && !id ? EXTENDED_DONATION_NAMES[0] : nameOfDonation,
  }

  MORPHOLOGY_INDICATORS.forEach(
    (item: Indicator<MorphologyIndicators>) => (defaultValues[item.id] = getMorphologyValue(donation?.morphology || {} as MorphologyIndicators, item.id)),
  )
  BASE_DONATION_INDICATORS.forEach(
    (item: Indicator<BaseDonationInfo>) =>
      (defaultValues[item.id] = getBaseValue(donation?.baseDonationInfo || {} as BaseDonationInfo, item.id, nameOfDonation !== 'Donation' ? nameOfDonation : EXTENDED_DONATION_NAMES[0])),
  )

  const { handleSubmit, control, register, watch, setValue } = useForm({
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
    if (id) {
      const updatedDonationsData = PREVIOUS_DONATIONS_DATA.map((el: Donation) =>
        el.id === id ? donationHelper(val, id) : el,
      )
      updatedDonationsData.sort(
        (a: Donation, b: Donation) =>
          new Date(b.baseDonationInfo.date).getTime() - new Date(a.baseDonationInfo.date).getTime(),
      )
      setPreviousDonationsData(updatedDonationsData)
    } else {
      const updatedDonationsData = [...PREVIOUS_DONATIONS_DATA, donationHelper(val)]
      updatedDonationsData.sort(
        (a: Donation, b: Donation) =>
          new Date(b.baseDonationInfo.date).getTime() - new Date(a.baseDonationInfo.date).getTime(),
      )
      setPreviousDonationsData(updatedDonationsData)
    }
    router.back()
  }

  const deleteDonationHandler = () => {
    setPreviousDonationsData(PREVIOUS_DONATIONS_DATA.filter((el: Donation) => el.id !== id))
    router.back()
  }

  useEffect(() => {
    setValue('volume', getVolume(watch('type')), { shouldValidate: true })
  }, [watch('type')])

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
          }>
          <Menu.Item onPress={switchEditable} title='Edit' leadingIcon='pencil-outline' />
          <Menu.Item
            onPress={deleteDonationHandler}
            title='Delete'
            leadingIcon='trash-can-outline'
          />
          {/* <Menu.Item onPress={() => null} title='Share' leadingIcon='check' /> */}
        </Menu>
      </Appbar.Header>
      <Text variant='h2' align='flex-start' style={{ marginBottom: 30 }}>
        {nameOfDonation}
      </Text>
      {dropdownActive && activeFields && (
        <ControlledDropDown
          style={styles.dropDownItem}
          control={control}
          name='type'
          list={DONATION_TYPES}
        />
      )}
      <View style={styles.headerWrapper}>
        {BASE_DONATION_INDICATORS.map((item: Indicator<BaseDonationInfo>) => {
          if (item.id === 'date') {
            return (
              <DatePicker
                key={item.id}
                control={control}
                name={item.id}
                style={styles.item}
                disabled={!activeFields}
              />
            )
          }
          else if (item.id === 'volume' && disqualified) return null
          else if (item.id === 'duration' && !disqualified) return null
          else {
            return (
              <ControlledTextInput
                disabled={!activeFields}
                key={item.id}
                name={item.id}
                control={control}
                style={styles.item}
                right={item.unit}
              />
            )
          }
        })}
      </View>
      <Text variant='h4' bold align='flex-start' style={{ marginBottom: 20 }}>
        Morphology results
      </Text>
      <ScrollView contentContainerStyle={styles.formContainer} showsVerticalScrollIndicator={false}>
        {MORPHOLOGY_INDICATORS.map((item: Indicator<MorphologyIndicators>) => (
          <ControlledTextInput
            disabled={!activeFields}
            key={item.id}
            name={item.id}
            control={control}
            style={styles.item}
            right={item.unit}
          />
        ))}
      </ScrollView>
    </>
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
    maxWidth: '47%',
  },
  dropDownItem: {
    width: '100%',
    marginBottom: 16,
  },
})
