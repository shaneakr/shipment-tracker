import { FunctionComponent, ReactNode, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Button from '../../components/Button'
import SelectField from '../../components/forms/SelectField'
import TextField from '../../components/forms/TextField'
import { COUNTRY_CODE_OPTIONS, GROUP_TYPE_OPTIONS } from '../../data/constants'
import { GroupCreateInput, GroupQuery } from '../../types/api-types'

interface Props {
  /**
   * If true, the Submit button will be disabled
   */
  isLoading: boolean
  /**
   * The text to display in the Submit button of the form
   */
  submitButtonLabel: ReactNode
  /**
   * The values to display in the fields of the form. Note that this is NOT a
   * controlled component.
   */
  defaultValues?: GroupQuery
  /**
   * The callback triggered when the user submits the form
   */
  onSubmit: (input: GroupCreateInput) => void
}

/**
 * This component encapsulates a form for creating and editing groups.
 */
const GroupForm: FunctionComponent<Props> = (props) => {
  const { register, handleSubmit, reset } = useForm()

  useEffect(
    function resetFormValues() {
      if (props.defaultValues) {
        // Update the values of the fields
        reset(props.defaultValues.group)
      }
    },
    [props.defaultValues, reset],
  )

  return (
    <form onSubmit={handleSubmit(props.onSubmit)}>
      <TextField
        label="Name"
        name="name"
        register={register}
        className="mb-4"
        required
      />
      <SelectField
        label="Type"
        name="groupType"
        options={GROUP_TYPE_OPTIONS}
        required
        register={register}
      />
      <fieldset className="space-y-4 mt-8">
        <legend>Location</legend>
        <TextField
          label="Town or city"
          name="primaryLocation.townCity"
          register={register}
          required
        />
        <SelectField
          label="Country"
          name="primaryLocation.countryCode"
          defaultValue=""
          options={[
            {
              label: 'Pick a country',
              value: '',
              disabled: true,
            },
            ...COUNTRY_CODE_OPTIONS,
          ]}
          register={register}
        />
      </fieldset>
      <fieldset className="space-y-4 mt-8">
        <legend>Primary contact</legend>
        <TextField
          label="Name"
          name="primaryContact.name"
          register={register}
          required
        />
        <TextField
          label="Email"
          type="email"
          name="primaryContact.email"
          register={register}
        />
        <TextField
          label="WhatsApp"
          type="text"
          name="primaryContact.whatsApp"
          register={register}
        />
        <TextField
          label="Phone"
          type="text"
          name="primaryContact.phone"
          register={register}
        />
        <TextField
          label="Signal"
          type="text"
          name="primaryContact.signal"
          register={register}
        />
      </fieldset>

      <Button
        variant="primary"
        type="submit"
        className="mt-6"
        disabled={props.isLoading}
      >
        {props.submitButtonLabel}
      </Button>
    </form>
  )
}

export default GroupForm
