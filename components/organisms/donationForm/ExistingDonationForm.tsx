import { useRouter } from 'expo-router'
import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { deleteDonation, getDonationById, updateDonation } from '../../../data/donations'
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
    const fetchDonation = async () => {
      try {
        const donation = await getDonationById(id)
        setDonation(donation)
      } catch (error) {
        console.log(error)
      }
    }
    fetchDonation()
  }, [id])

  const [activeFields, setActiveFields] = useState(false)
  const [visible, setVisible] = useState(false)

  const switchMenuVisible = useCallback(() => {
    setVisible((visible) => !visible)
  }, [])

  const switchActive = useCallback(() => {
    setActiveFields((activeFields) => !activeFields)
    setVisible(false)
  }, [])

  const defaultValues = useGetDonationDefaultValues(nameOfDonation)

  const { handleSubmit, control, register, reset } = useForm({
    mode: 'onSubmit',
    criteriaMode: 'firstError',
    defaultValues,
  })

  useEffect(() => {
    if (donation) {
      reset({
        ...donation,
        date: new Date(donation.date).toISOString(),
      })
    }
  }, [donation, reset])

  useEffect(() => {
    Object.keys(defaultValues).forEach((item) => {
      register(item as keyof Donation)
    })
  }, [defaultValues, register])

  const onSubmit = (val: Donation) => {
    updateDonation(id, val)
    switchActive()
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
      switchActive={switchActive}
      switchMenuVisible={switchMenuVisible}
      deleteDonationHandler={deleteDonationHandler} />
  )
}
