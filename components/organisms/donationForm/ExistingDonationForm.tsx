import { useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { deleteDonation, getDonationById, updateDonation } from '../../../data/database'
import { Loader } from '../../atoms'
import { DonationForm } from './DonationForm'
import { useGetDonationDefaultValues } from './donationHelper'

interface ExistingDonationFormProps {
  nameOfDonation: DonationName
  id: string
}

export const ExistingDonationForm = ({ nameOfDonation, id }: ExistingDonationFormProps) => {
  const router = useRouter()
  const [donation, setDonation] = useState<Donation | null>(null)

  useEffect(() => {
    getDonationById(id)
      .then((donation: Donation) => {
        setDonation(donation)
      })
      .catch((error: Error) => {
        console.log(error)
      })
  }, [])

  const [editable, setEditable] = useState(false)
  const [activeFields, setActiveFields] = useState(id === '')
  const [visible, setVisible] = useState(false)

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

  const defaultValues = useGetDonationDefaultValues(nameOfDonation)
  useEffect(() => {
    if (donation) {
      reset({
        ...donation,
        date: new Date(donation.date).toISOString(),
      })
    }
  }, [donation])

  const { handleSubmit, control, register, reset } = useForm({
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
    register('MO') // TODo: rewrite this
  }, [register])

  const onSubmit = (val: Donation) => {
    updateDonation(id, val)
    router.back()
  }

  const deleteDonationHandler = () => {
    if (id) deleteDonation(id)
    router.back()
  }

  if (!donation) return (<Loader />)

  return (
    <DonationForm
      nameOfDonation={nameOfDonation}
      visible={visible}
      control={control}
      activeFields={activeFields}
      onSubmit={handleSubmit(onSubmit)}
      switchEditable={switchEditable}
      switchMenuVisible={switchMenuVisible}
      deleteDonationHandler={deleteDonationHandler} />
  )
}
