import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Center, ScrollView, VStack, Skeleton, Text, Heading, useToast } from "native-base";
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'

import { ScreenHeader } from "@components/ScreenHeader";
import { UserPhoto } from "@components/UserPhoto";
import { Input } from '@components/Input'
import { Button } from "@components/Button";

const PHOTO_SIZE = 32
const MAXIMUM_IMAGE_SIZE_IN_MB = 5

export function Profile() {
  const [isPhotoLoading, setIsPhotoLoading] = useState(false)
  const [userPhoto, setUserPhoto] = useState('https://github.com/gabrielvbauer.png')

  const toast = useToast()

  async function handleSelectUserPhoto() {
    setIsPhotoLoading(true)
    try {
      const selectedPhoto = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
        allowsMultipleSelection: false
      })
  
      if (selectedPhoto.canceled) {
        return
      }
  
      const photoUri = selectedPhoto.assets[0].uri
      const photoInfo = await FileSystem.getInfoAsync(photoUri)

      if (!photoInfo.exists) {
        return
      }

      if(photoInfo.size / 1024 / 1024 > MAXIMUM_IMAGE_SIZE_IN_MB) {
        toast.show({
          title: `Esta imagem é muito grande. Escolha uma de até ${MAXIMUM_IMAGE_SIZE_IN_MB}MB.`,
          placement: 'top',
          bgColor: 'red.500'
        })
        return
      }

      setUserPhoto(photoUri)
    } catch (error) {
      console.log(error)
    } finally {
      setIsPhotoLoading(false)
    }
  }

  return (
    <VStack flex={1}>
      <ScreenHeader title="Perfil" />

      <ScrollView
        contentContainerStyle={{
          paddingBottom: 36
        }}
      >
        <Center mt={6} px={10}>
          {
            isPhotoLoading
              ? <Skeleton
                  w={PHOTO_SIZE}
                  h={PHOTO_SIZE}
                  rounded="full"
                  startColor="gray.500"
                  endColor="gray.400"
                />
              : <UserPhoto
                  source={{ uri: userPhoto }}
                  alt="Foto do usuário"
                  size={PHOTO_SIZE}
                /> 
          }

          <TouchableOpacity onPress={handleSelectUserPhoto}>
            <Text color="green.500" fontWeight="bold" fontSize="md" mt={2} mb={8}>
              Alterar foto
            </Text>
          </TouchableOpacity>

          <Input
            placeholder="Nome"
            bg="gray.600"
          />
          <Input
            placeholder="E-mail"
            bg="gray.600"
            value="gabriel.bauer9hotmail.com"
            isDisabled
          />

          <Heading color="gray.200" fontSize="md" mb={2} alignSelf="flex-start" mt={12}>
            Alterar senha
          </Heading>

          <Input
            bg="gray.600"
            placeholder="Senha antiga"
            secureTextEntry
          />
          <Input
            bg="gray.600"
            placeholder="Nova senha"
            secureTextEntry
          />
          <Input
            bg="gray.600"
            placeholder="Confirme a nova senha"
            secureTextEntry
          />

          <Button 
            title="Atualizar"
            mt={4}
          />
        </Center>
      </ScrollView>
    </VStack>
  )
}