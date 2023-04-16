import { useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Dimensions, StyleSheet, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Appbar } from 'react-native-paper'
import { getProfile, updateProfile } from '../../../data/profile'
import { ControlledCheckbox, ControlledRadioButton, Loader, Text } from '../../atoms'
import { useChangeContext } from '../../wrappersAndProviders'

const profileFields: ProfileFields[] = ['gender', 'AB0', 'RhD1', 'RhD2', 'KELL', 'Fy', 'MNS']

const options = {
  gender: [{ label: 'male', value: 'male' },
  { label: 'female', value: 'female' }],
  AB0: [{ label: 'A', value: 'A' }, { label: 'B', value: 'B' }, { label: 'AB', value: 'AB' }, { label: '0', value: '0' }],
  RhD1: [{ label: '+', value: '+' }, { label: '-', value: '-' }],
  RhD2: ['Cw', 'C', 'c', 'E', 'e'],
  KELL: [{ label: '+', value: '+' }, { label: '-', value: '-' }],
  Fy: ['a', 'b'],
  MNS: ['M', 'N', 'S', 's'],
}

export const ProfileForm = () => {
  const { setProfileChanged, profileChanged } = useChangeContext()
  const [profileData, setProfileData] = useState<FrontProfileData | null>(null)
  const [editable, setEditable] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setLoading(true)
    getProfile()
      .then((data) => {
        const RhD2 = (data?.RhD2 || '').split(',')
        const Fy = (data?.Fy || '').split(',')
        const MNS = (data?.MNS || '').split(',')
        setProfileData({
          gender: data?.gender,
          AB0: data?.AB0,
          RhD1: data?.RhD1,
          Cw: RhD2.includes('Cw'),
          C: RhD2.includes('C'),
          c: RhD2.includes('c'),
          E: RhD2.includes('E'),
          e: RhD2.includes('e'),
          KELL: data?.KELL,
          a: Fy.includes('a'),
          b: Fy.includes('b'),
          M: MNS.includes('M'),
          N: MNS.includes('N'),
          S: MNS.includes('S'),
          s: MNS.includes('s'),
        } as FrontProfileData)
      })
      .catch((error: Error) => {
        console.log(error)
      })
      .finally(() => setLoading(false))
  }, [profileChanged])

  const switchEditable = () => {
    setEditable(!editable)
  }

  const defaultValues = profileData as FrontProfileData

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

  const onSubmit = (val: FrontProfileData) => {
    updateProfile({
      ...val,
      RhD2: [val.Cw && 'Cw', val.c && 'c', val.C && 'C', val.E && 'E', val.e && 'e'].filter(Boolean).join(','),
      Fy: [val.a && 'a', val.b && 'b'].filter(Boolean).join(','),
      MNS: [val.M && 'M', val.N && 'N', val.S && 'S', val.s && 's'].filter(Boolean).join(','),
    })
      .then(() => {
        setEditable(false)
        setProfileChanged(prev => prev + 1)
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
        <Appbar.Action
          icon={editable ? 'check' : 'pencil-outline'}
          onPress={!editable ? switchEditable : handleSubmit(onSubmit)}
        />
        <Appbar.Action
          icon='settings-helper'
          onPress={() => router.push({ pathname: 'settings-modal' })}
        />
      </Appbar.Header>
      <ScrollView contentContainerStyle={styles.formContainer} showsVerticalScrollIndicator={false}>
        {profileFields.map((item) => {
          if (item === 'RhD2' || item === 'Fy' || item === 'MNS') {
            return (
              <View key={item}>
                {item !== 'RhD2' && <Text align='flex-start'>{item}</Text>}
                <View style={styles.checkboxes}>
                  {options[item].map((option) =>
                    <ControlledCheckbox control={control} name={option} key={option} disabled={!editable} />
                  )}
                </View>
              </View>
            )
          } else {
            return (
              <ControlledRadioButton
                key={item}
                control={control}
                name={item}
                options={options[item]}
                disabled={!editable} />
            )
          }
        })
        }
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
    width: Dimensions.get('window').width,
    paddingTop: 16,
  },
  checkboxes: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 8,
  },
})
