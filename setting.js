
import themeNum1 from './color/themeNum1.js';
import {
	userStore
} from "@/store/themeNum.js";
const store = userStore();

const dev = 0
let COUNTRY = {}

const countryList = [
	{
		url: 'a22y.com',
		themeNum: 1,
		qianzhui: 'api.',
		lang: "en",
		icon:"/static/titleIcon/ama.png",
	},{
		url: 'amainvestor.com',
		themeNum: 1,
		qianzhui: 'api.',
		lang: "en",
		icon:"/static/titleIcon/ama.png",
		title:"AMA"
	},
]
countryList.forEach((item,index) => {
	if(index == dev){
		COUNTRY = item
	}
})


if (COUNTRY.themeNum == 1) {
	store.setContentColor(themeNum1.contentColor)
	store.setSecondColor(themeNum1.secondColor)
	store.setImgObj(themeNum1.imgObj)
	store.setMy(themeNum1.my)
	store.setWr(themeNum1.wr)
	store.setTask(themeNum1.task)
}
COUNTRY.HOST = `https://${COUNTRY.qianzhui}${COUNTRY.url}` + '/api/'
export default COUNTRY
