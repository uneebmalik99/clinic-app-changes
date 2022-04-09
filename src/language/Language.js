import LocalizedStrings from 'react-native-localization'
import Dutch from './Dutch'
import English from './English'
import French from './French'
import German from './German'
import Italian from './Italian'
import Spanish from './Spanish'

let strings = new LocalizedStrings({

    de: German,
    en: English,
    it:Italian,
    fr:French,
    nl:Dutch,
    es:Spanish,

})

export { strings }