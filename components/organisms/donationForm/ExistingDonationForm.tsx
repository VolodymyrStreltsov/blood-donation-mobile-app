import { useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
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
    getDonationById(id)
      .then((donation) => {
        setDonation(donation)
      })
      .catch((error: Error) => {
        console.log(error)
      })
  }, [id])

  const [activeFields, setActiveFields] = useState(false)
  const [visible, setVisible] = useState(false)

  const switchMenuVisible = () => {
    setVisible(!visible)
  }

  const switchActive = () => {
    setActiveFields(!activeFields)
    setVisible(false)
  }

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
    Object.keys(defaultValues).map((item) => {
      register(item as keyof Donation)
    })
  }, [register])

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
