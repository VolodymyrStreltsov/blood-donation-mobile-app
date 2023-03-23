import { useRouter } from 'expo-router'
import { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Dimensions, Platform, StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Appbar, Menu } from 'react-native-paper'
import { addDonation, deleteDonation, getDonationById, updateDonation } from '../../../data/database'
import { DataContext } from '../../../data/DataContext'
import { ControlledDropDown, ControlledTextInput, DatePicker, Text, View } from '../../atoms'
import { getVolume } from './donationHelper'

export const DonationForm = ({ nameOfDonation, id }: { nameOfDonation: DonationName; id?: string }) => {
  const {
    BASE_DONATION_INDICATORS,
    MORPHOLOGY_INDICATORS,
    BASE_DONATION_NAMES,
    EXTENDED_DONATION_NAMES,
  } = useContext(DataContext)
  const disqualified = nameOfDonation === 'Disqualification'

  const DONATION_TYPES = EXTENDED_DONATION_NAMES.map((el: string) => ({ label: el, value: el }))

  const dropdownActive = BASE_DONATION_NAMES.includes(
    nameOfDonation,
  )
    ? false
    : true

  const [donation, setDonation] = useState<Donation | null>(null)

  useEffect(() => {
    if (id) {
      getDonationById(id)
        .then((donation: Donation) => {
          setDonation(donation)
        })
        .catch((error: Error) => {
          console.log(error)
        })
    }
  }, [id])

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

  const defaultValues: Donation = {
    type: dropdownActive && !id ? EXTENDED_DONATION_NAMES[0] : nameOfDonation,
    date: donation?.date || new Date().toISOString(),
    volume: donation?.volume || getVolume(nameOfDonation),
    blood_pressure: donation?.blood_pressure || ' ',
    duration: donation?.duration || ' ',
    Hb: donation?.Hb || ' ',
    Ht: donation?.Ht || ' ',
    MCV: donation?.MCV || ' ',
    MCH: donation?.MCH || ' ',
    MCHC: donation?.MCHC || ' ',
    RDW: donation?.RDW || ' ',
    WBC: donation?.WBC || ' ',
    PLT: donation?.PLT || ' ',
    MPV: donation?.MPV || ' ',
    PCT: donation?.PCT || ' ',
    PDW: donation?.PDW || ' ',
    MO: donation?.MO || ' ',
  }

  const { handleSubmit, control, register, watch, setValue } = useForm({
    mode: 'onSubmit',
    criteriaMode: 'firstError',
    defaultValues,
  })

  useEffect(() => {
    register('type')
    register('date')
    register('volume')
    register('blood_pressure')
    register('duration')
    register('Hb')
    register('Ht')
    register('MCV')
    register('MCH')
    register('MCHC')
    register('RDW')
    register('WBC')
    register('PLT')
    register('MPV')
    register('PCT')
    register('PDW')
    register('MO')
  }, [register])

  const onSubmit = (val: Donation) => {
    console.log('form', id, val)
    if (id) {
      updateDonation(id, val)
    } else {
      addDonation(val)
    }
    router.back()
  }

  const deleteDonationHandler = () => {
    if (id) deleteDonation(id)
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
