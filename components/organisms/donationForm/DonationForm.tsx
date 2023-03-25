import { useRouter } from 'expo-router'
import { Control } from 'react-hook-form'
import { Dimensions, Platform, StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Appbar, Menu } from 'react-native-paper'
import { ControlledDropDown, ControlledTextInput, DatePicker, Loader, Text, View } from '../../atoms'
import { BASE_DONATION_INDICATORS, BASE_DONATION_NAMES, EXTENDED_DONATION_NAMES, MORPHOLOGY_INDICATORS } from './donationHelper'

interface DonationFormProps {
  nameOfDonation: DonationName
  visible?: boolean
  control: Control<any>
  switchMenuVisible?: () => void
  activeFields?: boolean
  onSubmit: () => void
  switchEditable?: () => void
  deleteDonationHandler?: () => void
}

export const DonationForm = ({ nameOfDonation, visible, control, switchMenuVisible, activeFields, onSubmit, switchEditable, deleteDonationHandler }: DonationFormProps) => {

  const router = useRouter()

  const disqualified = nameOfDonation === 'Disqualification'

  const DONATION_TYPES = EXTENDED_DONATION_NAMES.map((el: string) => ({ label: el, value: el }))

  const dropdownActive = !BASE_DONATION_NAMES.includes(nameOfDonation)

  const HEADER = BASE_DONATION_INDICATORS.map((item: Indicator<BaseDonationInfo>) => {
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
  }) ?? <Loader />

  const MORPHOLOGY = MORPHOLOGY_INDICATORS.map((item: Indicator<MorphologyIndicators>) => (
    <ControlledTextInput
      disabled={!activeFields}
      key={item.id}
      name={item.id}
      control={control}
      style={styles.item}
      right={item.unit}
    />
  )) ?? <Loader />

  return (
    <>
      <Appbar.Header style={styles.appbarContainer}>
        <Appbar.BackAction onPress={() => router.back()} />
        <Menu
          visible={!!visible}
          onDismiss={switchMenuVisible}
          anchor={
            <Appbar.Action
              icon={activeFields ? 'check' : 'dots-vertical'}
              onPress={!activeFields ? switchMenuVisible : onSubmit}
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
        {HEADER}
      </View>
      <Text variant='h4' bold align='flex-start' style={{ marginBottom: 10 }}>
        Morphology results
      </Text>
      <ScrollView contentContainerStyle={styles.formContainer} showsVerticalScrollIndicator={false}>
        {MORPHOLOGY}
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
    paddingTop: 20,
  },
  item: {
    width: '47%',
  },
  dropDownItem: {
    width: '100%',
    marginBottom: 16,
  },
})
