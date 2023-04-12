import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Dimensions, StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Appbar } from 'react-native-paper'
import { getProfile, updateProfile } from '../../../data/profile'
import { ControlledDropDown, ControlledRadioButton, ControlledTextInput, Loader } from '../../atoms'
import { useChangeContext } from '../../wrappersAndProviders'

const profileDataWithUnits: Indicator<ProfileData>[] = [
  {
    id: 'language',
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
  { label: '👨‍🦱', value: 'male' },
  { label: '👩‍🦰', value: 'female' },
]

const langOptions = [
  { label: 'PL', value: 'pl' },
  { label: 'EN', value: 'en' },
  { label: 'UA', value: 'ua' },
  { label: 'RU', value: 'ru' },
]

export const ProfileForm = () => {
  const { setProfileChanged, profileChanged } = useChangeContext()
  const [profileData, setProfileData] = useState<ProfileData | null>(null)
  const [editable, setEditable] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    getProfile()
      .then((data) => {
        setProfileData(data)
      })
      .catch((error: Error) => {
        console.log(error)
      })
      .finally(() => setLoading(false))
  }, [profileChanged])

  const switchEditable = () => {
    setEditable(!editable)
  }

  const defaultValues = profileData as ProfileData

  const { handleSubmit, control, reset } = useForm({
    mode: 'onSubmit',
    criteriaMode: 'firstError',
    defaultValues,
  })

  useEffect(() => {
    if (profileData) {
      reset(profileData)
    }
  }, [profileData])

  const onSubmit = (val: ProfileData) => {
    console.log(val)
    updateProfile(val)
      .then(() => {
        setEditable(false)
        setProfileChanged(prev => prev + 1)
      })
      .catch((error: Error) => {
        console.log(error)
      })
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
        {loading ? (
          <Loader />
        ) : (
          profileDataWithUnits.map((item) => {
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
          })
        )}
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
