import { useRouter } from 'expo-router'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { addDonation } from '../../../data/database'
import { DonationForm } from './DonationForm'
import { getVolume, useGetDonationDefaultValues } from './donationHelper'

interface NewDonationFormProps {
  nameOfDonation: DonationName
}

export const NewDonationForm = ({ nameOfDonation }: NewDonationFormProps) => {
  const router = useRouter()

  const defaultValues = useGetDonationDefaultValues(nameOfDonation)

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

  useEffect(() => {
    setValue('volume', getVolume(watch('type')), { shouldValidate: true })
  }, [watch('type')])

  const onSubmit = (val: Donation) => {
    addDonation(val)
    router.back()
  }

  return (
    <DonationForm
      activeFields={true}
      nameOfDonation={nameOfDonation}
      control={control}
      onSubmit={handleSubmit(onSubmit)} />
  )
}
