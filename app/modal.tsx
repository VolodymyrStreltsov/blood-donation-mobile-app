import { useSearchParams } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

import { Platform } from 'react-native'
import { DonationInfoScreen, ExistingDonationForm, NewDonationForm, PageWrapper } from '../components'

export default function ModalScreen() {
  const { name, id, info } = useSearchParams()
  const nameOfDonation = typeof name === 'string' ? name : ''
  const idOfDonation = typeof id === 'string' ? id : ''
  const infoOfDonation = info === 'true'
  return (
    <PageWrapper type='modal'>
      {!infoOfDonation && (
        idOfDonation ? <ExistingDonationForm nameOfDonation={nameOfDonation as DonationName} id={idOfDonation} /> :
          <NewDonationForm nameOfDonation={nameOfDonation as DonationName} />
      )
      }
      {infoOfDonation && <DonationInfoScreen nameOfDonation={nameOfDonation} />}
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </PageWrapper>
  )
}
