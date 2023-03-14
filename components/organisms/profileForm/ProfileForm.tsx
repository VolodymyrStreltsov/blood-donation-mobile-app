import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Dimensions, Platform, StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Appbar } from 'react-native-paper'
import { DataContext } from '../../../data/DataContext'
import { ControlledTextInput } from '../../atoms'


export const ProfileForm = () => {
  const { PROFILE_DATA } = useContext(DataContext)
  const [editable, setEditable] = useState(false)

  const switchEditable = () => {
    setEditable(!editable)
  }

  const defaultValues: AddDonationFormDefaultValues = {
  }

  PROFILE_DATA.forEach((item: ProfileDataRecord) => defaultValues[item.id] = item.value)

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
    switchEditable()
  }

  return (
    <>
      <Appbar.Header style={styles.appbarContainer}>
        <Appbar.Action
          icon={editable ? 'check' : 'pencil-outline'}
          onPress={!editable ? switchEditable : handleSubmit(onSubmit)}
        />
      </Appbar.Header>
      <ScrollView
        contentContainerStyle={styles.formContainer}
        showsVerticalScrollIndicator={false}>
        {PROFILE_DATA.map((item: ProfileDataRecord) => (
          <ControlledTextInput
            disabled={!editable}
            key={item.id}
            name={item.id}
            control={control}
            style={styles.item}
          />
        ))}
      </ScrollView>
    </ >
  )
}

const styles = StyleSheet.create({
  appbarContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'transparent',
    width: Platform.OS === 'web' ? '100vw' : Dimensions.get('window').width,
    marginTop: Platform.OS === 'web' ? 0 : -25,
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
    minWidth: '100%',
  },
})
