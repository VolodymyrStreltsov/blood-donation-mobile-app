import { useRouter } from 'expo-router'
import { Control } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Dimensions, KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Appbar, Menu } from 'react-native-paper'
import { ControlledDropDown, ControlledTextInput, DatePicker, Loader, Text } from '../../atoms'
import { baseDonationIndicators, baseDonationNames, extendedDonationNames, morphologyIndicators } from './donationHelper'

interface DonationFormProps {
  nameOfDonation: DonationName
  visible?: boolean
  control: Control<any>
  switchMenuVisible?: () => void
  activeFields?: boolean
  onSubmit: () => void
  switchActive?: () => void
  deleteDonationHandler?: () => void
}

export const DonationForm = ({ nameOfDonation, visible, control, switchMenuVisible, activeFields, switchActive, onSubmit, deleteDonationHandler }: DonationFormProps) => {
  const { t } = useTranslation()
  const router = useRouter()

  const disqualified = nameOfDonation === 'Disqualification'

  const donationTypes = extendedDonationNames.map((el: string) => ({
    label: t(`donationTypes.${el}`), value: el
  }))

  const dropdownActive = !baseDonationNames.includes(nameOfDonation)

  const header = baseDonationIndicators.map((item: Indicator<BaseDonationInfo>) => {
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

  const morphology = morphologyIndicators.map((item: Indicator<MorphologyIndicators>) => (
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
          <Menu.Item onPress={switchActive} title={t('buttons.edit')} leadingIcon='pencil-outline' />
          <Menu.Item
            onPress={deleteDonationHandler}
            title={t('buttons.delete')}
            leadingIcon='trash-can-outline'
          />
          {/* <Menu.Item onPress={() => null} title='Share' leadingIcon='check' /> */}
        </Menu>
      </Appbar.Header>
      <Text variant='h2' align='flex-start' style={{ marginBottom: 30 }}>
        {t(`donationTypes.${nameOfDonation}`)}
      </Text>
      {dropdownActive && activeFields && (
        <ControlledDropDown
          style={styles.dropDownItem}
          control={control}
          name='type'
          list={donationTypes}
        />
      )}
      <View style={styles.headerWrapper}>
        {header}
      </View>
      <Text variant='h4' bold align='flex-start' style={{ marginBottom: 10 }}>
        {t('headers.morphology')}
      </Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        <KeyboardAvoidingView
          style={styles.formContainer}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -260} // adjust as needed
        >
          {morphology}
        </KeyboardAvoidingView>
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
    width: Dimensions.get('window').width,
    marginTop: -25,
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
    width: '97%',
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
