import { useRouter } from 'expo-router'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { addDonation } from '../../../data/donations'
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
    Object.keys(defaultValues).map((item) => {
      register(item as keyof Donation)
    })
  }, [register])

  useEffect(() => {
    setValue('volume', getVolume(watch('type')), { shouldValidate: true })
  }, [watch('type'), setValue])

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
