// helpers/Cookies.js

const Cookies = {
	getCookie: (name) => {
		const v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    		return v ? v[2] : null;
	},

	setCookie: (name, value, days) => {
		var d = new Date();
    		d.setTime(d.getTime() + 24*60*60*1000*days);
    		document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString();
	},

	deleteCookie: (name) => {
		Cookies.setCookie(name, '', -1)
	}
};

export default Cookies;