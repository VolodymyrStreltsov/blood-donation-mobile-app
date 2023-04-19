import { useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Dimensions, StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Appbar } from 'react-native-paper'
import { getSettings, updateSettings } from '../../../data/settings'
import { ControlledDropDown, Loader } from '../../atoms'
import { useChangeContext } from '../../wrappersAndProviders'

const langOptions = [
  { label: 'PL', value: 'pl' },
  { label: 'EN', value: 'en' },
  { label: 'UA', value: 'ua' },
  { label: 'RU', value: 'ru' },
]

const modeOptions = [{ label: 'dark', value: 'dark' }, { label: 'light', value: 'light' }, { label: 'system', value: '' }]

export const SettingsForm = () => {
  const { setSettingsChanged, settingsChanged } = useChangeContext()
  const [settingsData, setSettingsData] = useState<SettingsData | null>(null)
  const [editable, setEditable] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setLoading(true)
    getSettings()
      .then((data) => {
        setSettingsData(data)
      })
      .catch((error: Error) => {
        console.log(error)
      })
      .finally(() => setLoading(false))
  }, [settingsChanged])

  const switchEditable = () => {
    setEditable(!editable)
  }

  const defaultValues = settingsData as SettingsData

  const { handleSubmit, control, reset } = useForm({
    mode: 'onSubmit',
    criteriaMode: 'firstError',
    defaultValues,
  })

  useEffect(() => {
    if (settingsData) {
      reset(settingsData)
    }
  }, [settingsData])

  const onSubmit = (val: SettingsData) => {
    console.log(val)
    updateSettings(val)
      .then(() => {
        setEditable(false)
        setSettingsChanged(prev => prev + 1)
      })
      .catch((error: Error) => {
        console.log(error)
      })
  }

  return loading ? (
    <Loader />
  ) : (
    <>
      <Appbar.Header style={styles.appbarContainer}>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Action
          icon={editable ? 'check' : 'pencil-outline'}
          onPress={!editable ? switchEditable : handleSubmit(onSubmit)}
        />
      </Appbar.Header>
      <ScrollView contentContainerStyle={styles.formContainer} showsVerticalScrollIndicator={false}>
        {loading ? (
          <Loader />
        ) : (
          <>
            <ControlledDropDown
              key='language'
              style={styles.item}
              control={control}
              name='language'
              list={langOptions}
              disabled={!editable}
            />
            <ControlledDropDown
              key='mode'
              style={styles.item}
              control={control}
              name='mode'
              list={modeOptions}
              disabled={!editable}
            />
          </>
        )
        }
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  appbarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    paddingVertical: 16,
  },
  item: {
    width: '100%',
  },
})
