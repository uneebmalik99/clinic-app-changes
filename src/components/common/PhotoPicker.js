import React from 'react'
import { ActionSheet } from "native-base";
import ImagePicker from 'react-native-image-picker';
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';
import { Images } from '../../utils';

export default showPhotoPicker = ({ onFileSelect, crop, document, title, noImage, extraParam = {} }) => {

    let options = []
    if (!noImage) {
        options.push('Camera')
        options.push('Gallery')
    }
    const config = {
        title: 'Select photo',
        maxWidth:300,
        
        maxHeight:300,
        storageOptions: {
            skipBackup: true,
            waitUntilSaved: true,
            cameraRoll: true,
            path: 'images',
        },
    };

    if (document)
        options.push('Document')


    if (extraParam.value)
        options.push(extraParam.value)
    options.push('Cancel')


    ActionSheet.show({ options: options, title: title || 'Select Option', cancelButtonIndex: 3 }, (actionIndex) => {


        switch (options[actionIndex]) {

            case 'Camera': {

                // ImageCropPicker.openCamera({

                //     width: 300,
                //     height: 400,
                //     cropping: crop,
                //     cropperCircleOverlay: crop
                // }, (image) => {
                //     if (image) {
                //         image.source = { uri: image.path }
                //         onFileSelect(image)
                //     }
                // })

                ImagePicker.launchCamera(config, (response) => {

                    if (response.didCancel) {
                        console.log('User cancelled image picker');
                    } else if (response.error) {
                        console.log('ImagePicker Error: ', response.error);
                    } else if (response.customButton) {
                        console.log('User tapped custom button: ', response.customButton);
                    } else {

                        // You can also display the image using data:
                        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
                        response.source = { uri: response.uri }

                        // ImageCropPicker.openCropper({
                        //     path: response.path,
                        //     cropping: true,
                        //     cropperCircleOverlay: true,
                        //     width: 1000,
                        //     height: 1000
                        // }, (image) => {

                        // })
                        onFileSelect(response)
                    }

                })

                break;
            }
            case 'Gallery': {




                ImagePicker.launchImageLibrary(config, (response) => {
                    if (response.didCancel) {
                        console.log('User cancelled image picker');
                    } else if (response.error) {
                        console.log('ImagePicker Error: ', response.error);
                    } else if (response.customButton) {
                        console.log('User tapped custom button: ', response.customButton);
                    } else {

                        // You can also display the image using data:
                        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
                        response.source = { uri: response.uri }

                        onFileSelect(response)
                    }
                })
                break;
            }
            case 'Document': {

                DocumentPicker.show({
                    filetype: [DocumentPickerUtil.pdf()],
                }, (error, res) => {
                    // Android

                    if (!error) {
                        res.source = Images.ic_PhonebookIcon
                        onFileSelect(res)
                    }
                });
                break;
            }

            case extraParam.value: {

                if (extraParam.callback)
                    extraParam.callback()
            }

        }

    })

}