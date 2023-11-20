import { observable, action, toJS } from 'mobx';
import settingsStore from './settingsStore';
// langs
import Eng from '../dictionary/eng';
import Heb from '../dictionary/heb';

const dictionaryStore = observable({

	dictionary: {
		eng: Eng,
		heb: Heb
	},

	getString: action(function (str) {
		const currentLang = settingsStore.settings.lang;
		if (this.dictionary[currentLang] && this.dictionary[currentLang][str]) {
			return toJS(this.dictionary[currentLang][str]);
		} else {
			return str;
		}
	}),
});

export default dictionaryStore;
