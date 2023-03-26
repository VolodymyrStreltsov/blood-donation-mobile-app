import { useFocusEffect } from 'expo-router'
import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Dimensions, StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Appbar } from 'react-native-paper'
import { getProfile, updateProfile } from '../../../data/profile'
import { ControlledDropDown, ControlledRadioButton, ControlledTextInput } from '../../atoms'

const profileDataWithUnits: Indicator<ProfileData>[] = [
  {
    id: 'language',
  },
  {
    id: 'country'
  },
  {
    id: 'gender',
  },
  {
    id: 'height',
    unit: 'cm',
  },
  {
    id: 'weight',
    unit: 'kg',
  },
]

const radioOptions = [
  { label: 'male', value: 'male' },
  { label: 'female', value: 'female' },
]

const countriesOptions = [
  { label: 'Polska', value: 'Polska' },
  { label: 'Україна', value: 'Україна' },
]

const langOptions = [
  { label: 'PL', value: 'PL' },
  { label: 'EN', value: 'EN' },
  { label: 'UA', value: 'UA' },
]

export const ProfileForm = () => {
  const [profileData, setProfileData] = useState<ProfileData | null>({} as ProfileData)

  useEffect(() => {
    getProfile()
      .then((data) => {
        setProfileData(data)
      })
      .catch((error: Error) => {
        console.log(error)
      })
  }, [])

  const [editable, setEditable] = useState(false)

  const switchEditable = () => {
    setEditable(!editable)
  }

  useEffect(() => {
    setEditable(false)
  }, [])

  useFocusEffect(
    useCallback(() => {
      setEditable(false)
    }, [])
  )

  const defaultValues: ProfileData = {
    language: 'EN',
    country: 'Polska',
    gender: 'male',
    height: '',
    weight: '',
  }

  useEffect(() => {
    if (profileData) {
      reset(profileData)
    }
  }, [profileData])

  const { handleSubmit, control, register, reset } = useForm({
    mode: 'onSubmit',
    criteriaMode: 'firstError',
    defaultValues,
  })

  useEffect(() => {
    Object.keys(defaultValues).map((item) => {
      register(item as keyof ProfileData)
    })
  }, [register])

  const onSubmit = (val: ProfileData) => {
    updateProfile(val)
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
      <ScrollView contentContainerStyle={styles.formContainer} showsVerticalScrollIndicator={false}>
        {profileDataWithUnits.map((item) => {
          if (item.id === 'language') {
            return (
              <ControlledDropDown
                key={item.id}
                style={styles.item}
                control={control}
                name={item.id}
                list={langOptions}
                disabled={!editable}
              />
            )
          }
          if (item.id === 'country') {
            return (
              <ControlledDropDown
                key={item.id}
                style={styles.item}
                control={control}
                name={item.id}
                list={countriesOptions}
                disabled={!editable}
              />
            )
          }
          if (item.id === 'gender') {
            return (
              <ControlledRadioButton
                key={item.id}
                control={control}
                name={item.id}
                options={radioOptions}
                disabled={!editable} />
            )
          } else {
            return (
              <ControlledTextInput
                disabled={!editable}
                key={item.id}
                name={item.id}
                control={control}
                style={styles.item}
                right={item.unit}
              />
            )
          }
        })}
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  appbarContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'transparent',
    width: Dimensions.get('window').width,
    marginTop: -25,
  },
  formContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    width: '100%',
    rowGap: 16,
    paddingTop: 16,
  },
  item: {
    width: '46%',
  },
})
