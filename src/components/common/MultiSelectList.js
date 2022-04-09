import React, {Component} from 'react'
import {FlatList, Image, Text} from 'react-native'
import {MainContainer} from '.';
import Clickable from './Clickable';
import {FALSE} from "../../utils/AppConstants";
import {Colors, FontName, FontSize, Images, Utils} from '../../utils';

export default class MultiSelectList extends Component {

    state = {
        selectedIds: [],
        list: [],
        single: FALSE
    }

    componentDidMount() {
        if (!Utils.isNull(this.props.onRef)) {
            this.props.onRef(this)
        }

        const {list, value, single} = this.props.navigation.state.params

        this.setState({selectedIds: value ? value.split(",") : [], list: list, single: single})

    }

    render() {
        return (
            <MainContainer header={{
                title: this.props.navigation.state.params.title,
                left: {image: Images.ic_BackWhiteIcon, onPress: () => this.props.navigation.goBack()},
                right: [{
                    text: 'Done',
                    onPress: () => {
                        const onSelect = this.props.navigation.state.params.onSelect
                        const label = this.state.list.filter((v) => this.state.selectedIds.includes(v.value))
                        //  console.log(label)

                        if (onSelect)
                            onSelect({
                                value: this.state.selectedIds.join(","),
                                label: label.map(v => v.label)
                            })
                        this.props.navigation.goBack()
                    }
                }]
            }}>

                <FlatList
                    style={{flex: 1}}
                    data={this.state.list}
                    extraData={this.state}

                    ListFooterComponent={() => (

                        !this.state.list || this.state.list.length <= 0 ?
                            <Text style={{alignSelf: 'center', padding: 10}}>No data found</Text> : null
                    )}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => 'key' + index}
                />
            </MainContainer>
        )
    }

    renderItem = ({item, index}) => {


        let selectedIds = this.state.selectedIds;
        let found = selectedIds.find(value => item.value == value)

        return (
            <Clickable style={{
                borderBottomWidth: 0.5, flexDirection: 'row', alignItems: 'center',
                borderBottomColor: Colors.Backgroundgrey, padding: 10
            }}
                       activeOpacity={1}
                       onPress={() => {
                           let selectedIds = !this.state.single ? this.state.selectedIds : [];
                           let index = selectedIds.findIndex(value => item.value == value)

                           if (index < 0) {
                               selectedIds = [...selectedIds, item.value]
                           } else {
                               selectedIds.splice(index, 1)
                           }

                           this.setState({selectedIds: selectedIds}, () => {
                               if (this.props.onSelectionChanged)
                                   this.props.onSelectionChanged(selectedIds)
                           })

                       }}>
                <Text style={{
                    fontFamily: FontName.regular,
                    fontSize: FontSize.fontSize19,
                    color: Colors.Defaultblack,
                    alignItems: 'center',
                    flex: 1,
                    marginLeft: 16
                }}>
                    {item.label}
                </Text>
                {found ?
                    <Image source={Images.ic_BlueCheckmarkIcon} style={{

                        marginRight: 19,
                        alignItems: 'flex-end'

                    }}></Image> : null
                }
            </Clickable>
        )
    }
}
