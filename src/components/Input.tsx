import { IInputProps, Input as NativeBaseInput, FormControl } from 'native-base'

type Props = IInputProps & {
  errorMessage?: string | null
}

export function Input({ errorMessage = null, isInvalid, ...rest }: Props) {
  const isInputInvalid = !!errorMessage || isInvalid

  return (
    <FormControl isInvalid={isInputInvalid} mb={4}>
      <NativeBaseInput
        bg="gray.700"
        h={14}
        px={4}
        borderWidth={0}
        fontSize="md"
        color="white"
        fontFamily="body"
        placeholderTextColor="gray.300"
        isInvalid={isInputInvalid}
        _invalid={{
          borderWidth: 1,
          borderColor: 'red.500'
        }}
        _focus={{
          bg: "gray.700",
          borderWidth: 1,
          borderColor: 'green.500'
        }}
        _disabled={{
          bg: "gray.500",
          color: "gray.200"
        }}
        {...rest}
      />

      <FormControl.ErrorMessage _text={{ color: "red.500" }}>
        {errorMessage}
      </FormControl.ErrorMessage>
    </FormControl>
  )
}