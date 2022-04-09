import { CP_SET_FIELD_VALUE } from "./types";

const INIT_STATE={

    firstName:'',
    lastName:'',
    phoneNumber: '',
    dob:undefined,
    email:'',
    address:'',
    nationality:'',
    stateSelected:{},
    city:{},
    postal_code:'',
    designation:'',
    incomesource:'',
    experiance: '',
    other: '',
    
    listNationality:[
        {label: 'Gujrati', key: 1},
        {label: 'Marathi', key: 2},
        {label: 'Kashmiri', key: 3}
    ],
    listCity:[
        {label: 'Gujrati', key: 1},
        {label: 'Marathi', key: 2},
        {label: 'Kashmiri', key: 3}
    ],
    listState:[
        {label: 'Gujrati', key: 1},
        {label: 'Marathi', key: 2},
        {label: 'Kashmiri', key: 3}
    ]
    // listNationality: ["Gujrati","Marathi","Hyderabadi","Kashmiri"]
}

export default (state=INIT_STATE,action) =>{


    switch(action.type){

        case CP_SET_FIELD_VALUE :
            return { ...state,[action.payload.key]:action.payload.value }
    }

    return state
}