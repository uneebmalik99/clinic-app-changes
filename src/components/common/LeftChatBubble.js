


export default LeftChatBubble = (props) =>{

    const { style, onPress, disabled, bordered, disableAllCaps,message, type } = props
    
    
    return (<View style={{width:'50%'}}>
        <Text>{message}</Text>
    </View>)


}